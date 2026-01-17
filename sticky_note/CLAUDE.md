# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

付箋メモアプリケーション - React 19, TypeScript, Vite, Tailwind CSS 4.x, shadcn/ui を使用

## Commands

- `npm run dev` - 開発サーバーを起動（HMR有効）
- `npm run build` - TypeScriptの型チェックと本番ビルド
- `npm run lint` - ESLintでコードをチェック
- `npm run preview` - 本番ビルドをプレビュー
- `npm run test` - Vitestでテストを実行（watchモード）
- `npm run test:run` - Vitestでテストを1回実行
- `npm run test:coverage` - テストカバレッジを測定

## Tech Stack

- React 19 with TypeScript
- Vite 7 for build tooling
- Tailwind CSS 4.x with @tailwindcss/vite plugin
- shadcn/ui for UI components
- Vitest + Testing Library for testing
- ESLint with TypeScript and React Hooks plugins
- lucide-react for icons

## Architecture

```
src/
├── components/       # UIコンポーネント
│   ├── ui/          # shadcn/uiコンポーネント
│   ├── Header.tsx   # ヘッダー
│   ├── StickyNote.tsx  # 付箋コンポーネント
│   ├── StickyNoteBoard.tsx  # 付箋ボード
│   ├── ColorPicker.tsx  # カラーピッカー
│   └── EmptyState.tsx   # 空状態表示
├── hooks/           # カスタムフック
│   └── useStickyNotes.ts  # 付箋の状態管理
├── types/           # 型定義
├── constants/       # 定数
├── lib/             # ユーティリティ
├── test/            # テスト設定
├── App.tsx          # ルートコンポーネント
├── main.tsx         # エントリーポイント
└── index.css        # グローバルスタイル
```

## Key Features

- 付箋の追加・編集・削除
- ドラッグ＆ドロップで自由に配置
- 8色のカラーバリエーション
- 重要な付箋を最大3つまで固定
- localStorageでデータ永続化
- レスポンシブデザイン
- Glassmorphismスタイルのモダンなデザイン

## Code Conventions

- ファイル内のコメントは日本語を使用
- コンポーネントは関数コンポーネントで記述
- スタイリングはTailwind CSSクラスを使用
- import aliasとして`@/`を使用（src/を参照）
