import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../services/api";
import { useCart } from "../context/cart-context";
import { useToast } from "../context/toast-context";
import type { Product } from "../types";

const IMAGE_POSITIONS: Record<string, string> = {
  "bol-gres-emaille": "object-[center_80%]",
  "vase-onduleur-porcelaine": "object-[center_90%]",
  "mug-soleil-levant": "object-[center_90%]",
};

function Produit() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const toast = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;

    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductBySlug(slug!);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  // État : chargement
  if (loading) {
    return (
      <section className="bg-paper min-h-[600px] flex items-center justify-center px-6">
        <p className="text-ink-soft uppercase tracking-widest text-sm">
          Chargement…
        </p>
      </section>
    );
  }

  // État : erreur ou produit non trouvé
  if (error || !product) {
    return (
      <section className="bg-paper min-h-[600px] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="font-jp text-5xl text-clay block mb-6">×</span>
          <h1 className="font-serif text-3xl text-ink mb-4">
            Création introuvable
          </h1>
          <p className="text-ink-soft mb-8">
            {error || "Cette pièce n'existe pas ou n'est plus disponible."}
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

  // État : succès
  const inStock = product.stock > 0;

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(product!.stock, q + 1));
  }

  function handleAddToCart() {
    addItem(product!, quantity);
    toast.success(
      `${quantity} × ${product!.name} ajouté${quantity > 1 ? "s" : ""} au panier.`,
    );
  }

  return (
    <>
      {/* FIL D'ARIANE */}
      <section className="bg-paper pt-12 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs uppercase tracking-widest text-ink-soft">
            <Link to="/" className="hover:text-ink transition-colors">
              Accueil
            </Link>
            <span className="mx-3">/</span>
            <Link to="/boutique" className="hover:text-ink transition-colors">
              Boutique
            </Link>
            <span className="mx-3">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* PRODUIT */}
      <section className="bg-paper py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* IMAGE */}
          <div className="aspect-square overflow-hidden bg-sand">
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover ${IMAGE_POSITIONS[product.slug] ?? "object-center"}`}
            />
          </div>

          {/* INFOS */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              Création unique
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-ink mt-4 mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="font-serif text-3xl text-ink mb-8">
              {product.price.toFixed(2)} €
            </p>

            <p className="text-ink-soft leading-relaxed mb-8">
              {product.description}
            </p>

            {/* STATUT STOCK */}
            <div className="mb-8">
              {inStock ? (
                <p className="text-sm text-ink-soft">
                  <span className="inline-block w-2 h-2 bg-clay rounded-full mr-2 align-middle"></span>
                  En stock — {product.stock}{" "}
                  {product.stock > 1
                    ? "pièces disponibles"
                    : "pièce disponible"}
                </p>
              ) : (
                <p className="text-sm text-ink-soft">
                  Épuisé — nous écrire pour une commande sur mesure
                </p>
              )}
            </div>

            {inStock && (
              <>
                {/* QUANTITÉ */}
                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-widest text-ink-soft mb-3">
                    Quantité
                  </label>
                  <div className="flex items-center border border-ink/20 w-fit">
                    <button
                      onClick={decrement}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-medium border-x border-ink/20 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increment}
                      disabled={quantity >= product.stock}
                      className="px-4 py-2 text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  className="w-full md:w-auto px-12 py-4 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors"
                >
                  Ajouter au panier
                </button>
              </>
            )}

            {/* INFOS COMPLÉMENTAIRES */}
            <div className="mt-12 pt-8 border-t border-ink/10 space-y-4 text-sm text-ink-soft">
              <p>
                <span className="text-ink font-medium">Livraison :</span> 3 à 5
                jours en France métropolitaine
              </p>
              <p>
                <span className="text-ink font-medium">Emballage :</span>{" "}
                matériaux recyclables, fait main
              </p>
              <p>
                <span className="text-ink font-medium">Entretien :</span> lavage
                à la main recommandé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RETOUR BOUTIQUE */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link
            to="/boutique"
            className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
          >
            ← Voir toutes les créations
          </Link>
        </div>
      </section>
    </>
  );
}

export default Produit;
