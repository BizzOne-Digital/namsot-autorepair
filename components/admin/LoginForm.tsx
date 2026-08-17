"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminRequestError, adminRequest } from "@/lib/admin/client";

interface LoginFormProps {
  /** Path the middleware redirected away from, restored after signing in. */
  redirectTo: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    setFormError(null);

    try {
      await adminRequest("/api/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      router.replace(redirectTo);
      // The dashboard is a server component tree, so it has to be re-rendered
      // with the new session cookie in place.
      router.refresh();
    } catch (error) {
      if (error instanceof AdminRequestError) {
        setErrors(error.details);
        setFormError(error.message);
      } else {
        setFormError("Sign-in failed. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      {formError ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {formError}
        </p>
      ) : null}

      <Input
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        error={errors.email}
        disabled={isSubmitting}
        onChange={(event) => setEmail(event.target.value)}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        error={errors.password}
        disabled={isSubmitting}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
