import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { useRegister } from "../hooks/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/auth.schemas";

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const footerLink = useMemo(
    () => ({ to: "/login", label: "Already have an account? Sign in" }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const onSubmit = useCallback(
    (data: RegisterFormValues) => {
      registerMutation.mutate(
        {
          email: data.email,
          password: data.password,
          name: data.name || undefined,
        },
        {
          onSuccess: () => navigate("/", { replace: true }),
          onError: (err: { message?: string }) => {
            setError("root", {
              type: "manual",
              message:
                (err as { message?: string }).message ??
                "Registration failed. Please try again.",
            });
          },
        }
      );
    },
    [navigate, registerMutation, setError]
  );

  const handleFormSubmit = useMemo(
    () => handleSubmit(onSubmit),
    [handleSubmit, onSubmit]
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <AuthFormLayout
        title="Create an account"
        description="Enter your details to get started"
        footerLink={footerLink}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {errors.root && (
            <p className="text-sm text-destructive text-center">{errors.root.message}</p>
          )}
          <div className="space-y-2">
            <Label className="block mb-2.5 text-base" htmlFor="name">Name: (optional)</Label>
            <Input
              className="transition"
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register("name")}
            />
          </div>
          <div className="space-y-2">
            <Label className="block mb-2.5 text-base" htmlFor="email">Email:</Label>
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
            <Label className="block mb-2.5 text-base" htmlFor="password">Password:</Label>
            <Input
              className="transition"
              id="password"
              type="password"
              autoComplete="new-password"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="block mb-2.5 text-base" htmlFor="confirmPassword">Confirm password:</Label>
            <Input
              className="transition"
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </AuthFormLayout>
    </div>
  );
}
