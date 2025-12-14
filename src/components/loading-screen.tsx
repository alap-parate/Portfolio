import { useState, useEffect } from "react"
import { personalInfo } from "@/lib/data"

const loadingWords = ["DESIGN", "CODE", "BUILD", personalInfo.firstName]

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [percentage, setPercentage] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // Increment percentage from 0 to 100
  useEffect(() => {
    const duration = 3000 // 3 seconds total
    const steps = 100
    const increment = 100 / steps
    const intervalTime = duration / steps

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  // Cycle through words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % loadingWords.length)
    }, 1000)

    return () => clearInterval(wordInterval)
  }, [])

  // Trigger exit animation when percentage reaches 100
  useEffect(() => {
    if (percentage >= 100) {
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          onComplete()
        }, 800)
      }, 400)
    }
  }, [percentage, onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-700 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Background percentage - blurred */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="font-display text-[30vw] md:text-[40vw] leading-none text-accent select-none blur-sm md:blur-lg opacity-30"
          style={{ fontWeight: 400 }}
        >
          {Math.floor(percentage)}%
        </span>
      </div>

      {/* Foreground cycling words */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <span
          key={currentWordIndex}
          className="font-display text-white text-5xl sm:text-6xl md:text-[12vw] leading-none animate-blur-in-out text-center"
          style={{ fontWeight: 700 }}
        >
          {loadingWords[currentWordIndex]}
        </span>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-32 sm:w-48 md:w-64 px-4">
        <div className="h-[2px] w-full bg-foreground/20 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
