"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type FC, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
