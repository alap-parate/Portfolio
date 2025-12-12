export function ContactSection() {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 px-6 container mx-auto">
      <div className="w-fit flex flex-col items-center gap-2 bg-[#0d1117]/80 backdrop-blur-md border border-[#38bdf8]/20 rounded-2xl px-4 py-3">
        <span className="font-mono text-sm text-muted-foreground flex items-center">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
          STATUS: AVAILABLE
        </span>
        <span className="font-mono font-bold text-sm text-foreground bg-[#38bdf8] rounded-md px-4 py-3">
          INITIATE_CONTACT()
        </span>
      </div>
    </div>
  );
}
