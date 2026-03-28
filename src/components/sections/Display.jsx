import React, { useRef, useState } from 'react';
import TransitionCurtain from '../TransitionCurtain';

import render1 from '../../assets/RENDER1.jpeg';
import render1_ao from '../../assets/RENDER1_AO.jpeg';
import render1_solid from '../../assets/RENDER1_SOLID.jpeg';

import render2 from '../../assets/RENDER2.jpeg';
import render2_ao from '../../assets/RENDER2_AO.jpeg';
import render2_solid from '../../assets/RENDER2_SOLID.jpeg';

import render3 from '../../assets/RENDER3.jpeg';
import render3_ao from '../../assets/RENDER3_AO.jpeg';
import render3_solid from '../../assets/RENDER3_SOLID.jpeg';

import render4 from '../../assets/RENDER4.jpeg';
import render5 from '../../assets/RENDER5.jpeg';
import render6 from '../../assets/RENDER6.jpeg';
import render7 from '../../assets/RENDER7.mp4';

function GalleryItem({ title, category, beauty, ao, solid, span = 6, isVideo = false }) {
  const passesAvailable = [];
  if (beauty) passesAvailable.push({ label: 'FINAL', src: beauty });
  if (ao) passesAvailable.push({ label: 'AO', src: ao });
  if (solid) passesAvailable.push({ label: 'SOLID', src: solid });

  const [passIndex, setPassIndex] = useState(0);
  const currentAsset = passesAvailable[passIndex]?.src;
  const isEmpty = passesAvailable.length === 0;

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
          {isVideo && passIndex === 0 ? (
            <video
              src={currentAsset}
              autoPlay
              muted
              loop
              playsInline
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          ) : (
            <img
              src={currentAsset}
              alt={`${title} — ${passesAvailable[passIndex]?.label}`}
              loading="lazy"
            />
          )}

          {/* Pass badges — top right, visible on hover */}
          {passesAvailable.length > 1 && (
            <div className="pass-badge-row">
              {passesAvailable.map((p, i) => (
                <button
                  key={p.label}
                  className={`pass-badge${passIndex === i ? ' active' : ''}`}
                  onClick={(e) => cyclePass(e, i)}
                  title={`Show ${p.label} pass`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
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
  const artworks = [
    {
      title: 'Colours Cascade',
      category: 'Modelling',
      beauty: render1,
      ao: render1_ao,
      solid: render1_solid,
      span: 8,
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
    {
      title: 'All an Illusion!',
      category: 'Concept Art',
      beauty: render4,
      span: 6,
    },
    {
      title: 'The End',
      category: 'Modelling',
      beauty: render5,
      span: 6,
    },
    {
      title: 'Glass with Liquid',
      category: 'Look Dev',
      beauty: render6,
      span: 4,
    },
    {
      title: 'Nanobots',
      category: 'Animation',
      beauty: render7,
      isVideo: true,
      span: 8,
    },
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
