"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getQueryClient } from "@/lib/getQueryClient";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <TooltipProvider>
        {children}
        <Toaster />
        <ReactQueryDevtools />
      </TooltipProvider>
    </QueryClientProvider>
  );
};
