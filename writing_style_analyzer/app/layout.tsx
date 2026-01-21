import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Writing Style Analyzer - あなたの文体をAIが分析",
  description:
    "AI時代の個人らしさを守る文体分析アプリ。あなたが書いた文章から、特有の文体・ライティングルール・特徴・雰囲気を抽出し、AIツールで活用しやすいマークダウン形式で出力します。",
  keywords: ["文体分析", "AI", "ライティング", "文章スタイル", "Gemini"],
  openGraph: {
    title: "Writing Style Analyzer",
    description: "あなたの文体をAIが分析",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
