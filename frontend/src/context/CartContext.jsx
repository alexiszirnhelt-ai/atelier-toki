import { useState, useEffect, useCallback, useMemo } from "react";
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

  const addItem = useCallback((product, quantity = 1) => {
    setItems((previousItems) => {
      const existing = previousItems.find((item) => item.id === product.id);

      if (existing) {
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }

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
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId, newQuantity) => {
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
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
