import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, YAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

interface GraphData {
  data: { value: number }[]
  currentValue: number
}

const cpuChartConfig = {
  value: {
    label: "CPU",
    color: "#a3e635",
  },
} satisfies ChartConfig

const memoryChartConfig = {
  value: {
    label: "Memory",
    color: "#38bdf8",
  },
} satisfies ChartConfig

export function SystemMonitor() {
  const [cpuData, setCpuData] = useState<GraphData>({
    data: Array.from({ length: 50 }, () => ({ value: Math.random() * 30 + 10 })),
    currentValue: 14,
  })
  const [memoryData, setMemoryData] = useState<GraphData>({
    data: Array.from({ length: 50 }, () => ({ value: Math.random() * 40 + 30 })),
    currentValue: 27,
  })
  const [networkIn, setNetworkIn] = useState(1.2)
  const [networkOut, setNetworkOut] = useState(840)

  useEffect(() => {
    const interval = setInterval(() => {
      // Update CPU
      setCpuData((prev) => {
        const newValue = Math.max(5, Math.min(50, prev.currentValue + (Math.random() - 0.5) * 10))
        return {
          data: [...prev.data.slice(1), { value: newValue }],
          currentValue: Math.round(newValue),
        }
      })

      // Update Memory
      setMemoryData((prev) => {
        const newValue = Math.max(20, Math.min(70, prev.currentValue + (Math.random() - 0.5) * 5))
        return {
          data: [...prev.data.slice(1), { value: newValue }],
          currentValue: Math.round(newValue),
        }
      })

      // Update Network
      setNetworkIn((prev) => Math.max(0.5, Math.min(2.5, prev + (Math.random() - 0.5) * 0.3)))
      setNetworkOut((prev) => Math.max(500, Math.min(1200, prev + (Math.random() - 0.5) * 100)))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono w-full h-full space-y-4 p-2">
      {/* CPU Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">CPU Load</span>
          <span className="text-sm text-[#a3e635]">{cpuData.currentValue}%</span>
        </div>
        <div className="bg-[#0a0a0a] rounded border border-[#38bdf8]/10">
          <ChartContainer config={cpuChartConfig} className="h-[70px] w-full">
            <AreaChart
              data={cpuData.data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(56, 189, 248, 0.1)"
                vertical={true}
                horizontal={true}
              />
              <YAxis domain={[0, 100]} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#a3e635"
                strokeWidth={2}
                fill="#a3e635"
                fillOpacity={0.15}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Memory Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Memory</span>
          <span className="text-sm text-[#38bdf8]">{memoryData.currentValue}GB / 64GB</span>
        </div>
        <div className="bg-[#0a0a0a] rounded border border-[#38bdf8]/10">
          <ChartContainer config={memoryChartConfig} className="h-[70px] w-full">
            <AreaChart
              data={memoryData.data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(56, 189, 248, 0.1)"
                vertical={true}
                horizontal={true}
              />
              <YAxis domain={[0, 100]} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="#38bdf8"
                fillOpacity={0.15}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Network Section */}
      <div className="flex justify-between pt-2 border-t border-[#38bdf8]/10">
        <div>
          <span className="text-[10px] text-gray-500 block">NETWORK IN</span>
          <span className="text-sm text-gray-300">{networkIn.toFixed(1)} GB/s</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-500 block">NETWORK OUT</span>
          <span className="text-sm text-gray-300">{Math.round(networkOut)} MB/s</span>
        </div>
      </div>
    </div>
  )
}
