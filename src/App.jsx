import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

// Components
import Background3D from './components/Background3D';
import Intro from './components/sections/Intro';
import Display from './components/sections/Display';
import Competencies from './components/sections/Competencies';
import Socials from './components/sections/Socials';
import About from './components/sections/About';

function App() {
  return (
    <div className="app-container">
      {/* 3D Background Layer */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Content Layer */}
      <div className="content-wrapper">
        <Intro />
        <Display />
        <About />
        <Competencies />
        <Socials />
      </div>
    </div>
  );
}

export default App;
