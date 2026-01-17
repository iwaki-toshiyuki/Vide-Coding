import { useTimerContext } from "@/contexts/TimerContext"
import { Confetti } from "./Confetti"

/**
 * タイマー完了時に紙吹雪エフェクトを表示するラッパーコンポーネント
 */
export function ConfettiEffect() {
  const { showConfetti, hideConfetti } = useTimerContext()

  return (
    <Confetti
      isActive={showConfetti}
      duration={4000}
      particleCount={200}
      onComplete={hideConfetti}
    />
  )
}
