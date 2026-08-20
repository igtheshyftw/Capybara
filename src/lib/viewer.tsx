"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Role } from "@/lib/types";

/**
 * Who is looking at the app right now.
 *
 * In demo mode this comes from the sample data and the role switcher can change
 * it freely. In live mode it comes from the session and is fixed.
 */
export interface Viewer {
  mode: "demo" | "live";
  role: Role;
  name: string;
  initials: string;
  email: string;
  /** StudentProfile id, when the viewer is a student. */
  studentId: string | null;
  orgName: string | null;
}

const ViewerContext = createContext<Viewer | null>(null);

export function ViewerProvider({ viewer, children }: { viewer: Viewer; children: ReactNode }) {
  return <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>;
}

export function useViewer(): Viewer {
  const v = useContext(ViewerContext);
  if (!v) throw new Error("useViewer must be used inside ViewerProvider");
  return v;
}
