# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

AI時代の個人らしさを守る文体分析アプリ「Writing Style Analyzer」。ユーザーが入力した文章（最大2000文字）から、その人特有の文体・ライティングルール・特徴・雰囲気を抽出し、AIツールで活用しやすいマークダウン形式で出力する。

## 技術スタック

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4.x** + **shadcn/ui**
- **Vitest + React Testing Library** (テスト)
- **Google Gemini AI API** (文体分析)
- **localStorage** (履歴保存、最大5件)

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLint実行
```

## アーキテクチャ

### ディレクトリ構成
- `app/` - App Router のページ・レイアウト
- `app/page.tsx` - メインページ
- `app/layout.tsx` - ルートレイアウト
- `app/globals.css` - グローバルスタイル（Tailwind 4.x形式: `@import "tailwindcss"`）

### Gemini AI API連携
- 環境変数: `.env.local` に `GEMINI_API_KEY` を設定
- APIキーはサーバーサイドでのみ使用（`NEXT_PUBLIC_` プレフィックス禁止）
- 無料枠内で利用（サービス改善に使用される旨を表記）

## 開発ガイドライン

### コーディング規約
- **日本語使用**: コメント・コミットメッセージ・README
- **TypeScript**: 型安全性重視、`any`型禁止
- **関数コンポーネント**: React Hooks活用
- **ES6+**: モダンJavaScript構文使用

### デザイン制約
- **ライトモードのみ**（ダークモード非対応）
- **Apple Human Interface Guidelines** 準拠
- **Glassmorphism UI**: 半透明 + backdrop-blur効果
- **レスポンシブ**: モバイルファーストアプローチ

### Tailwind CSS 4.x 注意点

Tailwind 4.x では設定方法が変更されている:
- CSS: `@import "tailwindcss"` 形式を使用（3.x の `@tailwind` ディレクティブではない）
- 設定: `postcss.config.mjs` で `@tailwindcss/postcss` プラグインを使用

### デザインシステム

8色のテーマカラー（サンシャイン、ブロッサム、オーシャン、フォレスト、ラベンダー、サンセット、ミスト、ミント）を使用。グラデーション: `from-{color}-100 to-{color}-200`、ボーダー: `border-{color}-300/30`。

アニメーション: duration 200ms（基本）、300ms（特殊効果）、ease-out カーブ。
