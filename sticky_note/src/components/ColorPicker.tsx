import { Check } from 'lucide-react'
import { COLORS, type ColorDefinition } from '@/constants/colors'
import type { StickyNoteColor } from '@/types'

interface ColorPickerProps {
  selectedColor: StickyNoteColor
  onSelectColor: (color: StickyNoteColor) => void
  className?: string
}

// カラーピッカーコンポーネント
// Apple風のエレガントな8色パレット
export const ColorPicker = ({
  selectedColor,
  onSelectColor,
  className = '',
}: ColorPickerProps) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl p-3 border border-white/50 ${className}`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* ヘッダー */}
      <p className="text-xs font-medium text-gray-500 mb-2 px-1">カラーを選択</p>

      {/* カラーグリッド */}
      <div className="grid grid-cols-4 gap-2">
        {COLORS.map((color: ColorDefinition) => {
          const isSelected = selectedColor === color.value
          return (
            <button
              key={color.value}
              type="button"
              onClick={() => onSelectColor(color.value)}
              className={`
                relative w-9 h-9 rounded-xl overflow-hidden
                border-2 transition-all duration-200
                hover:scale-110 hover:shadow-lg cursor-pointer
                active:scale-95
                ${
                  isSelected
                    ? 'border-gray-700 scale-105 ring-2 ring-gray-400/40 ring-offset-1'
                    : 'border-white/60 hover:border-gray-300'
                }
              `}
              title={color.name}
              aria-label={`${color.name}を選択`}
              aria-pressed={isSelected}
              style={{
                boxShadow: isSelected
                  ? `0 4px 12px ${color.accent}40`
                  : `0 2px 6px ${color.accent}20`,
              }}
            >
              {/* カラー背景 */}
              <div className={`absolute inset-0 ${color.class}`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />

              {/* 選択チェックマーク */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
