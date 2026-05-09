'use client'

import { useEffect, useState } from 'react'

type Phase = 'enter' | 'exit' | 'done'

const WORD1 = 'Ceylon'
const WORD2 = 'Trailer'

/* Floating particles — pure CSS, no JS loop */
const PARTICLES = [
  { w: 5,  h: 5,  left: '12%', delay: '0s',    dur: '7s'  },
  { w: 3,  h: 3,  left: '27%', delay: '1.4s',  dur: '9s'  },
  { w: 6,  h: 6,  left: '42%', delay: '0.6s',  dur: '8s'  },
  { w: 4,  h: 4,  left: '58%', delay: '2s',    dur: '6s'  },
  { w: 3,  h: 3,  left: '72%', delay: '0.9s',  dur: '10s' },
  { w: 5,  h: 5,  left: '85%', delay: '1.7s',  dur: '7.5s'},
  { w: 4,  h: 4,  left: '6%',  delay: '3s',    dur: '8.5s'},
  { w: 3,  h: 3,  left: '93%', delay: '2.5s',  dur: '9.5s'},
]

const STYLES = `
  /* ── overlay ── */
  .pl-root {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(155deg, #083344 0%, #0E7490 55%, #164E63 100%);
    overflow: hidden;
    will-change: transform;
    transition: transform 1.3s cubic-bezier(0.76, 0, 0.24, 1);
  }
  /* Curtain lifts upward — website revealed underneath */
  .pl-root.pl-exit {
    transform: translateY(-100%);
  }

  /* ── ambient glow behind logo ── */
  .pl-glow {
    position: absolute;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%);
    animation: glowPulse 3s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%, 100% { transform: scale(1);    opacity: 0.6; }
    50%       { transform: scale(1.18); opacity: 1;   }
  }

  /* ── logo ── */
  .pl-logo-wrap {
    position: relative; z-index: 1;
    margin-bottom: 36px;
    animation: logoIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
  }
  @keyframes logoIn {
    from { transform: scale(0.4) translateY(20px); opacity: 0; }
    to   { transform: scale(1)   translateY(0);    opacity: 1; }
  }
  .pl-logo-bg {
    width: 124px; height: 124px; border-radius: 50%;
    background: white;
    display: flex; align-items: center; justify-content: center;
    box-shadow:
      0 0 0 2px rgba(6,182,212,0.5),
      0 0 40px rgba(6,182,212,0.35),
      0 8px 32px rgba(0,0,0,0.4);
  }
  .pl-logo-bg img {
    width: 108px; height: 108px;
    border-radius: 50%;
    object-fit: cover;
  }

  /* Expanding ring pulses */
  .pl-ring {
    position: absolute; inset: -6px;
    border-radius: 50%;
    border: 1.5px solid rgba(6,182,212,0.55);
    animation: ringOut 2.2s ease-out 0.9s infinite;
  }
  .pl-ring2 {
    position: absolute; inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(6,182,212,0.3);
    animation: ringOut 2.2s ease-out 1.5s infinite;
  }
  @keyframes ringOut {
    0%   { transform: scale(1);   opacity: 1; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  /* ── brand letters ── */
  .pl-name {
    position: relative; z-index: 1;
    display: flex; align-items: baseline;
    margin-bottom: 12px;
  }
  .pl-letter {
    display: inline-block;
    font-size: 2.6rem; font-weight: 800; color: white;
    font-family: var(--font-playfair, Georgia, serif);
    letter-spacing: 0.03em;
    animation: letterFall 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) both;
    opacity: 0;
  }
  .pl-gap { display: inline-block; width: 0.45em; }
  @keyframes letterFall {
    from { transform: translateY(-28px) rotateX(40deg); opacity: 0; }
    to   { transform: translateY(0)     rotateX(0deg);  opacity: 1; }
  }

  /* ── tagline ── */
  .pl-tag {
    position: relative; z-index: 1;
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(103,232,249,0.85);
    font-family: var(--font-inter, system-ui, sans-serif);
    animation: fadeSlideUp 0.7s ease 1.9s both;
  }

  /* ── divider line ── */
  .pl-divider {
    position: relative; z-index: 1;
    width: 48px; height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(6,182,212,0.7), transparent);
    margin: 16px 0;
    animation: fadeSlideUp 0.6s ease 1.5s both;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* ── progress bar ── */
  .pl-bar-track {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px;
    background: rgba(255,255,255,0.08);
  }
  .pl-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #06B6D4, #0EA5E9, #06B6D4);
    background-size: 200% 100%;
    animation: barFill 2.5s ease 0.4s both, barShimmer 1.5s linear 0.4s infinite;
  }
  @keyframes barFill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes barShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── floating particles ── */
  .pl-particle {
    position: absolute; bottom: -10px; border-radius: 50%;
    background: rgba(6,182,212,0.45);
    animation: particleRise linear infinite both;
  }
  @keyframes particleRise {
    0%   { transform: translateY(0)       scale(0.3); opacity: 0;   }
    10%  { opacity: 0.8; }
    85%  { opacity: 0.6; }
    100% { transform: translateY(-105vh)  scale(1.2); opacity: 0;   }
  }

  /* ── ocean waves at bottom ── */
  .pl-waves {
    position: absolute; bottom: 3px; left: 0; right: 0;
    height: 80px; opacity: 0.1; pointer-events: none;
    animation: fadeSlideUp 1s ease 0.3s both;
  }

  @media (prefers-reduced-motion: reduce) {
    .pl-root, .pl-letter, .pl-logo-wrap,
    .pl-tag, .pl-bar-fill, .pl-ring, .pl-ring2,
    .pl-glow, .pl-particle {
      animation-duration: 0.01ms !important;
    }
    .pl-root { transition-duration: 0.01ms !important; }
  }
`

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('enter')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done')
      return
    }
    const t1 = setTimeout(() => setPhase('exit'), 3000)
    const t2 = setTimeout(() => setPhase('done'), 4400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className={`pl-root${phase === 'exit' ? ' pl-exit' : ''}`} aria-hidden="true">

        {/* Ambient glow behind logo */}
        <div className="pl-glow" />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="pl-particle"
            style={{
              width: p.w, height: p.h,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

        {/* Logo */}
        <div className="pl-logo-wrap">
          <div className="pl-ring" />
          <div className="pl-ring2" />
          <div className="pl-logo-bg">
            <img
              src="/images/ceylon-trailor-logo-150x-150.png"
              alt="Ceylon Trailer"
              width={108}
              height={108}
            />
          </div>
        </div>

        {/* Brand name — each letter animates in */}
        <div className="pl-name">
          {WORD1.split('').map((char, i) => (
            <span
              key={`w1-${i}`}
              className="pl-letter"
              style={{ animationDelay: `${0.55 + i * 0.07}s` }}
            >
              {char}
            </span>
          ))}
          <span className="pl-gap" />
          {WORD2.split('').map((char, i) => (
            <span
              key={`w2-${i}`}
              className="pl-letter"
              style={{ animationDelay: `${0.55 + (WORD1.length + 1 + i) * 0.07}s` }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="pl-divider" />

        {/* Tagline */}
        <p className="pl-tag">Discover the Heart of Ceylon</p>

        {/* Ocean waves decoration */}
        

        {/* Progress bar */}
        <div className="pl-bar-track">
          <div className="pl-bar-fill" />
        </div>
      </div>
    </>
  )
}
