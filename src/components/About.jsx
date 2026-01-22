import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { SectionWrapper } from "../hoc";

/* -------------------------------------------------------------------------- */
/* 3D PENCIL COMPONENT                         */
/* -------------------------------------------------------------------------- */
const Pencil = ({ palette }) => {
  const group = useRef();
  const { viewport, mouse } = useThree();
  
  // Smooth movement state
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  // Color cycling state for the trail
  const [trailColor, setTrailColor] = useState(palette[0]);
  const colorIndex = useRef(0);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // 1. Calculate Target Position (Mouse -> World)
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    targetPos.current.set(x, y, 0);

    // 2. Smooth Lerp
    currentPos.current.lerp(targetPos.current, 0.1);
    
    // 3. Apply Position
    if (group.current) {
      group.current.position.copy(currentPos.current);
      
      // 4. Dynamic Tilt
      const tiltX = (targetPos.current.x - currentPos.current.x) * 0.5;
      const tiltY = (targetPos.current.y - currentPos.current.y) * 0.5;
      group.current.rotation.set(tiltY, tiltX, -0.8 + tiltX * 0.2);
    }

    // 5. Cycle Trail Colors
    timeRef.current += delta;
    if (timeRef.current > 0.2) {
      timeRef.current = 0;
      colorIndex.current = (colorIndex.current + 1) % palette.length;
      setTrailColor(palette[colorIndex.current]);
    }
  });

  return (
    <group ref={group}>
      {/* A. THE INK TRAIL 
        We use an invisible mesh at (0,0,0) as the emitter.
        Since the group follows the mouse, this trail emits from the mouse cursor.
      */}
      <Trail
        width={1.5}
        length={8}
        color={trailColor}
        attenuation={(t) => t * t}
      >
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </Trail>

      {/* B. THE PENCIL VISUALS 
        Shifted UP so the tip aligns with the group origin (0,0,0).
        Tip is roughly at -2.25 local Y, so we shift group up by +2.25.
      */}
      <group rotation={[0, 0, 0]} position={[0, 2.25, 0]}> 
        
        {/* 1. Wood Cone (Tip Holder) - Rotated 180 to point DOWN */}
        <mesh position={[0, -1.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.26, 0.8, 32]} />
          <meshStandardMaterial color="#f0c2a8" />
        </mesh>

        {/* 2. Graphite Tip - Rotated 180 to point DOWN */}
        <mesh position={[0, -2.1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.08, 0.35, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* 3. Hexagonal Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 2.5, 6]} />
          <meshStandardMaterial color="#FDB813" roughness={0.3} />
        </mesh>

        {/* 4. Metal Ferrule */}
        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.3, 32]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 5. Eraser */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.3, 32]} />
          <meshStandardMaterial color="#ff9999" />
        </mesh>

      </group>
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */
const About = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];

  // --- Typewriter Variants ---
  const typingContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const typingWord = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  const renderWords = (text) =>
    text.split(" ").map((word, index) => (
      <motion.span variants={typingWord} key={index} className="inline-block mr-[0.25em]">
        {word}
      </motion.span>
    ));

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 flex flex-col items-center justify-center overflow-hidden pb-24 sm:pb-32 rounded-t-[50px] bg-[#fdfbf7]">
      
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #000000 1.5px, transparent 1.5px),
              linear-gradient(to bottom, #000000 1.5px, transparent 1.5px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* 2. 3D PENCIL LAYER */}
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} />
          <Pencil palette={palette} />
        </Canvas>
      </div>

      {/* 3. TEXT CONTENT */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center pointer-events-none">
        
        {/* HEADER */}
        <motion.div
          onViewportEnter={() => setTriggerAnimation(true)}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full flex justify-center items-center py-20 md:py-32 mb-10"
        >
          <h2
            className={`
              font-black 
              text-[14vw] 
              leading-[0.9] uppercase tracking-tighter text-center 
              pointer-events-none select-none 
              drop-shadow-xl
              ${triggerAnimation ? "animate-fill-fade-black" : "opacity-0"}
            `}
          >
            About Me
          </h2>
        </motion.div>

        {/* BIO TEXT */}
        <div className="max-w-2xl text-center px-4 font-sans text-xl md:text-2xl text-gray-900 leading-relaxed font-medium pointer-events-auto">
          <motion.p
            variants={typingContainer}
            initial="hidden"
            animate={triggerAnimation ? "visible" : "hidden"}
          >
            {renderWords(
              "I started in hospitality and graduated in Games Technology. Now I’m focused on my own projects—exploring UX, AI, and game-inspired interactions—with the aim of stepping into a junior software developer role."
            )}
            <br className="block my-6 content-['']" />
            
            {renderWords("Tools I’m using: ")}
            <motion.span variants={typingWord} className="inline-block mr-[0.25em]"><strong>React</strong>,</motion.span>
            <motion.span variants={typingWord} className="inline-block mr-[0.25em]"><strong>Three.js</strong>,</motion.span>
            <motion.span variants={typingWord} className="inline-block mr-[0.25em]"><strong>JavaScript</strong></motion.span>
            <motion.span variants={typingWord} className="inline-block mr-[0.25em]">plus</motion.span>
            <motion.span variants={typingWord} className="inline-block mr-[0.25em]"><strong>C#/C++</strong></motion.span>
            {renderWords("from my Games Tech degree.")}
          </motion.p>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        @keyframes fillFadeBlack {
          0% { color: transparent; text-shadow: 0px 0px 0 transparent; opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          50% { color: transparent; text-shadow: 0px 0px 0 transparent; }
          100% { color: #1a1a1a; text-shadow: 4px 4px 0 #1328f0; opacity: 1; transform: translateY(0); }
        }
        .animate-fill-fade-black {
          color: transparent;
          -webkit-text-stroke: 2px #1a1a1a; 
          animation: fillFadeBlack 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(About, "about");
