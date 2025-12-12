import { useEffect, useRef } from "react"

export function MatrixRain() {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const rainCanvasRef = useRef<HTMLCanvasElement>(null)

  // Grid animation (separate canvas for crisp lines)
  useEffect(() => {
    const canvas = gridCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    const gridSize = 60
    let gridOffsetX = 0
    let gridOffsetY = 0

    function drawGrid() {
      if (!ctx || !canvas) return

      // Clear canvas completely for sharp lines
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)"
      ctx.lineWidth = 1

      // Snap to pixel grid for crisp lines (add 0.5 for 1px line crispness)
      const offsetX = Math.floor(gridOffsetX % gridSize)
      const offsetY = Math.floor(gridOffsetY % gridSize)

      // Vertical lines
      for (let x = offsetX - gridSize; x <= canvas.width + gridSize; x += gridSize) {
        const px = Math.floor(x) + 0.5
        ctx.beginPath()
        ctx.moveTo(px, 0)
        ctx.lineTo(px, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = offsetY - gridSize; y <= canvas.height + gridSize; y += gridSize) {
        const py = Math.floor(y) + 0.5
        ctx.beginPath()
        ctx.moveTo(0, py)
        ctx.lineTo(canvas.width, py)
        ctx.stroke()
      }

      gridOffsetX += 0.4
      gridOffsetY += 0.6
    }

    const interval = setInterval(drawGrid, 30)
    window.addEventListener("resize", setSize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", setSize)
    }
  }, [])

  // Matrix rain animation (separate canvas)
  useEffect(() => {
    const canvas = rainCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ"
    const chars = matrixChars.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    const dropIndices: number[] = []
    for (let i = 0; i < columns; i += 4) {
      drops.push(Math.random() * -100)
      dropIndices.push(i)
    }

    function drawRain() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(8, 11, 14, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#38bdf8"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, dropIndices[i] * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(drawRain, 50)
    window.addEventListener("resize", setSize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", setSize)
    }
  }, [])

  return (
    <>
      <canvas ref={gridCanvasRef} className="absolute inset-0 pointer-events-none opacity-40" style={{ zIndex: 1 }} />
      <canvas ref={rainCanvasRef} className="absolute inset-0 pointer-events-none opacity-25" style={{ zIndex: 2 }} />
    </>
  )
}
