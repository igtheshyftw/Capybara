import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from "node:crypto";

/** promisify drops scrypt's options overload, so wrap it by hand. */
const scrypt = (password: string | Buffer, salt: Buffer, keylen: number, options: ScryptOptions) =>
  new Promise<Buffer>((resolve, reject) =>
    scryptCb(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key))),
  );

/**
 * scrypt from Node's standard library, at OWASP-recommended work factors.
 *
 * Chosen over bcrypt/argon2 deliberately: it is in core, so there is no native
 * module to fail to build on a host, and no third-party dependency in the path
 * of every sign-in. N=2^16 costs roughly 64 MB and ~100 ms per hash, which is
 * painful to brute force and unnoticeable on a login.
 *
 * Stored format: scrypt$N$r$p$<salt-hex>$<key-hex>
 * The parameters travel with the hash, so they can be raised later without
 * invalidating existing passwords.
 */
const N = 65536;
const r = 8;
const p = 1;
const KEYLEN = 64;
const SALT_BYTES = 32;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const key = await scrypt(password.normalize("NFKC"), salt, KEYLEN, {
    N, r, p, maxmem: 256 * 1024 * 1024,
  });
  return `scrypt$${N}$${r}$${p}$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, nRaw, rRaw, pRaw, saltHex, keyHex] = parts;
  const params = { N: Number(nRaw), r: Number(rRaw), p: Number(pRaw) };
  if (!Number.isFinite(params.N) || !Number.isFinite(params.r) || !Number.isFinite(params.p)) return false;

  const expected = Buffer.from(keyHex, "hex");
  let actual: Buffer;
  try {
    actual = await scrypt(password.normalize("NFKC"), Buffer.from(saltHex, "hex"), expected.length, {
      ...params, maxmem: 256 * 1024 * 1024,
    });
  } catch {
    return false;
  }
  // Lengths are equal by construction; guard anyway so timingSafeEqual cannot throw.
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

/** Minimum bar for a password. Deliberately length-first rather than a symbol soup. */
export function passwordProblem(password: string): string | null {
  if (password.length < 10) return "Use at least 10 characters.";
  if (password.length > 200) return "That password is too long.";
  if (!/[a-zA-Z]/.test(password)) return "Include at least one letter.";
  if (!/[0-9\W_]/.test(password)) return "Include at least one number or symbol.";
  const trivial = ["password", "12345678", "qwerty", "capybara", "letmein"];
  if (trivial.some((t) => password.toLowerCase().includes(t))) return "That password is too easy to guess.";
  return null;
}
