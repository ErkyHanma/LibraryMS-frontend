import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showBack?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  showBack = true,
}: ErrorStateProps) {
  const navigate = useNavigate();

  return (
    <main className="mt-30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-16 w-16 text-red-600" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h1>

          <p className="mb-8 text-center text-lg text-gray-600">{message}</p>

          <div className="flex w-full max-w-112.5 flex-col gap-2">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-100"
              >
                <ArrowLeft className="h-5 w-5" />
                Go back
              </button>
            )}

            {onRetry && (
              <Button variant="outline" onClick={onRetry} className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}