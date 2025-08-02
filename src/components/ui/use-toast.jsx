import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Create a context for toast notifications
const ToastContext = createContext()

// Toast provider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Function to add a new toast
  const toast = ({ title, description, duration = 3000 }) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, title, description, duration }])
  }

  // Function to dismiss a toast
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }
  
  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Toast component
const Toast = ({ id, title, description, duration, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  return (
    <div
      className="luxury-toast bg-card text-card-foreground rounded-lg shadow-lg p-4 max-w-sm w-full border border-accent/20 animate-slide-in"
    >
      {title && (
        <div className="luxury-font-heading font-semibold text-lg mb-1">
          {title}
        </div>
      )}
      {description && (
        <div className="luxury-font-body text-sm text-muted-foreground">
          {description}
        </div>
      )}
      <button
        className="absolute top-2 right-2 text-muted-foreground hover:text-accent"
        onClick={onDismiss}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// CSS for animations
const styles = `
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}