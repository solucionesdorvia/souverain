import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "souverain_admin";

function secretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-please-change";
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE = COOKIE;

import { redirect } from "next/navigation";

export async function requireAdmin() {
  const ok = await isAdmin();
  if (!ok) redirect("/admin/login");
}
