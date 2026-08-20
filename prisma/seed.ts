/**
 * Creates the organisation and its first administrator.
 *
 * Run once after the first migration:
 *   npm run db:seed
 *
 * The admin password comes from ADMIN_PASSWORD, or is generated and printed.
 * Everyone else joins by invitation from inside the app — this script
 * deliberately does not create students or teachers.
 */
import { PrismaClient } from "@prisma/client";
import { randomBytes, scrypt as scryptCb, type ScryptOptions } from "node:crypto";

const db = new PrismaClient();

const scrypt = (password: string, salt: Buffer, keylen: number, options: ScryptOptions) =>
  new Promise<Buffer>((resolve, reject) =>
    scryptCb(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key))),
  );

async function hashPassword(password: string) {
  const salt = randomBytes(32);
  const key = await scrypt(password.normalize("NFKC"), salt, 64, {
    N: 65536, r: 8, p: 1, maxmem: 256 * 1024 * 1024,
  });
  return `scrypt$65536$8$1$${salt.toString("hex")}$${key.toString("hex")}`;
}

async function main() {
  const orgName = process.env.ORG_NAME ?? "Capybara Motion Academy";
  const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@example.com").trim().toLowerCase();
  const generated = !process.env.ADMIN_PASSWORD;
  const adminPassword = process.env.ADMIN_PASSWORD ?? randomBytes(12).toString("base64url");

  const org = await db.organization.upsert({
    where: { slug },
    update: {},
    create: { name: orgName, slug },
  });

  const existing = await db.user.findUnique({
    where: { orgId_email: { orgId: org.id, email: adminEmail } },
  });

  if (existing?.passwordHash) {
    console.log(`\nAdministrator ${adminEmail} already exists — leaving it untouched.`);
    console.log(`Use "Forgotten your password?" on the sign-in page if you need to get back in.\n`);
    return;
  }

  await db.user.upsert({
    where: { orgId_email: { orgId: org.id, email: adminEmail } },
    update: { passwordHash: await hashPassword(adminPassword), status: "ACTIVE", role: "ADMIN" },
    create: {
      orgId: org.id,
      email: adminEmail,
      name: process.env.ADMIN_NAME ?? "Administrator",
      role: "ADMIN",
      status: "ACTIVE",
      passwordHash: await hashPassword(adminPassword),
    },
  });

  console.log(`\n  Organisation : ${org.name}`);
  console.log(`  Admin email  : ${adminEmail}`);
  console.log(`  Admin password: ${adminPassword}${generated ? "   <- generated, save it now" : ""}`);
  console.log(`\n  Sign in, then invite your teachers from Admin -> People.\n`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
