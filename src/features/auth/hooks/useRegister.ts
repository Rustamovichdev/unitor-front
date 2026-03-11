import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import type { RegisterPayload } from "../types/auth.types";
import { useAuthContext } from "../context/AuthContext";

export function useRegister() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });
}
