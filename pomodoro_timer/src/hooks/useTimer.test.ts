import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useTimer } from "./useTimer"

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current.status).toBe("idle")
    expect(result.current.mode).toBe("work")
    expect(result.current.remainingTime).toBe(25 * 60)
    expect(result.current.settings.workMinutes).toBe(25)
    expect(result.current.settings.breakMinutes).toBe(5)
  })

  it("should start the timer", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.start()
    })

    expect(result.current.status).toBe("running")
  })

  it("should decrement time when running", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.remainingTime).toBe(25 * 60 - 1)
  })

  it("should pause the timer", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    const timeBeforePause = result.current.remainingTime

    act(() => {
      result.current.pause()
    })

    expect(result.current.status).toBe("paused")

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.remainingTime).toBe(timeBeforePause)
  })

  it("should reset the timer", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.status).toBe("idle")
    expect(result.current.remainingTime).toBe(25 * 60)
  })

  it("should switch between work and break modes", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.switchMode("break")
    })

    expect(result.current.mode).toBe("break")
    expect(result.current.remainingTime).toBe(5 * 60)

    act(() => {
      result.current.switchMode("work")
    })

    expect(result.current.mode).toBe("work")
    expect(result.current.remainingTime).toBe(25 * 60)
  })

  it("should update settings", () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.updateSettings({
        workMinutes: 30,
        workSeconds: 0,
        breakMinutes: 10,
        breakSeconds: 0,
      })
    })

    expect(result.current.settings.workMinutes).toBe(30)
    expect(result.current.settings.breakMinutes).toBe(10)
    expect(result.current.remainingTime).toBe(30 * 60)
  })

  it("should call onComplete when timer finishes", () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer({ onComplete }))

    act(() => {
      result.current.updateSettings({
        workMinutes: 0,
        workSeconds: 2,
        breakMinutes: 5,
        breakSeconds: 0,
      })
    })

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.status).toBe("idle")
  })
})
