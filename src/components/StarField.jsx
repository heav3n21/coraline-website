import React, { useMemo } from 'react'

export default function StarField() {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: (Math.random() * 3 + 2).toFixed(1),
    delay: (Math.random() * 4).toFixed(1),
    minOp: (Math.random() * 0.2 + 0.05).toFixed(2),
    maxOp: (Math.random() * 0.5 + 0.4).toFixed(2),
  })), [])

  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--min-op': s.minOp,
            '--max-op': s.maxOp,
          }}
        />
      ))}
      {/* Colored star clusters like the movie */}
      {[
        { x:15, y:8, color:'#FFD700', size:3 },
        { x:72, y:12, color:'#FFD700', size:2.5 },
        { x:88, y:30, color:'#E8A030', size:2 },
        { x:5, y:45, color:'#FFD700', size:2.5 },
        { x:92, y:60, color:'#E8A030', size:3 },
        { x:30, y:5, color:'#FFD700', size:2 },
        { x:55, y:18, color:'#FFB347', size:2.5 },
      ].map((s, i) => (
        <div key={`c${i}`} className="star" style={{
          left:`${s.x}%`, top:`${s.y}%`,
          width:`${s.size}px`, height:`${s.size}px`,
          background: s.color,
          boxShadow: `0 0 6px ${s.color}, 0 0 12px ${s.color}`,
          '--dur': `${2 + i * 0.4}s`,
          '--delay': `${i * 0.5}s`,
          '--min-op': '0.4',
          '--max-op': '1',
        }}/>
      ))}
    </div>
  )
}
