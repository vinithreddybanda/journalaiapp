"use server"

import { createClient } from "@supabase/supabase-js"
import { analyzeJournalEntry } from "@/lib/ai-analysis"
import { revalidatePath } from "next/cache"

// Simple server client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function saveJournalEntry(content: string, userId: string) {
  try {
    // Analyze the entry with AI
    const analysis = await analyzeJournalEntry(content)

    // Save to database
    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: userId,
        content,
        mood: analysis.mood,
        summary: analysis.summary,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Error saving journal entry:", error)
    return { success: false, error: "Failed to save entry" }
  }
}

export async function getJournalEntries(userId: string) {
  try {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching journal entries:", error)
    return { success: false, data: [] }
  }
}
