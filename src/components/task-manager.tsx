import { useState, useEffect } from "react"

interface Process {
  pid: number
  command: string
  cpu: number
  status: "Running" | "Sleeping" | "Active" | "Syncing" | "Idle"
}

export function TaskManager() {
  const [processes, setProcesses] = useState<Process[]>([
    { pid: 101, command: "docker-daemon", cpu: 0.0, status: "Running" },
    { pid: 102, command: "pm2", cpu: 0.0, status: "Running" },
    { pid: 103, command: "nginx", cpu: 1.2, status: "Active" },
    { pid: 104, command: "kafka-stream", cpu: 0.5, status: "Sleeping" },
    { pid: 105, command: "redis-server", cpu: 2.1, status: "Syncing" },
    { pid: 106, command: "mysql-server", cpu: 0.1, status: "Active" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses((prev) =>
        prev.map((proc) => {
          // Only update CPU for active/running/syncing processes
          if (["Running", "Active", "Syncing"].includes(proc.status)) {
            const change = (Math.random() - 0.5) * 0.5
            const newCpu = Math.max(0, Math.min(100, proc.cpu + change))
            return { ...proc, cpu: Number(newCpu.toFixed(1)) }
          }
          return proc
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: Process["status"]) => {
    switch (status) {
      case "Running":
      case "Active":
        return "text-[#4ade80]" // Green
      case "Syncing":
        return "text-gray-400" // Gray for Syncing based on image
      case "Sleeping":
      case "Idle":
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="font-mono w-full h-full text-sm">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-4 text-gray-400 border-b border-[#38bdf8]/10 pb-2">
        <span>Running Processes</span>
        <span>Tasks: {processes.length} total</span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 mb-2 px-1">
        <div className="col-span-2">PID</div>
        <div className="col-span-5">COMMAND</div>
        <div className="col-span-2 text-right">%CPU</div>
        <div className="col-span-3 text-right">STATUS</div>
      </div>

      {/* Process List */}
      <div className="space-y-1">
        {processes.map((proc) => (
          <div
            key={proc.pid}
            className="grid grid-cols-12 gap-2 px-1 py-1 hover:bg-[#38bdf8]/5 rounded cursor-default transition-colors"
          >
            <div className="col-span-2 text-[#eab308]">{proc.pid}</div>
            <div className="col-span-5 text-gray-200">{proc.command}</div>
            <div className="col-span-2 text-right text-gray-400">
              {proc.cpu.toFixed(1)}%
            </div>
            <div className={`col-span-3 text-right ${getStatusColor(proc.status)}`}>
              {proc.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
