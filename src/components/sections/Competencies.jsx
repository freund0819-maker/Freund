import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Competencies() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".skill-bar-fill", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out"
      });
      gsap.from(".skill-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'Blender', level: '95%' },
    { name: 'CLIP STUDIO PAINT', level: '85%' }
  ];

  return (
    <section ref={containerRef} id="competencies" style={{ backgroundColor: 'rgba(5,5,5,0.8)' }}>
      <h2 className="text-glow-accent" style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        COMPETENCIES
      </h2>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {skills.map((skill, i) => (
          <div key={i} className="skill-item" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-glow" style={{ fontSize: '1.2rem' }}>{skill.name}</span>
              <span style={{ color: 'var(--accent-color)' }}>{skill.level}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="skill-bar-fill" style={{ width: skill.level, height: '100%', background: 'linear-gradient(90deg, var(--accent-color), #fff)', boxShadow: 'var(--accent-glow)' }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
