"use client"

import { Heart, Sun, Zap, Leaf, Droplets, Cloud, Flame, Brain, Circle } from "lucide-react"

interface MoodCardProps {
  mood: string
  size?: "sm" | "md" | "lg"
}

// Pool of different color schemes
const colorSchemes = [
  {
    color: "text-rose-800",
    bg: "bg-gradient-to-br from-rose-100 to-pink-100",
    gradient: "from-rose-400 to-pink-400",
  },
  {
    color: "text-orange-800",
    bg: "bg-gradient-to-br from-orange-100 to-red-100",
    gradient: "from-orange-400 to-red-400",
  },
  {
    color: "text-amber-800",
    bg: "bg-gradient-to-br from-amber-100 to-yellow-100",
    gradient: "from-amber-400 to-yellow-400",
  },
  {
    color: "text-lime-800",
    bg: "bg-gradient-to-br from-lime-100 to-green-100",
    gradient: "from-lime-400 to-green-400",
  },
  {
    color: "text-emerald-800",
    bg: "bg-gradient-to-br from-emerald-100 to-teal-100",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    color: "text-cyan-800",
    bg: "bg-gradient-to-br from-cyan-100 to-blue-100",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    color: "text-sky-800",
    bg: "bg-gradient-to-br from-sky-100 to-indigo-100",
    gradient: "from-sky-400 to-indigo-400",
  },
  {
    color: "text-indigo-800",
    bg: "bg-gradient-to-br from-indigo-100 to-purple-100",
    gradient: "from-indigo-400 to-purple-400",
  },
  {
    color: "text-purple-800",
    bg: "bg-gradient-to-br from-purple-100 to-violet-100",
    gradient: "from-purple-400 to-violet-400",
  },
  {
    color: "text-fuchsia-800",
    bg: "bg-gradient-to-br from-fuchsia-100 to-pink-100",
    gradient: "from-fuchsia-400 to-pink-400",
  },
  {
    color: "text-pink-800",
    bg: "bg-gradient-to-br from-pink-100 to-rose-100",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    color: "text-teal-800",
    bg: "bg-gradient-to-br from-teal-100 to-cyan-100",
    gradient: "from-teal-400 to-cyan-400",
  },
]

// Icon mapping for different moods
const moodIcons: Record<string, any> = {
  happy: Sun,
  joyful: Sun,
  excited: Zap,
  grateful: Heart,
  peaceful: Leaf,
  calm: Leaf,
  sad: Droplets,
  melancholy: Droplets,
  anxious: Cloud,
  worried: Cloud,
  angry: Flame,
  frustrated: Flame,
  thoughtful: Brain,
  reflective: Brain,
  neutral: Circle,
}

// Function to get consistent random color for a mood
function getMoodColor(mood: string) {
  // Create a simple hash from the mood string
  let hash = 0
  for (let i = 0; i < mood.length; i++) {
    const char = mood.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  // Use the hash to pick a color scheme consistently
  const index = Math.abs(hash) % colorSchemes.length
  return colorSchemes[index]
}

export function MoodCard({ mood, size = "md" }: MoodCardProps) {
  const moodKey = mood.toLowerCase()
  const colorScheme = getMoodColor(moodKey)
  const IconComponent = moodIcons[moodKey] || Circle

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border-0 shadow-sm ${colorScheme.bg} ${colorScheme.color} ${sizeClasses[size]} font-medium text-ios`}
    >
      <IconComponent className={`${iconSizes[size]} ${colorScheme.color}`} />
      <span className="capitalize font-semibold">{mood}</span>
    </div>
  )
}
