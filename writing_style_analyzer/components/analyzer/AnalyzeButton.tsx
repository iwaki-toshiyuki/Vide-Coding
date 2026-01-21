'use client'

import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ThemeColor, AnalysisState } from '@/types'
import { cn } from '@/lib/utils'

interface AnalyzeButtonProps {
  onClick: () => void
  state: AnalysisState
  disabled?: boolean
  theme: ThemeColor
  className?: string
}

export function AnalyzeButton({
  onClick,
  state,
  disabled = false,
  theme,
  className,
}: AnalyzeButtonProps) {
  const isLoading = state === 'loading'

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'w-full gap-2 text-white shadow-lg transition-all duration-200',
        theme.button,
        'hover:shadow-xl active:scale-[0.98]',
        className
      )}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          分析中...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          文体を分析する
        </>
      )}
    </Button>
  )
}
