"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Field, FormBanner } from "@/components/auth/Field";
import { loginAction, type FormState } from "@/lib/actions/auth";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action] = useActionState<FormState, FormData>(loginAction, {});

  return (
    <form action={action} className="space-y-4">
      <FormBanner error={state.error} notice={state.notice} />

      {!configured && (
        <div className="rounded-[10px] border border-ochre/30 bg-ochre-soft/50 p-3 text-[12.5px] leading-relaxed text-ink-2">
          <span className="font-medium text-ink">Demo mode.</span> No database is configured, so
          sign-in is off and the app runs with sample data. See the deployment section of the
          README to switch on real accounts.
        </div>
      )}

      <Field
        label="Email" name="email" type="email" autoComplete="email" required autoFocus
        error={state.fieldErrors?.email}
      />
      <Field
        label="Password" name="password" type="password" autoComplete="current-password" required
        error={state.fieldErrors?.password}
      />

      <Submit disabled={!configured} />

      <p className="text-center text-[12.5px]">
        <Link href="/forgot-password" className="text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">
          Forgotten your password?
        </Link>
      </p>
    </form>
  );
}

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full size="lg" disabled={disabled || pending} className="mt-1">
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}
