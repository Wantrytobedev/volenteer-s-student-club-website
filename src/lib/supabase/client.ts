"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/** Supabase client สำหรับใช้ใน Client Component เท่านั้น */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
