import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className, style, delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text into words (or characters if preferred) for staggered reveal
    // Simple word splitting for performance
    const words = containerRef.current.innerText.split(' ');
    containerRef.current.innerHTML = ''; // clear

    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + '\u00A0'; // add non-breaking space
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';

      const innerSpan = document.createElement('span');
      innerSpan.innerText = span.innerText;
      innerSpan.style.display = 'inline-block';
      innerSpan.style.transform = 'translateY(100%)';
      innerSpan.className = 'reveal-inner';

      span.innerHTML = '';
      span.appendChild(innerSpan);
      containerRef.current.appendChild(span);
    });

    const inners = containerRef.current.querySelectorAll('.reveal-inner');

    let ctx = gsap.context(() => {
      gsap.to(inners, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: '0%',
        duration: 1,
        stagger: 0.05,
        delay: delay,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className} style={{ ...style, display: 'inline-block' }}>
      {children}
    </div>
  );
}
