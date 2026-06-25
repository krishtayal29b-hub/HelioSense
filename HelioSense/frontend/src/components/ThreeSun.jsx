import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

function SunMesh() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <MeshDistortMaterial 
        color="#ff7a00"
        emissive="#ff3300"
        emissiveIntensity={2}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
}

export default function ThreeSun() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffcc00" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1.5} />
        <SunMesh />
        {/* Glow rings */}
        <Sphere args={[2.7, 32, 32]}>
          <meshBasicMaterial color="#ff3300" transparent opacity={0.15} wireframe />
        </Sphere>
        <Sphere args={[3.1, 32, 32]}>
          <meshBasicMaterial color="#ff7a00" transparent opacity={0.05} />
        </Sphere>
      </Canvas>
    </div>
  );
}
