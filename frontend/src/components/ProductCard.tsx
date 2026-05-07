import { Link } from "react-router-dom";
import type { Product } from "../types";

const IMAGE_POSITIONS: Record<string, string> = {
  "bol-gres-emaille": "object-[center_80%]",
  "vase-onduleur-porcelaine": "object-[center_90%]",
  "mug-soleil-levant": "object-[center_90%]",
};

function ProductCard({ product }: { product: Product }) {
  const position = IMAGE_POSITIONS[product.slug] ?? "object-center";

  return (
    <Link to={`/boutique/${product.slug}`} className="group block">
      <div className="aspect-square overflow-hidden mb-4 bg-sand">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover ${position} group-hover:scale-105 transition-transform duration-700`}
        />
      </div>
      <h3 className="font-serif text-xl text-ink mb-1 group-hover:text-clay transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-ink-soft">{product.price.toFixed(2)} €</p>
    </Link>
  );
}

export default ProductCard;
