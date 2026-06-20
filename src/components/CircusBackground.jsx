import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './CircusBackground.css'

export default function CircusBackground() {
  const { scrollYProgress } = useScroll()

  const stripesY  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const vignetteY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const texY      = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const dim       = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.82, 0.62])

  return (
    <div className="circus-bg" aria-hidden="true">
      <motion.div className="stripes" style={{ y: stripesY, opacity: dim }} />
      <motion.div className="canvas-tex" style={{ y: texY }} />
      <motion.div className="vignette" style={{ y: vignetteY }} />
    </div>
  )
}
