import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { SectionWrapper } from "../hoc";
import * as THREE from "three";

// --- 1. The Interactive 3D Flower ---
const Flower3D = ({ position, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animation State Refs
  const currentBaseScale = useRef(0.6);

  const [randomData] = useState(() => ({
    speed: 0.5 + Math.random() * 0.5, // Breathing speed
    offset: Math.random() * 100, // Breathing time offset
    baseRotation: (Math.random() - 0.5) * 0.01, // Idle rotation speed
    floatSpeed: 1 + Math.random() * 0.5, // Bobbing speed
    floatOffset: Math.random() * 100, // Bobbing time offset
  }));

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // --- 1. ROTATION ---
    meshRef.current.rotation.z += randomData.baseRotation;

    // --- 2. SCALE ---
    const targetScale = hovered ? 1.2 : 0.6;
    currentBaseScale.current = THREE.MathUtils.lerp(
      currentBaseScale.current,
      targetScale,
      0.1
    );
    const breathing = Math.sin(t * randomData.speed + randomData.offset) * 0.08;
    const finalScale = currentBaseScale.current + breathing;
    meshRef.current.scale.set(finalScale, finalScale, finalScale);

    // --- 3. FLOAT ---
    const floatY =
      Math.sin(t * randomData.floatSpeed + randomData.floatOffset) * 0.2;
    meshRef.current.position.y = position[1] + floatY;
  });

  return (
    <group
      position={[position[0], position[1], position[2]]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FEF9E7" roughness={0.4} />
      </mesh>
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.6;
        const y = Math.sin(rad) * 0.6;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, rad]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

// --- 2. The Responsive Smart Grid Logic ---
const FlowerField = ({ isMobile }) => {
  const config = isMobile
    ? { rows: 18, cols: 6, spacing: 1.6 }
    : { rows: 12, cols: 15, spacing: 1.8 };

  const flowers = useMemo(() => {
    const temp = [];
    const palette = ["#F8C8DC", "#C1E1C1", "#BDE0FE", "#FDFD96"];
    const colorGrid = [];

    for (let i = 0; i < config.rows; i++) {
      const rowColors = [];
      for (let j = 0; j < config.cols; j++) {
        const forbidden = new Set();
        if (j > 0) forbidden.add(rowColors[j - 1]);
        if (i > 0) forbidden.add(colorGrid[i - 1]?.[j]);

        const available = palette.filter((c) => !forbidden.has(c));
        const picked = available[Math.floor(Math.random() * available.length)];

        rowColors.push(picked);

        const x = (j - config.cols / 2) * config.spacing + config.spacing / 2;
        const y = (config.rows / 2 - i) * config.spacing - config.spacing / 2;

        temp.push({
          id: `${i}-${j}`,
          position: [x, y, 0],
          color: picked,
        });
      }
      colorGrid.push(rowColors);
    }
    return temp;
  }, [config.rows, config.cols, config.spacing]);

  return (
    <group>
      {flowers.map((f) => (
        <Flower3D key={f.id} position={f.position} color={f.color} />
      ))}
    </group>
  );
};

// --- 3. The Main Component ---
// --- 3. The Main Component ---
const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth < 768); };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
      
      {/* GLASS EFFECT 1: THE BLOB BEHIND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] -z-10 rounded-full bg-gradient-to-tr from-[#F8C8DC] via-[#BDE0FE] to-[#F8C8DC] blur-[100px] opacity-100" />

      {/* GLASS EFFECT 2: THE MAIN FRAME */}
      <div className="relative w-full h-full border-2 border-black rounded-[2rem] overflow-hidden bg-white/20 backdrop-blur-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* 3D Scene Layer */}
        <div className="absolute inset-0 z-0">
          <Canvas flat camera={{ position: [0, 0, 18], fov: isMobile ? 45 : 35 }}> 
            <ambientLight intensity={0.8} /> 
            <directionalLight position={[5, 10, 5]} intensity={2.0} />
            <FlowerField isMobile={isMobile} />
            
            <Sparkles count={60} scale={12} size={3} speed={0.4} opacity={0.4} color="#F8C8DC" />
            
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.2} radius={0.4} />
              <Noise opacity={0.015} />
              <Vignette eskil={false} offset={0.5} darkness={0.25} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* GLASS EFFECT 3: THE TEXT CARD */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-xl max-w-xl text-center mx-4 shadow-sm">
            <h2 className="font-serif text-4xl mb-6 text-gray-900">
              About Me
            </h2>
            
            <p className="font-sans text-lg text-gray-800 leading-relaxed font-medium">
              I started in hospitality and graduated in Games Technology. Now I’m focused on my own projects—exploring UX, AI, and game-inspired interactions—with the aim of stepping into a junior software developer role. Tools I’m using: React, Three.js, JavaScript plus C#/C++ from my Games Tech degree.
              <br /><br />
              Tools I’m using: <strong>React</strong>, <strong>Three.js</strong>, <strong>JavaScript</strong> plus <strong>C#/C++</strong> from my Games Tech degree.
              <br /><br />
              <span className="text-sm text-gray-600 italic">(Hover over the flowers around me!)</span>
            </p>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
