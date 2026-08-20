"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Field, FormBanner } from "@/components/auth/Field";
import { Icon } from "@/components/ui/Icon";
import { createInviteAction } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";

export function InviteForm({
  canInviteStaff, classes, students,
}: {
  canInviteStaff: boolean;
  classes: { id: string; name: string }[];
  students: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<FormState, FormData>(createInviteAction, {});
  const [role, setRole] = useState("STUDENT");
  const [copied, setCopied] = useState(false);

  // The action returns the one-time link in its notice; pull it out so it can be copied.
  const link = state.notice?.match(/https?:\S+|\/invite\/\S+/)?.[0];

  const roles = canInviteStaff
    ? [["STUDENT", "Student"], ["PARENT", "Parent"], ["TEACHER", "Teacher"], ["ADMIN", "Administrator"]]
    : [["STUDENT", "Student"], ["PARENT", "Parent"]];

  return (
    <Card>
      <CardHeader
        eyebrow="Invite" title="Add someone"
        description="They receive a one-time link and choose their own password. You never see or set it."
      />

      <form action={action} className="mt-5 space-y-4">
        {state.error && <FormBanner error={state.error} />}

        <div>
          <span className="mb-1.5 block text-[13px] font-medium text-ink">Role</span>
          <div className="flex flex-wrap gap-1.5">
            {roles.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                aria-pressed={role === value}
                className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  role === value
                    ? "border-ink bg-ink text-ink-inv"
                    : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <input type="hidden" name="role" value={role} />
        </div>

        <Field label="Their name" name="name" required error={state.fieldErrors?.name} />
        <Field label="Their email" name="email" type="email" required error={state.fieldErrors?.email} />

        {role === "STUDENT" && classes.length > 0 && (
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink">Add to a class (optional)</span>
            <select
              name="classId"
              className="h-11 w-full appearance-none rounded-[10px] border border-line-strong bg-surface px-3 text-[14px] outline-none focus:border-ink"
            >
              <option value="">No class</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        )}

        {role === "PARENT" && students.length > 0 && (
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink">Link to a child</span>
            <select
              name="childId"
              className="h-11 w-full appearance-none rounded-[10px] border border-line-strong bg-surface px-3 text-[14px] outline-none focus:border-ink"
            >
              <option value="">Link later</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <span className="mt-1.5 block text-[12.5px] text-ink-3">
              This is the only thing that grants a parent access to a student.
            </span>
          </label>
        )}

        <Submit />
      </form>

      {link && (
        <div className="mt-5 rounded-[11px] border border-sage/30 bg-sage-soft/50 p-3.5">
          <p className="text-[13px] font-medium text-ink">Invite created.</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
            Send them this link. It works once and expires in 14 days.
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-[7px] border border-line bg-surface px-2.5 py-2 text-[12px] text-ink">
              {link}
            </code>
            <Button
              type="button" size="sm" variant="secondary"
              onClick={() => {
                navigator.clipboard?.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Icon name={copied ? "check" : "note"} size={14} />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full disabled={pending} icon="send">
      {pending ? "Creating invite…" : "Create invite"}
    </Button>
  );
}
