import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton';
import TextReveal from '../TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".intro-title", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out"
      });
      gsap.from(".intro-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="intro" style={{ alignItems: 'center', textAlign: 'center' }}>
      <TextReveal delay={0} className="intro-title text-glow-accent" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        FREUND0815
      </TextReveal>
      <TextReveal delay={0.6} className="intro-subtitle" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        3D Artist & Visual Designer
      </TextReveal>
    </section>
  );
}
