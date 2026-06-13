import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <ButtonEye />
          <h1 className="header-title title-font">
            buy coraline a treat
          </h1>
          <ButtonEye />
        </div>
        <p className="header-sub hand">
          every treat is a tiny portal to joy
        </p>
      </div>
    </header>
  )
}

function ButtonEye() {
  return (
    <div className="btn-eye-deco" aria-hidden="true">
      <div className="btn-eye-outer">
        <div className="btn-eye-inner" />
        <div className="btn-eye-shine" />
      </div>
      <div className="btn-eye-thread btn-eye-thread--top" />
      <div className="btn-eye-thread btn-eye-thread--bottom" />
    </div>
  )
}
