import { verifySession } from "@/lib/dal";

export async function withAuth(handler) {
  const session = await verifySession();
  if (!session.isAuth) {
    return new Response(null, { status: 401 });
  }
  return handler(session);
}
