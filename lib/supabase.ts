import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton client to avoid multiple instances
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type JournalEntry = {
  id: number
  user_id: string
  content: string
  mood: string | null
  summary: string | null
  created_at: string
}
