# Particle Portfolio

マウスの動きに反応するパーティクルが浮遊する、視覚的に印象的なポートフォリオサイトです。

## 概要

パーティクル同士が近づくと線でつながり、美しいネットワークを形成します。マウスカーソルに反応してパーティクルが動き、インタラクティブな体験を提供します。

## 機能

- **パーティクルシステム**: Canvas APIを使用した滑らかなパーティクルアニメーション
- **マウス追従機能**: マウスの動きに反応してパーティクルが避ける
- **パーティクル接続**: 近くのパーティクル同士が線で接続される
- **グラデーション背景**: 青〜紫系の美しいグラデーション
- **レスポンシブデザイン**: デスクトップ・タブレット・モバイルに対応
- **スムーズなアニメーション**: スクロールアニメーションとトランジション効果

## 技術仕様

### 使用技術

- HTML5
- CSS3
- Vanilla JavaScript (フレームワークなし)

### Core Web Vitals対応

- **LCP (Largest Contentful Paint)**: 重要なコンテンツを早く表示するための最適化
- **INP (Interaction to Next Paint)**: requestAnimationFrameによるスムーズなアニメーション、Intersection Observerによる効率的なスクロール検知
- **CLS (Cumulative Layout Shift)**: 固定サイズとmin-heightの使用によりレイアウトシフトを防止

### パーティクルシステムの詳細

```
パーティクル数: 画面幅に応じて最大100個
パーティクルサイズ: 1〜3px
接続線の最大距離: 120px
マウス影響範囲: 150px
色: 青、紫、白のグラデーション系
```

### セクション構成

1. **Hero**: メインビジュアルとキャッチコピー
2. **About**: 自己紹介
3. **Skills**: スキルセット（Frontend, Backend, Design, DevOps）
4. **Works**: 制作実績
5. **Contact**: 連絡先リンク

## 使用方法

1. `index.html`ファイルをブラウザで開く
2. 特別なサーバー設定は不要

## ファイル構成

```
particle-portfolio/
├── index.html    # HTMLファイル（構造）
├── style.css     # CSSファイル（スタイル）
├── script.js     # JavaScriptファイル（パーティクルシステム）
└── README.md     # このファイル
```

## ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## アクセシビリティ

- `prefers-reduced-motion`メディアクエリによるアニメーション無効化対応
- キーボードナビゲーション対応（フォーカススタイル）
- セマンティックHTMLの使用

## カスタマイズ

### パーティクルの色を変更

`script.js`内の`Particle`クラスの`colors`配列を編集:

```javascript
const colors = [
    'rgba(102, 126, 234, 0.8)',  // 青
    'rgba(118, 75, 162, 0.8)',   // 紫
    'rgba(255, 255, 255, 0.6)',  // 白
    'rgba(147, 112, 219, 0.7)'   // 淡い紫
];
```

### パーティクル数を変更

`script.js`内の`initParticles`関数の計算式を調整:

```javascript
const count = Math.min(100, window.innerWidth / 10);
```

### 背景色を変更

`style.css`内の`.background`クラスの`background`プロパティを編集:

```css
background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 50%, #2d1b4e 100%);
```

## ライセンス

このプロジェクトは自由に使用・改変できます。
