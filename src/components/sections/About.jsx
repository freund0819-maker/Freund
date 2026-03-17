import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import freundImg from '../../assets/Freund.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Parallax effect using data-speed attributes
      gsap.utils.toArray('[data-speed]').forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        gsap.to(layer, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 // smooth scrubbing
          },
          y: (i, target) => -100 * speed,
          ease: "none"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div className="about-content" data-speed="0.2">
          <h2 className="text-glow-accent" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            ABOUT ME
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            I do 3D art and try to improve over time as I go.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            Based in Brandenburg, Germany. Passionate about exploring new techniques and building compelling digital works, primarily utilizing Blender and Clip Studio Paint.
          </p>
        </div>
        <div className="about-image glass-panel" data-speed="0.5" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-color)', boxShadow: 'var(--accent-glow)', overflow: 'hidden' }}>
          <img src={freundImg} alt="Freund" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}
