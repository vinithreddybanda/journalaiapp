"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { saveJournalEntry } from "@/app/actions"
import { Loader2, PenTool, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function JournalEntryForm({ onEntryAdded }: { onEntryAdded: () => void }) {
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      // Get current user from Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const result = await saveJournalEntry(content.trim(), user.id)
      if (result.success) {
        setContent("")
        onEntryAdded()
      }
    })
  }

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-ios-title">New Entry</h3>
          </div>
          <p className="text-indigo-100 text-sm text-ios-body">What's on your mind today?</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day, your thoughts, your feelings..."
            className="min-h-[140px] border-0 bg-slate-50 focus:bg-white transition-colors resize-none text-slate-700 placeholder:text-slate-400 text-base text-ios-body rounded-xl"
            disabled={isPending}
          />

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm text-ios-body">
              <Sparkles className="w-4 h-4" />
              <span>AI will analyze your mood</span>
            </div>

            <Button
              type="submit"
              disabled={!content.trim() || isPending}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-2.5 rounded-xl font-semibold text-ios shadow-lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Entry"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
