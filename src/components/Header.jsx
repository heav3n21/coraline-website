import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <ButtonEye />
          <h1 className="header-title">
            Buy Coraline a Treat
          </h1>
          <ButtonEye />
        </div>
        <div className="header-divider" aria-hidden="true">
          <span/><span className="header-divider-text hand">for the goodest girl</span><span/>
        </div>
      </div>
    </header>
  )
}

function ButtonEye() {
  return (
    <div className="btn-eye" aria-hidden="true">
      <div className="btn-eye-disk">
        <div className="btn-eye-pupil" />
        <div className="btn-eye-shine" />
      </div>
      <div className="btn-eye-stitch btn-eye-stitch--t" />
      <div className="btn-eye-stitch btn-eye-stitch--b" />
    </div>
  )
}
