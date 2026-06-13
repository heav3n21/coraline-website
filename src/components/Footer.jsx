import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-eyes" aria-hidden="true">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="footer-eye" style={{ animationDelay: `${i*0.25}s` }}>
              <div className="footer-eye-p"/>
              <div className="footer-eye-shine"/>
            </div>
          ))}
        </div>

        <h2 className="footer-name">Coraline</h2>
        <p className="footer-role hand">golden retriever · very good girl · treat enthusiast</p>

        <div className="footer-rule" aria-hidden="true">
          <span/><span className="hand">✦</span><span/>
        </div>

        <p className="footer-copy">
          Made with care for the world's best dog.<br/>
          Every treat confirmed, every spin verified.
        </p>

        <p className="footer-legal">
          © {new Date().getFullYear()} Buy Coraline a Treat
          {' · '}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
        </p>
      </div>
    </footer>
  )
}
