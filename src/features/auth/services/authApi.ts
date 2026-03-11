/**
 * Auth API service. Integrates with TanStack Query via hooks.
 */

import { api, setTokens, clearTokens } from "@/services/api";
import type { AuthResponse, LoginCredentials, RegisterPayload } from "../types/auth.types";

const AUTH_BASE = "/auth";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>(`${AUTH_BASE}/login`, credentials, {
      skipAuth: true,
    });
    setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>(`${AUTH_BASE}/register`, payload, {
      skipAuth: true,
    });
    setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post(`${AUTH_BASE}/logout`, undefined, { skipAuth: false });
    } finally {
      clearTokens();
    }
  },

  async getMe(): Promise<AuthResponse["user"]> {
    return api.get<AuthResponse["user"]>(`${AUTH_BASE}/me`);
  },
};
