"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { JournalEntry } from "@/lib/supabase"
import { formatDistanceToNow, format } from "date-fns"
import { MoodCard } from "./mood-card"
import { SummaryCard } from "./summary-card"
import { BookOpen } from "lucide-react"

interface JournalTimelineProps {
  entries: JournalEntry[]
}

export function JournalTimeline({ entries }: JournalTimelineProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-lg mb-2 text-ios-title">No entries yet</p>
        <p className="text-sm text-ios-body">Start writing to see your thoughts here</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-ios-title">Your Journey</h2>

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <Card
            key={entry.id}
            className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-6 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full shadow-sm" />
                    <div>
                      <span className="text-sm font-medium text-slate-600 text-ios-body">
                        {format(new Date(entry.created_at), "EEEE, MMMM d")}
                      </span>
                      <div className="text-xs text-slate-400 text-ios-body">
                        {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>

                  {entry.mood && <MoodCard mood={entry.mood} size="sm" />}
                </div>

                {/* AI Summary */}
                {entry.summary && (
                  <div className="mb-4">
                    <SummaryCard summary={entry.summary} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                <div className="prose prose-slate prose-sm max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-ios-body text-base">
                    {entry.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
