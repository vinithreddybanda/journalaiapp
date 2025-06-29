"use client"

import { useState } from "react"
import { JournalEntryForm } from "./journal-entry-form"
import { JournalTimeline } from "./journal-timeline"
import type { JournalEntry } from "@/lib/supabase"
import { JournalHeader } from "./journal-header"

interface JournalAppProps {
  initialEntries: JournalEntry[]
  entriesLoading?: boolean
  onRefresh: () => void
}

export function JournalApp({ initialEntries, entriesLoading = false, onRefresh }: JournalAppProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries)

  const handleEntryAdded = () => {
    onRefresh()
  }

  // Update entries when initialEntries changes
  if (initialEntries !== entries) {
    setEntries(initialEntries)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <JournalHeader />

        <div className="space-y-12">
          <JournalEntryForm onEntryAdded={handleEntryAdded} />
          {entriesLoading ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-lg mb-2">Loading your entries...</div>
            </div>
          ) : (
            <JournalTimeline entries={entries} />
          )}
        </div>
      </div>
    </div>
  )
}
