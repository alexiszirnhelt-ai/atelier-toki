import { useState, useCallback } from "react";
import { ToastContext } from "./toast-context";

// Durée d'affichage par défaut en ms
const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Retire un toast par son id
  const removeToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  // Ajoute un toast et programme sa disparition
  const showToast = useCallback(
    (message, options = {}) => {
      const id = Date.now() + Math.random();
      const type = options.type || "info"; // 'success' | 'error' | 'info'
      const duration = options.duration ?? DEFAULT_DURATION;

      setToasts((previous) => [...previous, { id, message, type }]);

      // Programmation de la disparition automatique
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast],
  );

  // Helpers pratiques pour les types courants
  const value = {
    showToast,
    removeToast,
    toasts,
    success: (message, options) =>
      showToast(message, { ...options, type: "success" }),
    error: (message, options) =>
      showToast(message, { ...options, type: "error" }),
    info: (message, options) =>
      showToast(message, { ...options, type: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
