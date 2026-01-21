'use client'

import { useState, useCallback } from 'react'
import type { AnalysisState, UseAnalyzerReturn } from '@/types'
import { MAX_CHARACTERS } from '@/constants/config'

export function useAnalyzer(): UseAnalyzerReturn {
  const [state, setState] = useState<AnalysisState>('idle')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyze = useCallback(async (text: string) => {
    // 入力バリデーション
    if (!text.trim()) {
      setError('テキストを入力してください')
      setState('error')
      return
    }

    if (text.length > MAX_CHARACTERS) {
      setError(`テキストは${MAX_CHARACTERS}文字以内で入力してください`)
      setState('error')
      return
    }

    setState('loading')
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '分析に失敗しました')
      }

      const data = await response.json()
      setResult(data.result)
      setState('success')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '予期せぬエラーが発生しました'
      setError(message)
      setState('error')
    }
  }, [])

  const reset = useCallback(() => {
    setState('idle')
    setResult(null)
    setError(null)
  }, [])

  return {
    state,
    result,
    error,
    analyze,
    reset,
  }
}
