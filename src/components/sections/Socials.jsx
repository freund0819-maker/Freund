import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Socials() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".social-link", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const links = [
    { name: 'ArtStation', url: 'https://freund0815.artstation.com/' }
  ];

  return (
    <section ref={containerRef} id="socials" style={{ minHeight: '50vh', padding: '50px 5vw', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 className="text-glow-accent" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          LET'S CONNECT
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem' }}>
          Available for freelance opportunities and visionary collaborations.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <MagneticButton 
             className="futuristic-btn text-glow" 
             style={{ padding: '15px 40px', fontSize: '1.5rem', background: 'rgba(0, 255, 65, 0.1)', borderColor: 'var(--accent-color)', boxShadow: 'var(--accent-glow)' }} 
             onClick={() => window.open('https://freund0815.artstation.com/', '_blank')}
          >
            VIEW ARTSTATION
          </MagneticButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {links.map((link, i) => (
            <MagneticButton key={i} className="social-link futuristic-btn" style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }} onClick={() => window.open(link.url, '_blank')}>
              {link.name}
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  );
}
