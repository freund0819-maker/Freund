import React from 'react';
import freundImg from '../../assets/Freund.jpg';
import TransitionCurtain from '../TransitionCurtain';

export default function About() {
  return (
    <section id="about">
      <TransitionCurtain label="ABOUT" delay={0.68}>
        <p className="section-label">About Me</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '2rem', letterSpacing: '0.04em' }}>
              WHO I AM
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.9', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              I do 3D art and try to improve over time as I go.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.9', color: 'var(--text-secondary)' }}>
              Based in Brandenburg, Germany. Passionate about exploring new techniques and building compelling digital works, primarily utilizing Blender and Clip Studio Paint.
            </p>
          </div>

          {/* Image: stylized border, refined size, right-aligned */}
          <div className="glass-panel accent-corners" style={{ 
            overflow: 'hidden', 
            maxWidth: '420px', 
            marginLeft: 'auto',
            padding: '1rem',
            borderRadius: '2px'
          }}>
            <img
              src={freundImg}
              alt="Freund"
              style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        </div>
      </TransitionCurtain>
    </section>
  );
}
