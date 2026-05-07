import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useToast } from "../context/toast-context";

function PaymentForm({ orderId, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js n'est pas encore chargé, on bloque
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    // Confirmer le paiement avec Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // L'URL où Stripe redirigera après le paiement (succès ou échec)
        return_url: `${window.location.origin}/commande/${orderId}`,
      },
    });

    // Si on arrive ici, c'est qu'il y a eu une erreur
    // (en cas de succès, l'utilisateur est redirigé avant que ce code s'exécute)
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Une erreur inattendue est survenue.");
    }

    toast.error(error.message || "Le paiement a échoué.");
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Le formulaire de paiement Stripe */}
      <div className="mb-6">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-clay/10 border border-clay/30">
          <p className="text-sm text-clay">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="w-full px-8 py-4 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors disabled:bg-ink-soft disabled:cursor-not-allowed"
      >
        {submitting ? "Paiement en cours…" : `Payer ${totalPrice.toFixed(2)} €`}
      </button>

      <p className="text-xs text-ink-soft text-center mt-6 leading-relaxed">
        🔒 Paiement sécurisé via Stripe. Aucune donnée bancaire ne transite par
        notre serveur. Site fictif : utilisez la carte de test 4242 4242 4242
        4242.
      </p>
    </form>
  );
}

export default PaymentForm;
