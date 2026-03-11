import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthFormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  footerLink?: { to: string; label: string };
}

export function AuthFormLayout({
  title,
  description,
  children,
  footer,
  footerLink,
}: AuthFormLayoutProps) {
  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {(footer || footerLink) && (
        <CardFooter className="flex flex-col gap-2">
          {footer}
          {footerLink && (
            <p className="text-center text-sm text-muted-foreground">
              <Link
                to={footerLink.to}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {footerLink.label}
              </Link>
            </p>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
