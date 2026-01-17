import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useTimer } from "@/hooks/useTimer"
import { useSound } from "@/hooks/useSound"
import type { TimerStatus, TimerMode, TimerSettings } from "@/types/timer"

interface TimerContextValue {
  status: TimerStatus
  mode: TimerMode
  remainingTime: number
  totalTime: number
  settings: TimerSettings
  showConfetti: boolean
  start: () => void
  pause: () => void
  reset: () => void
  switchMode: (mode: TimerMode) => void
  updateSettings: (settings: TimerSettings) => void
  playNotification: () => void
  playClick: () => void
  hideConfetti: () => void
}

const TimerContext = createContext<TimerContextValue | null>(null)

interface TimerProviderProps {
  children: ReactNode
}

export function TimerProvider({ children }: TimerProviderProps) {
  const { playNotification, playClick } = useSound()
  const [showConfetti, setShowConfetti] = useState(false)

  // タイマー完了時のコールバック
  const handleComplete = useCallback(() => {
    playNotification()
    setShowConfetti(true)
  }, [playNotification])

  // 紙吹雪を非表示にする
  const hideConfetti = useCallback(() => {
    setShowConfetti(false)
  }, [])

  const timer = useTimer({
    onComplete: handleComplete,
  })

  const value: TimerContextValue = {
    ...timer,
    showConfetti,
    playNotification,
    playClick,
    hideConfetti,
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export function useTimerContext() {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider")
  }
  return context
}
