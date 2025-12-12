import { useState, useRef, useEffect } from "react"
import { Github, Linkedin } from "lucide-react"
import { personalInfo } from "../lib/data"

interface FloatingNavProps {
  initials?: string
}

const navItems = [
  { id: "home", label: "HOME", href: "#home" },
  { id: "blog", label: "BLOG", href: "#projects" },
  { id: "guestbook", label: "GUESTBOOK", href: "#contact" },
]

export function FloatingNav({ initials = "ABC" }: FloatingNavProps) {
  const [activeId, setActiveId] = useState("home")
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  useEffect(() => {
    const activeEl = itemRefs.current.get(activeId)
    const navEl = navRef.current
    if (activeEl && navEl) {
      const navRect = navEl.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      setIndicatorStyle({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
      })
    }
  }, [activeId])

  return (
    <nav className="w-150 h-2 fixed top-7 left-1/2 -translate-x-1/2 z-50 bg-[#0b0b0b]">
      <div className="flex justify-between items-center gap-1 bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/50 rounded-full px-2 py-2">
        <span className="font-mono font-bold px-3 text-xl text-gray-200">{initials}<span className="text-xl text-[#38bdf8]">.</span></span>

        <div ref={navRef} className="relative flex items-center ml-auto">
          {/* Sliding indicator */}
          <div
            className="absolute h-8 bg-[#38bdf8] rounded-full transition-all duration-300 ease-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
          
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el)
              }}
              href={item.href}
              onClick={() => setActiveId(item.id)}
              className={`relative z-10 px-4 py-2 text-sm font-mono font-bold transition-colors duration-300 ${
                activeId === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-gray-400"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="w-px h-4 bg-[#38bdf8]/20 mx-2" />

        <div className="flex items-center gap-1">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  )
}
