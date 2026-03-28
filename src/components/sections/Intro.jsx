import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

export default function Intro() {
  const containerRef = useRef();
  const ghostRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-label', {
        opacity: 0, y: 10, duration: 0.8, delay: 0.2, ease: 'power2.out'
      });
      gsap.from('.intro-name', {
        opacity: 0, y: 40, duration: 1.1, delay: 0.35, ease: 'power3.out'
      });
      gsap.from('.intro-role', {
        opacity: 0, y: 20, duration: 0.9, delay: 0.7, ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ghostRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5);
      const yPct = (e.clientY / window.innerHeight - 0.5);
      gsap.to(ghostRef.current, {
        x: xPct * -30,
        y: yPct * -15,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="intro" style={{ justifyContent: 'center', paddingTop: '20vh', position: 'relative' }}>
      {/* Section number */}
      <span className="section-number">01 / 04</span>

      {/* Ghost watermark — mouse parallax */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '5vw',
          transform: 'translateY(-50%)',
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        FREUND
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="section-label intro-label" style={{ marginBottom: '1rem' }}>
          Portfolio
        </p>
        <h1 className="intro-name">FREUND0815</h1>
        <p className="intro-role">3D Artist &amp; Visual Designer</p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '7vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        opacity: 0.35,
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.5rem',
          letterSpacing: '0.35em',
          color: 'var(--text-secondary)',
          writingMode: 'vertical-rl',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, rgba(0,255,65,0.5), transparent)',
          animation: 'scrollPulse 1.8s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
