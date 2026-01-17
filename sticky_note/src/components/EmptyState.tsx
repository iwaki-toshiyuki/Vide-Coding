import { Sparkles, Move, Palette, Pin, ArrowRight } from 'lucide-react'

interface EmptyStateProps {
  onAddNote: () => void
}

// 空状態の表示コンポーネント
// Apple風のエレガントなウェルカム画面
export const EmptyState = ({ onAddNote }: EmptyStateProps) => {
  const features = [
    {
      icon: Sparkles,
      title: 'かんたん作成',
      description: 'ワンクリックで付箋を追加',
      gradient: 'from-blue-500 to-indigo-600',
      bgGlow: 'from-blue-400/20 to-indigo-400/20',
    },
    {
      icon: Move,
      title: '自由に配置',
      description: 'ドラッグで好きな場所に',
      gradient: 'from-purple-500 to-pink-600',
      bgGlow: 'from-purple-400/20 to-pink-400/20',
    },
    {
      icon: Palette,
      title: '8色のカラー',
      description: 'お好みの色で分類整理',
      gradient: 'from-orange-500 to-red-600',
      bgGlow: 'from-orange-400/20 to-red-400/20',
    },
    {
      icon: Pin,
      title: '重要なものを固定',
      description: '大切な付箋を目立たせる',
      gradient: 'from-amber-500 to-orange-600',
      bgGlow: 'from-amber-400/20 to-orange-400/20',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative z-10 px-4 py-8">
      <div className="text-center max-w-3xl mx-auto">
        {/* メインアイコン */}
        <div className="mb-8 md:mb-10 relative inline-block">
          {/* 背景のグロー効果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl scale-150" />

          {/* アイコンコンテナ */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/50 shadow-2xl">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
          </div>

          {/* 装飾ドット */}
          <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 -right-4 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        </div>

        {/* タイトル */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            アイデアを
          </span>
          <br className="md:hidden" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            自由に整理
          </span>
        </h2>

        {/* サブタイトル */}
        <p className="text-gray-600 mb-8 md:mb-12 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          思いついたことをすぐにメモ。
          <br className="hidden md:block" />
          カラフルな付箋で、あなたのアイデアを可視化しましょう。
        </p>

        {/* 機能紹介グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-5 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* 背景グロー */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGlow} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* コンテンツ */}
              <div className="relative">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                >
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAボタン */}
        <button
          type="button"
          onClick={onAddNote}
          className="group relative inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* ボタン背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* シャイン効果 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>

          {/* ボタンコンテンツ */}
          <Sparkles className="relative w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="relative text-base md:text-lg font-semibold text-white tracking-wide">
            最初の付箋を作成
          </span>
          <ArrowRight className="relative w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* ヒントテキスト */}
        <p className="mt-6 text-xs md:text-sm text-gray-500">
          キーボードショートカット: ヘッダーの「新規作成」ボタンでも追加できます
        </p>
      </div>
    </div>
  )
}
