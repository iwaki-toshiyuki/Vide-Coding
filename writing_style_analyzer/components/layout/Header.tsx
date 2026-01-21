'use client'

import { Sparkles } from 'lucide-react'
import type { ThemeColor, ThemeColorName } from '@/types'
import { THEMES, THEME_NAMES } from '@/constants/themes'
import { cn } from '@/lib/utils'

interface HeaderProps {
  theme: ThemeColor
  onThemeChange: (theme: ThemeColorName) => void
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* ロゴ・タイトル */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm',
                theme.from,
                theme.to
              )}
            >
              <Sparkles className={cn('h-5 w-5', theme.text)} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Writing Style Analyzer
              </h1>
              <p className="text-xs text-gray-500">
                あなたの文体をAIが分析
              </p>
            </div>
          </div>

          {/* テーマ選択 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-gray-500">テーマ:</span>
            {THEME_NAMES.map((themeName) => (
              <button
                key={themeName}
                onClick={() => onThemeChange(themeName)}
                className={cn(
                  'h-6 w-6 rounded-full transition-all duration-200',
                  'bg-gradient-to-br shadow-sm',
                  THEMES[themeName].from,
                  THEMES[themeName].to,
                  theme.name === themeName
                    ? 'ring-2 ring-gray-400 ring-offset-2'
                    : 'hover:scale-110'
                )}
                title={THEMES[themeName].label}
                aria-label={`${THEMES[themeName].label}テーマに変更`}
              />
            ))}
          </div>
        </div>

        {/* 注意書き */}
        <p className="mt-3 text-xs text-gray-500">
          ※ Gemini AI（無料枠）を使用しています。サービス改善のため入力データが使用される場合があります。
        </p>
      </div>
    </header>
  )
}
