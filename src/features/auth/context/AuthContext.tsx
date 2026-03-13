import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { storage } from "@/utils/storage";
import { authApi } from "../services/authApi";
import { clearTokens, getAccessToken } from "@/services/api";
import type { User } from "../types/auth.types";

const USER_STORAGE_KEY = "unitor_user";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() =>
    storage.getItem<User>(USER_STORAGE_KEY)
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) {
      storage.setItem(USER_STORAGE_KEY, u);
    } else {
      storage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setIsInitialized(true);
      return;
    }
    if (user) {
      setIsInitialized(true);
      return;
    }
    authApi
      .getMe()
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => {
        setIsInitialized(true);
      });
  }, []);

  useEffect(() => {
    const handleLogout = () => setUser(null);
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [setUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: true,
      isInitialized,
      setUser,
      logout,
    }),
    [user, isInitialized, setUser, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
