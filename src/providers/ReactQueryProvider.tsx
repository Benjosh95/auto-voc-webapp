import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryProvider({ children }: React.PropsWithChildren) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
