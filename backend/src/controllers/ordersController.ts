import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import stripe from "../lib/stripe.js";

// POST /api/orders → crée une commande + un PaymentIntent Stripe
export async function createOrder(req: Request, res: Response) {
  try {
    const { customer, items } = req.body as any;

    // === VALIDATION DES DONNÉES CLIENT ===
    const errors: Record<string, string> = {};

    if (!customer || typeof customer !== "object") {
      return res.status(400).json({ error: "Données client manquantes." });
    }

    if (
      !customer.name ||
      typeof customer.name !== "string" ||
      !customer.name.trim()
    ) {
      errors.customerName = "Le nom est requis.";
    }

    if (
      !customer.email ||
      typeof customer.email !== "string" ||
      !customer.email.trim()
    ) {
      errors.customerEmail = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.customerEmail = "Cet email n'est pas valide.";
    }

    if (!Array.isArray(items) || items.length === 0) {
      errors.items = "Le panier est vide.";
    } else {
      for (const item of items) {
        if (
          !item.productId ||
          typeof item.productId !== "number" ||
          !item.quantity ||
          typeof item.quantity !== "number" ||
          item.quantity < 1
        ) {
          errors.items = "Un article du panier est invalide.";
          break;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Données invalides.",
        fields: errors,
      });
    }

    // === VÉRIFICATION DES PRODUITS ===
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        error: "Un ou plusieurs produits sont introuvables.",
      });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (item.quantity > product.stock) {
        return res.status(400).json({
          error: `Stock insuffisant pour "${product.name}". Disponible : ${product.stock}, demandé : ${item.quantity}.`,
        });
      }

      const lineTotal = product.price * item.quantity;
      totalAmount += lineTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    // === CRÉATION DU PAYMENT INTENT STRIPE ===
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe travaille en centimes !
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: customer.email.trim().toLowerCase(),
      metadata: {
        customerName: customer.name.trim(),
      },
    });

    // === CRÉATION DE LA COMMANDE EN BASE ===
    // On NE décrémente PAS le stock ici : on le fera dans le webhook quand le paiement réussit
    const order = await prisma.order.create({
      data: {
        customerName: customer.name.trim(),
        customerEmail: customer.email.trim().toLowerCase(),
        totalAmount,
        status: "pending",
        stripePaymentIntentId: paymentIntent.id,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    // On renvoie le client_secret pour que le frontend puisse confirmer le paiement
    res.status(201).json({
      orderId: order.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Erreur createOrder:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de la commande." });
  }
}

// GET /api/orders/:id → détail d'une commande
export async function getOrderById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide." });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Commande introuvable." });
    }

    res.json({
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        productName: item.product.name,
        productSlug: item.product.slug,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });
  } catch (error) {
    console.error("Erreur getOrderById:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}
