import { Link } from "react-router-dom";
import { useCart } from "../context/cart-context";
import { useToast } from "../context/toast-context";

function Panier() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const toast = useToast();

  function handleRemoveItem(item) {
    removeItem(item.id);
    toast.info(`${item.name} retiré du panier.`);
  }

  function handleClearCart() {
    clearCart();
    toast.info("Panier vidé.");
  }
  // Panier vide
  if (items.length === 0) {
    return (
      <section className="bg-paper py-32 px-6 min-h-[600px]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-jp text-5xl text-ink-soft block mb-6">空</span>
          <h1 className="font-serif text-4xl text-ink mb-6">
            Votre panier est vide
          </h1>
          <p className="text-ink-soft leading-relaxed mb-10">
            Aucune création n'est encore venue le rejoindre. Découvrez nos
            pièces façonnées à la main.
          </p>
          <Link
            to="/boutique"
            className="inline-block px-8 py-3 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors"
          >
            Explorer la boutique
          </Link>
        </div>
      </section>
    );
  }

  // Panier non vide
  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Votre panier
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mt-4">
            {totalItems}{" "}
            {totalItems > 1 ? "pièces sélectionnées" : "pièce sélectionnée"}
          </h1>
        </div>
      </section>

      {/* PANIER */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Liste des items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-paper p-6 grid grid-cols-12 gap-4 items-center"
              >
                {/* Image */}
                <Link
                  to={`/boutique/${item.slug}`}
                  className="col-span-3 sm:col-span-2 aspect-square overflow-hidden bg-sand"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Infos */}
                <div className="col-span-9 sm:col-span-5">
                  <Link
                    to={`/boutique/${item.slug}`}
                    className="font-serif text-lg text-ink hover:text-clay transition-colors block mb-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-ink-soft">
                    {item.price.toFixed(2)} € l'unité
                  </p>
                </div>

                {/* Quantité */}
                <div className="col-span-7 sm:col-span-3 flex items-center border border-ink/20 w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-ink hover:bg-ink hover:text-paper transition-colors"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border-x border-ink/20 min-w-[2.5rem] text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-3 py-1 text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>

                {/* Sous-total + suppression */}
                <div className="col-span-5 sm:col-span-2 text-right">
                  <p className="font-serif text-lg text-ink mb-1">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-xs uppercase tracking-widest text-ink-soft hover:text-clay transition-colors"
                  >
                    Retirer
                  </button>
                </div>
              </article>
            ))}

            {/* Vider le panier */}
            <div className="text-right pt-4">
              <button
                onClick={handleClearCart}
                className="text-xs uppercase tracking-widest text-ink-soft hover:text-clay transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Récapitulatif */}
          <aside className="bg-paper p-8 h-fit">
            <h2 className="font-serif text-2xl text-ink mb-6">Récapitulatif</h2>

            <dl className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <dt className="text-ink-soft">Sous-total</dt>
                <dd className="text-ink">{totalPrice.toFixed(2)} €</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-soft">Livraison</dt>
                <dd className="text-ink">Calculée à l'étape suivante</dd>
              </div>
              <div className="flex justify-between text-base pt-3 border-t border-ink/10">
                <dt className="font-medium text-ink">Total</dt>
                <dd className="font-serif text-2xl text-ink">
                  {totalPrice.toFixed(2)} €
                </dd>
              </div>
            </dl>

            <Link
              to="/checkout"
              className="block w-full px-6 py-3 bg-ink text-paper text-sm uppercase tracking-widest text-center hover:bg-clay transition-colors mb-3"
            >
              Passer commande
            </Link>

            <Link
              to="/boutique"
              className="block text-center text-sm uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
              Continuer mes achats
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Panier;
