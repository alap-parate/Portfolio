import { useState } from "react"
import { personalInfo } from "@/lib/data"
import { BottomDock } from "@/components/bottom-dock"
import { BottomBar } from "@/components/bottom-bar"
import { ContactSection } from "@/components/contact-section"
import { WindowContainer } from "@/components/window-container"
import { SystemMonitor } from "@/components/system-monitor"
import { Terminal } from "@/components/terminal"
import { TaskManager } from "./task-manager"
import { MobileHeroSection } from "./mobile-hero-section"
import { useIsMediumScreen } from "@/hooks/use-media-query"

type WindowState = {
  isOpen: boolean
  isMinimized: boolean
}

type WindowStates = {
  terminal: WindowState
  taskManager: WindowState
  systemMonitor: WindowState
}

export function HeroSection() {
  const isMediumScreen = useIsMediumScreen()

  const [windowStates, setWindowStates] = useState<WindowStates>({
    terminal: { isOpen: true, isMinimized: false },
    taskManager: { isOpen: true, isMinimized: false },
    systemMonitor: { isOpen: true, isMinimized: false },
  })

  // Track window focus order (last item = frontmost window)
  const [focusOrder, setFocusOrder] = useState<(keyof WindowStates)[]>([
    "systemMonitor", "taskManager", "terminal"
  ])

  // Bring window to front
  const handleWindowFocus = (id: keyof WindowStates) => {
    setFocusOrder((prev) => {
      const filtered = prev.filter((w) => w !== id)
      return [...filtered, id]
    })
  }

  // Get z-index based on focus order (base: 50, increment by 1 for each position)
  const getZIndex = (id: keyof WindowStates) => {
    const index = focusOrder.indexOf(id)
    return 50 + index
  }

  const handleWindowClose = (id: keyof WindowStates) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { isOpen: false, isMinimized: false },
    }))
  }

  const handleWindowMinimize = (id: keyof WindowStates) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }))
  }

  const handleDockToggle = (id: string) => {
    const windowId = id as keyof WindowStates
    
    setWindowStates((prev) => {
      const current = prev[windowId]
      
      // If window is closed, open it
      if (!current.isOpen) {
        return {
          ...prev,
          [windowId]: { isOpen: true, isMinimized: false },
        }
      }
      
      // If window is minimized, restore it
      if (current.isMinimized) {
        return {
          ...prev,
          [windowId]: { ...current, isMinimized: false },
        }
      }
      
      // If window is open and not minimized, minimize it
      return {
        ...prev,
        [windowId]: { ...current, isMinimized: true },
      }
    })
  }

  // Render mobile layout for screens below 768px
  if (!isMediumScreen) {
    return <MobileHeroSection />
  }

  return (
    <section className="relative h-screen flex flex-col overflow-hidden" id="hero">

      {/* Main content area */}
      <div className="relative flex-1 flex px-6 container mx-auto pt-20">
        {/* Left side - Name and info */}
        <div className="max-w-xl z-10">
          <h1 className="text-[5vw] font-bold leading-none tracking-tight">
            <span className="text-muted-foreground block">{personalInfo.firstName}</span>
            <span className="text-[#38bdf8] italic block">{personalInfo.middleName}</span>
            <span className="text-[#38bdf8] block [text-shadow:0_0_50px_rgba(56,189,248,0.8),0_0_40px_rgba(56,189,248,0.1)]">{personalInfo.lastName}</span>
          </h1>

          <div className="mt-8 space-y-4 border-l-2 border-[#38bdf8] pl-4">
            <p className="font-mono text-xl text-[#38bdf8] font-bold">:: {personalInfo.role} ::</p>
            <p className="font-mono text-lg text-gray-300 leading-relaxed max-w-md">{personalInfo.bio}</p>
          </div>
          
        </div>

        {/* Right side - Draggable windows */}
        <div className="absolute right-0 top-20 bottom-20 w-[55%]">
          {/* System Monitor Window */}
          <WindowContainer 
            title="system_monitor" 
            initialXPercent={5}
            initialYPercent={5}
            width={550}
            minWidth={320}
            maxWidth={650}
            isOpen={windowStates.systemMonitor.isOpen}
            isMinimized={windowStates.systemMonitor.isMinimized}
            onClose={() => handleWindowClose("systemMonitor")}
            onMinimize={() => handleWindowMinimize("systemMonitor")}
            zIndex={getZIndex("systemMonitor")}
            onFocus={() => handleWindowFocus("systemMonitor")}
          >
            <SystemMonitor />
          </WindowContainer>
          
          <WindowContainer 
            title="task_manager" 
            initialXPercent={55}
            initialYPercent={20}
            width={450}
            minWidth={300}
            maxWidth={550}
            isOpen={windowStates.taskManager.isOpen}
            isMinimized={windowStates.taskManager.isMinimized}
            onClose={() => handleWindowClose("taskManager")}
            onMinimize={() => handleWindowMinimize("taskManager")}
            zIndex={getZIndex("taskManager")}
            onFocus={() => handleWindowFocus("taskManager")}
          >
            <TaskManager />
          </WindowContainer>
          
          <WindowContainer 
            title="terminal — zsh" 
            initialXPercent={0}
            initialYPercent={45}
            width={600}
            height={350}
            minWidth={350}
            maxWidth={750}
            contentClassName="p-0"
            isOpen={windowStates.terminal.isOpen}
            zIndex={getZIndex("terminal")}
            onFocus={() => handleWindowFocus("terminal")}
            isMinimized={windowStates.terminal.isMinimized}
            onClose={() => handleWindowClose("terminal")}
            onMinimize={() => handleWindowMinimize("terminal")}
          >
            <Terminal />
          </WindowContainer>
        </div>
      </div>

      {/* Bottom dock */}
      <BottomDock 
        windowStates={windowStates}
        onToggle={handleDockToggle}
      />

      {/* Bottom status bar */}
      <BottomBar />

      {/* Contact section */}
      <ContactSection />
     
    </section>
  )
}
