import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTimerContext } from "@/contexts/TimerContext"

export function TimerControls() {
  const { status, start, pause, reset, playClick } = useTimerContext()

  const handleStart = () => {
    playClick()
    start()
  }

  const handlePause = () => {
    playClick()
    pause()
  }

  const handleReset = () => {
    playClick()
    reset()
  }

  return (
    <div className="flex items-center gap-4">
      {/* メインコントロールボタン（再生/一時停止） */}
      {status === "running" ? (
        <Button
          size="lg"
          variant="outline"
          onClick={handlePause}
          className="w-16 h-16 rounded-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-modern"
        >
          <Pause className="h-7 w-7 text-primary" />
        </Button>
      ) : (
        <Button
          size="lg"
          onClick={handleStart}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] hover:opacity-90 transition-all duration-300 shadow-modern-lg btn-modern"
        >
          <Play className="h-7 w-7 ml-1 text-white" />
        </Button>
      )}

      {/* リセットボタン */}
      <Button
        size="lg"
        variant="ghost"
        onClick={handleReset}
        className="w-12 h-12 rounded-full hover:bg-muted transition-all duration-300"
        disabled={status === "idle"}
      >
        <RotateCcw className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  )
}
