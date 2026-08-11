import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface RsvpSubmission {
  id?: string;
  created_at?: string;
  full_name: string;
  phone: string;
  organization: string;
  attendance: "yes" | "no" | "maybe";
  guest_count: number;
  notes?: string;
}
