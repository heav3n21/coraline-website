import React, { useEffect, useRef } from 'react'
import './TunnelPortal.css'

// The Coraline tunnel — used as the hero centerpiece
export default function TunnelPortal({ onDonate }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      const size = Math.min(canvas.parentElement.offsetWidth, 420)
      canvas.width = size
      canvas.height = size
    }
    resize()
    window.addEventListener('resize', resize)

    // Coraline tunnel petal colors — magenta, purple, deep rose
    const LAYERS = [
      ['#6B0F5E','#8B1A7A','#A8228E'],
      ['#7A1060','#9E1A80','#C02499'],
      ['#4A0A4A','#6A0F6A','#8B1A8B'],
      ['#3A0840','#5A1060','#7A1880'],
      ['#2A0830','#420C50','#5E1470'],
      ['#5E0A50','#7A1468','#9E2080'],
      ['#3E0838','#600F58','#821A78'],
      ['#280630','#400A50','#5C1070'],
    ]

    const drawPetal = (cx, cy, radius, angle, colors, depth) => {
      const innerR = radius * 0.62
      const spread = Math.PI * 0.15

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      // Petal shape: arc outward, connecting back
      ctx.beginPath()
      ctx.arc(0, 0, radius, -spread, spread)
      ctx.arc(0, 0, innerR, spread, -spread, true)
      ctx.closePath()

      const grad = ctx.createLinearGradient(innerR, 0, radius, 0)
      grad.addColorStop(0, colors[0] + 'EE')
      grad.addColorStop(0.5, colors[1] + 'DD')
      grad.addColorStop(1, colors[2] + '88')
      ctx.fillStyle = grad
      ctx.fill()

      // Edge highlight
      ctx.strokeStyle = colors[2] + '44'
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.restore()
    }

    const draw = () => {
      const size = canvas.width
      const cx = size / 2, cy = size / 2
      t += 0.007
      ctx.clearRect(0, 0, size, size)

      const PETAL_COUNT = 12
      const NUM_RINGS = LAYERS.length

      // Draw rings from outside in — creates depth
      for (let ring = 0; ring < NUM_RINGS; ring++) {
        const progress = 1 - ring / NUM_RINGS
        const radius = (progress * 0.52 + 0.04) * size * 0.5
        const innerFraction = 0.62
        const colors = LAYERS[ring % LAYERS.length]
        const twist = t * (0.8 + ring * 0.2) * (ring % 2 === 0 ? 1 : -1)

        for (let p = 0; p < PETAL_COUNT; p++) {
          const angle = (p / PETAL_COUNT) * Math.PI * 2 + twist
          drawPetal(cx, cy, radius, angle, colors, ring)
        }
      }

      // Deep center void — the point of the tunnel
      const voidR = size * 0.04
      const vGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, voidR * 3)
      vGrad.addColorStop(0, '#000000')
      vGrad.addColorStop(0.5, 'rgba(4,0,8,0.95)')
      vGrad.addColorStop(1, 'rgba(4,0,8,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, voidR * 3, 0, Math.PI * 2)
      ctx.fillStyle = vGrad
      ctx.fill()

      // Center light — the world beyond
      const pulse = Math.sin(t * 1.5) * 0.3 + 0.7
      const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, voidR * 1.5 * pulse)
      cGrad.addColorStop(0, `rgba(230, 210, 255, ${pulse * 0.9})`)
      cGrad.addColorStop(0.6, `rgba(180, 160, 220, ${pulse * 0.4})`)
      cGrad.addColorStop(1, 'rgba(140, 100, 180, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, voidR * 2, 0, Math.PI * 2)
      ctx.fillStyle = cGrad
      ctx.fill()

      // Outer edge glow — the mouth of the tunnel blooms outward
      const eGrad = ctx.createRadialGradient(cx, cy, size * 0.44, cx, cy, size * 0.52)
      eGrad.addColorStop(0, 'rgba(140, 20, 120, 0.12)')
      eGrad.addColorStop(1, 'rgba(80, 0, 80, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, size * 0.52, 0, Math.PI * 2)
      ctx.fillStyle = eGrad
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="tunnel-portal">
      <div className="tunnel-glow-ring tunnel-glow-ring--1" aria-hidden="true" />
      <div className="tunnel-glow-ring tunnel-glow-ring--2" aria-hidden="true" />
      <canvas ref={canvasRef} className="tunnel-canvas" />
      <button
        className="tunnel-cta"
        onClick={onDonate}
        aria-label="Buy Coraline a treat for $1"
      >
        <span className="tunnel-cta-inner">
          <span className="tunnel-cta-eye" aria-hidden="true">
            <span className="tunnel-cta-eye-p" />
            <span className="tunnel-cta-eye-s" />
          </span>
          <span className="tunnel-cta-label title-font">Buy a Treat</span>
          <span className="tunnel-cta-price hand">$1</span>
        </span>
      </button>
    </div>
  )
}
