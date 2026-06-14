import React from 'react'
import './CircusBackground.css'

export default function CircusBackground() {
  return (
    <div className="circus-bg" aria-hidden="true">
      {/* Red & cream vertical stripes — the whole tent canvas */}
      <div className="stripes" />
      {/* Aged vignette overlay — darkens edges like old fabric */}
      <div className="vignette" />
      {/* Canvas texture */}
      <div className="canvas-tex" />
    </div>
  )
}
