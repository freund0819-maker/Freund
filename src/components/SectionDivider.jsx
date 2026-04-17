import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

      tl.fromTo(dotRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.2, ease: 'power2.out' },
        0
      );

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        0.12
      );

      tl.fromTo(labelRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0.5
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
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8vw',
        zIndex: 20,
        background: 'rgba(10,10,11,0.92)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={dotRef}
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'var(--accent-color)',
          boxShadow: '0 0 10px rgba(232,168,73,0.7)',
          flexShrink: 0,
          transformOrigin: 'left center',
        }}
      />

      <div
        ref={lineRef}
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, var(--accent-color), rgba(232,168,73,0.1))',
          transformOrigin: 'left center',
          boxShadow: '0 0 8px rgba(232,168,73,0.3)',
        }}
      />

      {label && (
        <span
          ref={labelRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.58rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-color)',
            opacity: 0.65,
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
