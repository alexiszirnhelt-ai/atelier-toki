import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../context/cart-context";
import { useToast } from "../context/toast-context";
import { createOrder } from "../services/api";
import stripePromise from "../lib/stripe";
import PaymentForm from "../components/PaymentForm";

function Checkout() {
  const { items, totalPrice, totalItems } = useCart();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // États pour les étapes
  const [step, setStep] = useState("customer"); // 'customer' | 'payment'
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  // Données reçues du backend après création de la commande
  const [paymentData, setPaymentData] = useState(null);
  // { orderId, clientSecret }

  // Si le panier est vide, redirection
  if (items.length === 0) {
    return <Navigate to="/boutique" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: null }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Veuillez indiquer votre nom.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Veuillez indiquer votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Cet email ne semble pas valide.";
    }

    return newErrors;
  }

  async function handleCustomerSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
        },
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await createOrder(orderData);

      // On stocke les infos de paiement et on passe à l'étape 2
      setPaymentData({
        orderId: result.orderId,
        clientSecret: result.clientSecret,
      });
      setStep("payment");
    } catch (err) {
      console.error("Erreur création commande:", err);

      if (err.fields) {
        const mapped = {};
        if (err.fields.customerName) mapped.name = err.fields.customerName;
        if (err.fields.customerEmail) mapped.email = err.fields.customerEmail;
        if (err.fields.items) mapped.global = err.fields.items;
        setErrors(mapped);
        if (mapped.global) setServerError(mapped.global);
        toast.error("Veuillez corriger les erreurs.");
      } else {
        const message = err.message || "Une erreur est survenue. Réessayez.";
        setServerError(message);
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Configuration de l'apparence Stripe Elements (couleurs cohérentes avec notre design)
  const stripeOptions = paymentData
    ? {
        clientSecret: paymentData.clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#1A1816",
            colorBackground: "#F7F4EE",
            colorText: "#1A1816",
            colorDanger: "#A8543A",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSizeBase: "14px",
            spacingUnit: "4px",
            borderRadius: "0px",
          },
        },
      }
    : null;

  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/panier"
            className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
          >
            ← Retour au panier
          </Link>
          <span className="block text-xs uppercase tracking-widest text-ink-soft mt-8">
            Finaliser la commande
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mt-4">
            {step === "customer" ? "Vos coordonnées" : "Paiement"}
          </h1>

          {/* Indicateur d'étape */}
          <div className="flex items-center gap-3 mt-6 text-xs uppercase tracking-widest">
            <span
              className={
                step === "customer" ? "text-ink font-medium" : "text-ink-soft"
              }
            >
              1. Coordonnées
            </span>
            <span className="text-ink-soft">/</span>
            <span
              className={
                step === "payment" ? "text-ink font-medium" : "text-ink-soft"
              }
            >
              2. Paiement
            </span>
          </div>
        </div>
      </section>

      {/* FORMULAIRE + RÉCAP */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* COLONNE GAUCHE : formulaire selon l'étape */}
          <div className="lg:col-span-2 bg-paper p-8 md:p-12">
            {step === "customer" && (
              <form onSubmit={handleCustomerSubmit} noValidate>
                {serverError && (
                  <div className="mb-6 p-4 bg-clay/10 border border-clay/30">
                    <p className="text-sm text-clay">{serverError}</p>
                  </div>
                )}

                <h2 className="font-serif text-2xl text-ink mb-2">
                  Pour la livraison
                </h2>
                <p className="text-sm text-ink-soft mb-8">
                  Une confirmation vous sera envoyée par email. Site fictif :
                  aucune commande réelle ne sera traitée.
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 ${
                      errors.name ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-clay text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 ${
                      errors.email ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-clay text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors disabled:bg-ink-soft disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Préparation du paiement…"
                    : "Continuer vers le paiement"}
                </button>
              </form>
            )}

            {step === "payment" && paymentData && (
              <>
                <button
                  onClick={() => {
                    setStep("customer");
                    setPaymentData(null);
                  }}
                  className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink transition-colors mb-6"
                >
                  ← Modifier mes coordonnées
                </button>

                <h2 className="font-serif text-2xl text-ink mb-2">
                  Moyen de paiement
                </h2>
                <p className="text-sm text-ink-soft mb-8">
                  Bonjour{" "}
                  <span className="text-ink font-medium">
                    {formData.name.split(" ")[0]}
                  </span>
                  , saisissez votre carte ci-dessous pour finaliser votre
                  commande.
                </p>

                <Elements stripe={stripePromise} options={stripeOptions}>
                  <PaymentForm
                    orderId={paymentData.orderId}
                    totalPrice={totalPrice}
                  />
                </Elements>
              </>
            )}
          </div>

          {/* RÉCAPITULATIF */}
          <aside className="bg-paper p-8 h-fit">
            <h2 className="font-serif text-xl text-ink mb-6">Votre commande</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-ink/10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="w-16 h-16 bg-sand overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-ink leading-tight mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {item.quantity} × {item.price.toFixed(2)} €
                    </p>
                  </div>
                  <p className="text-sm text-ink whitespace-nowrap">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>

            <dl className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <dt className="text-ink-soft">Articles</dt>
                <dd className="text-ink">{totalItems}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-soft">Sous-total</dt>
                <dd className="text-ink">{totalPrice.toFixed(2)} €</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-soft">Livraison</dt>
                <dd className="text-ink">Offerte</dd>
              </div>
            </dl>

            <div className="flex justify-between pt-4 border-t border-ink/10">
              <p className="font-medium text-ink">Total</p>
              <p className="font-serif text-2xl text-ink">
                {totalPrice.toFixed(2)} €
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Checkout;
