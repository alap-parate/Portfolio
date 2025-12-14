import { useState, useRef, useEffect, type ReactNode, type PointerEvent } from "react"

interface WindowContainerProps {
  title: string
  children: ReactNode
  // Position as percentage of container (0-100)
  initialXPercent?: number
  initialYPercent?: number
  // Size - can be number (px), string (CSS value), or "auto"
  width?: string | number
  height?: string | number
  // Min/Max constraints
  minWidth?: number
  maxWidth?: number
  showControls?: boolean
  className?: string
  contentClassName?: string
  // Controlled state props
  isOpen?: boolean
  isMinimized?: boolean
  onClose?: () => void
  onMinimize?: () => void
  // Z-index management
  zIndex?: number
  onFocus?: () => void
}

export function WindowContainer({
  title,
  children,
  initialXPercent = 0,
  initialYPercent = 0,
  width = "auto",
  height = "auto",
  minWidth = 280,
  maxWidth,
  showControls = true,
  className = "",
  contentClassName = "p-4",
  isOpen = true,
  isMinimized: isMinimizedProp = false,
  onClose,
  onMinimize,
  zIndex = 50,
  onFocus,
}: WindowContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  const dragStartPos = useRef({ x: 0, y: 0 })
  const windowPosStart = useRef({ x: 0, y: 0 })

  // Calculate initial position based on percentage of parent container
  useEffect(() => {
    const updatePosition = () => {
      const parent = containerRef.current?.parentElement
      if (!parent) return
      
      const parentRect = parent.getBoundingClientRect()
      const x = (parentRect.width * initialXPercent) / 100
      const y = (parentRect.height * initialYPercent) / 100
      
      setPosition({ x, y })
      setDimensions({ width: parentRect.width, height: parentRect.height })
    }
    
    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [initialXPercent, initialYPercent])

  // Calculate responsive width
  const getResponsiveWidth = () => {
    if (typeof width === "number") {
      // Clamp pixel value between min and max
      const clampedWidth = Math.max(minWidth, Math.min(width, maxWidth || width))
      // Also ensure it doesn't exceed container width
      const maxContainerWidth = dimensions.width * 0.95
      return Math.min(clampedWidth, maxContainerWidth)
    }
    return width // Return CSS string as-is
  }

  const responsiveWidth = getResponsiveWidth()

  // Reset closing state when window is restored (either opened or unminimized)
  useEffect(() => {
    if (isOpen && !isMinimizedProp) {
      setIsClosing(false)
    }
  }, [isOpen, isMinimizedProp])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Bring window to front
    onFocus?.()
    
    // Prevent dragging if clicking buttons
    if ((e.target as HTMLElement).tagName === "BUTTON") return
    
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    windowPosStart.current = { ...position }
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStartPos.current.x
    const deltaY = e.clientY - dragStartPos.current.y

    setPosition({
      x: windowPosStart.current.x + deltaX,
      y: windowPosStart.current.y + deltaY,
    })
  }

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // Close window with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
      setIsClosing(false)
    }, 200)
  }

  // Toggle minimize
  const handleMinimize = () => {
    onMinimize?.()
  }

  if (!isOpen) return null

  // Only show animation when actively closing (not when reopening)
  const shouldAnimate = isClosing || isMinimizedProp

  return (
    <div
      ref={containerRef}
      className={`absolute select-none transition-all duration-200 origin-center ${
        shouldAnimate ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
      } ${className}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        // Disable transition during drag for smoothness
        transition: isDragging ? "none" : undefined,
      }}
      onPointerDown={() => onFocus?.()}
    >
      <div 
        className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#38bdf8]/20 rounded-lg overflow-hidden shadow-2xl flex flex-col"
        style={{ 
          width: typeof responsiveWidth === "number" ? responsiveWidth : responsiveWidth,
          height: height,
          minWidth: minWidth,
          maxWidth: maxWidth,
        }}
      >
        {/* Title bar - Drag handle */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="flex items-center gap-2 px-3 py-2 bg-[#252525] border-b border-[#38bdf8]/10 cursor-grab active:cursor-grabbing touch-none"
        >
          {showControls && (
            <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] transition-colors"
                title="Close"
              />
              {/* Yellow button (decorative) */}
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              {/* Minimize button */}
              <button
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-[#27ca3f] hover:bg-[#1fb835] transition-colors"
                title={isMinimizedProp ? "Restore" : "Minimize"}
              />
            </div>
          )}
          <span className="font-mono text-xs text-gray-400 ml-2">{title}</span>
        </div>

        {/* Content - Don't render when minimized/closing to prevent recharts 0-dimension warnings */}
        <div className={`${contentClassName} flex-1 overflow-auto`}>
          {!shouldAnimate && children}
        </div>
      </div>
    </div>
  )
}
