import { useEffect, useRef, useState } from "react"

// Module-level Set to track animations that have already played (resets on page reload)
const playedAnimations = new Set<string>()

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  /** Unique key to remember animation state across route changes */
  animationKey?: string
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true, animationKey } = options
  const ref = useRef<T>(null)
  
  // Check if animation was already shown
  const alreadyPlayed = animationKey ? playedAnimations.has(animationKey) : false
  const [isInView, setIsInView] = useState(alreadyPlayed)

  useEffect(() => {
    // If already animated, skip observer
    if (animationKey && playedAnimations.has(animationKey)) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
          // Remember that this animation has played
          if (animationKey) {
            playedAnimations.add(animationKey)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, animationKey])

  return { ref, isInView }
}


