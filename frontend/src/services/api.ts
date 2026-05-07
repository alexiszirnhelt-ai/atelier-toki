import {
  ApiError,
  type ContactRequest,
  type Order,
  type OrderCreateResponse,
  type OrderRequest,
  type Product,
} from "../types";

// Si VITE_API_URL est défini (ex: en prod), on l'utilise.
// Sinon on dérive de l'hôte courant — utile pour tester depuis un mobile sur le LAN.
const API_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:3000`;

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error(
      `Erreur ${response.status} lors de la récupération des produits.`,
    );
  }

  return response.json();
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
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

export async function sendContactMessage(
  data: ContactRequest,
): Promise<{ message: string; id: number }> {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(result.error || "Erreur lors de l'envoi.", {
      fields: result.fields ?? null,
      status: response.status,
    });
  }

  return result;
}

export async function createOrder(
  data: OrderRequest,
): Promise<OrderCreateResponse> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(result.error || "Erreur lors de la commande.", {
      fields: result.fields ?? null,
      status: response.status,
    });
  }

  return result;
}

export async function fetchOrderById(id: number | string): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Commande introuvable.");
    }
    throw new Error(
      `Erreur ${response.status} lors de la récupération de la commande.`,
    );
  }

  return response.json();
}
