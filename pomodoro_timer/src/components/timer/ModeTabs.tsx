import { Briefcase, Coffee } from "lucide-react"
import { useTimerContext } from "@/contexts/TimerContext"
import type { TimerMode } from "@/types/timer"

export function ModeTabs() {
  const { mode, switchMode, status, playClick } = useTimerContext()

  const handleModeChange = (newMode: TimerMode) => {
    if (status !== "running" && mode !== newMode) {
      playClick()
      switchMode(newMode)
    }
  }

  return (
    <div className="w-full max-w-xs">
      <div className="flex gap-2 p-1 rounded-xl bg-muted/50">
        {/* 集中モードタブ */}
        <button
          onClick={() => handleModeChange("work")}
          disabled={status === "running"}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
            mode === "work"
              ? "bg-card text-foreground shadow-modern"
              : "text-muted-foreground hover:text-foreground"
          } ${status === "running" ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <Briefcase className="h-4 w-4" />
          <span>集中</span>
        </button>

        {/* 休憩モードタブ */}
        <button
          onClick={() => handleModeChange("break")}
          disabled={status === "running"}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
            mode === "break"
              ? "bg-card text-foreground shadow-modern"
              : "text-muted-foreground hover:text-foreground"
          } ${status === "running" ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <Coffee className="h-4 w-4" />
          <span>休憩</span>
        </button>
      </div>
    </div>
  )
}
