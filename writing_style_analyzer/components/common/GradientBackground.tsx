'use client'

import type { ThemeColor } from '@/types'
import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  theme: ThemeColor
  children: React.ReactNode
  className?: string
}

export function GradientBackground({
  theme,
  children,
  className,
}: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br transition-colors duration-300',
        theme.from,
        theme.to,
        className
      )}
    >
      {/* 装飾的な背景要素 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full opacity-30 blur-3xl',
            theme.from.replace('from-', 'bg-')
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full opacity-30 blur-3xl',
            theme.to.replace('to-', 'bg-')
          )}
        />
      </div>
      {/* コンテンツ */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
