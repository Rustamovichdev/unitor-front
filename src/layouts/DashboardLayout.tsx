import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/features/auth/context/AuthContext";

/**
 * Main app layout for authenticated users.
 * Placeholder structure; extend with sidebar, header, etc. for full CRM.
 */
export function DashboardLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-svh flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/" className="font-semibold">
            Unitor Gym CRM
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
