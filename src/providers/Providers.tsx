"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type FC, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <NextTopLoader showSpinner={false} color="#008236" />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
