import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Decal, Float, Sparkles, useGLTF } from "@react-three/drei"; 
import { Physics, useSphere, useCylinder, usePlane } from "@react-three/cannon";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"; 
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import * as THREE from "three";

// --- 1. The Walls ---
const Walls = () => {
  usePlane(() => ({ position: [-9, 0, 0], rotation: [0, Math.PI / 2, 0] })); 
  usePlane(() => ({ position: [9, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  usePlane(() => ({ position: [0, 0, -6], rotation: [0, 0, 0] }));           
  usePlane(() => ({ position: [0, 0, 6], rotation: [0, Math.PI, 0] }));      
  return null;
};

// ... imports remain the same

// --- 2. The Bee Cursor (Colorized) ---
// ... imports remain the same

// --- 2. The Bee Cursor (Colorized by Name) ---
const Bee = () => {
  const { viewport, mouse } = useThree();
  const { scene } = useGLTF('/bee.glb'); 
  
  const beeModelRef = useRef();

  // --- COLOR CHANGE LOGIC ---
// --- COLOR CHANGE LOGIC ---
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'Object_9') {
             // FIX: The original model has a yellow texture/color.
             // We need to remove the texture map to get a pure pink color.
             child.material = new THREE.MeshStandardMaterial({
                color: "#FFD166", // Pure Pink
                roughness: 0.4,   // Matches your flowers
                metalness: 0.1
             });
        }
      }
    });
  }, [scene]);

  // ... rest of the Bee component (physics, useFrame, etc.) remains exactly the same
  const [physicsRef, api] = useSphere(() => ({ 
    type: "Kinematic", 
    args: [1.2], 
    position: [0, 0, 0] 
  }));

  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const prevPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const targetX = (mouse.x * viewport.width) / 2;
    const targetZ = -(mouse.y * viewport.height) / 2;

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.25);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.25);

    api.position.set(currentPos.current.x, 0, currentPos.current.z);
    
    const dx = currentPos.current.x - prevPos.current.x;
    const dz = currentPos.current.z - prevPos.current.z;

    if (beeModelRef.current && (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001)) {
        beeModelRef.current.lookAt(
            currentPos.current.x + dx * 20, 
            0, 
            currentPos.current.z + dz * 20
        );
    }
    prevPos.current.copy(currentPos.current);
  });

  return (
    <group ref={physicsRef}> 
      <group ref={beeModelRef}> 
        <primitive 
          object={scene} 
          scale={0.2} 
          rotation={[0, 0, 0]} 
          position={[0, -0.5, 0]} 
        />
      </group>
    </group>
  );
};

// --- 3. The Tech Flower ---
const TechFlower = ({ position, icon, color }) => {
  const texture = useTexture(icon);
  
  const [ref, api] = useCylinder(() => ({
    mass: 20, 
    position,
    args: [1.2, 1.2, 0.5, 8], 
    linearDamping: 0.8,   
    fixedRotation: true, 
    material: { friction: 0, restitution: 0 } 
  }));

  const originalPos = useRef(position);
  const currentPos = useRef(position);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => (currentPos.current = p));
    return unsubscribe;
  }, [api]);

  useFrame(() => {
    const [cx, cy, cz] = currentPos.current;
    const [ox, oy, oz] = originalPos.current;
    const stiffness = 300; 
    const dx = ox - cx;
    const dy = oy - cy;
    const dz = oz - cz;
    api.applyForce([dx * stiffness, dy * stiffness, dz * stiffness], [0, 0, 0]);
  });

  return (
    <group ref={ref}>
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
            <mesh position={[0, 0.2, 0]}> 
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#FEF9E7" roughness={0.4} />
                <Decal 
                    position={[0, 0.5, 0]} 
                    rotation={[-Math.PI/2, 0, 0]} 
                    scale={0.7} 
                    map={texture} 
                />
            </mesh>
            {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 0.8; 
                const z = Math.sin(rad) * 0.8; 
                return (
                <mesh key={i} position={[x, 0, z]} rotation={[Math.PI/2, 0, -rad]}>
                    <sphereGeometry args={[0.6, 16, 16]} /> 
                    <meshStandardMaterial color={color} roughness={0.5} />
                </mesh>
                );
            })}
        </Float>
    </group>
  );
};

// --- 4. The Garden Container ---
const Tech = () => {
  const palette = ["#F8C8DC", "#C1E1C1", "#BDE0FE", "#FDFD96"];

  const layout = useMemo(() => {
    return [
      [-4.5, 0, -3], [-1.5, 0, -3], [1.5, 0, -3], [4.5, 0, -3], 
      [-6, 0, 0], [-3, 0, 0], [0, 0, 0], [3, 0, 0], [6, 0, 0],  
      [-4.5, 0, 3], [-1.5, 0, 3], [1.5, 0, 3], [4.5, 0, 3],     
    ];
  }, []);

  const colorIndices = [0, 1, 2, 3, 1, 2, 3, 0, 1, 3, 0, 1, 2];

  return (
    <section className="w-full h-[80vh] relative flex flex-col items-center justify-center">
      <div className="text-center mb-8 z-10">
        <h2 className="text-5xl font-serif text-primary">Tech Garden</h2>
        <p className="text-gray-500 mt-2 font-mono text-sm">( Be the bee. Pollinate the code. )</p>
      </div>

      <div className="w-full flex-1 cursor-none"> 
        <Canvas flat camera={{ position: [0, 10, 0], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={2.0} />
          
          <Physics gravity={[0, 0, 0]}> 
            <Bee />
            <Walls /> 
            {technologies.map((tech, index) => {
                const pos = layout[index] || [0, 0, 0];
                const colorIndex = colorIndices[index] ?? (index % 4); 
                const color = palette[colorIndex]; 
                return (
                    <TechFlower key={tech.name} position={pos} icon={tech.icon} color={color} />
                );
            })}
          </Physics>

          <Sparkles count={60} scale={12} size={3} speed={0.4} opacity={0.4} color="#F8C8DC" />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.2} radius={0.4} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.5} darkness={0.25} />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");