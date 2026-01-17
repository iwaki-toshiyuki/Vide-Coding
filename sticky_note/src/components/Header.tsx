import { Plus, Sparkles } from 'lucide-react'

interface HeaderProps {
  onAddNote: () => void
}

// ヘッダーコンポーネント
// Apple風Glassmorphismスタイルの固定ヘッダー
export const Header = ({ onAddNote }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_20px_40px_-20px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
        {/* ブランドセクション */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* アイコン */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="relative p-2 md:p-2.5 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl md:rounded-2xl shadow-lg">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>

          {/* タイトル */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Sticky
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notes
              </span>
            </h1>
            <p className="hidden md:block text-xs text-gray-500 font-medium tracking-wide">
              アイデアを自由に整理
            </p>
          </div>
        </div>

        {/* アクションボタン */}
        <button
          type="button"
          onClick={onAddNote}
          className="group relative flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* ボタン背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* シャイン効果 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* ボタンコンテンツ */}
          <Plus className="relative w-4 h-4 md:w-5 md:h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          <span className="relative text-sm md:text-base font-semibold text-white tracking-wide">
            新規作成
          </span>
        </button>
      </div>
    </header>
  )
}
