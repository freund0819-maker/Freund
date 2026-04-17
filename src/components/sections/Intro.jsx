import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

export default function Intro() {
  const containerRef = useRef();
  const ghostRef = useRef();
  const nameRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered label reveal
      gsap.from('.intro-label', {
        opacity: 0, y: 14, duration: 1, delay: 0.1, ease: 'power2.out'
      });

      // Split name into letters for staggered reveal
      if (nameRef.current) {
        const text = nameRef.current.innerText;
        nameRef.current.innerHTML = '';
        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.innerText = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(60px) rotateX(-15deg)';
          span.style.transformOrigin = 'center bottom';
          span.className = 'intro-char';
          nameRef.current.appendChild(span);
        });

        gsap.to('.intro-char', {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
          delay: 0.25,
          ease: 'power3.out',
        });
      }

      gsap.from('.intro-role', {
        opacity: 0, y: 24, duration: 1, delay: 0.8, ease: 'power2.out'
      });
      gsap.from('.available-badge', {
        opacity: 0, scale: 0.9, y: 12, duration: 0.9, delay: 1.1, ease: 'back.out(1.4)'
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
        duration: 1.6,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="intro" style={{ justifyContent: 'center', paddingTop: '18vh', position: 'relative' }}>
      <span className="section-number">01 / 04</span>

      {/* Ghost watermark — layered parallax */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '3vw',
          transform: 'translateY(-50%)',
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(7rem, 25vw, 24rem)',
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,168,73,0.03)',
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
        <p className="section-label intro-label" style={{ marginBottom: '1.2rem' }}>
          Portfolio
        </p>
        <h1 ref={nameRef} className="intro-name">FREUND0815</h1>
        <p className="intro-role">3D Artist &amp; Visual Designer</p>

        <div className="available-badge">
          <span className="available-dot" />
          Available for Work
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '8vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        opacity: 0.25,
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.48rem',
          fontWeight: 500,
          letterSpacing: '0.35em',
          color: 'var(--text-secondary)',
          writingMode: 'vertical-rl',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '52px',
          background: 'linear-gradient(to bottom, var(--accent-color), transparent)',
          animation: 'scrollPulse 2.2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
