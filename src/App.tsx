import { useState } from "react"
import { MatrixRain } from "./components/matrix-rain"
import { TopBar } from "./components/top-bar"
import { FloatingNav } from "./components/floating-nav"
import { LoadingScreen } from "./components/loading-screen"
import { Outlet } from "@tanstack/react-router"
import { useIsMediumScreen } from "./hooks/use-media-query"
import { Toaster } from "sonner"

export default function App() {
  const isMediumScreen = useIsMediumScreen()
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative min-h-screen bg-background cyber-grid overflow-x-hidden">
      {/* Only show matrix rain on desktop */}
      {isMediumScreen && <MatrixRain />}
      {isMediumScreen && <TopBar />}

      {/* Floating navigation */}
      <FloatingNav />

      {/* Page content */}
      <Outlet />

      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(26, 35, 50, 0.99)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: 'white',
            fontFamily: 'monospace',
          },
        }}
      />
    </div>
  )
}
