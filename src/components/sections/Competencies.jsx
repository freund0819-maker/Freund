import React from 'react';
import TransitionCurtain from '../TransitionCurtain';

export default function Competencies() {
  const tools = [
    { name: 'Blender', xp: '5+ Years', description: '3D Modelling · Rendering · Rigging', level: 90 },
    { name: 'Clip Studio', xp: '4+ Years', description: 'Illustration · Compositing', level: 80 },
  ];

  return (
    <section id="competencies" style={{ position: 'relative' }}>
      <span className="section-number">04 / 04</span>
      <TransitionCurtain label="SKILLS">
        <p className="section-label">Competencies</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>
          TOOLS &amp; SKILLS
        </h2>

        <div className="accent-corners" style={{ maxWidth: '900px', position: 'relative', padding: '1rem 0' }}>
          {tools.map((tool, i) => (
            <div key={i} className="tool-item">
              <span className="tool-name">{tool.name}</span>
              <div style={{ textAlign: 'right' }}>
                <div className="tool-meta" style={{ color: 'var(--accent-color)', marginBottom: '0.3rem' }}>
                  {tool.xp}
                </div>
                <div className="tool-meta">{tool.description}</div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${tool.level}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </TransitionCurtain>
    </section>
  );
}
