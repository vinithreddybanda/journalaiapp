"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface SummaryCardProps {
  summary: string
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-indigo-900 mb-1 text-ios-title">Reflection</h4>
            <p className="text-sm text-indigo-700 leading-relaxed text-ios-body">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
