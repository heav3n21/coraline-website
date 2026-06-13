import React, { useEffect, useRef } from 'react'

// Whimsical golden fireflies drifting across the screen
export default function Fireflies() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const flies = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      baseY: Math.random() * 1080,
      phase: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speed: 0.18 + Math.random() * 0.28,
      size: 1.5 + Math.random() * 2.5,
      blinkPhase: Math.random() * Math.PI * 2,
      blinkSpeed: 0.03 + Math.random() * 0.05,
      trail: [],
      color: i % 5 === 0 ? [255, 180, 40] : i % 5 === 1 ? [180, 240, 255] : [220, 255, 180],
    }))

    const draw = () => {
      const w = canvas.width, h = canvas.height
      t += 0.012
      ctx.clearRect(0, 0, w, h)

      for (const f of flies) {
        // Drift lazily left-right with a sine bob
        f.x += f.speed
        f.y = f.baseY + Math.sin(t * 0.6 + f.phaseY) * 40
        if (f.x > w + 20) { f.x = -20; f.baseY = Math.random() * h }

        // Blink
        const blink = (Math.sin(t * f.blinkSpeed * 80 + f.blinkPhase) + 1) / 2
        const glow = blink * 0.85 + 0.1
        const [r, g, b] = f.color

        // Trail
        f.trail.push({ x: f.x, y: f.y, a: glow })
        if (f.trail.length > 12) f.trail.shift()

        for (let i = 0; i < f.trail.length; i++) {
          const tp = f.trail[i]
          const ta = (i / f.trail.length) * tp.a * 0.35
          ctx.beginPath()
          ctx.arc(tp.x, tp.y, f.size * 0.5 * (i / f.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${ta})`
          ctx.fill()
        }

        // Core glow
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 5)
        grad.addColorStop(0, `rgba(${r},${g},${b},${glow})`)
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${glow * 0.6})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Bright center
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.size * glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${glow * 0.9})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 2, pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
