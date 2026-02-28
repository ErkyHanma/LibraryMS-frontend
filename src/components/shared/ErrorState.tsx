import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface ErrorStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  actionLabel = "Try again",
  onAction,
}: ErrorStateProps) {
  const navigate = useNavigate();

  return (
    <main className="mt-30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className={`rounded-full bg-red-100 p-4`}>
              <AlertCircle
                className={`h-16 w-16 text-red-600`}
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h1>

          <p className="mb-8 text-center text-lg text-gray-600">{message}</p>

          <button
            onClick={() => navigate(-1)}
            className="bg-primary-600 flex w-full max-w-112.5 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-100"
          >
            <ArrowLeft className="h-5 w-5" />
            Go back
          </button>

          {onAction && (
            <button
              onClick={onAction}
              className="mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </main>

    // <div className="flex min-h-75 flex-col items-center justify-center gap-4  border-red-200 bg-red-50 p-6 text-center">
    //   <AlertCircle className="h-10 w-10 text-red-600" />

    //   <h2 className="text-lg font-semibold text-red-800">{title}</h2>

    //   <p className="max-w-md text-sm text-red-700">{message}</p>

    // {onAction && (
    //   <button
    //     onClick={onAction}
    //     className="mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    //   >
    //     {actionLabel}
    //   </button>
    // )}
    // </div>
  );
}
