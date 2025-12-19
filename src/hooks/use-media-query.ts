import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)
    
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

// Convenience hook for large screens (lg breakpoint = 1024px)
export function useIsLargeScreen(): boolean {
  return useMediaQuery("(min-width: 1024px)")
}

// Convenience hook for medium screens (md breakpoint = 768px)
export function useIsMediumScreen(): boolean {
  return useMediaQuery("(min-width: 768px)")
}


