import prisma from "../lib/prisma.js";

// POST /api/orders → crée une nouvelle commande
export async function createOrder(req, res) {
  try {
    const { customer, items } = req.body;

    // === VALIDATION DES DONNÉES CLIENT ===
    const errors = {};

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

    // === VALIDATION DES ITEMS ===
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

    // === VÉRIFICATION DES PRODUITS EN BASE ===
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Tous les produits demandés existent-ils ?
    if (products.length !== productIds.length) {
      return res.status(400).json({
        error: "Un ou plusieurs produits sont introuvables.",
      });
    }

    // Vérification des stocks et calcul du total côté serveur
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
        unitPrice: product.price, // prix figé au moment de la commande
      });
    }

    // === CRÉATION DE LA COMMANDE EN TRANSACTION ===
    const order = await prisma.$transaction(async (tx) => {
      // 1. Créer la commande avec ses items en cascade
      const newOrder = await tx.order.create({
        data: {
          customerName: customer.name.trim(),
          customerEmail: customer.email.trim().toLowerCase(),
          totalAmount,
          status: "pending",
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // 2. Décrémenter le stock des produits
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    res.status(201).json({
      message: "Commande créée avec succès.",
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map((item) => ({
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    });
  } catch (error) {
    console.error("Erreur createOrder:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de la commande." });
  }
}

// GET /api/orders/:id → détail d'une commande (pour la page de confirmation)
export async function getOrderById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide." });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
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
