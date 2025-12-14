import { Link } from "@tanstack/react-router"
import { ArrowLeft, Construction } from "lucide-react"

interface ComingSoonProps {
  title: string
  description?: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#38bdf8]/20 blur-3xl rounded-full animate-pulse" />
        <Construction className="w-20 h-20 text-[#38bdf8] relative z-10" />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
        {title}
      </h1>

      {/* Coming Soon badge */}
      <div className="flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/30 rounded-full px-4 py-2 mb-6">
        <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
        <span className="font-mono text-sm text-[#38bdf8] uppercase tracking-wider">
          Coming Soon
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 font-mono text-center max-w-md mb-10">
        {description || "This page is currently under construction. Check back soon!"}
      </p>

      {/* Back to home link */}
      <Link
        to="/"
        className="flex items-center gap-2 text-white hover:text-[#38bdf8] transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  )
}

