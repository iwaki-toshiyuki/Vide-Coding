'use client'

import { Textarea } from '@/components/ui/textarea'
import { MAX_CHARACTERS } from '@/constants/config'
import { cn } from '@/lib/utils'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function TextInput({
  value,
  onChange,
  disabled = false,
  className,
}: TextInputProps) {
  const characterCount = value.length
  const isOverLimit = characterCount > MAX_CHARACTERS
  const percentage = Math.min((characterCount / MAX_CHARACTERS) * 100, 100)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="分析したい文章を入力してください...&#10;&#10;例：日記、ブログ記事、メール文面、SNSの投稿など、あなたの書いた文章を貼り付けてください。"
          className={cn(
            'min-h-[200px] resize-none bg-white/80 backdrop-blur-sm',
            'border-white/40 focus:border-gray-300',
            'transition-all duration-200',
            isOverLimit && 'border-red-300 focus:border-red-400'
          )}
          aria-label="分析対象のテキスト"
          aria-describedby="character-count"
        />
      </div>

      {/* 文字数カウンター */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
            <div
              className={cn(
                'h-full transition-all duration-200',
                isOverLimit ? 'bg-red-500' : 'bg-blue-500'
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <span
          id="character-count"
          className={cn(
            'font-medium tabular-nums',
            isOverLimit ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {characterCount.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}文字
        </span>
      </div>

      {isOverLimit && (
        <p className="text-sm text-red-600">
          文字数が上限を超えています。{MAX_CHARACTERS}文字以内に収めてください。
        </p>
      )}
    </div>
  )
}
