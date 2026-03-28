import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

function AmbientOrbs() {
  const meshRef = useRef();
  const count = 80;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 12 + Math.random() * 25;
      const speed = 0.002 + Math.random() / 300;
      const xFactor = -35 + Math.random() * 70;
      const yFactor = -25 + Math.random() * 50;
      const zFactor = -45 + Math.random() * 70;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, scale: 0.3 + Math.random() * 1.8 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, scale } = particle;
      t = particle.t += speed;
      
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
      <sphereGeometry args={[0.5, 12, 12]} />
      <meshBasicMaterial color="#00ff41" transparent opacity={0.2} toneMapped={false} />
    </instancedMesh>
  );
}

export default function Background3D() {
  return (
    <>
      <color attach="background" args={['#030303']} />
      <ambientLight intensity={0.4} />
      
      <fog attach="fog" args={['#030303', 15, 60]} />
      
      <AmbientOrbs />

      <EffectComposer disableNormalPass>
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.12} 
          bokehScale={3.5} 
          height={480} 
        />
        <Bloom 
          luminanceThreshold={0.15} 
          mipmapBlur 
          intensity={1.0} 
        />
      </EffectComposer>
    </>
  );
}
