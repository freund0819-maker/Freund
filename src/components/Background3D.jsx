import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

/* Dual-layer particle system: warm amber foreground + cool deep background */

function AmbientOrbs() {
  const meshRef = useRef();
  const groupRef = useRef();
  const count = 60;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 12 + Math.random() * 28;
      const speed = 0.0008 + Math.random() / 500;
      const xFactor = -45 + Math.random() * 90;
      const yFactor = -30 + Math.random() * 60;
      const zFactor = -55 + Math.random() * 80;
      const scaleBase = 0.2 + Math.random() * 2.0;
      const pulseSpeed = 0.2 + Math.random() * 0.6;
      const pulseAmp = 0.1 + Math.random() * 0.2;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, scaleBase, pulseSpeed, pulseAmp });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0001;
      groupRef.current.rotation.x += 0.00003;
    }
    
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, scaleBase, pulseSpeed, pulseAmp } = particle;
      t = particle.t += speed;
      
      const pulse = scaleBase + Math.sin(time * pulseSpeed) * pulseAmp;
      
      dummy.position.set(
        xFactor + Math.cos(t) * factor,
        yFactor + Math.sin(t * 0.9) * factor,
        zFactor + Math.cos(t * 0.6) * factor
      );
      dummy.scale.set(pulse, pulse, pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#E8A849" transparent opacity={0.08} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* Deep secondary layer — cooler, larger, slower */
function DeepOrbs() {
  const meshRef = useRef();
  const count = 25;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 35;
      const speed = 0.0003 + Math.random() / 800;
      const xFactor = -60 + Math.random() * 120;
      const yFactor = -40 + Math.random() * 80;
      const zFactor = -80 + Math.random() * 60;
      const scaleBase = 1.5 + Math.random() * 4;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, scaleBase });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, scaleBase } = particle;
      t = particle.t += speed;
      dummy.position.set(
        xFactor + Math.cos(t) * factor,
        yFactor + Math.sin(t) * factor,
        zFactor + Math.cos(t * 0.5) * factor
      );
      dummy.scale.set(scaleBase, scaleBase, scaleBase);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.5, 10, 10]} />
      <meshBasicMaterial color="#8B5E2B" transparent opacity={0.025} toneMapped={false} />
    </instancedMesh>
  );
}

export default function Background3D() {
  return (
    <>
      <color attach="background" args={['#08080A']} />
      <ambientLight intensity={0.25} />
      
      <fog attach="fog" args={['#08080A', 20, 70]} />
      
      <DeepOrbs />
      <AmbientOrbs />

      <EffectComposer disableNormalPass>
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.08} 
          bokehScale={4} 
          height={480} 
        />
        <Bloom 
          luminanceThreshold={0.1} 
          mipmapBlur 
          intensity={1.2} 
        />
      </EffectComposer>
    </>
  );
}
