import { useState, useEffect, useCallback } from 'react'
import type {
  StickyNote,
  CreateStickyNoteInput,
  UpdateStickyNoteInput,
  Position,
} from '@/types'
import { MAX_PINNED_NOTES } from '@/types'
import { DEFAULT_COLOR } from '@/constants/colors'

// localStorageのキー
const STORAGE_KEY = 'sticky_notes'

// ユニークIDを生成
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

// localStorageから付箋を読み込む
const loadNotesFromStorage = (): StickyNote[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as StickyNote[]
  } catch {
    console.error('付箋の読み込みに失敗しました')
    return []
  }
}

// localStorageに付箋を保存
const saveNotesToStorage = (notes: StickyNote[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    console.error('付箋の保存に失敗しました')
  }
}

// デフォルトの位置を計算（ランダムに配置）
const getDefaultPosition = (): Position => {
  // 画面サイズに基づいてランダムな位置を生成
  const maxX = Math.max(100, window.innerWidth - 320)
  const maxY = Math.max(100, window.innerHeight - 250)
  return {
    x: Math.floor(Math.random() * maxX * 0.6) + 50,
    y: Math.floor(Math.random() * maxY * 0.5) + 100,
  }
}

// 付箋の状態管理フック
export const useStickyNotes = () => {
  // 初期値としてlocalStorageから読み込む（遅延初期化）
  const [notes, setNotes] = useState<StickyNote[]>(() => loadNotesFromStorage())
  // 初期化は同期的に行われるので常にtrue
  const isLoaded = true

  // 変更時に自動保存
  useEffect(() => {
    saveNotesToStorage(notes)
  }, [notes])

  // 付箋を追加
  const addNote = useCallback((input: CreateStickyNoteInput): StickyNote => {
    const now = Date.now()
    const newNote: StickyNote = {
      id: generateId(),
      content: input.content,
      color: input.color || DEFAULT_COLOR,
      position: input.position || getDefaultPosition(),
      isPinned: input.isPinned ?? false,
      createdAt: now,
      updatedAt: now,
    }

    setNotes((prev) => [...prev, newNote])
    return newNote
  }, [])

  // 付箋を更新
  const updateNote = useCallback(
    (id: string, input: UpdateStickyNoteInput): void => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, ...input, updatedAt: Date.now() }
            : note
        )
      )
    },
    []
  )

  // 付箋を削除
  const deleteNote = useCallback((id: string): void => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }, [])

  // 付箋の位置を更新
  const updatePosition = useCallback((id: string, position: Position): void => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, position, updatedAt: Date.now() } : note
      )
    )
  }, [])

  // 付箋の固定状態を切り替え
  const togglePin = useCallback(
    (id: string): boolean => {
      const note = notes.find((n) => n.id === id)
      if (!note) return false

      // 固定解除の場合は常に許可
      if (note.isPinned) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, isPinned: false, updatedAt: Date.now() } : n
          )
        )
        return true
      }

      // 固定する場合は最大数をチェック
      const pinnedCount = notes.filter((n) => n.isPinned).length
      if (pinnedCount >= MAX_PINNED_NOTES) {
        return false
      }

      setNotes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isPinned: true, updatedAt: Date.now() } : n
        )
      )
      return true
    },
    [notes]
  )

  // 固定された付箋の数
  const pinnedCount = notes.filter((n) => n.isPinned).length

  // 固定可能かどうか
  const canPin = pinnedCount < MAX_PINNED_NOTES

  // 付箋を固定されたものと通常のものに分離（固定されたものは作成日順、通常は更新日順）
  const sortedNotes = [...notes].sort((a, b) => {
    // 固定された付箋を上に
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1
    }
    // 同じ固定状態なら更新日順
    return b.updatedAt - a.updatedAt
  })

  return {
    notes: sortedNotes,
    isLoaded,
    addNote,
    updateNote,
    deleteNote,
    updatePosition,
    togglePin,
    pinnedCount,
    canPin,
  }
}
