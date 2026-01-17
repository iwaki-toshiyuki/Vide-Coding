export type TimerStatus = "idle" | "running" | "paused"
export type TimerMode = "work" | "break"

export interface TimerSettings {
  workMinutes: number
  workSeconds: number
  breakMinutes: number
  breakSeconds: number
}

export interface TimerState {
  status: TimerStatus
  mode: TimerMode
  remainingTime: number
  settings: TimerSettings
}

export const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: 25,
  workSeconds: 0,
  breakMinutes: 5,
  breakSeconds: 0,
}
