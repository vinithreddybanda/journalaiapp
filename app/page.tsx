"use client"

import { useAuth } from "@/hooks/use-auth"
import { AuthForm } from "@/components/auth/auth-form"
import { JournalApp } from "@/components/journal-app"
import { useEffect, useState } from "react"
import { getJournalEntries } from "./actions"
import type { JournalEntry } from "@/lib/supabase"

export default function Home() {
  const { user, loading } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [entriesLoading, setEntriesLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadEntries()
    } else {
      setEntries([])
    }
  }, [user])

  const loadEntries = async () => {
    if (!user) return

    setEntriesLoading(true)
    try {
      const result = await getJournalEntries(user.id)
      if (result.success) {
        setEntries(result.data)
      }
    } catch (error) {
      console.error("Error loading entries:", error)
    } finally {
      setEntriesLoading(false)
    }
  }

  // Show loading only for auth, not entries
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onAuthSuccess={() => {}} />
  }

  return <JournalApp initialEntries={entries} entriesLoading={entriesLoading} onRefresh={loadEntries} />
}
