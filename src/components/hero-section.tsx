import { useState } from "react"
import { personalInfo } from "@/lib/data"
import { FloatingNav } from "@/components/floating-nav"
import { BottomDock } from "@/components/bottom-dock"
import { TopBar } from "@/components/top-bar"
import { BottomBar } from "@/components/bottom-bar"
import { ContactSection } from "@/components/contact-section"
import { MatrixRain } from "@/components/matrix-rain"
import { WindowContainer } from "@/components/window-container"
import { SystemMonitor } from "@/components/system-monitor"
import { Terminal } from "@/components/terminal"
import { TaskManager } from "./task-manager"

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
  const initials = `${personalInfo.firstName[0]}${personalInfo.middleName[0]}${personalInfo.lastName[0]}`

  const [windowStates, setWindowStates] = useState<WindowStates>({
    terminal: { isOpen: true, isMinimized: false },
    taskManager: { isOpen: true, isMinimized: false },
    systemMonitor: { isOpen: true, isMinimized: false },
  })

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
    console.log(`Dock toggle: ${windowId}`, windowStates[windowId])
    
    setWindowStates((prev) => {
      const current = prev[windowId]
      console.log(`Current state for ${windowId}:`, current)
      
      // If window is closed, open it
      if (!current.isOpen) {
        console.log(`Opening ${windowId}`)
        return {
          ...prev,
          [windowId]: { isOpen: true, isMinimized: false },
        }
      }
      
      // If window is minimized, restore it
      if (current.isMinimized) {
        console.log(`Restoring ${windowId}`)
        return {
          ...prev,
          [windowId]: { ...current, isMinimized: false },
        }
      }
      
      // If window is open and not minimized, minimize it
      console.log(`Minimizing ${windowId}`)
      return {
        ...prev,
        [windowId]: { ...current, isMinimized: true },
      }
    })
  }

  return (
    <section className="relative h-screen flex flex-col bg-background cyber-grid overflow-hidden" id="home">
        <MatrixRain />
      <TopBar />

      {/* Floating navigation */}
      <FloatingNav initials={initials} />

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
        <div className="hidden lg:block absolute right-0 top-20 bottom-20 w-[55%]">
          {/* System Monitor Window */}
          <WindowContainer 
            title="system_monitor" 
            initialX={50} 
            initialY={60} 
            initialWidth={600}
            isOpen={windowStates.systemMonitor.isOpen}
            isMinimized={windowStates.systemMonitor.isMinimized}
            onClose={() => handleWindowClose("systemMonitor")}
            onMinimize={() => handleWindowMinimize("systemMonitor")}
          >
            <SystemMonitor />
          </WindowContainer>
          
          <WindowContainer 
            title="task_manager" 
            initialX={660} 
            initialY={200} 
            initialWidth={500}
            isOpen={windowStates.taskManager.isOpen}
            isMinimized={windowStates.taskManager.isMinimized}
            onClose={() => handleWindowClose("taskManager")}
            onMinimize={() => handleWindowMinimize("taskManager")}
          >
            <TaskManager />
          </WindowContainer>
          
          <WindowContainer 
            title="terminal — zsh" 
            initialX={-50} 
            initialY={435} 
            initialWidth={700} 
            initialHeight={400} 
            contentClassName="p-0"
            isOpen={windowStates.terminal.isOpen}
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
