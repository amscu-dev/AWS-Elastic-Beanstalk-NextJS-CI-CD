"use client";
import getQueryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools
        initialIsOpen={false} // Start with panel closed
        buttonPosition="bottom-right" // Position of toggle button
        position="right" // Position of panel
        client={queryClient} // Specify QueryClient (optional)
      />
    </QueryClientProvider>
  );
}
