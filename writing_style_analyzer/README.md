# Writing Style Analyzer

AI時代の個人らしさを守る文体分析アプリ。ユーザーが入力した文章（最大2000文字）から、その人特有の文体・ライティングルール・特徴・雰囲気を抽出し、AIツールで活用しやすいマークダウン形式で出力します。

## 機能

- **文体分析**: Google Gemini AIを使用して、入力された文章から文体の特徴を抽出
- **マークダウン出力**: AIツール（ChatGPT、Claude等）にコピペで使える形式で出力
- **履歴管理**: 最大5件の分析履歴をローカルストレージに保存
- **テーマカラー**: 8色のテーマカラーから選択可能
- **レスポンシブデザイン**: モバイル・デスクトップ両対応

## 技術スタック

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4.x** + **shadcn/ui**
- **Vitest + React Testing Library** (テスト)
- **Google Gemini AI API** (文体分析)
- **localStorage** (履歴保存)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` を `.env.local` にコピーし、Gemini APIキーを設定してください。

```bash
cp .env.local.example .env.local
```

APIキーは [Google AI Studio](https://aistudio.google.com/apikey) から取得できます。

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリにアクセスできます。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLint実行
npm run test     # テスト実行
```

## 使い方

1. テキスト入力欄に分析したい文章を入力（最大2000文字）
2. 「文体を分析する」ボタンをクリック
3. AIが文体を分析し、結果をマークダウン形式で表示
4. 「コピー」ボタンで結果をクリップボードにコピー
5. コピーした結果をChatGPT、Claude等のAIツールに貼り付けて活用

## テーマカラー

8種類のテーマカラーから選択できます：

- サンシャイン（黄色）
- ブロッサム（ピンク）
- オーシャン（青）
- フォレスト（緑）
- ラベンダー（紫）
- サンセット（オレンジ）
- ミスト（グレー）
- ミント（ティール）

## 注意事項

- **Gemini AI無料枠**: このアプリはGemini AIの無料枠を使用しています。サービス改善のため、入力データがGoogleによって使用される場合があります。
- **APIキーのセキュリティ**: APIキーはサーバーサイドでのみ使用され、クライアントに公開されることはありません。
- **履歴の保存**: 履歴はブラウザのローカルストレージに保存されます。ブラウザのデータを削除すると履歴も削除されます。

## ディレクトリ構成

```
writing_style_analyzer/
├── app/
│   ├── api/analyze/route.ts    # Gemini AI APIエンドポイント
│   ├── globals.css             # グローバルスタイル
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # メインページ
├── components/
│   ├── ui/                     # shadcn/uiコンポーネント
│   ├── common/                 # 共通コンポーネント
│   ├── layout/                 # レイアウトコンポーネント
│   ├── analyzer/               # 分析関連コンポーネント
│   └── history/                # 履歴関連コンポーネント
├── hooks/                      # カスタムフック
├── constants/                  # 定数定義
├── types/                      # 型定義
└── lib/                        # ユーティリティ
```

## ライセンス

MIT
