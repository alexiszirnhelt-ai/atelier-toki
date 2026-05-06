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

/**
 * Envoie un message de contact.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<Object>} la réponse du serveur
 * @throws {Error} avec une propriété `fields` si erreurs de validation
 */
export async function sendContactMessage(data) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    // Erreur de validation : on enrichit l'erreur avec les détails par champ
    const error = new Error(result.error || "Erreur lors de l'envoi.");
    error.fields = result.fields || null;
    error.status = response.status;
    throw error;
  }

  return result;
}
