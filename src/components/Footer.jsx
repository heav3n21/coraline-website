import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-mice" aria-hidden="true">🐭 🐭 🐭</div>
        <h2 className="footer-name hand">Coraline</h2>
        <p className="footer-role hand">golden retriever · very good girl · treat enthusiast</p>
        <div className="footer-rule">
          <span className="rule-line"/><span className="footer-dot hand">·</span><span className="rule-line"/>
        </div>
        <p className="footer-copy">Made with love for the world's best dog.<br/>Every treat confirmed. Every spin witnessed.</p>
        <p className="footer-legal">
          © {new Date().getFullYear()} Buy Coraline a Treat ·{' '}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
        </p>
      </div>
    </footer>
  )
}
