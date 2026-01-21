'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingAnimationProps {
  className?: string
}

export function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={cn('space-y-4 p-6', className)}>
      {/* タイトルスケルトン */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3 bg-white/50" />
        <Skeleton className="h-4 w-2/3 bg-white/50" />
      </div>

      {/* セクションスケルトン */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4 bg-white/50" />
        <div className="space-y-2 pl-4">
          <Skeleton className="h-4 w-full bg-white/50" />
          <Skeleton className="h-4 w-5/6 bg-white/50" />
          <Skeleton className="h-4 w-4/5 bg-white/50" />
        </div>
      </div>

      {/* 別のセクション */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3 bg-white/50" />
        <div className="space-y-2 pl-4">
          <Skeleton className="h-4 w-full bg-white/50" />
          <Skeleton className="h-4 w-3/4 bg-white/50" />
        </div>
      </div>

      {/* 分析中メッセージ */}
      <div className="flex items-center justify-center pt-4">
        <p className="text-sm text-gray-500 animate-pulse">
          AIが文体を分析しています...
        </p>
      </div>
    </div>
  )
}
