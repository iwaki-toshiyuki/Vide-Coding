'use client'

import { History, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HistoryItem } from './HistoryItem'
import { EmptyState } from '@/components/common/EmptyState'
import type { AnalysisResult } from '@/types'
import { cn } from '@/lib/utils'

interface HistoryListProps {
  history: AnalysisResult[]
  onSelect: (item: AnalysisResult) => void
  onDelete: (id: string) => void
  onClear: () => void
  className?: string
}

export function HistoryList({
  history,
  onSelect,
  onDelete,
  onClear,
  className,
}: HistoryListProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">履歴</h2>
          <span className="text-sm text-gray-500">({history.length}件)</span>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="gap-1 text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
            すべて削除
          </Button>
        )}
      </div>

      {/* 履歴リスト */}
      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="履歴がありません"
          description="文章を分析すると、ここに履歴が表示されます。最大5件まで保存されます。"
        />
      )}
    </div>
  )
}
