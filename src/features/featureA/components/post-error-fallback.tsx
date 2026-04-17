"use client";
import { FallbackProps } from "react-error-boundary";
import { isAxiosError } from "axios";

import { ApiErrorResponse } from "@/types/api.types";

export default function PostErrorFallback({
  resetErrorBoundary,
  error,
}: FallbackProps) {
  const is404 =
    isAxiosError<ApiErrorResponse>(error) && error.response?.status === 404;

  if (is404) return <div>Post not found.</div>;

  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
