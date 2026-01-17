import { useTimerContext } from "@/contexts/TimerContext"
import { PartyPopper, Coffee } from "lucide-react"

/**
 * タイマー完了時に表示されるお祝いメッセージ
 */
export function CompletionMessage() {
  const { showConfetti, mode, hideConfetti } = useTimerContext()

  if (!showConfetti) return null

  const isWorkComplete = mode === "break" // 作業完了後は休憩モードに切り替わっている
  const message = isWorkComplete ? "お疲れ様でした！" : "休憩終了！"
  const subMessage = isWorkComplete ? "少し休憩しましょう" : "さあ、集中しましょう"

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      onClick={hideConfetti}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" />

      {/* メッセージカード */}
      <div className="relative glass rounded-3xl p-8 sm:p-12 text-center animate-scale-in shadow-modern-lg max-w-sm">
        {/* アイコン */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
          {isWorkComplete ? (
            <PartyPopper className="w-10 h-10 text-white" />
          ) : (
            <Coffee className="w-10 h-10 text-white" />
          )}
        </div>

        {/* メッセージ */}
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
          {message}
        </h2>
        <p className="text-muted-foreground">
          {subMessage}
        </p>

        {/* 閉じるヒント */}
        <p className="mt-6 text-xs text-muted-foreground/50">
          タップして閉じる
        </p>
      </div>
    </div>
  )
}
