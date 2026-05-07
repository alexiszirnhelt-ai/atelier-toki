import { useToast } from "../context/toast-context";
import type { Toast as ToastType, ToastType as ToastKind } from "../types";

interface ToastProps {
  toast: ToastType;
  onClose: (id: number) => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const styles: Record<ToastKind, string> = {
    success: "bg-ink text-paper border-ink",
    error: "bg-clay text-paper border-clay",
    info: "bg-paper text-ink border-ink/20",
  };

  const icons: Record<ToastKind, string> = {
    success: "✓",
    error: "×",
    info: "·",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 px-5 py-4 border shadow-lg max-w-sm pointer-events-auto animate-slide-in ${styles[toast.type]}`}
    >
      <span className="font-serif text-lg leading-none mt-0.5">
        {icons[toast.type]}
      </span>
      <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-lg leading-none opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Fermer la notification"
      >
        ×
      </button>
    </div>
  );
}

function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}

export default Toaster;
