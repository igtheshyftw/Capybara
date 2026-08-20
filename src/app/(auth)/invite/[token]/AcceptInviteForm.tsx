"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Field, FormBanner } from "@/components/auth/Field";
import { acceptInviteAction, type FormState } from "@/lib/actions/auth";

export function AcceptInviteForm({ token, email, name }: { token: string; email: string; name: string }) {
  const [state, action] = useActionState<FormState, FormData>(acceptInviteAction, {});

  return (
    <form action={action} className="space-y-4">
      <FormBanner error={state.error} notice={state.notice} />
      <input type="hidden" name="token" value={token} />

      <Field
        label="Email" name="email" defaultValue={email} readOnly
        hint="Your account is tied to this address."
      />
      <Field
        label="Your name" name="name" defaultValue={name} required autoComplete="name"
        error={state.fieldErrors?.name}
      />
      <Field
        label="Choose a password" name="password" type="password" autoComplete="new-password" required
        error={state.fieldErrors?.password}
        hint="At least 10 characters, with a number or symbol."
      />
      <Field
        label="Confirm password" name="confirm" type="password" autoComplete="new-password" required
        error={state.fieldErrors?.confirm}
      />

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full size="lg" disabled={pending} className="mt-1">
      {pending ? "Creating your account…" : "Create account"}
    </Button>
  );
}
