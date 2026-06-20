import React from 'react'
import { motion } from 'framer-motion'
import './FinalCTA.css'

export default function FinalCTA({ onDonate }) {
  return (
    <section className="finale">
      <motion.div
        className="finale-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <p className="finale-kicker">final act &middot; the ask</p>
        <h2 className="finale-title">
          One Treat. One Dollar.<br />One Very Happy Spin.
        </h2>
        <button className="ticket-btn finale-btn" onClick={onDonate}>
          <span className="ticket-hole ticket-hole--l" aria-hidden="true" />
          <span>Buy the Treat</span>
          <span className="ticket-price">$1</span>
          <span className="ticket-hole ticket-hole--r" aria-hidden="true" />
        </button>
        <p className="finale-sub">secured by Stripe &middot; she will absolutely do a spin</p>
      </motion.div>
    </section>
  )
}
