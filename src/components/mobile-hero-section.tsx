import { useState, useEffect, useRef } from "react"
import { personalInfo } from "@/lib/data"
import { Mail, Wifi, Battery } from "lucide-react"
import { SystemMonitor } from "./system-monitor"
import { TaskManager } from "./task-manager"
import { BottomDock } from "./bottom-dock"
import { toast } from "sonner"
import { MoveRight } from "lucide-react"

type MobileView = "lock" | "home"
type ActivePage = "home" | "taskManager" | "systemMonitor" | "contact"

export function MobileHeroSection() {
  // Unlock state persists in memory only - resets on page refresh
  const [view, setView] = useState<MobileView>("lock")
  const [activePage, setActivePage] = useState<ActivePage>("home")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sliderProgress, setSliderProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const hasShownToast = useRef(false)

  // Handle dock navigation
  const handleDockToggle = (id: string) => {
    if (id === "home") {
      setActivePage("home")
    } else if (id === "taskManager" || id === "systemMonitor" || id === "contact") {
      setActivePage(id as ActivePage)
    }
  }

  // Dummy window states for dock compatibility
  const windowStates = {
    terminal: { isOpen: false, isMinimized: false },
    taskManager: { isOpen: activePage === "taskManager", isMinimized: false },
    systemMonitor: { isOpen: activePage === "systemMonitor", isMinimized: false },
  }

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Show welcome toast when entering home view
  useEffect(() => {
    if (view === "home" && !hasShownToast.current) {
      hasShownToast.current = true
      toast("Welcome, Guest", {
        description: <span className="text-white/50">System access granted. Explore freely.</span>,
        icon: <Mail className="w-4 h-4 text-[#38bdf8]" />,
        duration: 2000,
      })
    }
  }, [view])

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).toUpperCase()
  }

  // Handle slide to unlock
  const handleSliderStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const progress = Math.max(0, Math.min(1, (clientX - rect.left - 24) / (rect.width - 48)))
    setSliderProgress(progress)

    if (progress >= 0.9) {
      setView("home")
      setSliderProgress(0)
      setIsDragging(false)
    }
  }

  const handleSliderEnd = () => {
    if (sliderProgress < 0.9) {
      setSliderProgress(0)
    }
    setIsDragging(false)
  }

  // Get initials for avatar
  const getInitials = () => {
    return `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`
  }

  // Core tech stack
  const techStack = ["TypeScript", "NestJS", "Docker", "PostgreSQL", "Redis"]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Static background image for mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 120%, rgba(163, 230, 53, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
            linear-gradient(to bottom, #0a0a0a 0%, #0d1117 50%, #0a0a0a 100%)
          `,
        }}
      />
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 text-xs font-mono">
        <span className="text-[#38bdf8]">
          CYPER-OS {view === "home" ? "v1.0" : ""}
        </span>
        <div className="flex items-center gap-2 text-white/70">
          <span className="text-xs">{formatTime(currentTime).replace(" ", " ")}</span>
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Lock Screen */}
      {view === "lock" && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-between py-20"
          onMouseMove={handleSliderMove}
          onMouseUp={handleSliderEnd}
          onMouseLeave={handleSliderEnd}
          onTouchMove={handleSliderMove}
          onTouchEnd={handleSliderEnd}
        >
          {/* Time Display */}
          <div className="text-center mt-8">
            <h1 className="text-6xl font-bold text-white font-mono tracking-wider">
              {formatTime(currentTime)}
            </h1>
            <p className="text-sm text-white/60 font-mono tracking-[0.3em] mt-2">
              {formatDate(currentTime)}
            </p>
          </div>

          {/* Slide to Unlock */}
          <div 
            ref={sliderRef}
            className="relative w-[70%] h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-20"
          >
            <div 
              className="absolute left-1 top-1 bottom-1 flex items-center justify-center w-12 h-12 bg-white/20 rounded-full cursor-grab active:cursor-grabbing transition-transform"
              style={{ 
                transform: `translateX(${sliderProgress * (256 - 56)}px)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out"
              }}
              onMouseDown={handleSliderStart}
              onTouchStart={handleSliderStart}
            >
              <span className="text-white text-lg"><MoveRight className="w-5 h-5 animate-bounce-right" /></span>
            </div>
            <span className="absolute left-16 top-1/2 -translate-y-1/2 text-white/50 text-sm font-mono tracking-wider">
              SLIDE TO UNLOCK
            </span>
          </div>
        </div>
      )}

      {/* Page Content - slides based on activePage */}
      {view === "home" && (
        <div className="absolute inset-0 pt-12 pb-28 overflow-hidden">
          {/* Home Page */}
          <div 
            className={`absolute inset-0 pt-4 pb-28 px-4 overflow-y-auto transition-transform duration-300 ease-out ${
              activePage === "home" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Time Display */}
            <p className="text-center text-white/80 text-6xl font-mono mb-1 mt-10">
              {formatTime(currentTime)}
            </p>
            {/* Date Display */}
            <p className="text-center text-white/80 font-mono text-xs tracking-[0.2em] mb-4">
              {formatDate(currentTime)}
            </p>

            {/* Profile Card */}
            <div className="bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#38bdf8] border border-[#38bdf8]/40 flex items-center justify-center">
                  <span className="text-xl align font-bold font-mono">{getInitials()}</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    {personalInfo.firstName} {personalInfo.middleName} {personalInfo.lastName}
                  </h2>
                  <p className="text-[#38bdf8] font-mono text-xs">:: {personalInfo.role} ::</p>
                </div>
              </div>
              <p className="text-white/70 font-mono text-sm leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-xl p-4">
                <div className="w-5 h-5 text-[#38bdf8] mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                  </svg>
                </div>
                <p className="text-white font-bold text-2xl font-mono">99.9%</p>
                <p className="text-white/50 font-mono text-xs">Uptime</p>
              </div>
              <div className="bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-xl p-4">
                <div className="w-5 h-5 text-[#38bdf8] mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <p className="text-white font-bold text-2xl font-mono">Active</p>
                <p className="text-white/50 font-mono text-xs">Status</p>
              </div>
            </div>

            {/* Core Stack */}
            <div className="bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-xl p-4">
              <p className="text-white/50 font-mono text-xs mb-3 tracking-wider">CORE STACK</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* System Monitor / Task Manager Page */}
          <div 
            className={`mt-10 absolute inset-0 pt-4 pb-28 px-4 overflow-y-auto transition-transform duration-300 ease-out ${
              activePage === "taskManager" || activePage === "systemMonitor" 
                ? "translate-x-0" 
                : activePage === "home" ? "translate-x-full" : "-translate-x-full"
            }`}
          >
            {/* Page Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg font-mono">System Monitor</h2>
            </div>
            
            {/* Resources Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-[#38bdf8]/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" className="w-4 h-4">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <span className="text-[#38bdf8] font-mono text-sm">Resources</span>
              </div>
              <SystemMonitor />
            </div>

            {/* Processes Section */}
            <div className="pt-4 border-t border-[#38bdf8]/20">
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" className="w-5 h-5">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                </svg>
                <span className="text-[#38bdf8] font-mono text-sm">Processes</span>
              </div>
              <TaskManager />
            </div>
          </div>

          {/* Contact Page */}
          <div 
            className={`absolute inset-0 pt-4 pb-28 px-4 flex items-center justify-center transition-transform duration-300 ease-out ${
              activePage === "contact" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-[#1a1a1a] border border-[#38bdf8]/30 rounded-2xl p-8 w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#38bdf8]" />
              </div>
              
              <h3 className="text-white font-bold text-2xl mb-2">Connect</h3>
              <p className="text-white/50 font-mono text-sm mb-6">
                Secure channel ready. Transmit message?
              </p>
              
              <a
                target="_blank"
                href={`mailto:${personalInfo.email}`}
                className="block w-full py-4 bg-[#38bdf8] text-black font-bold font-mono rounded-xl hover:bg-[#38bdf8]/90 transition-colors"
              >
                SEND_TRANSMISSION()
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Dock - always visible when unlocked */}
      {view === "home" && (
        <BottomDock 
          onToggle={handleDockToggle}
          windowStates={windowStates}
          isMobile={true}
          activeView={activePage}
        />
      )}
     
    </section>
  )
}
