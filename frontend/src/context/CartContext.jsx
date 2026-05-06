import { useState, useEffect } from "react";
import { CartContext } from "./cart-context";

// Clé utilisée pour le localStorage
const STORAGE_KEY = "atelier-toki-cart";

// 2. Le Provider : englobe l'app et fournit le state
export function CartProvider({ children }) {
  // On initialise depuis le localStorage, ou vide si rien
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // À chaque modification du panier, on synchronise le localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Erreur sauvegarde panier:", err);
    }
  }, [items]);

  // Ajouter un produit au panier
  function addItem(product, quantity = 1) {
    setItems((previousItems) => {
      // Le produit est-il déjà dans le panier ?
      const existing = previousItems.find((item) => item.id === product.id);

      if (existing) {
        // Oui : on incrémente la quantité (en respectant le stock)
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }

      // Non : on ajoute un nouvel item
      return [
        ...previousItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  }

  // Retirer complètement un produit
  function removeItem(productId) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    );
  }

  // Modifier la quantité d'un produit
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item,
      ),
    );
  }

  // Vider le panier
  function clearCart() {
    setItems([]);
  }

  // Valeurs dérivées (calculées depuis items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Tout ce qu'on expose aux composants enfants
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
