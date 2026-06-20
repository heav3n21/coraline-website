import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Introduction.css'

export default function Introduction() {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start 90%', 'start 25%'] })

  const clip  = useTransform(scrollYProgress, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])

  return (
    <section className="intro">
      <div className="intro-grid">
        <motion.div
          className="intro-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="intro-kicker">act one &middot; the introduction</p>
          <h2 className="intro-heading">
            She arrived under<br />the big top one rainy<br />Tuesday and never left.
          </h2>
          <p className="intro-body">
            Coraline runs this operation now. She negotiates treats, supervises
            naps, and considers every open door a personal invitation. Most
            days she is somewhere between very dignified and completely
            unhinged about a tennis ball.
          </p>
        </motion.div>

        <div className="intro-photo-wrap">
          <motion.div className="intro-photo" ref={imgRef} style={{ clipPath: clip, scale }}>
            <img src="/coraline-costume.jpeg" alt="Coraline in costume" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
