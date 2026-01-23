import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail, useGLTF, Grid, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/* 3D PENCIL COMPONENT                                                        */
/* -------------------------------------------------------------------------- */
const Pencil = ({ palette, isTouch, isHovering }) => {
  const group = useRef();
  const floorPlane = useRef(); 
  const { mouse, camera, raycaster } = useThree();
  const { scene } = useGLTF("/pencil.glb"); 

  // --- Physics State ---
  const targetPos = useRef(new THREE.Vector3(0, 2, 0)); 
  const currentPos = useRef(new THREE.Vector3(0, 2, 0));
  
  // NEW: Store current rotation angles for smoothing
  const currentRotation = useRef(new THREE.Vector2(0, 0)); 
  
  const [trailColor, setTrailColor] = useState(palette[0]);
  const colorIndex = useRef(0);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // 1. CALCULATE TARGET POSITION
    if (isTouch) {
      const t = state.clock.getElapsedTime();
      targetPos.current.set(
        Math.sin(t * 0.5) * 1.5, 
        1.5 + Math.cos(t * 0.5) * 0.5, 
        0
      );
    } else {
      if (isHovering && floorPlane.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(floorPlane.current);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          targetPos.current.set(point.x, 1, point.z); 
        }
      }
    }

    // 2. SMOOTH POSITION (The "Follow")
    // Reduced to 0.1 for a heavier, smoother feel (less jittery)
    currentPos.current.lerp(targetPos.current, 0.1); 
    
    // 3. SMOOTH ROTATION (The "Tilt")
    if (group.current) {
      group.current.position.copy(currentPos.current);
      
      // Calculate desired tilt based on how fast we are moving
      const velocityX = (targetPos.current.x - currentPos.current.x);
      const velocityZ = (targetPos.current.z - currentPos.current.z);
      
      // Target rotation values
      const targetTiltX = THREE.MathUtils.clamp(velocityX * 2, -0.5, 0.5);
      const targetTiltZ = THREE.MathUtils.clamp(velocityZ * 2, -0.5, 0.5);

      // KEY FIX: Lerp the rotation angles separately to remove jitter
      currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetTiltX, 0.1);
      currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetTiltZ, 0.1);

      // Apply the smoothed rotation
      // Z-axis rotation corresponds to X-movement tilt
      // X-axis rotation corresponds to Z-movement tilt
      group.current.rotation.set(currentRotation.current.y, 0, -currentRotation.current.x);
    }

    // 4. COLOR CYCLE
    if (isHovering || isTouch) {
      timeRef.current += delta;
      if (timeRef.current > 0.1) {
        timeRef.current = 0;
        colorIndex.current = (colorIndex.current + 1) % palette.length;
        setTrailColor(palette[colorIndex.current]);
      }
    }
  });

  return (
    <>
      <mesh 
        ref={floorPlane} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        visible={false} 
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      <group ref={group}>
        <Trail width={1.5} length={6} color={trailColor} attenuation={(t) => t * t}>
          <mesh visible={false}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </Trail>
        <primitive 
          object={scene} 
          scale={0.6} 
          rotation={[0, 0, 0]} 
          castShadow 
          receiveShadow
        />
      </group>
    </>
  );
};

useGLTF.preload("/pencil.glb");

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
const About = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const typingContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.5 } },
  };
  const typingWord = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const renderWords = (text) =>
    text.split(" ").map((word, index) => (
      <motion.span variants={typingWord} key={index} className="inline-block mr-1">
        {word}
      </motion.span>
    ));

  return (
    <section 
      id="about" 
      className={`
        relative 
        w-screen min-h-screen 
        left-1/2 -translate-x-1/2 
        overflow-hidden bg-[#fdfbf7] select-none
        ${isHovering && !isTouch ? "cursor-none" : "cursor-auto"}
      `}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 6, 12], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
          
          {/* Floor Visuals */}
          <group>
            <Grid 
              position={[0, 0, 0]} args={[60, 60]} 
              cellSize={1} cellThickness={1} cellColor="#e5e5e5" 
              sectionSize={5} sectionThickness={1.5} sectionColor="#d4d4d4"
              fadeDistance={50} infiniteGrid 
            />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.2} color="#000" />
            </mesh>
          </group>

          <ContactShadows resolution={1024} scale={30} blur={2} opacity={0.5} far={10} color="#000000" />
          <Pencil palette={palette} isTouch={isTouch} isHovering={isHovering} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none flex justify-center">
        <motion.div 
          className="w-full max-w-7xl px-6 md:px-12 flex flex-col justify-between py-12"
          onViewportEnter={() => setTriggerAnimation(true)}
          viewport={{ once: true }}
        >
          <div className="w-full flex justify-start">
            <h2 className={`
              font-black text-[13vw] md:text-[8rem] leading-[0.9] tracking-tighter uppercase
              text-shadow-block transform -rotate-2 origin-bottom-left
              ${triggerAnimation ? "animate-slide-in-left" : "opacity-0"}
            `}>
              ABOUT
            </h2>
          </div>

          <div className="w-full flex justify-end">
            <h2 className={`
              font-black text-[13vw] md:text-[8rem] leading-[0.9] tracking-tighter uppercase
              text-shadow-block transform rotate-2 origin-bottom-right
              ${triggerAnimation ? "animate-slide-in-right" : "opacity-0"}
            `}>
              ME
            </h2>
          </div>

          <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-auto">
            <motion.div 
              className="max-w-xl text-center bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-4"
              variants={typingContainer}
              initial="hidden"
              animate={triggerAnimation ? "visible" : "hidden"}
            >
              <p className="font-sans text-base md:text-lg text-gray-900 font-bold leading-relaxed">
                {renderWords("I graduated in Games Technology and I'm now focused on UX, AI, and game-inspired interactions. Tools I use include React, Three.js, C#, and C++.")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .text-shadow-block {
          color: white;
          -webkit-text-stroke: 2px black;
          text-shadow: 2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 rgba(0,0,0,0.2);
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px) rotate(-10deg); }
          to { opacity: 1; transform: translateX(0) rotate(-2deg); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) rotate(10deg); }
          to { opacity: 1; transform: translateX(0) rotate(2deg); }
        }
        .animate-slide-in-left { animation: slideInLeft 1s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 1s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default About;
