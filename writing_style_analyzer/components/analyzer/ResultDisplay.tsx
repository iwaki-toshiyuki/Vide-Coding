'use client'

import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/common/CopyButton'
import { cn } from '@/lib/utils'

interface ResultDisplayProps {
  result: string
  className?: string
}

export function ResultDisplay({ result, className }: ResultDisplayProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">分析結果</h2>
        <CopyButton text={result} />
      </div>

      {/* マークダウン結果 */}
      <div className="prose prose-sm max-w-none rounded-xl bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="mb-3 mt-6 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800 first:mt-0">
                {children}
              </h2>
            ),
            ul: ({ children }) => (
              <ul className="my-2 list-disc space-y-1 pl-5 text-gray-700">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="text-gray-700">{children}</li>
            ),
            p: ({ children }) => (
              <p className="my-2 text-gray-700 leading-relaxed">{children}</p>
            ),
            hr: () => <hr className="my-6 border-gray-200" />,
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
          }}
        >
          {result}
        </ReactMarkdown>
      </div>
    </div>
  )
}
