import { Moon, Sun, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/contexts/ThemeContext"
import { TimerSettings } from "@/components/timer/TimerSettings"

export function Header() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <header className="w-full flex items-center justify-between p-4 sm:p-6">
      {/* ロゴとタイトル */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Timer className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text">
          Pomodoro Timer
        </h1>
      </div>

      {/* コントロール */}
      <div className="flex items-center gap-2">
        <TimerSettings />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl hover:bg-primary/10 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-primary" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
    </header>
  )
}
