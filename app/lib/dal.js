import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { decrypt } from "@/lib/session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return { isAuth: false };

  const session = await decrypt(cookie);
  return session
    ? { isAuth: true, username: session.username }
    : { isAuth: false };
});
