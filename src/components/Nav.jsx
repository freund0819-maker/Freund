import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'intro',        label: '01' },
  { id: 'display',      label: '02' },
  { id: 'about',        label: '03' },
  { id: 'competencies', label: '04' },
];

export default function Nav() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.4rem 7vw',
      pointerEvents: 'none',
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        color: 'rgba(240,240,240,0.5)',
        textTransform: 'uppercase',
        pointerEvents: 'auto',
      }}>
        FREUND0815
      </span>

      {/* Section dots */}
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={`Go to section ${label}`}
            style={{
              pointerEvents: 'auto',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{
              display: 'block',
              width: active === id ? '20px' : '6px',
              height: '1px',
              background: active === id ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)',
              transition: 'width 0.4s ease, background 0.3s ease',
              boxShadow: active === id ? '0 0 8px rgba(0,255,65,0.5)' : 'none',
            }} />
          </button>
        ))}
      </div>
    </nav>
  );
}
