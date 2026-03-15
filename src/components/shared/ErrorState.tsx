import { useNavigate } from "react-router";
import { RefreshCw, ArrowLeft, Home, AlertCircle } from "lucide-react";

interface ErrorStateProps {
  status?: number | false;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showBack?: boolean;
  showHome?: boolean;
}

export function ErrorState({
  status,
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or contact support if the problem persists.",
  onRetry,
  showBack = true,
  showHome = false,
}: ErrorStateProps) {
  const navigate = useNavigate();

  const isStatusKnow = status === 404 || status === 500;

  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
        {/* Show status if well-known, otherwise show icon */}
        {isStatusKnow ? (
          <h1 className="text-destructive text-8xl leading-none font-bold md:text-9xl">
            {status}
          </h1>
        ) : (
          <AlertCircle
            className="text-destructive h-16 w-16"
            strokeWidth={1.5}
          />
        )}

        {/* Divider */}
        <div className="bg-destructive my-5 h-1 w-16 rounded-full md:my-7" />

        {/* Title */}
        <p className="text-foreground text-2xl font-bold md:text-3xl">
          {status === 404 ? "Not Found" : title}
        </p>

        {/* Message */}
        <p className="text-muted-foreground mt-4 max-w-sm text-sm md:text-base">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="bg-foreground text-background flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          )}

          {showHome && (
            <button
              onClick={() => navigate("/")}
              className="bg-foreground text-background flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
            >
              <Home className="h-4 w-4" />
              Return home
            </button>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="border-border hover:bg-muted text-foreground flex items-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
