// 付箋のカラー種別
export type StickyNoteColor =
  | 'sunshine' // 黄色系
  | 'coral' // コーラル系
  | 'lavender' // ラベンダー系
  | 'mint' // ミント系
  | 'sky' // スカイブルー系
  | 'peach' // ピーチ系
  | 'rose' // ローズ系
  | 'sage' // セージ系

// 付箋の位置
export interface Position {
  x: number
  y: number
}

// 付箋データの型定義
export interface StickyNote {
  id: string
  content: string
  color: StickyNoteColor
  position: Position
  isPinned: boolean
  createdAt: number
  updatedAt: number
}

// 付箋の作成時に必要なデータ
export type CreateStickyNoteInput = Pick<StickyNote, 'content' | 'color'> &
  Partial<Pick<StickyNote, 'position' | 'isPinned'>>

// 付箋の更新時に必要なデータ
export type UpdateStickyNoteInput = Partial<
  Omit<StickyNote, 'id' | 'createdAt'>
>

// 固定可能な付箋の最大数
export const MAX_PINNED_NOTES = 3
