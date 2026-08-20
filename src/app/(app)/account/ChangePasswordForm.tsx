"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Field, FormBanner } from "@/components/auth/Field";
import { changePasswordAction, type FormState } from "@/lib/actions/auth";

export function ChangePasswordForm() {
  const [state, action] = useActionState<FormState, FormData>(changePasswordAction, {});

  return (
    <form action={action} className="space-y-4">
      <FormBanner error={state.error} notice={state.notice} />
      <Field label="Current password" name="current" type="password" autoComplete="current-password" required error={state.fieldErrors?.current} />
      <Field label="New password" name="password" type="password" autoComplete="new-password" required error={state.fieldErrors?.password} hint="At least 10 characters, with a number or symbol." />
      <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" required error={state.fieldErrors?.confirm} />
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return <Button type="submit" full disabled={pending}>{pending ? "Saving…" : "Update password"}</Button>;
}
