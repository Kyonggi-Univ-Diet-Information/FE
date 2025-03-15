import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeContainer } from "~/widgets/home/ui";

export default function HomePage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full flex-1">
        <HomeContainer />
      </div>
    </QueryClientProvider>
  );
}
