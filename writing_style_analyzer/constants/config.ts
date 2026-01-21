// アプリケーション設定
export const MAX_CHARACTERS = 2000
export const MAX_HISTORY = 5

// ローカルストレージキー
export const STORAGE_KEYS = {
  HISTORY: 'writing-style-analyzer-history',
  THEME: 'writing-style-analyzer-theme',
} as const

// アニメーション設定
export const ANIMATION = {
  DURATION_BASE: 200,
  DURATION_SPECIAL: 300,
  EASING: 'ease-out',
} as const
