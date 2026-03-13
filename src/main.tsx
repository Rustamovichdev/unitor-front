import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Routes } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
    </AuthProvider>
  </QueryClientProvider>
);
