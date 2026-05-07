import { useState, useCallback, type ReactNode } from "react";
import { ToastContext } from "./toast-context";
import type { Toast, ToastOptions } from "../types";

const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = Date.now() + Math.random();
      const type = options.type ?? "info";
      const duration = options.duration ?? DEFAULT_DURATION;

      setToasts((previous) => [...previous, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast],
  );

  const value = {
    showToast,
    removeToast,
    toasts,
    success: (message: string, options?: ToastOptions) =>
      showToast(message, { ...options, type: "success" }),
    error: (message: string, options?: ToastOptions) =>
      showToast(message, { ...options, type: "error" }),
    info: (message: string, options?: ToastOptions) =>
      showToast(message, { ...options, type: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
