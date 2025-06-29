"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogOut, User } from "lucide-react"

export function JournalHeader() {
  const { user, signOut } = useAuth()

  return (
    <header className="flex justify-between items-center mb-12">
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold text-slate-800 mb-3 text-ios-title bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Daily Reflections
        </h1>
        <p className="text-slate-600 text-lg text-ios-body">A space for your thoughts and feelings</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 text-ios-body">{user?.email}</span>
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-ios"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
