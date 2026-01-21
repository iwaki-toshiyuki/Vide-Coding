'use client'

import { Trash2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { AnalysisResult } from '@/types'
import { THEMES } from '@/constants/themes'
import { cn } from '@/lib/utils'

interface HistoryItemProps {
  item: AnalysisResult
  onSelect: (item: AnalysisResult) => void
  onDelete: (id: string) => void
}

export function HistoryItem({ item, onSelect, onDelete }: HistoryItemProps) {
  const theme = THEMES[item.theme]
  const date = new Date(item.createdAt)
  const formattedDate = date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  // テキストのプレビュー（最初の50文字）
  const preview =
    item.text.length > 50 ? `${item.text.slice(0, 50)}...` : item.text

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden border-white/40 bg-white/60 backdrop-blur-sm',
        'transition-all duration-200 hover:bg-white/80 hover:shadow-md'
      )}
      onClick={() => onSelect(item)}
    >
      <div className="p-4">
        {/* ヘッダー */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-3 w-3 rounded-full bg-gradient-to-br',
                theme.from,
                theme.to
              )}
              title={theme.label}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id)
              }}
              className="h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="履歴を削除"
            >
              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        </div>

        {/* プレビュー */}
        <p className="line-clamp-2 text-sm text-gray-700">{preview}</p>
      </div>
    </Card>
  )
}
