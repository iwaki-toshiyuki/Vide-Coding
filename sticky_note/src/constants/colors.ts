import type { StickyNoteColor } from '@/types'

// 付箋のカラー定義
export interface ColorDefinition {
  name: string // 表示名
  value: StickyNoteColor // 内部値
  class: string // Tailwindクラス（グラデーション背景 + ボーダー）
  accent: string // アクセントカラー（HEX）
}

// 8色のテーマカラー
export const COLORS: readonly ColorDefinition[] = [
  {
    name: 'サンシャイン',
    value: 'sunshine',
    class: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300/30',
    accent: '#FCD34D',
  },
  {
    name: 'コーラル',
    value: 'coral',
    class: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300/30',
    accent: '#FB923C',
  },
  {
    name: 'ラベンダー',
    value: 'lavender',
    class: 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300/30',
    accent: '#C084FC',
  },
  {
    name: 'ミント',
    value: 'mint',
    class: 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-300/30',
    accent: '#34D399',
  },
  {
    name: 'スカイ',
    value: 'sky',
    class: 'bg-gradient-to-br from-sky-100 to-sky-200 border-sky-300/30',
    accent: '#38BDF8',
  },
  {
    name: 'ピーチ',
    value: 'peach',
    class: 'bg-gradient-to-br from-rose-100 to-rose-200 border-rose-300/30',
    accent: '#FDA4AF',
  },
  {
    name: 'ローズ',
    value: 'rose',
    class: 'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300/30',
    accent: '#F472B6',
  },
  {
    name: 'セージ',
    value: 'sage',
    class: 'bg-gradient-to-br from-green-100 to-green-200 border-green-300/30',
    accent: '#86EFAC',
  },
] as const

// カラー値からカラー定義を取得
export const getColorDefinition = (
  color: StickyNoteColor
): ColorDefinition => {
  const found = COLORS.find((c) => c.value === color)
  return found ?? COLORS[0]
}

// デフォルトカラー
export const DEFAULT_COLOR: StickyNoteColor = 'sunshine'
