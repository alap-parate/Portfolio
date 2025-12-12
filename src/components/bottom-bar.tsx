export function BottomBar() {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-6 py-1 border-t border-[#38bdf8]/10 z-40 bg-[#0b0b0b]">
        <span className="font-mono text-xs text-muted-foreground">
          STATUS: OPERATIONAL
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted-foreground">
            CPU: 12%
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            MEM: 32GB
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            NET: 1Gbps
          </span>
        </div>
      </div>
    </>
  );
}
