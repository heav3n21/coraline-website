import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-constellation" aria-hidden="true">
          {[...Array(5)].map((_,i) => (
            <div key={i} className="f-eye" style={{ animationDelay:`${i*0.28}s` }}>
              <div className="f-eye-p"/><div className="f-eye-s"/>
            </div>
          ))}
        </div>

        <h2 className="footer-name">Coraline</h2>
        <p className="footer-tagline hand">
          golden retriever · very good girl · treat enthusiast
        </p>

        <div className="footer-rule" aria-hidden="true">
          <span/><span className="hand footer-rule-symbol">✦</span><span/>
        </div>

        <p className="footer-copy">
          Made with golden light and a little bit of magic<br />
          for the world's most deserving dog.
        </p>
        <p className="footer-legal">
          © {new Date().getFullYear()} Buy Coraline a Treat ·{' '}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
        </p>
      </div>
    </footer>
  )
}
