import React, { useRef, useState } from 'react';
import TransitionCurtain from '../TransitionCurtain';

import render1 from '../../assets/RENDER1.jpg';
import render1_ao from '../../assets/RENDER1_AO.jpg';
import render1_solid from '../../assets/RENDER1_SOLID.jpg';

import render2 from '../../assets/RENDER2.jpg';
import render2_ao from '../../assets/RENDER2_AO.jpg';
import render2_solid from '../../assets/RENDER2_SOLID.jpg';

import render3 from '../../assets/RENDER3.jpg';
import render3_ao from '../../assets/RENDER3_AO.jpg';
import render3_solid from '../../assets/RENDER3_SOLID.jpg';

const PASSES = ['FINAL', 'AO', 'SOLID'];

function GalleryItem({ title, category, beauty, ao, solid, span = 6 }) {
  const [passIndex, setPassIndex] = useState(0);

  const images = [beauty, ao, solid];
  const currentImage = images[passIndex];
  const isEmpty = !beauty;

  const cyclePass = (e, idx) => {
    e.stopPropagation();
    setPassIndex(idx);
  };

  return (
    <article
      className={`gallery-item accent-corners ${isEmpty ? 'placeholder' : ''}`}
      style={{ gridColumn: `span ${span}` }}
    >
      {isEmpty ? (
        <div className="gallery-placeholder">
          [ UNTITLED PROJECT / PENDING ]
        </div>
      ) : (
        <>
          <img
            src={currentImage}
            alt={`${title} — ${PASSES[passIndex]}`}
            loading="lazy"
          />

          {/* Pass badges — top right, visible on hover */}
          <div className="pass-badge-row">
            {PASSES.map((p, i) => (
              <button
                key={p}
                className={`pass-badge${passIndex === i ? ' active' : ''}`}
                onClick={(e) => cyclePass(e, i)}
                title={`Show ${p} pass`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Bottom overlay: title + category */}
      <div className="gallery-overlay">
        <h3>{title || "NEW VENTURE"}</h3>
        <p>{category || "In Progress"}</p>
      </div>
    </article>
  );
}

export default function Display() {
  // Each artwork can define its grid span (out of 12 columns).
  // Wide/landscape renders get 8 cols, portrait/square get 4 cols.
  // Together they fill 12: e.g. 8+4, or 4+4+4.
  const artworks = [
    {
      title: 'Colours Cascade',
      category: 'Modelling',
      beauty: render1,
      ao: render1_ao,
      solid: render1_solid,
      span: 8,   // RENDER1 is landscape heavy
    },
    {
      title: 'Merry Christmas',
      category: '3D-Art Contest',
      beauty: render2,
      ao: render2_ao,
      solid: render2_solid,
      span: 4,
    },
    {
      title: 'Discord Reimagined',
      category: 'Branding',
      beauty: render3,
      ao: render3_ao,
      solid: render3_solid,
      span: 12,
    },
    { title: '', category: '', span: 6 },
    { title: '', category: '', span: 6 },
    { title: '', category: '', span: 4 },
    { title: '', category: '', span: 8 },
  ];

  return (
    <section id="display" style={{ position: 'relative' }}>
      <span className="section-number">02 / 04</span>
      <TransitionCurtain label="WORKS">
        <p className="section-label">Selected Works</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '3rem', letterSpacing: '0.04em' }}>
          GALLERY
        </h2>

        <div className="gallery-grid">
          {artworks.map((art, i) => (
            <GalleryItem key={i} {...art} />
          ))}
        </div>
      </TransitionCurtain>
    </section>
  );
}
