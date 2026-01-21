'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { ThemeColorName, UseThemeReturn } from '@/types'
import { THEMES, DEFAULT_THEME } from '@/constants/themes'
import { STORAGE_KEYS } from '@/constants/config'

// ローカルストレージからテーマを取得
function getSnapshot(): ThemeColorName {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(STORAGE_KEYS.THEME)
  if (stored && stored in THEMES) {
    return stored as ThemeColorName
  }
  return DEFAULT_THEME
}

// サーバーサイドではデフォルトテーマを返す
function getServerSnapshot(): ThemeColorName {
  return DEFAULT_THEME
}

// ストレージイベントを購読
function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function useTheme(): UseThemeReturn {
  // useSyncExternalStoreでローカルストレージと同期
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // テーマを設定してローカルストレージに保存
  const setTheme = useCallback((newTheme: ThemeColorName) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme)
      window.dispatchEvent(new StorageEvent('storage'))
    } catch {
      // ストレージエラーは無視
    }
  }, [])

  return {
    theme,
    setTheme,
    themeColor: THEMES[theme],
  }
}
