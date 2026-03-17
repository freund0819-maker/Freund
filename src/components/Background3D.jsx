import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

function AmbientOrbs() {
  const meshRef = useRef();
  const count = 50; // Optimized number of floating orbs
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 20; // Radius of movement
      const speed = 0.005 + Math.random() / 200; // Very slow, passive speed
      const xFactor = -30 + Math.random() * 60;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -40 + Math.random() * 60; // Depth distribution
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, scale: 0.5 + Math.random() * 1.5 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, scale } = particle;
      t = particle.t += speed;
      
      // Organic, smooth Lissajous curve floating logic
      dummy.position.set(
        xFactor + Math.cos(t) * factor,
        yFactor + Math.sin(t) * factor,
        zFactor + Math.cos(t * 0.8) * factor
      );
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      {/* Soft basic material to act as light emitters for the bloom */}
      <meshBasicMaterial color="#00ff41" transparent opacity={0.3} toneMapped={false} />
    </instancedMesh>
  );
}

export default function Background3D() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      
      {/* Adds a very subtle global fog to blend far objects into the background */}
      <fog attach="fog" args={['#050505', 10, 50]} />
      
      <AmbientOrbs />

      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        {/* Depth of Field to create out-of-focus "bokeh" shapes near and far from camera */}
        <DepthOfField 
          focusDistance={0.05} 
          focalLength={0.15} 
          bokehScale={5} 
          height={480} 
        />
        {/* Soft, wide bloom for a cozy glow */}
        <Bloom 
          luminanceThreshold={0.1} 
          mipmapBlur 
          intensity={1.2} 
        />
      </EffectComposer>
    </>
  );
}
