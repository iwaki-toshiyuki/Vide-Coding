import { useStickyNotes } from '@/hooks/useStickyNotes'
import { Header } from '@/components/Header'
import { StickyNoteBoard } from '@/components/StickyNoteBoard'
import { EmptyState } from '@/components/EmptyState'
import { DEFAULT_COLOR } from '@/constants/colors'

function App() {
  const {
    notes,
    isLoaded,
    addNote,
    updateNote,
    deleteNote,
    updatePosition,
    togglePin,
    pinnedCount,
    canPin,
  } = useStickyNotes()

  // 新しい付箋を追加
  const handleAddNote = () => {
    addNote({
      content: '',
      color: DEFAULT_COLOR,
    })
  }

  // ローディング中
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full" />
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/80 overflow-x-hidden">
      {/* 背景装飾レイヤー1: メイングラデーション */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />

      {/* 背景装飾レイヤー2: 大きなblur円（右上） */}
      <div
        className="fixed -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/[0.08] via-indigo-400/[0.06] to-purple-400/[0.08] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* 背景装飾レイヤー3: 大きなblur円（左下） */}
      <div
        className="fixed -bottom-32 -left-32 w-[450px] h-[450px] bg-gradient-to-br from-pink-400/[0.08] via-rose-400/[0.06] to-orange-400/[0.08] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* 背景装飾レイヤー4: 小さなアクセント円（中央左） */}
      <div
        className="fixed top-1/3 -left-16 w-[300px] h-[300px] bg-gradient-to-br from-cyan-400/[0.05] to-teal-400/[0.05] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* 背景装飾レイヤー5: 小さなアクセント円（右中央） */}
      <div
        className="fixed top-1/2 -right-16 w-[250px] h-[250px] bg-gradient-to-br from-amber-400/[0.05] to-yellow-400/[0.05] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* ヘッダー */}
      <Header onAddNote={handleAddNote} />

      {/* メインコンテンツ */}
      {notes.length === 0 ? (
        <EmptyState onAddNote={handleAddNote} />
      ) : (
        <StickyNoteBoard
          notes={notes}
          onUpdateContent={(id, content) => updateNote(id, { content })}
          onDelete={deleteNote}
          onPositionChange={updatePosition}
          onColorChange={(id, color) => updateNote(id, { color })}
          onTogglePin={togglePin}
          canPin={canPin}
          pinnedCount={pinnedCount}
        />
      )}
    </div>
  )
}

export default App
