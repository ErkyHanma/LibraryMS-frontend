import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();

  let status: number | undefined;
  let title = "Something went wrong";
  let details =
    "An unexpected error occurred. Please try again or contact support if the problem persists.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title =
      error.status === 404
        ? "Page not found"
        : error.status === 403
          ? "Access denied"
          : error.status === 500
            ? "Server error"
            : error.statusText || title;
    details =
      error.status === 404
        ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        : error.status === 403
          ? "You don't have permission to access this page."
          : error.status === 500
            ? "The server encountered an error. Please try again later."
            : details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const isStatusKnow = status === 404 || status === 500;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
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

        <div className="bg-destructive my-5 h-1 w-16 rounded-full md:my-7" />

        <p className="text-foreground text-2xl font-bold md:text-3xl">
          {title}
        </p>

        <p className="text-muted-foreground mt-4 max-w-sm text-sm md:text-base">
          {details}
        </p>

        {stack && (
          <pre className="bg-muted text-muted-foreground mt-6 w-full overflow-x-auto rounded-lg p-4 text-left text-xs">
            <code>{stack}</code>
          </pre>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-foreground text-background flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="border-border hover:bg-muted text-foreground flex items-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95"
          >
            <Home className="h-4 w-4" />
            Return home
          </button>

          {status && status >= 500 && (
            <button
              onClick={() => window.location.reload()}
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

export default ErrorBoundary;
