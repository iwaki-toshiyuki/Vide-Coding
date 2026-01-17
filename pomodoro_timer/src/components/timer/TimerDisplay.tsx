import { useTimerContext } from "@/contexts/TimerContext"
import { formatTime } from "@/utils/time"

export function TimerDisplay() {
  const { remainingTime, status, mode } = useTimerContext()

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div
        className={`text-5xl sm:text-6xl md:text-7xl font-mono font-bold tabular-nums tracking-tight transition-all duration-300 ${
          status === "running"
            ? "gradient-text"
            : mode === "work"
              ? "text-foreground"
              : "text-accent"
        }`}
      >
        {formatTime(remainingTime)}
      </div>
      {/* 状態インジケーター */}
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            status === "running"
              ? "bg-primary animate-pulse"
              : status === "paused"
                ? "bg-yellow-500"
                : "bg-muted-foreground/30"
          }`}
        />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {status === "running" ? "実行中" : status === "paused" ? "一時停止" : "待機中"}
        </span>
      </div>
    </div>
  )
}
