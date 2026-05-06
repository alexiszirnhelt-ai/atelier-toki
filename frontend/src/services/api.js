const API_URL = import.meta.env.VITE_API_URL;

/**
 * Récupère tous les produits.
 * @returns {Promise<Array>} liste de produits
 */
export async function fetchProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error(
      `Erreur ${response.status} lors de la récupération des produits.`,
    );
  }

  return response.json();
}

/**
 * Récupère un produit par son slug.
 * @param {string} slug
 * @returns {Promise<Object>} le produit
 */
export async function fetchProductBySlug(slug) {
  const response = await fetch(`${API_URL}/api/products/${slug}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Produit introuvable.");
    }
    throw new Error(
      `Erreur ${response.status} lors de la récupération du produit.`,
    );
  }

  return response.json();
}
