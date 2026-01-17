import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStickyNotes } from './useStickyNotes'
import { MAX_PINNED_NOTES } from '@/types'

describe('useStickyNotes', () => {
  beforeEach(() => {
    // localStorageをクリア
    localStorage.clear()
    // windowサイズをモック
    vi.stubGlobal('innerWidth', 1024)
    vi.stubGlobal('innerHeight', 768)
  })

  describe('初期状態', () => {
    it('localStorageが空の場合、空の配列を返す', () => {
      const { result } = renderHook(() => useStickyNotes())
      expect(result.current.notes).toEqual([])
      expect(result.current.isLoaded).toBe(true)
    })

    it('localStorageにデータがある場合、読み込む', () => {
      const existingNotes = [
        {
          id: 'test-1',
          content: 'テスト付箋',
          color: 'sunshine' as const,
          position: { x: 100, y: 100 },
          isPinned: false,
          createdAt: 1000,
          updatedAt: 1000,
        },
      ]
      localStorage.setItem('sticky_notes', JSON.stringify(existingNotes))

      const { result } = renderHook(() => useStickyNotes())
      expect(result.current.notes).toHaveLength(1)
      expect(result.current.notes[0].content).toBe('テスト付箋')
    })
  })

  describe('addNote', () => {
    it('新しい付箋を追加できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: '新しい付箋',
          color: 'coral',
        })
      })

      expect(result.current.notes).toHaveLength(1)
      expect(result.current.notes[0].content).toBe('新しい付箋')
      expect(result.current.notes[0].color).toBe('coral')
      expect(result.current.notes[0].isPinned).toBe(false)
    })

    it('位置を指定して追加できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: 'テスト',
          color: 'mint',
          position: { x: 200, y: 300 },
        })
      })

      expect(result.current.notes[0].position).toEqual({ x: 200, y: 300 })
    })

    it('追加した付箋がlocalStorageに保存される', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: '保存テスト',
          color: 'lavender',
        })
      })

      const stored = JSON.parse(localStorage.getItem('sticky_notes') || '[]')
      expect(stored).toHaveLength(1)
      expect(stored[0].content).toBe('保存テスト')
    })
  })

  describe('updateNote', () => {
    it('付箋の内容を更新できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: '元の内容',
          color: 'sunshine',
        })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        result.current.updateNote(noteId, { content: '更新後の内容' })
      })

      expect(result.current.notes[0].content).toBe('更新後の内容')
    })

    it('付箋の色を更新できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: 'テスト',
          color: 'sunshine',
        })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        result.current.updateNote(noteId, { color: 'sky' })
      })

      expect(result.current.notes[0].color).toBe('sky')
    })
  })

  describe('deleteNote', () => {
    it('付箋を削除できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({ content: '削除対象', color: 'rose' })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        result.current.deleteNote(noteId)
      })

      expect(result.current.notes).toHaveLength(0)
    })
  })

  describe('updatePosition', () => {
    it('付箋の位置を更新できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({
          content: 'テスト',
          color: 'peach',
          position: { x: 0, y: 0 },
        })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        result.current.updatePosition(noteId, { x: 500, y: 400 })
      })

      expect(result.current.notes[0].position).toEqual({ x: 500, y: 400 })
    })
  })

  describe('togglePin', () => {
    it('付箋を固定できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({ content: 'テスト', color: 'sage' })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        const success = result.current.togglePin(noteId)
        expect(success).toBe(true)
      })

      expect(result.current.notes[0].isPinned).toBe(true)
      expect(result.current.pinnedCount).toBe(1)
    })

    it('固定を解除できる', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({ content: 'テスト', color: 'sage', isPinned: true })
      })

      const noteId = result.current.notes[0].id

      act(() => {
        const success = result.current.togglePin(noteId)
        expect(success).toBe(true)
      })

      expect(result.current.notes[0].isPinned).toBe(false)
    })

    it(`最大${MAX_PINNED_NOTES}つまでしか固定できない`, () => {
      const { result } = renderHook(() => useStickyNotes())

      // MAX_PINNED_NOTES個の付箋を追加して固定
      for (let i = 0; i < MAX_PINNED_NOTES; i++) {
        act(() => {
          result.current.addNote({ content: `付箋${i}`, color: 'sunshine' })
        })
      }

      for (let i = 0; i < MAX_PINNED_NOTES; i++) {
        act(() => {
          result.current.togglePin(result.current.notes[i].id)
        })
      }

      expect(result.current.pinnedCount).toBe(MAX_PINNED_NOTES)
      expect(result.current.canPin).toBe(false)

      // もう一つ追加して固定しようとする
      act(() => {
        result.current.addNote({ content: '追加付箋', color: 'coral' })
      })

      const newNoteId = result.current.notes.find(
        (n) => n.content === '追加付箋'
      )?.id

      act(() => {
        const success = result.current.togglePin(newNoteId!)
        expect(success).toBe(false)
      })

      expect(result.current.pinnedCount).toBe(MAX_PINNED_NOTES)
    })
  })

  describe('ソート', () => {
    it('固定された付箋が上に表示される', () => {
      const { result } = renderHook(() => useStickyNotes())

      act(() => {
        result.current.addNote({ content: '通常1', color: 'sunshine' })
        result.current.addNote({ content: '固定', color: 'coral' })
        result.current.addNote({ content: '通常2', color: 'lavender' })
      })

      const pinnedNoteId = result.current.notes.find(
        (n) => n.content === '固定'
      )?.id

      act(() => {
        result.current.togglePin(pinnedNoteId!)
      })

      expect(result.current.notes[0].content).toBe('固定')
      expect(result.current.notes[0].isPinned).toBe(true)
    })
  })
})
