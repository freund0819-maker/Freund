import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TransitionCurtain({ label = '', delay = 0.72, children }) {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const stampRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: `top 85%`,
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        stampRef.current,
        { x: '0%', opacity: 0.08 },
        { x: '-30%', opacity: 0, duration: 1.2, ease: 'power3.inOut' },
        0
      );

      tl.fromTo(
        contentRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
        0.05
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={wrapRef} className="curtain-wrapper" style={{ position: 'relative', width: '100%' }}>
      {label && (
        <div ref={stampRef} className="curtain-stamp" aria-hidden="true">
          {label}
        </div>
      )}

      <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
