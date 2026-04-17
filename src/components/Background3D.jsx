import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* Optimized: single instanced mesh, no DOF, lower count, no per-particle pulse */

function AmbientOrbs() {
  const meshRef = useRef();
  const groupRef = useRef();
  const count = 35; // was 85 total across two layers — 35 is plenty

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor:    14 + Math.random() * 22,
        speed:     0.0006 + Math.random() / 600,
        xFactor:  -45 + Math.random() * 90,
        yFactor:  -28 + Math.random() * 56,
        zFactor:  -50 + Math.random() * 70,
        scale:     0.4 + Math.random() * 1.8,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    // Rotate the whole group instead of computing per-particle transforms for rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00008;
    }

    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.t += p.speed;
      dummy.position.set(
        p.xFactor + Math.cos(p.t) * p.factor,
        p.yFactor + Math.sin(p.t * 0.9) * p.factor,
        p.zFactor + Math.cos(p.t * 0.6) * p.factor
      );
      // Fixed scale — no sin() call per frame per particle
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[0.5, 8, 8]} /> {/* fewer segments: 8x8 not 16x16 */}
        <meshBasicMaterial color="#E8A849" transparent opacity={0.1} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default function Background3D() {
  return (
    <>
      <color attach="background" args={['#080809']} />
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={['#080809', 22, 65]} />

      <AmbientOrbs />

      <EffectComposer disableNormalPass>
        {/* DOF removed — it's a full-screen pass that's very expensive */}
        <Bloom
          luminanceThreshold={0.12}
          mipmapBlur
          intensity={0.9}
          levels={6} // default is 8, fewer = faster
        />
      </EffectComposer>
    </>
  );
}
