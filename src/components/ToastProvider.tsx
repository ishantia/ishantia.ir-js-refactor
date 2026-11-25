import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

type ToastVariant = "success" | "info" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
      window.setTimeout(() => {
        dismiss(id);
      }, 3200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-sm:inset-x-4 max-sm:bottom-4"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const Icon =
              toast.variant === "success"
                ? CheckCircle2
                : toast.variant === "error"
                  ? AlertCircle
                  : Info;
            const iconColor =
              toast.variant === "success"
                ? "text-emerald-400"
                : toast.variant === "error"
                  ? "text-rose-400"
                  : "text-indigo-400";

            return (
              <m.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-2xl backdrop-blur-xl"
              >
                <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                <span className="flex-1">{toast.message}</span>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="rounded-md p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
