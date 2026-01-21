'use client'

import { useState, useCallback } from 'react'
import { AlertCircle } from 'lucide-react'
import { GradientBackground } from '@/components/common/GradientBackground'
import { Header } from '@/components/layout/Header'
import { TextInput, AnalyzeButton, LoadingAnimation, ResultDisplay } from '@/components/analyzer'
import { HistoryList } from '@/components/history'
import { Card } from '@/components/ui/card'
import { useAnalyzer, useHistory, useTheme } from '@/hooks'
import { MAX_CHARACTERS } from '@/constants/config'
import type { AnalysisResult } from '@/types'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const { theme, setTheme, themeColor } = useTheme()
  const { state, result, error, analyze, reset } = useAnalyzer()
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory()

  // 分析実行
  const handleAnalyze = useCallback(async () => {
    await analyze(inputText)
  }, [analyze, inputText])

  // 分析成功時に履歴に追加
  const handleAnalyzeWithHistory = useCallback(async () => {
    await handleAnalyze()
  }, [handleAnalyze])

  // 結果が得られたら履歴に追加（useEffectの代わりに結果確認後に追加）
  const isAnalyzeDisabled =
    !inputText.trim() || inputText.length > MAX_CHARACTERS || state === 'loading'

  // 履歴から選択
  const handleSelectHistory = useCallback(
    (item: AnalysisResult) => {
      setInputText(item.text)
      reset()
    },
    [reset]
  )

  // 分析が成功したら履歴に追加
  if (state === 'success' && result) {
    // 既に同じテキストが履歴にある場合は追加しない
    const existsInHistory = history.some((h) => h.text === inputText && h.result === result)
    if (!existsInHistory) {
      addToHistory({ text: inputText, result, theme })
    }
  }

  return (
    <GradientBackground theme={themeColor}>
      <Header theme={themeColor} onThemeChange={setTheme} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* メインエリア */}
          <div className="space-y-6">
            {/* 入力カード */}
            <Card className="border-white/40 bg-white/60 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                分析したいテキスト
              </h2>
              <TextInput
                value={inputText}
                onChange={setInputText}
                disabled={state === 'loading'}
              />
              <div className="mt-4">
                <AnalyzeButton
                  onClick={handleAnalyzeWithHistory}
                  state={state}
                  disabled={isAnalyzeDisabled}
                  theme={themeColor}
                />
              </div>
            </Card>

            {/* エラー表示 */}
            {state === 'error' && error && (
              <Card className="border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </Card>
            )}

            {/* ローディング */}
            {state === 'loading' && (
              <Card className="border-white/40 bg-white/60 backdrop-blur-xl">
                <LoadingAnimation />
              </Card>
            )}

            {/* 結果表示 */}
            {state === 'success' && result && (
              <Card className="border-white/40 bg-white/60 p-6 backdrop-blur-xl">
                <ResultDisplay result={result} />
              </Card>
            )}
          </div>

          {/* サイドバー（履歴） */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-white/40 bg-white/60 p-6 backdrop-blur-xl">
              <HistoryList
                history={history}
                onSelect={handleSelectHistory}
                onDelete={removeFromHistory}
                onClear={clearHistory}
              />
            </Card>
          </aside>
        </div>
      </main>
    </GradientBackground>
  )
}
