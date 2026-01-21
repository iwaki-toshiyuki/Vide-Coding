// テーマカラーの型定義
export type ThemeColorName =
  | 'sunshine'
  | 'blossom'
  | 'ocean'
  | 'forest'
  | 'lavender'
  | 'sunset'
  | 'mist'
  | 'mint'

export interface ThemeColor {
  name: ThemeColorName
  label: string
  from: string
  to: string
  border: string
  text: string
  button: string
}

// 分析結果の型定義
export interface AnalysisResult {
  id: string
  text: string
  result: string
  createdAt: string
  theme: ThemeColorName
}

// 分析状態の型定義
export type AnalysisState = 'idle' | 'loading' | 'success' | 'error'

// フック用の型定義
export interface UseAnalyzerReturn {
  state: AnalysisState
  result: string | null
  error: string | null
  analyze: (text: string) => Promise<void>
  reset: () => void
}

export interface UseHistoryReturn {
  history: AnalysisResult[]
  addToHistory: (item: Omit<AnalysisResult, 'id' | 'createdAt'>) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
}

export interface UseThemeReturn {
  theme: ThemeColorName
  setTheme: (theme: ThemeColorName) => void
  themeColor: ThemeColor
}
