"use server";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { deleteSession } from "@/lib/session";

export async function GET(request) {
  revalidatePath("/", "layout");
  await deleteSession();
  return NextResponse.redirect(new URL("/add", request.nextUrl));
}
