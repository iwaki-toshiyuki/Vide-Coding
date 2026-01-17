import { TimerDisplay } from "./TimerDisplay"
import { TimerProgress } from "./TimerProgress"
import { TimerControls } from "./TimerControls"
import { ModeTabs } from "./ModeTabs"

export function PomodoroTimer() {
  return (
    <div className="w-full max-w-md mx-auto animate-scale-in">
      {/* グラスモーフィズムカード */}
      <div className="glass rounded-3xl shadow-modern-lg p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* モード切り替えタブ */}
          <ModeTabs />

          {/* タイマー表示エリア */}
          <div className="relative">
            <TimerProgress />
            <div className="absolute inset-0 flex items-center justify-center">
              <TimerDisplay />
            </div>
          </div>

          {/* コントロールボタン */}
          <TimerControls />
        </div>
      </div>
    </div>
  )
}
