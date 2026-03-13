import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { Icons } from "@/utils/icons";

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
    <div className="min-h-svh flex flex-col pr-[60px]">
      <header className="border-b bg-card flex justify-end pt-[26px] pb-[44px]">
           <div className="flex gap-[26px]">
            <button>
                 language
            </button>

             <Link to={"/setting"}>
               <Icons.settingIcon/>
             </Link>
             <Link to={"/setting"}>
               <Icons.settingIcon/>
             </Link>
           </div>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
