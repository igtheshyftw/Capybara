"use client";

import { useId } from "react";

export function Field({
  label, name, type = "text", autoComplete, required, error, defaultValue, readOnly, hint, autoFocus,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  readOnly?: boolean;
  hint?: string;
  autoFocus?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        readOnly={readOnly}
        autoFocus={autoFocus}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`h-11 w-full rounded-[10px] border bg-surface px-3 text-[14px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink ${
          error ? "border-wrong" : "border-line-strong"
        } ${readOnly ? "text-ink-2" : ""}`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12.5px] text-wrong">{error}</p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[12.5px] text-ink-3">{hint}</p>
      ) : null}
    </div>
  );
}

export function FormBanner({ error, notice }: { error?: string; notice?: string }) {
  if (!error && !notice) return null;
  return (
    <div
      role={error ? "alert" : "status"}
      className={`mb-5 rounded-[10px] border p-3 text-[13px] leading-relaxed ${
        error ? "border-wrong/35 bg-wrong-soft/60 text-ink" : "border-sage/30 bg-sage-soft/60 text-ink"
      }`}
    >
      <span className="whitespace-pre-wrap break-words">{error ?? notice}</span>
    </div>
  );
}
