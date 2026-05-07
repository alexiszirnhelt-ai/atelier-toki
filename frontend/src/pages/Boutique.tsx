import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

function Boutique() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-jp text-4xl text-ink-soft block mb-6">器</span>
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Boutique
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mt-4 leading-tight">
            Nos créations
          </h1>
          <p className="text-ink-soft leading-relaxed mt-8 max-w-xl mx-auto">
            Trois pièces, façonnées à la main dans notre atelier de Nancy.
            Chaque création est unique.
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="bg-sand py-24 px-6 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          {/* État : chargement */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-ink-soft uppercase tracking-widest text-sm">
                Chargement des créations…
              </p>
            </div>
          )}

          {/* État : erreur */}
          {error && !loading && (
            <div className="text-center py-20 max-w-md mx-auto">
              <span className="font-jp text-4xl text-clay block mb-6">x</span>
              <p className="font-serif text-2xl text-ink mb-4">
                Quelque chose s'est mal passé
              </p>
              <p className="text-ink-soft mb-8">{error}</p>
              <p className="text-sm text-ink-soft">
                Vérifiez que le serveur backend tourne sur le port 3000.
              </p>
            </div>
          )}

          {/* État : succès */}
          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Boutique;
