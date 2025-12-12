import { useState } from "react"
import { HeroSection } from "./components/hero-section"
import { LoadingScreen } from "./components/loading-screen"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      {isLoading ? null : <HeroSection />}
    </>
  )
}
