import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { SectionWrapper } from "../hoc";

/* -------------------------------------------------------------------------- */
/* 3D PENCIL COMPONENT                                                        */
/* -------------------------------------------------------------------------- */
const Pencil = ({ palette, isTouch, isHovering }) => {
  const group = useRef();
  const { viewport, mouse } = useThree();
  const { scene } = useGLTF("/pencil.glb"); 

  // Smooth movement state
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  // Color cycling state for the trail
  const [trailColor, setTrailColor] = useState(palette[0]);
  const colorIndex = useRef(0);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // --- 1. HANDLE POSITIONING ---
    if (isTouch) {
      // MOBILE: Idle floating animation (ignore mouse)
      const t = state.clock.getElapsedTime();
      targetPos.current.set(
        Math.sin(t * 0.5) * 0.5, // Gentle X sway
        Math.cos(t * 0.5) * 0.5, // Gentle Y sway
        0
      );
    } else {
      // DESKTOP: Follow mouse
      if (isHovering) {
        // Active tracking
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        targetPos.current.set(x, y, 0);
      } else {
        // Park the pencil when mouse leaves the canvas area
        // (Optional: move it slightly off-center or keep last pos)
        // We'll keep it at the last known pos to avoid sudden jumps, 
        // or you could set it to (0,0,0) to return to center.
      }
    }

    // --- 2. SMOOTH LERP (PREMIUM FEEL) ---
    // Increased to 0.12 as requested for better weight
    currentPos.current.lerp(targetPos.current, 0.12);
    
    // --- 3. APPLY TRANSFORMS ---
    if (group.current) {
      group.current.position.copy(currentPos.current);
      
      // Dynamic Tilt (only aggressive when moving)
      const tiltX = (targetPos.current.x - currentPos.current.x) * 0.6;
      const tiltY = (targetPos.current.y - currentPos.current.y) * 0.6;
      
      // Base rotation [-0.4] is the 'writing angle'
      // We reduce tilt intensity on mobile
      const baseTilt = isTouch ? 0 : -0.4;
      group.current.rotation.set(tiltY, tiltX, baseTilt + tiltX * 0.2);
    }

    // --- 4. CYCLE TRAIL COLORS ---
    // Only cycle colors if moving (on desktop) or always on mobile
    if (isHovering || isTouch) {
      timeRef.current += delta;
      if (timeRef.current > 0.2) {
        timeRef.current = 0;
        colorIndex.current = (colorIndex.current + 1) % palette.length;
        setTrailColor(palette[colorIndex.current]);
      }
    }
  });

  return (
    <group ref={group}>
      {/* A. THE INK TRAIL 
          - Only visible when hovering or on mobile (decorative)
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

      {/* B. THE PENCIL MODEL */}
      <primitive 
        object={scene} 
        scale={0.6}           
        position={[0.7, 0.5, 0]} 
        rotation={[0, 0, 0.8]}   
      />
    </group>
  );
};

// Preload
useGLTF.preload("/pencil.glb");

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
const About = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];

  // --- Interaction States ---
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // --- Detect Mobile/Touch ---
  useEffect(() => {
    const checkTouch = () => {
      // (pointer: coarse) usually indicates a touch screen
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      setIsTouch(isTouchDevice);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // --- Hide Hint on Interaction ---
  useEffect(() => {
    let timer;
    if (isHovering) {
      setShowHint(false);
    } else {
      // Re-show hint if they leave? 
      // User requested: "Re-appear if user hasn’t moved yet" or 
      // simply "Fade out after 1–2s". Let's auto-hide after 3s anyway.
      timer = setTimeout(() => setShowHint(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

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
    <section 
      // 1. DYNAMIC CURSOR: Only hide cursor if hovering AND not on touch device
      className={`
        relative w-screen left-1/2 -translate-x-1/2 flex flex-col items-center justify-center 
        overflow-hidden pb-24 sm:pb-32 rounded-t-[50px] bg-[#fdfbf7]
        ${isHovering && !isTouch ? "cursor-none" : "cursor-auto"}
      `}
      // 2. INTERACTION HANDLERS
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      {/* 3D PENCIL LAYER */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* pointer-events-none on wrapper so it doesn't block text selection, 
            but R3F needs events? 
            Actually, R3F tracks global mouse by default. 
            We keep z-index low so text is selectable. */}
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} />
          <Pencil 
            palette={palette} 
            isTouch={isTouch} 
            isHovering={isHovering} 
          />
        </Canvas>
      </div>

      {/* USER INSTRUCTION HINT */}
      <AnimatePresence>
        {!isTouch && showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 z-20 font-mono text-sm text-gray-500 pointer-events-none"
          >
            Move your cursor to draw
          </motion.div>
        )}
      </AnimatePresence>

      {/* TEXT CONTENT */}
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
        {/* pointer-events-auto ensures text is selectable despite container being none */}
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
    </section>
  );
};

export default SectionWrapper(About, "about");
