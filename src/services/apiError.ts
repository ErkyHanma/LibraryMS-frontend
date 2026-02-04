export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  getUserMessage(): string {
    if (this.message) {
      return this.message;
    }

    switch (this.status) {
      case 400:
        return "Invalid request. Please check your input and try again.";
      case 401:
        return "You are not authorized to perform this action. Please sign in.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This resource already exists or conflicts with existing data.";
      case 422:
        return "The request was well-formed but contains validation errors.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
      case 502:
      case 503:
        return "Server error. Please try again later.";
      default:
        return "An unexpected error occurred.";
    }
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }
}
