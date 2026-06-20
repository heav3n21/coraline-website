import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Waiting.css'

export default function Waiting() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="waiting" ref={ref}>
      <motion.div className="waiting-media" style={{ y }}>
        <img src="/coraline-nose.png" alt="Coraline waiting hopefully" />
      </motion.div>
      <div className="waiting-scrim" aria-hidden="true" />

      <motion.div
        className="waiting-copy"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9 }}
      >
        <p className="waiting-kicker">act five &middot; the wait</p>
        <h2 className="waiting-title">She is, in fact,<br />still looking at you.</h2>
        <p className="waiting-sub">No treat has arrived. The tail has not moved. This is fine.</p>
      </motion.div>
    </section>
  )
}
