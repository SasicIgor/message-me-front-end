import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

export const defaultOpt: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      refetchOnWindowFocus: false,
    
    },

  },
};

export const client = new QueryClient(defaultOpt);
