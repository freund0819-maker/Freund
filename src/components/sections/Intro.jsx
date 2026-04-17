import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

export default function Intro() {
  const containerRef = useRef();
  const ghostRef = useRef();
  const lineRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Horizontal rule expands
      tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0
      );

      tl.fromTo('.intro-eyebrow',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        0
      );

      // Name: clip-path wipe from left
      tl.fromTo('.intro-name-wrap',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
        0.15
      );

      tl.fromTo('.intro-role',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        0.7
      );

      tl.fromTo('.available-badge',
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
        0.95
      );

      tl.fromTo('.hero-side-text',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 },
        0.5
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ghostRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5);
      const yPct = (e.clientY / window.innerHeight - 0.5);
      gsap.to(ghostRef.current, {
        x: xPct * -40,
        y: yPct * -20,
        duration: 1.8,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="intro"
      style={{
        minHeight: '100vh',
        padding: '0 8vw',
        display: 'grid',
        gridTemplateRows: '1fr auto 1fr',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span className="section-number">01 / 04</span>

      {/* Giant ghost behind everything */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '-5vw',
          transform: 'translateY(-55%)',
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(10rem, 32vw, 30rem)',
          letterSpacing: '-0.06em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,168,73,0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        FREUND
      </div>

      {/* Top row: eyebrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2rem', paddingTop: '18vh', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            ref={lineRef}
            style={{ width: '3rem', height: '1px', background: 'var(--accent-color)', opacity: 0.6 }}
          />
          <span
            className="intro-eyebrow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--accent-color)',
              opacity: 0.9,
            }}
          >
            Portfolio
          </span>
        </div>
      </div>

      {/* Center: main name */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="intro-name-wrap"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <h1
            className="intro-name"
            style={{
              fontSize: 'clamp(4rem, 13vw, 13rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.05em',
              margin: 0,
            }}
          >
            FREUND<br />
            <span style={{ WebkitTextStroke: '1px rgba(240,240,242,0.35)', color: 'transparent' }}>
              0815
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom row: role + badge + scroll */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: '2.5rem',
        paddingBottom: '3rem',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <p className="intro-role" style={{ margin: 0 }}>3D Artist &amp; Visual Designer</p>
          <div className="available-badge" style={{ marginTop: '1.2rem' }}>
            <span className="available-dot" />
            Available for Work
          </div>
        </div>

        {/* Side metadata column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.6rem',
          opacity: 0,
        }}
          className="hero-side-text"
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}>Brandenburg, DE</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}>Blender · Clip Studio</span>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.25,
          position: 'absolute',
          bottom: '2.5rem',
          right: '8vw',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.48rem',
            fontWeight: 500,
            letterSpacing: '0.35em',
            color: 'var(--text-secondary)',
            writingMode: 'vertical-rl',
            textTransform: 'uppercase',
          }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '52px',
            background: 'linear-gradient(to bottom, var(--accent-color), transparent)',
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
