import { useState } from "react"
import { Settings, X, Clock, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTimerContext } from "@/contexts/TimerContext"
import type { TimerSettings as TimerSettingsType } from "@/types/timer"

export function TimerSettings() {
  const { settings, updateSettings, status } = useTimerContext()
  const [isOpen, setIsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState<TimerSettingsType>(settings)

  const handleOpen = () => {
    setLocalSettings(settings)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSave = () => {
    updateSettings(localSettings)
    setIsOpen(false)
  }

  const handleChange = (key: keyof TimerSettingsType, value: string) => {
    const numValue = Math.max(0, Math.min(59, parseInt(value) || 0))
    setLocalSettings((prev) => ({
      ...prev,
      [key]: key.includes("Minutes") ? Math.min(99, numValue) : numValue,
    }))
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpen}
        disabled={status === "running"}
        className="rounded-xl hover:bg-primary/10 transition-colors"
      >
        <Settings className="h-5 w-5 text-primary" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* モーダル */}
      <div className="relative w-full max-w-md glass rounded-2xl shadow-modern-lg animate-scale-in">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold gradient-text">タイマー設定</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-6">
          {/* 集中時間設定 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-medium">集中時間</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workMinutes" className="text-muted-foreground text-sm">
                  分
                </Label>
                <Input
                  id="workMinutes"
                  type="number"
                  min="0"
                  max="99"
                  value={localSettings.workMinutes}
                  onChange={(e) => handleChange("workMinutes", e.target.value)}
                  className="rounded-xl border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workSeconds" className="text-muted-foreground text-sm">
                  秒
                </Label>
                <Input
                  id="workSeconds"
                  type="number"
                  min="0"
                  max="59"
                  value={localSettings.workSeconds}
                  onChange={(e) => handleChange("workSeconds", e.target.value)}
                  className="rounded-xl border-border/50 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* 休憩時間設定 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Coffee className="h-5 w-5" />
              <h3 className="font-medium">休憩時間</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breakMinutes" className="text-muted-foreground text-sm">
                  分
                </Label>
                <Input
                  id="breakMinutes"
                  type="number"
                  min="0"
                  max="99"
                  value={localSettings.breakMinutes}
                  onChange={(e) => handleChange("breakMinutes", e.target.value)}
                  className="rounded-xl border-border/50 focus:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakSeconds" className="text-muted-foreground text-sm">
                  秒
                </Label>
                <Input
                  id="breakSeconds"
                  type="number"
                  min="0"
                  max="59"
                  value={localSettings.breakSeconds}
                  onChange={(e) => handleChange("breakSeconds", e.target.value)}
                  className="rounded-xl border-border/50 focus:border-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex gap-3 p-6 border-t border-border/50">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 rounded-xl"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:opacity-90"
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  )
}
