"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Field, FormBanner } from "@/components/auth/Field";
import { requestResetAction, type FormState } from "@/lib/actions/auth";

export function ForgotForm() {
  const [state, action] = useActionState<FormState, FormData>(requestResetAction, {});

  return (
    <form action={action} className="space-y-4">
      <FormBanner error={state.error} notice={state.notice} />
      <Field label="Email" name="email" type="email" autoComplete="email" required autoFocus error={state.fieldErrors?.email} />
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full size="lg" disabled={pending} className="mt-1">
      {pending ? "Sending…" : "Send reset link"}
    </Button>
  );
}
