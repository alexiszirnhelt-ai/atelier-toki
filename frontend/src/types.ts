// Types métier partagés dans toute l'app

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

// Un item du panier : un sous-ensemble du Product + quantity
export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  quantity: number;
}

export interface OrderItem {
  productName: string;
  productSlug: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: "pending" | "paid" | "failed" | "shipped" | "delivered";
  createdAt: string;
  items: OrderItem[];
}

// Données envoyées par le formulaire de checkout
export interface OrderRequest {
  customer: {
    name: string;
    email: string;
  };
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

// Réponse du backend après création d'une commande Stripe
export interface OrderCreateResponse {
  orderId: number;
  clientSecret: string;
}

// Données envoyées par le formulaire de contact
export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Erreur d'API enrichie : peut porter des erreurs par champ
export class ApiError extends Error {
  fields: Record<string, string> | null;
  status: number;

  constructor(
    message: string,
    options: { fields?: Record<string, string> | null; status: number },
  ) {
    super(message);
    this.name = "ApiError";
    this.fields = options.fields ?? null;
    this.status = options.status;
  }
}

// Toast
export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

// Valeur exposée par CartContext
export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Valeur exposée par ToastContext
export interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, options?: ToastOptions) => number;
  removeToast: (id: number) => void;
  success: (message: string, options?: ToastOptions) => number;
  error: (message: string, options?: ToastOptions) => number;
  info: (message: string, options?: ToastOptions) => number;
}
