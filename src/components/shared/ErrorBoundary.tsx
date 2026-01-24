import { AlertCircle, ArrowLeft } from "lucide-react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className={`rounded-full bg-red-100 p-4`}>
              <AlertCircle
                className={`h-16 w-16 text-red-600`}
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="mb-4 text-center text-6xl font-bold text-gray-900">
            {message}
          </h1>

          <p className="mb-8 text-center text-lg text-gray-600">{details}</p>

          {stack && (
            <pre className="w-full overflow-x-auto p-4">
              <code>{stack}</code>
            </pre>
          )}

          <button
            onClick={() => navigate(-1)}
            className="bg-primary-600 flex w-full max-w-112.5 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-100"
          >
            <ArrowLeft className="h-5 w-5" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

export default ErrorBoundary;
