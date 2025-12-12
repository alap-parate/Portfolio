import { Terminal, Activity, Cpu, Mail } from "lucide-react"
import { personalInfo } from "@/lib/data"

interface BottomDockProps {
  onToggle: (id: string) => void
  windowStates: {
    terminal: { isOpen: boolean; isMinimized: boolean }
    taskManager: { isOpen: boolean; isMinimized: boolean }
    systemMonitor: { isOpen: boolean; isMinimized: boolean }
  }
}

export function BottomDock({ onToggle, windowStates }: BottomDockProps) {
  const windowItems = [
    { id: "terminal", icon: Terminal, label: "Terminal", isActive: windowStates.terminal.isOpen, isMinimized: windowStates.terminal.isMinimized },
    { id: "taskManager", icon: Activity, label: "Tasks", isActive: windowStates.taskManager.isOpen, isMinimized: windowStates.taskManager.isMinimized },
    { id: "systemMonitor", icon: Cpu, label: "System", isActive: windowStates.systemMonitor.isOpen, isMinimized: windowStates.systemMonitor.isMinimized },
  ]

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-2 bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-2xl px-4 py-3">
        {/* Window toggle buttons */}
        {windowItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${
              item.isActive && !item.isMinimized
                ? "bg-[#38bdf8]/20"
                : "bg-[#38bdf8]/5 hover:bg-[#38bdf8]/10"
            }`}
          >
            <item.icon 
              className={`w-5 h-5 transition-all duration-300 ${
                item.isActive && !item.isMinimized 
                  ? "text-[#38bdf8] scale-110" 
                  : "text-muted-foreground group-hover:text-[#38bdf8]"
              }`} 
            />
            {item.isActive && (
              <div 
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38bdf8] transition-all duration-300 ${
                  item.isMinimized ? "opacity-50" : "opacity-100"
                }`} 
              />
            )}
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] border border-[#38bdf8]/20 rounded text-[10px] font-mono text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}

        {/* Separator */}
        <div className="w-px h-6 bg-[#38bdf8]/20 mx-1" />

        {/* Mail button - opens email */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="relative p-3 rounded-xl transition-all duration-300 group bg-[#38bdf8]/5 hover:bg-[#38bdf8]/10"
        >
          <Mail className="w-5 h-5 transition-all duration-300 text-muted-foreground group-hover:text-[#38bdf8]" />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] border border-[#38bdf8]/20 rounded text-[10px] font-mono text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Contact
          </span>
        </a>
      </div>
    </div>
  )
}
