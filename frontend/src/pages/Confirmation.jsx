import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrderById } from "../services/api";
import { useCart } from "../context/cart-context";

function Confirmation() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchOrderById(id);
        setOrder(data);

        // Vider le panier maintenant qu'on est sur la page de confirmation
        // (le paiement a été traité par Stripe avant la redirection)
        clearCart();
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id, clearCart]);

  if (loading) {
    return (
      <section className="bg-paper min-h-[600px] flex items-center justify-center px-6">
        <p className="text-ink-soft uppercase tracking-widest text-sm">
          Chargement…
        </p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="bg-paper min-h-[600px] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="font-jp text-5xl text-clay block mb-6">×</span>
          <h1 className="font-serif text-3xl text-ink mb-4">
            Commande introuvable
          </h1>
          <p className="text-ink-soft mb-8">
            {error || "Cette commande n'existe pas."}
          </p>
          <Link
            to="/boutique"
            className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
          >
            Retour à la boutique
          </Link>
        </div>
      </section>
    );
  }

  // Date formatée en français
  const formattedDate = new Date(order.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* HERO REMERCIEMENT */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-jp text-5xl text-clay block mb-6">謝</span>
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Commande confirmée
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mt-4 mb-6 leading-tight">
            Merci, {order.customerName.split(" ")[0]}.
          </h1>
          <p className="text-ink-soft leading-relaxed">
            Votre commande{" "}
            <span className="font-medium text-ink">#{order.id}</span> a bien été
            enregistrée. Une confirmation a été envoyée à{" "}
            <span className="text-ink">{order.customerEmail}</span>.
          </p>
        </div>
      </section>

      {/* DÉTAIL DE LA COMMANDE */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-3xl mx-auto bg-paper p-8 md:p-12">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-8 pb-8 border-b border-ink/10">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                Numéro de commande
              </p>
              <p className="font-serif text-2xl text-ink">#{order.id}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                Date
              </p>
              <p className="text-sm text-ink">{formattedDate}</p>
            </div>
          </div>

          {/* Liste des items */}
          <div className="space-y-4 mb-8">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <Link
                    to={`/boutique/${item.productSlug}`}
                    className="font-serif text-lg text-ink hover:text-clay transition-colors"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-sm text-ink-soft mt-1">
                    {item.quantity} × {item.unitPrice.toFixed(2)} €
                  </p>
                </div>
                <p className="text-ink whitespace-nowrap">
                  {(item.quantity * item.unitPrice).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-6 border-t border-ink/10 flex justify-between items-baseline">
            <p className="text-sm uppercase tracking-widest text-ink-soft">
              Total payé
            </p>
            <p className="font-serif text-3xl text-ink">
              {order.totalAmount.toFixed(2)} €
            </p>
          </div>
        </div>
      </section>

      {/* SUITE */}
      <section className="bg-paper py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-ink mb-4">Et maintenant ?</h2>
          <p className="text-ink-soft leading-relaxed mb-10">
            Votre commande sera préparée à l'atelier dans les jours qui
            viennent. Comptez 3 à 5 jours ouvrés pour la livraison. Pour toute
            question, écrivez-nous.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/boutique"
              className="px-8 py-3 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors"
            >
              Continuer mes achats
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-ink text-ink text-sm uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
            >
              Une question ?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Confirmation;
