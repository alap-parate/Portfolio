import { useEffect, useState } from "react"

export function Terminal() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-sm w-full h-full bg-[#0a0a0a] text-gray-300 p-3 overflow-hidden flex flex-col">
      <div className="space-y-0.5">
        <div className="text-gray-500">Initializing kernel...</div>
        <div className="text-gray-500">Loading modules...</div>
        <div className="text-gray-500">Mounting file system...</div>
        <div className="text-gray-500">Starting network services...</div>
        <div className="mt-4 text-white">Welcome to Cypher OS v1.0</div>
      </div>

      <div className="text-[#a3e635] font-bold whitespace-pre my-6 leading-none select-none">
{`   ______            __                  ____  _____
  / ____/_  ______  / /_  ___  _____    / __ \\/ ___/
 / /   / / / / __ \\/ __ \\/ _ \\/ ___/   / / / /\\__ \\ 
/ /___/ /_/ / /_/ / / / /  __/ /      / /_/ /___/ / 
\\____/\\__, / .___/_/ /_/\\___/_/       \\____//____/  
     /____/_/                                       `}
      </div>

      <div className="flex items-center gap-2 mt-auto pb-2">
        <span className="text-[#a3e635]">➜</span>
        <span className="text-[#38bdf8]">~</span>
        <div className={`w-2.5 h-4 bg-[#a3e635] ${showCursor ? "opacity-100" : "opacity-0"}`} />
      </div>
    </div>
  )
}
