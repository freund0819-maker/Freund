import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'intro',        label: 'Home' },
  { id: 'display',      label: 'Works' },
  { id: 'about',        label: 'About' },
  { id: 'competencies', label: 'Skills' },
];

export default function Nav() {
  const [active, setActive] = useState('intro');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      padding: '1.2rem 8vw',
      pointerEvents: 'none',
      background: scrolled ? 'rgba(10,10,11,0.6)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
    }}>
      {/* Logo */}
      <span
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'rgba(234,234,234,0.6)',
          textTransform: 'uppercase',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transition: 'color 0.3s ease, letter-spacing 0.4s ease',
        }}
        onMouseEnter={e => {
          e.target.style.color = '#E8A849';
          e.target.style.letterSpacing = '0.35em';
        }}
        onMouseLeave={e => {
          e.target.style.color = 'rgba(234,234,234,0.6)';
          e.target.style.letterSpacing = '0.2em';
        }}
        onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
      >
        FREUND0815
      </span>

      {/* Section indicators */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={label}
            style={{
              pointerEvents: 'auto',
              background: 'none',
              border: 'none',
              padding: '6px 4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative',
            }}
          >
            <span style={{
              display: 'block',
              width: active === id ? '24px' : '8px',
              height: '2px',
              background: active === id
                ? 'var(--accent-color)'
                : 'rgba(255,255,255,0.15)',
              transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
              boxShadow: active === id ? '0 0 10px rgba(232,168,73,0.5)' : 'none',
              borderRadius: '1px',
            }} />
          </button>
        ))}
      </div>
    </nav>
  );
}
