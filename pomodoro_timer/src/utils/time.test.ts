import { describe, it, expect } from "vitest"
import { formatTime, calculateTotalSeconds, calculateProgress } from "./time"

describe("formatTime", () => {
  it("should format 0 seconds as 00:00", () => {
    expect(formatTime(0)).toBe("00:00")
  })

  it("should format seconds less than 10 with leading zero", () => {
    expect(formatTime(5)).toBe("00:05")
  })

  it("should format 60 seconds as 01:00", () => {
    expect(formatTime(60)).toBe("01:00")
  })

  it("should format 90 seconds as 01:30", () => {
    expect(formatTime(90)).toBe("01:30")
  })

  it("should format 25 minutes as 25:00", () => {
    expect(formatTime(25 * 60)).toBe("25:00")
  })

  it("should format 25 minutes and 30 seconds as 25:30", () => {
    expect(formatTime(25 * 60 + 30)).toBe("25:30")
  })
})

describe("calculateTotalSeconds", () => {
  it("should calculate 0 for 0 minutes and 0 seconds", () => {
    expect(calculateTotalSeconds(0, 0)).toBe(0)
  })

  it("should calculate 60 for 1 minute and 0 seconds", () => {
    expect(calculateTotalSeconds(1, 0)).toBe(60)
  })

  it("should calculate 90 for 1 minute and 30 seconds", () => {
    expect(calculateTotalSeconds(1, 30)).toBe(90)
  })

  it("should calculate 1500 for 25 minutes and 0 seconds", () => {
    expect(calculateTotalSeconds(25, 0)).toBe(1500)
  })
})

describe("calculateProgress", () => {
  it("should return 0 when remaining time equals total time", () => {
    expect(calculateProgress(100, 100)).toBe(0)
  })

  it("should return 100 when remaining time is 0", () => {
    expect(calculateProgress(0, 100)).toBe(100)
  })

  it("should return 50 when half the time has passed", () => {
    expect(calculateProgress(50, 100)).toBe(50)
  })

  it("should return 0 when total time is 0", () => {
    expect(calculateProgress(0, 0)).toBe(0)
  })
})
