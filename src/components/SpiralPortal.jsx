import React, { useEffect, useRef } from 'react'
import './SpiralPortal.css'

export default function SpiralPortal({ onEnter }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = [
      '#8B1A6B', '#A0206A', '#B52870',
      '#6A0F8B', '#7A1A9A', '#4A0A5A',
      '#C4506A', '#D4607A',
      '#3A1A6A', '#2A0F4A',
    ]

    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.fillStyle = 'rgba(4, 4, 14, 0.12)'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2, cy = h / 2
      tRef.current += 0.008

      // Draw spiral rings — exactly like the tunnel in the movie
      for (let ring = 22; ring >= 0; ring--) {
        const progress = ring / 22
        const radius = progress * Math.min(w, h) * 0.52
        const colorIdx = Math.floor(progress * colors.length) % colors.length
        const nextColorIdx = (colorIdx + 1) % colors.length

        const twist = tRef.current * (1 + ring * 0.15)
        const petal = 28
        const petals = []
        for (let i = 0; i <= petal; i++) {
          const a = (i / petal) * Math.PI * 2 + twist
          const wobble = Math.sin(a * 3 + tRef.current * 2) * radius * 0.04
          const r = radius + wobble
          petals.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
        }

        ctx.beginPath()
        ctx.moveTo(petals[0][0], petals[0][1])
        for (let i = 1; i < petals.length - 2; i++) {
          const xc = (petals[i][0] + petals[i + 1][0]) / 2
          const yc = (petals[i][1] + petals[i + 1][1]) / 2
          ctx.quadraticCurveTo(petals[i][0], petals[i][1], xc, yc)
        }
        ctx.closePath()

        const grad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius)
        grad.addColorStop(0, colors[colorIdx] + 'DD')
        grad.addColorStop(1, colors[nextColorIdx] + '88')
        ctx.fillStyle = grad
        ctx.fill()

        // Inner shadow to create depth
        ctx.strokeStyle = 'rgba(0,0,0,0.3)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Dark center void
      const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w,h)*0.08)
      voidGrad.addColorStop(0, '#000000')
      voidGrad.addColorStop(1, 'rgba(4,4,14,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w,h)*0.09, 0, Math.PI * 2)
      ctx.fillStyle = voidGrad
      ctx.fill()

      // Faint light at center
      const lightGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w,h)*0.04)
      lightGrad.addColorStop(0, 'rgba(200, 180, 240, 0.6)')
      lightGrad.addColorStop(1, 'rgba(200, 180, 240, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w,h)*0.04, 0, Math.PI * 2)
      ctx.fillStyle = lightGrad
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="spiral-portal">
      <canvas ref={canvasRef} className="spiral-canvas" />
      <div className="spiral-text">
        <p className="spiral-label hand">tap to enter</p>
      </div>
      <button className="spiral-enter" onClick={onEnter} aria-label="Enter Coraline's world">
        <span className="spiral-enter-ring" />
        <span className="spiral-enter-ring spiral-enter-ring--2" />
      </button>
    </div>
  )
}
