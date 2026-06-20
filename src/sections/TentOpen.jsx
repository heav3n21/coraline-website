import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StringLights from '../components/StringLights'
import Bunting from '../components/Bunting'
import './TentOpen.css'

export default function TentOpen() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const portraitY     = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY        = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section className="tent-open" ref={ref}>
      <div className="tent-scene">
        <Bunting />
        <StringLights />
      </div>

      <motion.div
        className="curtain curtain--l"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="curtain curtain--r"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />

      <motion.div className="tent-portrait" style={{ y: portraitY, scale: portraitScale }}>
        <img src="/coraline-grass.jpeg" alt="Coraline the Golden Retriever" />
        <div className="tent-portrait-fade" aria-hidden="true" />
      </motion.div>

      <motion.div className="tent-content" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.p
          className="tent-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
        >
          the circus presents
        </motion.p>
        <motion.h1
          className="tent-title"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Coraline
        </motion.h1>
        <motion.p
          className="tent-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.75 }}
        >
          golden retriever &middot; professional good girl
        </motion.p>
      </motion.div>

      <motion.div
        className="tent-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span className="tent-scroll-line" aria-hidden="true" />
        <span>scroll</span>
      </motion.div>
    </section>
  )
}
