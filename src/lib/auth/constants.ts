/**
 * Values shared with Edge middleware.
 *
 * Kept free of node: imports on purpose — middleware cannot load Node built-ins,
 * and importing session.ts there would drag in node:crypto and fail the build.
 */
export const SESSION_COOKIE = "cm_session";
