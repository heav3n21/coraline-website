import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Origin.css'

const BEATS = [
  {
    mark: 'I.',
    title: 'The Litter',
    text: 'Freshman year. Two puppies were brought out to meet me. I waited for one of them to feel like mine. Neither did.',
  },
  {
    mark: 'II.',
    title: 'One More',
    text: '"Sorry — I forgot I had one more," the breeder said, and disappeared back inside.',
  },
  {
    mark: 'III.',
    title: 'Destiny',
    text: 'Then there was Coraline. The second I saw her, that was it. No waiting, no deciding. I was her owner before either of us said a word.',
  },
  {
    mark: 'IV.',
    title: 'Under the Bed',
    text: 'We brought her home. For months she lived under my bed, a small skeptical shadow who came out only when she was sure it was safe.',
  },
  {
    mark: 'V.',
    title: 'The Skateboard Years',
    text: 'As she grew braver, she found her calling: towing me through the city on my skateboard. My favorite thing we ever did, every single time.',
  },
]

export default function Origin() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const valanceY = useTransform(scrollYProgress, [0, 0.15], ['0%', '-100%'])

  return (
    <section className="origin" ref={ref}>
      <div className="origin-stage">
        <motion.div className="origin-curtain origin-curtain--top" style={{ y: valanceY }} />
        <motion.div
          className="origin-curtain origin-curtain--l"
          initial={{ x: 0 }}
          whileInView={{ x: '-100%' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.div
          className="origin-curtain origin-curtain--r"
          initial={{ x: 0 }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />

        <div className="origin-content">
          <motion.p
            className="origin-kicker"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            act two &middot; how we met
          </motion.p>
          <motion.h2
            className="origin-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            A Five-Act Origin Story
          </motion.h2>

          <div className="origin-timeline">
            <div className="origin-line" aria-hidden="true" />
            {BEATS.map((b, i) => (
              <motion.div
                key={b.mark}
                className="origin-beat"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <span className="origin-mark">{b.mark}</span>
                <h3 className="origin-beat-title">{b.title}</h3>
                <p className="origin-beat-text">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
