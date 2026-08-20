import { createHash, randomBytes } from "node:crypto";

/**
 * Opaque tokens for sessions, invites and password resets.
 *
 * The plaintext token is shown to the user exactly once (as a cookie or a link)
 * and only its SHA-256 digest is stored. A dump of the database therefore
 * cannot be replayed as a session or used to accept an invite.
 *
 * SHA-256 with no salt is correct here, unlike for passwords: these are 256-bit
 * random values, so there is nothing to brute force.
 */
export function createToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString("base64url");
  return { token, tokenHash: hashToken(token) };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
