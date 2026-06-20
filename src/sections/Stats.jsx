import React, { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import './Stats.css'

const STATS = [
  { value: 1247, label: 'Treats received', suffix: '' },
  { value: 38,   label: 'Tennis balls lost to the void', suffix: '' },
  { value: 71,   label: 'Hours slept this week', suffix: '' },
  { value: 19,   label: 'Socks stolen, unrepentantly', suffix: '' },
]

function StatNumber({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span className="stat-number" ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="stats">
      <motion.p
        className="stats-kicker"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        act four &middot; by the numbers
      </motion.p>

      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <StatNumber value={s.value} suffix={s.suffix} />
            <p className="stat-label">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
