import type { StickyNote, Position, StickyNoteColor } from '@/types'
import { StickyNoteComponent } from './StickyNote'

interface StickyNoteBoardProps {
  notes: StickyNote[]
  onUpdateContent: (id: string, content: string) => void
  onDelete: (id: string) => void
  onPositionChange: (id: string, position: Position) => void
  onColorChange: (id: string, color: StickyNoteColor) => void
  onTogglePin: (id: string) => boolean
  canPin: boolean
  pinnedCount: number
}

// 付箋ボードコンポーネント
// 付箋を配置するメインエリア
export const StickyNoteBoard = ({
  notes,
  onUpdateContent,
  onDelete,
  onPositionChange,
  onColorChange,
  onTogglePin,
  canPin,
  pinnedCount,
}: StickyNoteBoardProps) => {
  return (
    <div
      className="relative w-full min-h-[calc(100vh-80px)] pt-20 md:pt-24"
      role="region"
      aria-label="付箋ボード"
    >
      {notes.map((note) => (
        <StickyNoteComponent
          key={note.id}
          note={note}
          onUpdate={(content) => onUpdateContent(note.id, content)}
          onDelete={() => onDelete(note.id)}
          onPositionChange={(position) => onPositionChange(note.id, position)}
          onColorChange={(color) => onColorChange(note.id, color)}
          onTogglePin={() => onTogglePin(note.id)}
          canPin={canPin}
          pinnedCount={pinnedCount}
        />
      ))}
    </div>
  )
}
