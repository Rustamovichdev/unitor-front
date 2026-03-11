import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";

/**
 * Layout for auth pages (login, register).
 * Redirects to dashboard if user is already authenticated.
 */
export function AuthLayout() {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (!isInitialized) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
