import prisma from "../lib/prisma.js";
import stripe from "../lib/stripe.js";

// POST /api/webhooks/stripe → reçoit les événements Stripe
export async function handleStripeWebhook(req, res) {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  // 1. Vérifier l'authenticité de la requête
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("⚠️  Signature webhook invalide:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Traiter l'événement selon son type
  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Événement Stripe non géré : ${event.type}`);
    }

    // 3. Toujours répondre 200 rapidement, sinon Stripe retentera
    res.json({ received: true });
  } catch (err) {
    console.error("Erreur traitement webhook:", err);
    res.status(500).json({ error: "Erreur serveur webhook." });
  }
}

// === HANDLERS PAR ÉVÉNEMENT ===

async function handlePaymentSucceeded(paymentIntent) {
  console.log(`✅ Paiement réussi : ${paymentIntent.id}`);

  // Trouver la commande liée
  const order = await prisma.order.findUnique({
    where: { stripePaymentIntentId: paymentIntent.id },
    include: { items: true },
  });

  if (!order) {
    console.error(
      `Commande introuvable pour PaymentIntent ${paymentIntent.id}`,
    );
    return;
  }

  // Idempotence : si déjà payée, on ne refait rien
  if (order.status === "paid") {
    console.log(`Commande ${order.id} déjà marquée payée, skip.`);
    return;
  }

  // Transaction : marquer payée + décrémenter le stock
  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: { status: "paid" },
    });

    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
  });

  console.log(`Commande ${order.id} marquée payée et stock mis à jour.`);
}

async function handlePaymentFailed(paymentIntent) {
  console.log(`❌ Paiement échoué : ${paymentIntent.id}`);

  await prisma.order.updateMany({
    where: {
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    },
    data: { status: "failed" },
  });
}
