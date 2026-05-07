import { loadStripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY est manquante dans .env");
}

// loadStripe retourne une Promise qu'on garde en module-level :
// elle ne sera résolue qu'une seule fois, peu importe combien de composants l'utilisent.
const stripePromise = loadStripe(publishableKey);

export default stripePromise;
