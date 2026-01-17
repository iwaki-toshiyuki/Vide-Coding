/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // テスト環境としてjsdomを使用
    environment: 'jsdom',
    // グローバルなテストAPIを有効化
    globals: true,
    // テストのセットアップファイル
    setupFiles: ['./src/test/setup.ts'],
    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/main.tsx',
      ],
    },
    // テストファイルのパターン
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})
