import express from "express";
import { handleStripeWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// IMPORTANT : on utilise express.raw() pour cette route
// car Stripe a besoin du body brut pour vérifier la signature
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

export default router;
