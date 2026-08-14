import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Supabase client สำหรับใช้ใน Server Component / Server Action / Route Handler
 * ใช้ anon key เท่านั้น (RLS คุมสิทธิ์อยู่แล้ว) — ห้ามใช้ service role key ที่นี่
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // เรียกจาก Server Component ล้วน ๆ (ไม่ใช่ Server Action/Route Handler)
            // จะ set cookie ไม่ได้ — ไม่เป็นไร เพราะหน้านี้ไม่ได้ต้องรีเฟรช session
          }
        },
      },
    }
  );
}
