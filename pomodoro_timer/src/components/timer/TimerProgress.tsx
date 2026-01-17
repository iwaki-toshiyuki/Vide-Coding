import { useTimerContext } from "@/contexts/TimerContext"
import { calculateProgress } from "@/utils/time"

export function TimerProgress() {
  const { remainingTime, totalTime, mode, status } = useTimerContext()
  const progress = calculateProgress(remainingTime, totalTime)

  // 円周の計算
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // モードに応じたグラデーションカラー
  const gradientId = mode === "work" ? "workGradient" : "breakGradient"

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
      <svg
        className={`w-full h-full transform -rotate-90 ${status === "running" ? "animate-pulse-glow" : ""}`}
        viewBox="0 0 280 280"
      >
        {/* グラデーション定義 */}
        <defs>
          <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
          <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 180)" />
            <stop offset="100%" stopColor="oklch(0.7 0.15 150)" />
          </linearGradient>
          {/* グローエフェクト用フィルター */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 背景の円（トラック） */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted/50"
        />

        {/* プログレス円 */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter={status === "running" ? "url(#glow)" : undefined}
          className={`transition-all duration-1000 ease-linear ${
            status === "running" ? "opacity-100" : "opacity-80"
          }`}
        />
      </svg>

      {/* 中央のモード表示 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              mode === "work"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            }`}
          >
            {mode === "work" ? "集中" : "休憩"}
          </span>
        </div>
      </div>
    </div>
  )
}
