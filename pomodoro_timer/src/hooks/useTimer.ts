import { useState, useEffect, useCallback, useRef } from "react"
import type { TimerStatus, TimerMode, TimerSettings } from "@/types/timer"
import { DEFAULT_SETTINGS } from "@/types/timer"
import { calculateTotalSeconds } from "@/utils/time"
import { TIMER_INTERVAL_MS, SETTINGS_STORAGE_KEY } from "@/utils/constants"

interface UseTimerOptions {
  onComplete?: () => void
}

export function useTimer(options: UseTimerOptions = {}) {
  const { onComplete } = options

  const [settings, setSettings] = useState<TimerSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return DEFAULT_SETTINGS
      }
    }
    return DEFAULT_SETTINGS
  })

  const [status, setStatus] = useState<TimerStatus>("idle")
  const [mode, setMode] = useState<TimerMode>("work")
  const [remainingTime, setRemainingTime] = useState(() =>
    calculateTotalSeconds(settings.workMinutes, settings.workSeconds)
  )

  const intervalRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const getTotalTime = useCallback(() => {
    if (mode === "work") {
      return calculateTotalSeconds(settings.workMinutes, settings.workSeconds)
    }
    return calculateTotalSeconds(settings.breakMinutes, settings.breakSeconds)
  }, [mode, settings])

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (status === "running") return
    setStatus("running")

    intervalRef.current = window.setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearTimerInterval()
          setStatus("idle")
          onCompleteRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, TIMER_INTERVAL_MS)
  }, [status, clearTimerInterval])

  const pause = useCallback(() => {
    if (status !== "running") return
    clearTimerInterval()
    setStatus("paused")
  }, [status, clearTimerInterval])

  const reset = useCallback(() => {
    clearTimerInterval()
    setStatus("idle")
    setRemainingTime(getTotalTime())
  }, [clearTimerInterval, getTotalTime])

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      clearTimerInterval()
      setStatus("idle")
      setMode(newMode)
      if (newMode === "work") {
        setRemainingTime(calculateTotalSeconds(settings.workMinutes, settings.workSeconds))
      } else {
        setRemainingTime(calculateTotalSeconds(settings.breakMinutes, settings.breakSeconds))
      }
    },
    [clearTimerInterval, settings]
  )

  const updateSettings = useCallback(
    (newSettings: TimerSettings) => {
      setSettings(newSettings)
      if (status === "idle") {
        if (mode === "work") {
          setRemainingTime(calculateTotalSeconds(newSettings.workMinutes, newSettings.workSeconds))
        } else {
          setRemainingTime(calculateTotalSeconds(newSettings.breakMinutes, newSettings.breakSeconds))
        }
      }
    },
    [status, mode]
  )

  useEffect(() => {
    return () => clearTimerInterval()
  }, [clearTimerInterval])

  return {
    status,
    mode,
    remainingTime,
    settings,
    totalTime: getTotalTime(),
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  }
}
