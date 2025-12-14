import { useRef, useEffect, useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { personalInfo } from "../lib/data"
import { useIsMediumScreen } from "@/hooks/use-media-query"

const navItems = [
  { id: "home", label: "HOME", href: "/" },
  { id: "blog", label: "BLOG", href: "/blog" },
  { id: "guestbook", label: "GUESTBOOK", href: "/guestbook" },
]

export function FloatingNav() {
  const initials = `${personalInfo.firstName[0]}${personalInfo.middleName[0]}${personalInfo.lastName[0]}`
  const location = useLocation()
  const isMediumScreen = useIsMediumScreen()

  // Determine active item based on current path
  const getActiveId = () => {
    const path = location.pathname
    const item = navItems.find((item) => item.href === path)
    return item?.id || "home"
  }

  const activeId = getActiveId()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false) // For animation
  const [isInHeroSection, setIsInHeroSection] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const lastScrollY = useRef(0)
  const SCROLL_THRESHOLD = 100 // Height after which hide/show behavior kicks in

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if in hero section (first viewport height)
      const heroHeight = window.innerHeight
      setIsInHeroSection(currentScrollY < heroHeight - 100)

      // Always show when at the top
      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsHidden(false)
        lastScrollY.current = currentScrollY
        return
      }

      // Scrolling down - hide the nav
      if (currentScrollY > lastScrollY.current) {
        setIsHidden(true)
      }
      // Scrolling up - show the nav
      else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuVisible(false)
      setTimeout(() => setIsMenuOpen(false), 300)
    }
  }, [location.pathname])

  // Handle menu open with animation
  const openMenu = () => {
    setIsMenuOpen(true)
    // Small delay to trigger animation after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsMenuVisible(true)
      })
    })
  }

  // Handle menu close with animation
  const closeMenu = () => {
    setIsMenuVisible(false)
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsMenuOpen(false)
    }, 300)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // On mobile home page in hero section, hide the nav completely
  const isOnMobileHero = !isMediumScreen && location.pathname === "/" && isInHeroSection

  // Don't render anything if on mobile hero section
  if (isOnMobileHero && !isMenuOpen) {
    return null
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-7 left-1/2 -translate-x-1/2 z-100 transition-all duration-500 ease-out ${isHidden && !isMenuOpen ? "-translate-y-25" : ""}`}>
        {/* Mobile Nav */}
        {!isMediumScreen ? (
          <div className="flex justify-between items-center gap-1 bg-[#0d1117]/90 backdrop-blur-sm border border-[#38bdf8]/30 rounded-full px-4 py-3 min-w-[80vw]">
            <span className="font-bold text-xl text-gray-200">
              {initials}<span className="text-xl text-[#38bdf8]">.</span>
            </span>
            <button
              onClick={openMenu}
              className="p-2 text-gray-200 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        ) : (
          /* Desktop Nav */
          <div className="flex justify-between items-center gap-1 bg-[#0d1117]/80 backdrop-blur-sm border border-[#38bdf8]/50 rounded-full px-2 py-2">
            <span className="font-mono font-bold px-3 text-xl text-gray-200">
              {initials}<span className="text-xl text-[#38bdf8]">.</span>
            </span>

            <div ref={navRef} className="relative flex items-center ml-auto">
              {/* Sliding indicator */}
              <div
                className="absolute h-8 bg-[#38bdf8] rounded-full transition-all duration-300 ease-out"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
              />
              
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.id, el)
                  }}
                  to={item.href}
                  className={`relative z-10 px-4 py-2 text-sm font-mono font-bold transition-colors duration-300 ${
                    activeId === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-gray-400"
                  }`}
                >
                  {item.label}
                </Link>
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
        )}
      </nav>

      {/* Full Screen Mobile Menu */}
      {isMenuOpen && (
        <div 
          className={`fixed inset-0 z-200 bg-black flex flex-col transition-all duration-300 ease-out ${
            isMenuVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header */}
          <div 
            className={`flex justify-between items-center px-6 py-6 transition-all duration-300 delay-75 ${
              isMenuVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="font-mono font-bold text-xl text-gray-200">
              {initials}<span className="text-xl text-[#38bdf8]">.</span>
            </span>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 -mt-20">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={closeMenu}
                className={`text-3xl font-bold transition-all duration-300 ${
                  activeId === item.id
                    ? "text-[#38bdf8]"
                    : "text-white hover:text-gray-300"
                } ${isMenuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div 
              className={`w-16 h-px bg-gray-700 my-4 transition-all duration-300 ${
                isMenuVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: '250ms' }}
            />

            {/* Social Icons */}
            <div 
              className={`flex items-center gap-6 transition-all duration-300 ${
                isMenuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Let's Talk Button */}
          <div 
            className={`px-6 pb-12 transition-all duration-300 ${
              isMenuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={closeMenu}
              className="block w-full py-4 bg-[#38bdf8] text-black font-bold text-center rounded-full hover:bg-[#38bdf8]/90 transition-colors"
            >
              LET'S TALK
            </a>
          </div>
        </div>
      )}
    </>
  )
}
