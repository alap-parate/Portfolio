import { Terminal, Activity, Cpu, Mail, Home } from "lucide-react"
import { personalInfo } from "@/lib/data"

interface BottomDockProps {
  onToggle: (id: string) => void
  windowStates: {
    terminal: { isOpen: boolean; isMinimized: boolean }
    taskManager: { isOpen: boolean; isMinimized: boolean }
    systemMonitor: { isOpen: boolean; isMinimized: boolean }
  }
  isMobile?: boolean
  activeView?: string | null
}

export function BottomDock({ onToggle, windowStates, isMobile = false, activeView }: BottomDockProps) {
  const windowItems = [
    { id: "terminal", icon: Terminal, label: "Terminal", isActive: windowStates.terminal.isOpen, isMinimized: windowStates.terminal.isMinimized, hideOnMobile: true },
    { id: "taskManager", icon: Activity, label: "Tasks", isActive: windowStates.taskManager.isOpen, isMinimized: windowStates.taskManager.isMinimized, hideOnMobile: false },
    { id: "systemMonitor", icon: Cpu, label: "System", isActive: windowStates.systemMonitor.isOpen, isMinimized: windowStates.systemMonitor.isMinimized, hideOnMobile: true },
  ]

  // Filter items based on mobile view
  const visibleItems = isMobile 
    ? windowItems.filter(item => !item.hideOnMobile)
    : windowItems

  // Mobile-specific check for active state
  const isItemActive = (itemId: string) => {
    if (isMobile) {
      return activeView === itemId
    }
    const item = windowItems.find(i => i.id === itemId)
    return item?.isActive && !item?.isMinimized
  }

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 z-60 ${isMobile ? 'bottom-8' : 'bottom-16'}`}>
      <div className={`flex items-center bg-[#0d1117]/90 backdrop-blur-md border border-[#38bdf8]/20 ${isMobile ? 'gap-4 rounded-full px-5 py-3' : 'gap-2 rounded-2xl px-4 py-3'}`}>
        
        {/* Home button - only on mobile */}
        {isMobile && (
          <button
            onClick={() => onToggle("home")}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${
              activeView === null || activeView === "home"
                ? "bg-[#38bdf8] text-black"
                : "bg-gray-900 text-white/60 hover:text-white"
            }`}
          >
            <Home className="w-6 h-6" />
            {(activeView === null || activeView === "home") && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38bdf8]" />
            )}
          </button>
        )}

        {/* Window toggle buttons */}
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${
              isItemActive(item.id)
                ? isMobile ? "bg-[#38bdf8] text-black" : "bg-[#38bdf8]/20"
                : isMobile ? "bg-gray-900 text-white/60 hover:text-white" : "bg-[#38bdf8]/5 hover:bg-[#38bdf8]/10"
            }`}
          >
            <item.icon 
              className={`transition-all duration-300 ${isMobile ? 'w-6 h-6' : 'w-5 h-5'} ${
                isItemActive(item.id)
                  ? isMobile ? "" : "text-[#38bdf8] scale-110"
                  : isMobile ? "" : "text-muted-foreground group-hover:text-[#38bdf8]"
              }`} 
            />
            {isItemActive(item.id) && (
              <div 
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38bdf8] transition-all duration-300 ${
                  !isMobile && item.isMinimized ? "opacity-50" : "opacity-100"
                }`} 
              />
            )}
            
            {/* Tooltip - only on desktop */}
            {!isMobile && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] border border-[#38bdf8]/20 rounded text-[10px] font-mono text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            )}
          </button>
        ))}

        {/* Separator - only on desktop */}
        {!isMobile && <div className="w-px h-6 bg-[#38bdf8]/20 mx-1" />}

        {/* Mail button */}
        {isMobile ? (
          <button
            onClick={() => onToggle("contact")}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${
              activeView === "contact"
                ? "bg-[#38bdf8] text-black"
                : "bg-gray-900 text-white/60 hover:text-white"
            }`}
          >
            <Mail className="w-6 h-6" />
            {activeView === "contact" && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38bdf8]" />
            )}
          </button>
        ) : (
          <a
            href={`mailto:${personalInfo.email}`}
            className="relative p-3 rounded-xl transition-all duration-300 group bg-[#38bdf8]/5 hover:bg-[#38bdf8]/10"
          >
            <Mail className="w-5 h-5 transition-all duration-300 text-muted-foreground group-hover:text-[#38bdf8]" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] border border-[#38bdf8]/20 rounded text-[10px] font-mono text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Contact
            </span>
          </a>
        )}
      </div>
    </div>
  )
}
