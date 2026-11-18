import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = "" }) => {
  return (
    <div className={cn("flex flex-col items-center gap-3 p-6 text-center", className)} role="alert">
      <AlertTriangle className="h-8 w-8 text-brand-secondary" />
      <p className="text-brand-text/75 text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="wp-btn-secondary px-4 py-2 text-sm">
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
