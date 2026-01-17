// テストのセットアップファイル
// @testing-library/jest-domのカスタムマッチャーを追加
import '@testing-library/jest-dom'

// localStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// 各テスト前にlocalStorageをクリア
beforeEach(() => {
  localStorage.clear()
})
