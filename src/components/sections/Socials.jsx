import React from 'react';
import TransitionCurtain from '../TransitionCurtain';
import MagneticButton from '../MagneticButton';

export default function Socials() {
  return (
    <section id="socials" style={{ minHeight: '60vh', justifyContent: 'center', position: 'relative' }}>
      <TransitionCurtain label="CONTACT">
        <p className="section-label">Get in Touch</p>

        <div className="glass-panel accent-corners" style={{ maxWidth: '640px', padding: '3rem 2.5rem', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '2rem', letterSpacing: '0.02em' }}>
            LET'S<br />CONNECT
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1rem', lineHeight: 1.8 }}>
            Available for freelance opportunities and visionary collaborations.
          </p>

          <MagneticButton
            className="futuristic-btn"
            style={{ fontSize: '0.8rem' }}
            onClick={() => window.open('https://freund0815.artstation.com/', '_blank')}
          >
            VIEW ARTSTATION
          </MagneticButton>
        </div>
      </TransitionCurtain>
    </section>
  );
}
