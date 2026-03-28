import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionDivider
 * A horizontal scan-line that shoots across the viewport
 * as the user scrolls into a new section.
 * Feels like a tape-cut or typesetting rule — editorial and precise.
 */
export default function SectionDivider({ label = '' }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      });

      // Dot appears first at left edge
      tl.fromTo(dotRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.18, ease: 'power2.out' },
        0
      );

      // Line shoots right at high speed
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: 'power3.out' },
        0.12
      );

      // Label fades in after the line passes it
      tl.fromTo(labelRef.current,
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
        0.45
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 7vw',
        zIndex: 20,
        background: 'rgba(3,3,3,0.9)',
        overflow: 'hidden',
      }}
    >
      {/* Leading dot */}
      <div
        ref={dotRef}
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--accent-color)',
          boxShadow: '0 0 8px rgba(0,255,65,0.8)',
          flexShrink: 0,
          transformOrigin: 'left center',
        }}
      />

      {/* Scan line */}
      <div
        ref={lineRef}
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, var(--accent-color), rgba(0,255,65,0.15))',
          transformOrigin: 'left center',
          boxShadow: '0 0 6px rgba(0,255,65,0.4)',
        }}
      />

      {/* Section name label */}
      {label && (
        <span
          ref={labelRef}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-color)',
            opacity: 0.7,
            padding: '0 0 0 1rem',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
