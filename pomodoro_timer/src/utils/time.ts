/**
 * Format seconds to MM:SS format
 */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

/**
 * Calculate total seconds from minutes and seconds
 */
export function calculateTotalSeconds(minutes: number, seconds: number): number {
  return minutes * 60 + seconds
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(remainingTime: number, totalTime: number): number {
  if (totalTime === 0) return 0
  return ((totalTime - remainingTime) / totalTime) * 100
}
