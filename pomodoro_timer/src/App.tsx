import { ThemeProvider } from "@/contexts/ThemeContext"
import { TimerProvider } from "@/contexts/TimerContext"
import { Header } from "@/components/layout/Header"
import { PomodoroTimer } from "@/components/timer/PomodoroTimer"
import { ConfettiEffect } from "@/components/effects/ConfettiEffect"
import { CompletionMessage } from "@/components/effects/CompletionMessage"

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {/* 背景のグラデーションオーバーレイ */}
          <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />

          {/* 紙吹雪エフェクト */}
          <ConfettiEffect />

          {/* 完了メッセージ */}
          <CompletionMessage />

          {/* メインコンテンツ */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <PomodoroTimer />
            </main>

            {/* フッター */}
            <footer className="py-4 text-center text-sm text-muted-foreground">
              <p>集中して、休憩して、繰り返す</p>
            </footer>
          </div>
        </div>
      </TimerProvider>
    </ThemeProvider>
  )
}

export default App
