import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import render1 from '../../assets/RENDER1.jpg';
import render1_ao from '../../assets/RENDER1_AO.jpg';
import render1_solid from '../../assets/RENDER1_SOLID.jpg';

import render2 from '../../assets/RENDER2.jpg';
import render2_ao from '../../assets/RENDER2_AO.jpg';
import render2_solid from '../../assets/RENDER2_SOLID.jpg';

import render3 from '../../assets/RENDER3.jpg';
import render3_ao from '../../assets/RENDER3_AO.jpg';
import render3_solid from '../../assets/RENDER3_SOLID.jpg';

function LayeredImage({ beauty, ao, solid, title }) {
  const [sliderVal, setSliderVal] = React.useState(100);
  const containerRef = useRef(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      // Prevent page scroll when hovering card to scrub through the render layers
      e.preventDefault();
      setSliderVal(prev => Math.max(0, Math.min(100, prev - e.deltaY * 0.1)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const beautyClipTop = Math.max(0, Math.min(100, (100 - sliderVal) * 2));
  const beautyClip = `inset(${beautyClipTop}% 0 0 0)`;

  const aoClipTop = Math.max(0, Math.min(100, (50 - sliderVal) * 2));
  const aoClip = `inset(${aoClipTop}% 0 0 0)`;

  const showBeautyWipe = sliderVal > 50 && sliderVal < 100;
  const showAoWipe = sliderVal > 0 && sliderVal < 50;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
      {/* Base image dictates the natural height/aspect ratio of the container */}
      <img src={solid} alt={title + " Solid"} style={{ display: 'block', width: '100%', height: 'auto' }} />
      
      <img src={ao} alt={title + " AO"} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', clipPath: aoClip }} />
      {showAoWipe && (
        <div style={{ position: 'absolute', left: 0, right: '20px', top: `${aoClipTop}%`, height: '2px', background: 'var(--accent-color)', boxShadow: 'var(--accent-glow)', zIndex: 5, pointerEvents: 'none' }}></div>
      )}

      <img src={beauty} alt={title + " Beauty"} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', clipPath: beautyClip }} />
      {showBeautyWipe && (
        <div style={{ position: 'absolute', left: 0, right: '20px', top: `${beautyClipTop}%`, height: '2px', background: '#fff', boxShadow: '0 0 10px #fff', zIndex: 5, pointerEvents: 'none' }}></div>
      )}

      <input 
        type="range" min="0" max="100" value={sliderVal}
        onChange={(e) => setSliderVal(parseInt(e.target.value))}
        className="vertical-slider"
        style={{ position: 'absolute', right: '10px', top: '5%', height: '90%', zIndex: 10 }}
        title="Drag to reveal passes"
      />
      
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '5px', pointerEvents: 'none' }}>
         <span style={{ background: sliderVal > 50 ? 'var(--accent-color)' : 'rgba(0,0,0,0.5)', color: sliderVal > 50 ? '#000' : '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>FINAL</span>
         <span style={{ background: (sliderVal > 0 && sliderVal <= 50) ? 'var(--accent-color)' : 'rgba(0,0,0,0.5)', color: (sliderVal > 0 && sliderVal <= 50) ? '#000' : '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>AO</span>
         <span style={{ background: sliderVal === 0 ? 'var(--accent-color)' : 'rgba(0,0,0,0.5)', color: sliderVal === 0 ? '#000' : '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>SOLID</span>
      </div>
    </div>
  )
}

export default function Display() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".display-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const artworks = [
    { title: "Colours cascade", category: "Modelling", beauty: render1, ao: render1_ao, solid: render1_solid },
    { title: "Merry Christmas", category: "3D-Art Contest", beauty: render2, ao: render2_ao, solid: render2_solid },
    { title: "Discord Remagined", category: "Branding", beauty: render3, ao: render3_ao, solid: render3_solid }
  ];

  return (
    <section ref={containerRef} id="display">
      <h2 className="text-glow-accent" style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        WORKS
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {artworks.map((art, i) => (
          <div key={i} className="display-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ width: '100%', overflow: 'hidden', background: 'rgba(0,255,65,0.05)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,255,65,0.1)' }}>
               {art.beauty && art.ao && art.solid ? (
                 <LayeredImage beauty={art.beauty} ao={art.ao} solid={art.solid} title={art.title} />
               ) : (
                 <span style={{color: 'var(--text-secondary)'}}>[ Render Placeholder ]</span>
               )}
            </div>
            <h3 className="text-glow" style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{art.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat', fontSize: '1.3rem' }}>{art.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
