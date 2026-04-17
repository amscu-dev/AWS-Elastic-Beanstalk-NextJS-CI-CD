import {
  QueryClientConfig,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ZodError } from "zod";

import { ApiErrorResponse } from "@/types/api.types";

// Jitter Strategy
// Docs: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
const decorrelatedRetryDelay = (attemptIndex: number) => {
  const base = Math.min(1000 * 2 ** attemptIndex, 30_000);
  // eslint-disable-next-line sonarjs/pseudo-random -- no need for check
  return Math.random() * base;
};

const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof ZodError) return false;

  if (isAxiosError<ApiErrorResponse>(error)) {
    const { code } = error;
    const status = error.response?.status;

    if (code === "ERR_NETWORK" || code === "ECONNABORTED" || !error.response)
      return false;
    if (status && status >= 400 && status < 500) return false;
  }

  return failureCount < 3;
};

const handleError = (error: unknown): void => {
  if (error instanceof ZodError) {
    console.error(`Validation error: ${error.message}`);
    return;
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data.message ?? error.message;
    console.error(message);
    return;
  }

  console.error("Unknown error");
};

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retryDelay: decorrelatedRetryDelay,
      staleTime: 5 * 1000,
      retry: shouldRetry,
    },

    mutations: {
      retryDelay: decorrelatedRetryDelay,
      retry: shouldRetry,
    },
  },
  mutationCache: new MutationCache({
    // Global onErrorHandler for useQuery
    onError: handleError,
  }),
  queryCache: new QueryCache({
    // Global onErrorHandler for useQuery
    onError: handleError,
  }),
};

export default queryClientConfig;
