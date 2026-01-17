import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  shape: "square" | "circle" | "star"
}

interface ConfettiProps {
  isActive: boolean
  duration?: number
  particleCount?: number
  onComplete?: () => void
}

// パーティクルの色（グラデーションに合わせた色）
const COLORS = [
  "#8b5cf6", // パープル
  "#a78bfa", // ライトパープル
  "#06b6d4", // ティール
  "#22d3ee", // ライトティール
  "#f472b6", // ピンク
  "#fbbf24", // イエロー
  "#34d399", // エメラルド
  "#60a5fa", // ブルー
]

// 星を描画（コンポーネント外に定義）
function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  const spikes = 5
  const outerRadius = size
  const innerRadius = size / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.beginPath()

  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / spikes - Math.PI / 2
    const px = Math.cos(angle) * radius
    const py = Math.sin(angle) * radius

    if (i === 0) {
      ctx.moveTo(px, py)
    } else {
      ctx.lineTo(px, py)
    }
  }

  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// パーティクルを描画（コンポーネント外に定義）
function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.fillStyle = particle.color
  ctx.globalAlpha = Math.max(0, 1 - particle.y / (ctx.canvas.height + 100))

  switch (particle.shape) {
    case "circle":
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2)
      ctx.fill()
      break

    case "star":
      drawStar(ctx, particle.x, particle.y, particle.size / 2, particle.rotation)
      break

    case "square":
    default:
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)
      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      )
      ctx.restore()
      break
  }

  ctx.globalAlpha = 1
}

export function Confetti({
  isActive,
  duration = 3000,
  particleCount = 150,
  onComplete,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)

  // パーティクルを生成
  const createParticles = useCallback((width: number) => {
    const particles: Particle[] = []
    const shapes: Particle["shape"][] = ["square", "circle", "star"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    return particles
  }, [particleCount])

  // アニメーションループ
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let activeParticles = 0

    particlesRef.current.forEach((particle) => {
      // 物理演算
      particle.vy += 0.1 // 重力
      particle.vx *= 0.99 // 空気抵抗
      particle.x += particle.vx
      particle.y += particle.vy
      particle.rotation += particle.rotationSpeed

      // 画面内のパーティクルをカウント
      if (particle.y < canvas.height + 50) {
        activeParticles++
        drawParticle(ctx, particle)
      }
    })

    // まだパーティクルがあればアニメーション継続
    if (activeParticles > 0) {
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      onComplete?.()
    }
  }, [onComplete])

  // エフェクト開始
  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    // キャンバスサイズを設定
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // パーティクル生成
    particlesRef.current = createParticles(canvas.width)

    // アニメーション開始
    animationFrameRef.current = requestAnimationFrame(animate)

    // 指定時間後に終了
    const timeout = setTimeout(() => {
      onComplete?.()
    }, duration)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(timeout)
    }
  }, [isActive, duration, createParticles, animate, onComplete])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}
