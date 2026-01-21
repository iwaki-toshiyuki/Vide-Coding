import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAnalysisPrompt } from '@/constants/prompts'
import { MAX_CHARACTERS } from '@/constants/config'

// APIキーチェック
const apiKey = process.env.GEMINI_API_KEY

// 使用するモデル
const MODEL_NAME = 'gemini-2.0-flash'

// リトライ設定
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 5000 // 5秒待機

// 待機関数
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(request: NextRequest) {
  try {
    // APIキーの存在チェック
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEYが設定されていません' },
        { status: 500 }
      )
    }

    // リクエストボディの取得
    const body = await request.json()
    const { text } = body

    // 入力バリデーション
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'テキストを入力してください' },
        { status: 400 }
      )
    }

    if (text.length > MAX_CHARACTERS) {
      return NextResponse.json(
        { error: `テキストは${MAX_CHARACTERS}文字以内で入力してください` },
        { status: 400 }
      )
    }

    // Gemini AIクライアントの初期化
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })

    // プロンプトの生成
    const prompt = getAnalysisPrompt(text)

    // リトライ付きでAPIを呼び出し
    let lastError: Error | null = null
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${MAX_RETRIES}...`)
        const result = await model.generateContent(prompt)
        const response = result.response
        const analysisResult = response.text()
        console.log('Success!')
        return NextResponse.json({ result: analysisResult })
      } catch (error) {
        lastError = error as Error
        const errorMessage = error instanceof Error ? error.message : String(error)

        // レート制限エラーの場合はリトライ
        if (errorMessage.includes('429') || errorMessage.includes('quota')) {
          console.log(`Rate limited. Waiting ${RETRY_DELAY_MS}ms before retry...`)
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY_MS)
            continue
          }
        } else {
          // その他のエラーはすぐに終了
          break
        }
      }
    }

    // 全てのリトライが失敗した場合
    console.error('All retries failed:', lastError)
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError)

    if (errorMessage.includes('429') || errorMessage.includes('quota')) {
      return NextResponse.json(
        { error: 'APIのリクエスト制限に達しました。1分ほど待ってから再度お試しください。' },
        { status: 429 }
      )
    }

    if (errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'APIキーが無効です。設定を確認してください。' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: '分析中にエラーが発生しました。しばらく後に再度お試しください。' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Analysis error:', error)

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'リクエストの形式が不正です' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '分析中にエラーが発生しました。しばらく後に再度お試しください。' },
      { status: 500 }
    )
  }
}
