import { useState, useRef, useEffect, useCallback } from 'react'
import { Trash2, Pin, Palette, GripHorizontal } from 'lucide-react'
import type { StickyNote as StickyNoteType, Position, StickyNoteColor } from '@/types'
import { MAX_PINNED_NOTES } from '@/types'
import { getColorDefinition } from '@/constants/colors'
import { ColorPicker } from './ColorPicker'
import { Textarea } from '@/components/ui/textarea'

interface StickyNoteProps {
  note: StickyNoteType
  onUpdate: (content: string) => void
  onDelete: () => void
  onPositionChange: (position: Position) => void
  onColorChange: (color: StickyNoteColor) => void
  onTogglePin: () => boolean
  canPin: boolean
  pinnedCount: number
}

// 付箋コンポーネント
// Apple風モダンデザイン with Glassmorphism
export const StickyNoteComponent = ({
  note,
  onUpdate,
  onDelete,
  onPositionChange,
  onColorChange,
  onTogglePin,
  canPin,
  pinnedCount,
}: StickyNoteProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(note.content)

  const noteRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const initialPosRef = useRef<Position>({ x: 0, y: 0 })

  const colorDef = getColorDefinition(note.color)

  // ドラッグ開始
  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      if (isEditing) return
      setIsDragging(true)
      dragStartRef.current = { x: clientX, y: clientY }
      initialPosRef.current = { ...note.position }
    },
    [isEditing, note.position]
  )

  // ドラッグ中
  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !dragStartRef.current) return

      const deltaX = clientX - dragStartRef.current.x
      const deltaY = clientY - dragStartRef.current.y

      const newX = Math.max(0, initialPosRef.current.x + deltaX)
      const newY = Math.max(0, initialPosRef.current.y + deltaY)

      onPositionChange({ x: newX, y: newY })
    },
    [isDragging, onPositionChange]
  )

  // ドラッグ終了
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    dragStartRef.current = null
  }, [])

  // マウスイベント
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.note-actions')) return
    handleDragStart(e.clientX, e.clientY)
  }

  // タッチイベント
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.note-actions')) return
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  // グローバルイベントリスナー
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      handleDragMove(touch.clientX, touch.clientY)
    }

    const handleEnd = () => {
      handleDragEnd()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  // 編集完了
  const handleEditComplete = () => {
    setIsEditing(false)
    if (editContent !== note.content) {
      onUpdate(editContent)
    }
  }

  // 固定ボタンのクリック
  const handlePinClick = () => {
    const success = onTogglePin()
    if (!success && !note.isPinned) {
      alert(`固定できる付箋は最大${MAX_PINNED_NOTES}つまでです`)
    }
  }

  // カラーピッカー以外をクリックしたら閉じる
  useEffect(() => {
    if (!showColorPicker) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.color-picker') && !target.closest('.color-picker-btn')) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showColorPicker])

  return (
    <div
      ref={noteRef}
      className={`
        absolute w-[280px] md:w-[320px] min-h-[180px] md:min-h-[200px]
        rounded-2xl md:rounded-3xl overflow-hidden
        ${isDragging ? 'z-50' : 'z-10'}
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        transition-all duration-300 ease-out
        select-none
      `}
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
        transform: isDragging ? 'scale(1.03) rotate(1deg)' : 'scale(1) rotate(0deg)',
        boxShadow: isDragging
          ? `0 30px 60px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px ${colorDef.accent}40, inset 0 1px 0 rgba(255,255,255,0.3)`
          : `0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px ${colorDef.accent}25, inset 0 1px 0 rgba(255,255,255,0.3)`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="article"
      aria-label={`付箋: ${note.content || '空の付箋'}`}
    >
      {/* 背景レイヤー */}
      <div className={`absolute inset-0 ${colorDef.class}`} />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      {/* コンテンツ */}
      <div className="relative p-4 md:p-5 h-full flex flex-col">
        {/* ドラッグハンドル */}
        <div className="flex justify-center mb-2 -mt-1">
          <div className="flex items-center gap-0.5 px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-grab">
            <GripHorizontal className="w-4 h-4 text-gray-600/60" />
          </div>
        </div>

        {/* 固定バッジ */}
        {note.isPinned && (
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-md opacity-60" />
              <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1.5 md:p-2 shadow-lg">
                <Pin className="w-3 h-3 md:w-3.5 md:h-3.5 text-white fill-white" />
              </div>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="note-actions absolute top-3 right-3 flex gap-1.5">
          {/* カラーピッカーボタン */}
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="color-picker-btn group p-2 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/40 hover:border-white/60 transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95"
            aria-label="色を変更"
          >
            <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* 固定ボタン */}
          <button
            type="button"
            onClick={handlePinClick}
            className={`group p-2 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95
              ${
                note.isPinned
                  ? 'bg-amber-100/80 hover:bg-amber-200/80 border-amber-300/60'
                  : canPin
                    ? 'bg-white/50 hover:bg-white/80 border-white/40 hover:border-white/60'
                    : 'bg-gray-100/50 border-gray-200/50 cursor-not-allowed opacity-50'
              }
            `}
            aria-label={note.isPinned ? '固定を解除' : '固定する'}
            disabled={!canPin && !note.isPinned}
            title={
              !canPin && !note.isPinned
                ? `固定できる付箋は最大${MAX_PINNED_NOTES}つまでです（現在${pinnedCount}つ）`
                : note.isPinned
                  ? '固定を解除'
                  : '固定する'
            }
          >
            <Pin
              className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors
                ${note.isPinned ? 'text-amber-600 fill-amber-500' : 'text-gray-600 group-hover:text-gray-800'}
              `}
            />
          </button>

          {/* 削除ボタン */}
          <button
            type="button"
            onClick={onDelete}
            className="group p-2 rounded-xl bg-white/50 hover:bg-red-50/80 backdrop-blur-sm border border-white/40 hover:border-red-200/60 transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95"
            aria-label="削除"
          >
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* カラーピッカー */}
        {showColorPicker && (
          <div className="color-picker absolute top-14 right-3 z-20">
            <ColorPicker
              selectedColor={note.color}
              onSelectColor={(color) => {
                onColorChange(color)
                setShowColorPicker(false)
              }}
            />
          </div>
        )}

        {/* テキストコンテンツ */}
        <div className="flex-1 mt-2">
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onBlur={handleEditComplete}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setEditContent(note.content)
                  setIsEditing(false)
                }
              }}
              className="w-full min-h-[100px] bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-gray-800 placeholder:text-gray-500/70 text-sm md:text-base leading-relaxed"
              placeholder="メモを入力..."
              autoFocus
            />
          ) : (
            <div
              onClick={() => {
                setIsEditing(true)
                setEditContent(note.content)
              }}
              className="min-h-[100px] text-gray-800 whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed cursor-text"
            >
              {note.content || (
                <span className="text-gray-500/70 italic">クリックして編集...</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
