import { PrismaClient } from "@prisma/client";

/**
 * The app runs in two modes:
 *
 *   demo  — no DATABASE_URL. Progress lives in localStorage, the role switcher
 *           is available, and nothing is shared between people. This is how the
 *           project runs out of the box with no setup.
 *   live  — DATABASE_URL is set. Real accounts, real sessions, per-user data.
 *
 * Every auth entry point checks this, so a half-configured deployment fails
 * closed rather than silently letting people in.
 */
export const isDatabaseConfigured = () => Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

// Reuse the client across hot reloads so dev doesn't exhaust the pool.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
