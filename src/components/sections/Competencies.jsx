import React from 'react';
import TransitionCurtain from '../TransitionCurtain';

export default function Competencies() {
  const tools = [
    { name: 'Blender', xp: '5+ Years', description: '3D Modelling · Rendering · Rigging' },
    { name: 'Clip Studio Paint', xp: '4+ Years', description: 'Digital Illustration · Compositing' },
  ];

  return (
    <section id="competencies" style={{ backgroundColor: 'rgba(4,4,4,0.9)' }}>
      <TransitionCurtain label="SKILLS" delay={0.7}>
        <p className="section-label">Competencies</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '3rem', letterSpacing: '0.04em' }}>
          TOOLS &amp; SKILLS
        </h2>

        <div style={{ maxWidth: '900px' }}>
          {tools.map((tool, i) => (
            <div key={i} className="tool-item">
              <span className="tool-name">{tool.name}</span>
              <div style={{ textAlign: 'right' }}>
                <div className="tool-meta" style={{ color: 'var(--accent-color)', marginBottom: '0.3rem' }}>
                  {tool.xp}
                </div>
                <div className="tool-meta">{tool.description}</div>
              </div>
            </div>
          ))}
        </div>
      </TransitionCurtain>
    </section>
  );
}
