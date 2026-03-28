import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import Background3D from './components/Background3D';
import Nav from './components/Nav';
import SectionDivider from './components/SectionDivider';
import Intro from './components/sections/Intro';
import Display from './components/sections/Display';
import About from './components/sections/About';
import Competencies from './components/sections/Competencies';
import Socials from './components/sections/Socials';

export default function App() {
  return (
    <div className="app-container">

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="content-wrapper">
        <Nav />
        <Intro />
        <SectionDivider label="Gallery" />
        <Display />
        <SectionDivider label="Profile" />
        <About />
        <SectionDivider label="Competencies" />
        <Competencies />
        <SectionDivider label="Connect" />
        <Socials />
      </div>
    </div>
  );
}
