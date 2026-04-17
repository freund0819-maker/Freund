import React, { useState, useCallback } from 'react';

import render1 from '../../assets/RENDER1.webp';
import render1_ao from '../../assets/RENDER1_AO.webp';
import render1_solid from '../../assets/RENDER1_SOLID.webp';

import render2 from '../../assets/RENDER2.webp';
import render2_ao from '../../assets/RENDER2_AO.webp';
import render2_solid from '../../assets/RENDER2_SOLID.webp';

import render3 from '../../assets/RENDER3.webp';
import render3_ao from '../../assets/RENDER3_AO.webp';
import render3_solid from '../../assets/RENDER3_SOLID.webp';

import render4 from '../../assets/RENDER4.webp';
import render5 from '../../assets/RENDER5.webp';
import render6 from '../../assets/RENDER6.webp';
import render7 from '../../assets/RENDER7.mp4';

function GalleryItem({ title, category, beauty, ao, solid, span = 6, isVideo = false, index, onOpenLightbox }) {
  const passes = [];
  if (beauty) passes.push({ label: 'FINAL', src: beauty });
  if (ao)     passes.push({ label: 'AO',    src: ao });
  if (solid)  passes.push({ label: 'SOLID', src: solid });

  const [passIdx, setPassIdx] = useState(0);
  const current = passes[passIdx]?.src;
  const isEmpty = passes.length === 0;

  const cyclePass = (e, i) => { e.stopPropagation(); setPassIdx(i); };
  const handleClick = () => {
    if (!isEmpty && onOpenLightbox) {
      onOpenLightbox({ src: current, title, category, isVideo: isVideo && passIdx === 0 });
    }
  };

  return (
    <article
      className={`gallery-item ${isEmpty ? 'placeholder' : ''}`}
      style={{ gridColumn: `span ${span}` }}
      onClick={handleClick}
    >
      {isEmpty ? (
        <div className="gallery-placeholder">[ UNTITLED / PENDING ]</div>
      ) : (
        <>
          {isVideo && passIdx === 0 ? (
            <video src={current} autoPlay muted loop playsInline style={{ display:'block', width:'100%', height:'auto' }} />
          ) : (
            <img src={current} alt={`${title} — ${passes[passIdx]?.label}`} loading="lazy" />
          )}

          <span className="gallery-index">{String(index + 1).padStart(2, '0')}</span>

          {passes.length > 1 && (
            <div className="pass-badge-row">
              {passes.map((p, i) => (
                <button
                  key={p.label}
                  className={`pass-badge${passIdx === i ? ' active' : ''}`}
                  onClick={(e) => cyclePass(e, i)}
                  title={`Show ${p.label}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="gallery-overlay">
        <h3>{title || 'NEW VENTURE'}</h3>
        <p>{category || 'In Progress'}</p>
      </div>
    </article>
  );
}

function Lightbox({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="lightbox-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lightbox-close" onClick={onClose}>ESC · Close</button>
      {data.isVideo
        ? <video src={data.src} autoPlay muted loop playsInline style={{ maxWidth:'90vw', maxHeight:'88vh', objectFit:'contain' }} />
        : <img src={data.src} alt={data.title} />
      }
      <div className="lightbox-info">
        <h3>{data.title}</h3>
        <p>{data.category}</p>
      </div>
    </div>
  );
}

export default function Display() {
  const [lightboxData, setLightboxData] = useState(null);
  const open  = useCallback((d) => setLightboxData(d), []);
  const close = useCallback(() => setLightboxData(null), []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    if (lightboxData) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightboxData, close]);

  const artworks = [
    { title: 'Colours Cascade',   category: 'Modelling',      beauty: render1, ao: render1_ao, solid: render1_solid, span: 8 },
    { title: 'Merry Christmas',   category: '3D-Art Contest',  beauty: render2, ao: render2_ao, solid: render2_solid, span: 4 },
    { title: 'Discord Reimagined',category: 'Branding',        beauty: render3, ao: render3_ao, solid: render3_solid, span: 4 },
    { title: 'All an Illusion!',  category: 'Concept Art',     beauty: render4, span: 6 },
    { title: 'The End',           category: 'Modelling',       beauty: render5, span: 6 },
    { title: 'Glass with Liquid', category: 'Look Dev',        beauty: render6, span: 4 },
    { title: 'Nanobots',          category: 'Animation',       beauty: render7, isVideo: true, span: 8 },
  ];

  return (
    <>
      <section id="display">
        <span className="section-number">02 / 04</span>

        {/* Header sits above the edge-to-edge grid */}
        <div className="gallery-header">
          <p className="section-label">Selected Works</p>
          <h2>GALLERY</h2>
        </div>

        <div className="gallery-grid">
          {artworks.map((art, i) => (
            <GalleryItem key={i} {...art} index={i} onOpenLightbox={open} />
          ))}
        </div>
      </section>

      <Lightbox data={lightboxData} onClose={close} />
    </>
  );
}
