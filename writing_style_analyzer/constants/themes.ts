import type { ThemeColor, ThemeColorName } from '@/types'

// 8色テーマ定義
export const THEMES: Record<ThemeColorName, ThemeColor> = {
  sunshine: {
    name: 'sunshine',
    label: 'サンシャイン',
    from: 'from-yellow-100',
    to: 'to-yellow-200',
    border: 'border-yellow-300/30',
    text: 'text-yellow-700',
    button: 'bg-yellow-500 hover:bg-yellow-600',
  },
  blossom: {
    name: 'blossom',
    label: 'ブロッサム',
    from: 'from-pink-100',
    to: 'to-pink-200',
    border: 'border-pink-300/30',
    text: 'text-pink-700',
    button: 'bg-pink-500 hover:bg-pink-600',
  },
  ocean: {
    name: 'ocean',
    label: 'オーシャン',
    from: 'from-blue-100',
    to: 'to-blue-200',
    border: 'border-blue-300/30',
    text: 'text-blue-700',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  forest: {
    name: 'forest',
    label: 'フォレスト',
    from: 'from-green-100',
    to: 'to-green-200',
    border: 'border-green-300/30',
    text: 'text-green-700',
    button: 'bg-green-500 hover:bg-green-600',
  },
  lavender: {
    name: 'lavender',
    label: 'ラベンダー',
    from: 'from-purple-100',
    to: 'to-purple-200',
    border: 'border-purple-300/30',
    text: 'text-purple-700',
    button: 'bg-purple-500 hover:bg-purple-600',
  },
  sunset: {
    name: 'sunset',
    label: 'サンセット',
    from: 'from-orange-100',
    to: 'to-orange-200',
    border: 'border-orange-300/30',
    text: 'text-orange-700',
    button: 'bg-orange-500 hover:bg-orange-600',
  },
  mist: {
    name: 'mist',
    label: 'ミスト',
    from: 'from-slate-100',
    to: 'to-slate-200',
    border: 'border-slate-300/30',
    text: 'text-slate-700',
    button: 'bg-slate-500 hover:bg-slate-600',
  },
  mint: {
    name: 'mint',
    label: 'ミント',
    from: 'from-teal-100',
    to: 'to-teal-200',
    border: 'border-teal-300/30',
    text: 'text-teal-700',
    button: 'bg-teal-500 hover:bg-teal-600',
  },
}

export const THEME_NAMES = Object.keys(THEMES) as ThemeColorName[]
export const DEFAULT_THEME: ThemeColorName = 'ocean'
