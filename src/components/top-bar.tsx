import { personalInfo } from "../lib/data"

export function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-40 border-b border-[#38bdf8]/50 bg-[#0b0b0b]">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded bg-[#38bdf8] animate-pulse" />
          <span className="font-mono font-bold text-[#38bdf8]">CYPHER-OS v1.0</span>
        </div>
        <div className="font-mono text-xs text-gray-600">
          UPTIME: 99.99% | REGION: AP-SOUTH-1 | USER: {personalInfo.firstName.toUpperCase()}
        </div>
      </div>
  )
}