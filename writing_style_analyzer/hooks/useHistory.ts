'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { AnalysisResult, UseHistoryReturn } from '@/types'
import { STORAGE_KEYS, MAX_HISTORY } from '@/constants/config'

// ローカルストレージから履歴を取得
function getStoredHistory(): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY)
    if (stored) {
      return JSON.parse(stored) as AnalysisResult[]
    }
  } catch {
    // パースエラー時は空の履歴を使用
  }
  return []
}

// ローカルストレージのスナップショットを取得
function getSnapshot(): string {
  if (typeof window === 'undefined') return '[]'
  return localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]'
}

// サーバーサイドでは空のスナップショットを返す
function getServerSnapshot(): string {
  return '[]'
}

// ストレージイベントを購読
function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function useHistory(): UseHistoryReturn {
  // useSyncExternalStoreでローカルストレージと同期
  const historyJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const history: AnalysisResult[] = (() => {
    try {
      return JSON.parse(historyJson) as AnalysisResult[]
    } catch {
      return []
    }
  })()

  // 履歴に追加（最大5件）
  const addToHistory = useCallback(
    (item: Omit<AnalysisResult, 'id' | 'createdAt'>) => {
      const newItem: AnalysisResult = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }

      const current = getStoredHistory()
      const updated = [newItem, ...current].slice(0, MAX_HISTORY)

      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated))
        // ストレージイベントを手動でトリガー
        window.dispatchEvent(new StorageEvent('storage'))
      } catch {
        // ストレージエラーは無視
      }
    },
    []
  )

  // 履歴から削除
  const removeFromHistory = useCallback(
    (id: string) => {
      const current = getStoredHistory()
      const updated = current.filter((item) => item.id !== id)

      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated))
        window.dispatchEvent(new StorageEvent('storage'))
      } catch {
        // エラーは無視
      }
    },
    []
  )

  // 履歴をクリア
  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY)
      window.dispatchEvent(new StorageEvent('storage'))
    } catch {
      // エラーは無視
    }
  }, [])

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
