import React, { useEffect, useRef } from 'react'

// Animated Van Gogh Starry Night background — swirling flows, golden orbs
export default function VanGoghCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Van Gogh flow field — each cell has a direction that curves beautifully
    const COLS = 80, ROWS = 50
    const cellW = () => canvas.width / COLS
    const cellH = () => canvas.height / ROWS

    // Flowing particles that follow the field
    const PARTICLE_COUNT = 320
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: 0, vy: 0,
      life: Math.random() * 200,
      maxLife: 150 + Math.random() * 150,
      size: 0.4 + Math.random() * 1.6,
      hue: 200 + Math.random() * 50, // blues to purples
      speed: 0.6 + Math.random() * 0.8,
    }))

    // Golden luminous orbs like the painting's stars
    const ORBS = [
      { x: 0.82, y: 0.12, r: 0.048, pulse: 0 },
      { x: 0.65, y: 0.08, r: 0.028, pulse: 1.2 },
      { x: 0.92, y: 0.28, r: 0.022, pulse: 2.1 },
      { x: 0.18, y: 0.15, r: 0.035, pulse: 0.7 },
      { x: 0.45, y: 0.05, r: 0.018, pulse: 1.8 },
    ]

    // Flow angle at position — sinusoidal swirls like Van Gogh's brushstrokes
    const flowAngle = (nx, ny, time) => {
      const swirl1 = Math.sin(nx * 3.2 + time * 0.3) * Math.cos(ny * 2.8 - time * 0.25)
      const swirl2 = Math.cos(nx * 1.8 - time * 0.2) * Math.sin(ny * 4.1 + time * 0.18)
      const swirl3 = Math.sin((nx + ny) * 2.5 + time * 0.15)
      return (swirl1 + swirl2 * 0.6 + swirl3 * 0.4) * Math.PI
    }

    const draw = () => {
      const w = canvas.width, h = canvas.height
      t += 0.004

      // Fade trail — Van Gogh's canvas feel
      ctx.fillStyle = 'rgba(5, 8, 28, 0.18)'
      ctx.fillRect(0, 0, w, h)

      // Draw flowing particles
      for (const p of particles) {
        const nx = p.x / w, ny = p.y / h
        const angle = flowAngle(nx, ny, t)
        p.vx = p.vx * 0.85 + Math.cos(angle) * p.speed * 0.3
        p.vy = p.vy * 0.85 + Math.sin(angle) * p.speed * 0.3
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Respawn
        if (p.life > p.maxLife || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.vx = 0; p.vy = 0
          p.life = 0
          p.maxLife = 150 + Math.random() * 150
          p.hue = 200 + Math.random() * 60
          p.speed = 0.6 + Math.random() * 0.8
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.65
        const sat = 70 + Math.sin(t + p.x * 0.01) * 20
        const light = 40 + Math.sin(t * 0.5 + p.y * 0.008) * 18

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${light}%, ${alpha})`
        ctx.fill()
      }

      // Draw golden luminous orbs — the glowing stars
      for (const orb of ORBS) {
        const ox = orb.x * w, oy = orb.y * h
        const pulse = Math.sin(t * 1.2 + orb.pulse) * 0.25 + 1
        const r = orb.r * Math.min(w, h) * pulse

        // Outer corona — Van Gogh's radiating halos
        for (let ring = 5; ring >= 1; ring--) {
          const rr = r * (1 + ring * 0.55)
          const a = (0.06 / ring) * pulse
          const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, rr)
          grad.addColorStop(0, `rgba(255, 220, 80, ${a})`)
          grad.addColorStop(0.5, `rgba(220, 160, 20, ${a * 0.5})`)
          grad.addColorStop(1, `rgba(160, 100, 0, 0)`)
          ctx.beginPath()
          ctx.arc(ox, oy, rr, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        // Swirling brushstroke halo — the crown of swirls around each star
        ctx.save()
        ctx.translate(ox, oy)
        for (let s = 0; s < 12; s++) {
          const sa = (s / 12) * Math.PI * 2 + t * 0.3
          const sx = Math.cos(sa) * r * 1.8
          const sy = Math.sin(sa) * r * 1.8
          ctx.beginPath()
          ctx.arc(sx, sy, r * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 40, ${0.04 * pulse})`
          ctx.fill()
        }
        ctx.restore()

        // Core bright star
        const cGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r)
        cGrad.addColorStop(0, `rgba(255, 255, 220, ${0.95 * pulse})`)
        cGrad.addColorStop(0.3, `rgba(255, 220, 80, ${0.8 * pulse})`)
        cGrad.addColorStop(0.7, `rgba(220, 160, 20, ${0.4 * pulse})`)
        cGrad.addColorStop(1, 'rgba(160, 100, 0, 0)')
        ctx.beginPath()
        ctx.arc(ox, oy, r, 0, Math.PI * 2)
        ctx.fillStyle = cGrad
        ctx.fill()
      }

      // Subtle blue wave bands — horizontal Van Gogh brushstrokes
      for (let band = 0; band < 6; band++) {
        const by = (band / 6) * h + Math.sin(t * 0.4 + band) * h * 0.04
        ctx.beginPath()
        ctx.moveTo(0, by)
        for (let x = 0; x <= w; x += 8) {
          const ny = by + Math.sin(x * 0.008 + t * 0.5 + band * 0.7) * h * 0.025
          ctx.lineTo(x, ny)
        }
        ctx.strokeStyle = `rgba(30, 60, 140, ${0.04 + band * 0.005})`
        ctx.lineWidth = 18 - band * 2
        ctx.stroke()
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
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.92,
      }}
      aria-hidden="true"
    />
  )
}
