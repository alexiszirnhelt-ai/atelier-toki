import { createContext, useContext } from "react";
import type { ToastContextValue } from "../types";

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit être utilisé dans un <ToastProvider>");
  }
  return context;
}
