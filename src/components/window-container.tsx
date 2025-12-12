import { useState, useRef, useEffect, type ReactNode, type PointerEvent } from "react"

interface WindowContainerProps {
  title: string
  children: ReactNode
  initialX?: number
  initialY?: number
  initialWidth?: string | number
  initialHeight?: string | number
  showControls?: boolean
  className?: string
  contentClassName?: string
  // Controlled state props
  isOpen?: boolean
  isMinimized?: boolean
  onClose?: () => void
  onMinimize?: () => void
}

export function WindowContainer({
  title,
  children,
  initialX = 0,
  initialY = 0,
  initialWidth,
  initialHeight,
  showControls = true,
  className = "",
  contentClassName = "p-4",
  isOpen = true,
  isMinimized: isMinimizedProp = false,
  onClose,
  onMinimize,
}: WindowContainerProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isClosing, setIsClosing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  const dragStartPos = useRef({ x: 0, y: 0 })
  const windowPosStart = useRef({ x: 0, y: 0 })

  // Reset closing state when window is restored (either opened or unminimized)
  useEffect(() => {
    if (isOpen && !isMinimizedProp) {
      setIsClosing(false)
    }
  }, [isOpen, isMinimizedProp])

  // Debug: log state changes
  useEffect(() => {
    console.log(`Window "${title}": isOpen=${isOpen}, isMinimized=${isMinimizedProp}, isClosing=${isClosing}`)
  }, [title, isOpen, isMinimizedProp, isClosing])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
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
      className={`absolute select-none z-50 transition-all duration-200 origin-center ${
        shouldAnimate ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
      } ${className}`}
      style={{
        left: position.x,
        top: position.y,
        // Disable transition during drag for smoothness
        transition: isDragging ? "none" : undefined,
      }}
    >
      <div 
        className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#38bdf8]/20 rounded-lg overflow-hidden shadow-2xl flex flex-col"
        style={{ width: initialWidth, height: initialHeight }}
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

        {/* Content */}
        <div className={`${contentClassName} flex-1 overflow-auto`}>{children}</div>
      </div>
    </div>
  )
}
