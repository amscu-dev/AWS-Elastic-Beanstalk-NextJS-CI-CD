"use client";
import { isAppError } from "@/utils/handleApiError";
import { FallbackProps } from "react-error-boundary";

export default function PostErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const is404 =
    isAppError(error) &&
    error.kind === "axios" &&
    error.error.response?.status === 404;

  if (is404) return <div>Post not found.</div>;

  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
