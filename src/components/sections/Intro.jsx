import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Intro() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-label', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });
      gsap.from('.intro-name', {
        opacity: 0,
        y: 40,
        duration: 1.1,
        delay: 0.35,
        ease: 'power3.out'
      });
      gsap.from('.intro-role', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.7,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="intro" style={{ justifyContent: 'flex-end', paddingBottom: '12vh' }}>
      {/* Ghost watermark */}
      <div
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
          WebkitTextStroke: '1px rgba(255,255,255,0.035)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
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
    </section>
  );
}
