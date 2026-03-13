import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schemas";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";
  const footerLink = useMemo(
    () => ({ to: "/register", label: "Don't have an account? Sign up" }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@gmail.com", password: "admin" },
  });

  const onSubmit = useCallback(
    (data: LoginFormValues) => {
      loginMutation.mutate(data, {
        onSuccess: () => navigate(from, { replace: true }),
        onError: (err: { message?: string; status?: number }) => {
          setError("root", {
            type: "manual",
            message:
              (err as { message?: string }).message ??
              "Invalid email or password. Please try again.",
          });
        },
      });
    },
    [from, loginMutation, navigate, setError]
  );

  const handleFormSubmit = useMemo(
    () => handleSubmit(onSubmit),
    [handleSubmit, onSubmit]
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <AuthFormLayout
        title="Sign in"
        description="Enter your credentials to access your gym CRM"
        footerLink={footerLink}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="block mb-2.5 text-base">Email:</Label>
            <Input
              className="transition"
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              {...register("email")}
              />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block mb-2.5 text-base">Password:</Label>
            <Input
              className="transition"
              id="password"
              type="password"
              autoComplete="current-password"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </AuthFormLayout>
    </div>
  );
}
