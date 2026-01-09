import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTexture, Float, Decal, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

// --- 0. DATA CONFIGURATION ---
const extraCard = {
  title: "Next Chapter",
  company_name: "Future",
  date: "2024 - Present",
  icon: experiences[0].icon, 
  points: [
    "Looking forward to new challenges and opportunities.",
    "Ready to build scalable applications and creative 3D web experiences.",
  ],
};

const allExperiences = [...experiences, extraCard];

// --- 1. The Pearl String (Natural Curve + Connector Support) ---
const PearlString = ({ startY, endY, curveScale = 1 }) => {
  const length = Math.abs(startY - endY);
  const distPerUnit = 0.15; 
  const beadCount = Math.floor(length / distPerUnit);
  const beads = [];

  for (let i = 0; i <= beadCount; i++) {
    const t = i / beadCount; 
    const y = startY + (endY - startY) * t;
    
    // curveScale allows us to flatten the curve for the heavy end-piece
    const xCurve = (Math.pow(Math.sin(t * Math.PI), 1.5) * 0.12 * curveScale) + (Math.sin(t * 12) * 0.01 * curveScale); 
    const zCurve = (Math.sin(t * Math.PI) * 0.05 * curveScale) + (Math.cos(t * 20) * 0.01 * curveScale); 
    
    const isSpacer = i % 2 !== 0; 

    if (isSpacer) {
      beads.push(
        <mesh key={`spacer-${i}`} position={[xCurve, y, zCurve]}>
          <sphereGeometry args={[0.05, 16, 16]} /> 
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
        </mesh>
      );
    } else {
      beads.push(
        <mesh key={`pearl-${i}`} position={[xCurve, y, zCurve]}>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshPhysicalMaterial 
            color="#FFFDD0" 
            roughness={0.15} 
            metalness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            reflectivity={1} 
          />
        </mesh>
      );
    }
  }
  return <group>{beads}</group>;
};

// --- 2. The Interactive Flower ---
const Flower = ({ icon, position, isHovered }) => {
  const texture = useTexture(icon);
  const palette = ["#F8C8DC", "#C1E1C1", "#BDE0FE", "#FDFD96", "#FFCCB0"];
  const colorIndex = Math.floor(Math.abs(position[1] * 100)) % palette.length; 
  const color = palette[colorIndex];
  
  const floatOffset = position[1] * 0.5;

  return (
    <group position={position} scale={isHovered ? 0.30 : 0.25}> 
      <Float 
        speed={2} 
        // CHANGE: Increased from 0 to 0.4. 
        // This adds a gentle, random twist/tilt to simulate loose beads.
        rotationIntensity={0.4} 
        floatIntensity={0.5} 
        floatingRange={[-0.05, 0.05]} 
        offset={floatOffset} 
      >
        <group>
          {/* A. PETALS */}
          <group position={[0, 0, 0]}>
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 1; 
              const y = Math.sin(rad) * 1; 
              return (
                <mesh key={i} position={[x, y, 0]}>
                  <sphereGeometry args={[0.7, 32, 32]} />
                  <meshStandardMaterial color={color} roughness={0.2} metalness={0.1}/>
                </mesh>
              );
            })}
          </group>

          {/* B. FRONT CAP */}
          <group position={[0, 0, 0.05]}>
             <mesh rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.85, 0.85, 0.1, 32]} />
                 <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.3} />
             </mesh>
             <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial color="#FEF9E7" roughness={0.2} />
                <Decal position={[0, 0, 0.9]} rotation={[0, 0, 0]} scale={1} map={texture} />
             </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
};

// --- 3. The End Teardrop Charm ---
const EndDrop = ({ position }) => {
  return (
    <group position={position} scale={0.25}>
        <Float 
          speed={2} 
          // CHANGE: Slight rotation (0.1) so it doesn't look frozen, 
          // but less than flowers because it's heavy.
          rotationIntensity={0.1} 
          floatIntensity={0.5} 
          floatingRange={[-0.05, 0.05]}
        >
            {/* Connector Ring */}
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.15, 0.04, 16, 32]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>
            {/* Teardrop Pearl */}
            <mesh position={[0, -0.3, 0]} scale={[1, 1.6, 1]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshPhysicalMaterial 
                    color="#FFFDD0" 
                    roughness={0.15} 
                    metalness={0.1} 
                    clearcoat={1} 
                    clearcoatRoughness={0.1} 
                />
            </mesh>
        </Float>
    </group>
  )
}

// --- 4. The Rig (Physics-Based Momentum) ---
const Rig = ({ children }) => {
  const group = useRef();
  const { mouse } = useThree();
  
  const physics = useRef({
    velocity: 0,    
    angle: 0,       
    lastScroll: 0   
  });

  useFrame((state, delta) => {
    if (!group.current) return;

    // Mouse Parallax
    const targetRotationX = -mouse.y * 0.05;
    const targetRotationY = mouse.x * 0.05;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.1);

    // Scroll Momentum
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - physics.current.lastScroll;
    physics.current.lastScroll = scrollY;
    
    physics.current.velocity += scrollDelta * 0.0005;
    physics.current.velocity -= physics.current.angle * 2.0 * delta;
    physics.current.velocity *= 0.95;
    physics.current.angle += physics.current.velocity;
    physics.current.angle = THREE.MathUtils.clamp(physics.current.angle, -0.3, 0.3);

    group.current.rotation.z = physics.current.angle;
    
    // Idle Breathing
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + Math.cos(state.clock.elapsedTime * 0.3) * 0.02;
  });

  return <group ref={group}>{children}</group>;
};

// --- 5. The Synced Scene ---
const SyncedScene = ({ hoveredIndex }) => {
  const { viewport, size } = useThree();
  const [positions, setPositions] = useState([]);

  const updatePositions = () => {
    const container = document.getElementById("experience-container");
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newPositions = [];
    allExperiences.forEach((_, index) => {
      const element = document.getElementById(`experience-marker-${index}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const relativeYPixel = rect.top - containerRect.top + (rect.height / 2);
        const unitRatio = viewport.height / size.height;
        const y3D = (viewport.height / 2) - (relativeYPixel * unitRatio);
        newPositions.push(y3D);
      } else {
        newPositions.push(0);
      }
    });
    setPositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    const timeout = setTimeout(updatePositions, 500); 
    return () => {
        window.removeEventListener("resize", updatePositions);
        clearTimeout(timeout);
    }
  }, [viewport.height, size.height]);

  return (
    <Rig>
      {positions.map((yPos, index) => {
        const isLast = index === positions.length - 1;
        
        return (
          <React.Fragment key={index}>
            {/* Top Ceiling String */}
            {index === 0 && (
               <PearlString startY={viewport.height / 2 + 1.5} endY={yPos} />
            )}

            <Flower 
              icon={allExperiences[index].icon} 
              position={[0, yPos, 0.2]} 
              isHovered={hoveredIndex === index}
            />
            
            {/* Chain to Next Flower */}
            {!isLast && positions[index + 1] !== undefined && (
              <PearlString startY={yPos} endY={positions[index + 1]} />
            )}

            {/* END DROP: Connector + Teardrop */}
            {isLast && (
              <>
                 {/* Straight connector string */}
                 <PearlString 
                    startY={yPos} 
                    endY={yPos - 0.65} 
                    curveScale={0.1} 
                 />
                 <EndDrop position={[0, yPos - 0.83, 0.2]} />
              </>
            )}

          </React.Fragment>
        );
      })}
    </Rig>
  );
};

// --- 6. Main Component ---
const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className={`${styles.sectionSubText} text-center`}>My Journey</p>
        <h2 className={`${styles.sectionHeadText} text-[#455A64] font-serif text-center mb-10`}>Work Experience</h2>
      </motion.div>

      <div 
        id="experience-container"
        className="relative w-full max-w-5xl mx-auto rounded-[30px] overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, #E0F7FA 0%, #E1F5FE 50%, #F3E5F5 100%)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" 
        }}
      >
        {/* NOISE TEXTURE */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} 
        />

        <div className="absolute top-0 left-0 bottom-0 w-[150px] z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            
            <ContactShadows 
                position={[0, 0, -0.4]} 
                opacity={0.4} 
                scale={20} 
                blur={2} 
                far={4}
                rotation={[Math.PI / 2, 0, 0]} 
            />

            <SyncedScene hoveredIndex={hoveredIndex} /> 
          </Canvas>
        </div>

        <div className="flex flex-col relative z-10 py-12">
          {allExperiences.map((experience, index) => (
            <div 
              key={index} 
              className="flex items-center w-full min-h-[200px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-[150px] flex-shrink-0 flex justify-center items-center">
                 <div id={`experience-marker-${index}`} className="w-1 h-1 bg-transparent" />
              </div>

              <div className="flex-1 pr-10 py-4">
                {/* UPGRADED CARD DESIGN: Clean Glass (No Gold Glow) */}
                <div 
                  className={`relative overflow-hidden p-6 rounded-2xl border transition-all duration-500
                    ${hoveredIndex === index 
                      ? "bg-white/60 border-white/80 shadow-md -translate-y-1" // Clean Lift
                      : "bg-white/40 border-white/50 shadow-sm" // Glass Default
                    }
                  `}
                >
                  {/* Decorative Shine Overlay (Subtle) */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-50 pointer-events-none transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-30'}`} />

                  <div className="relative z-10">
                    <h3 className="text-[#455A64] text-[22px] font-serif font-bold tracking-wide">
                      {experience.title}
                    </h3>
                    <p className="text-[#90A4AE] text-[14px] font-semibold tracking-widest uppercase mb-4 mt-1">
                      {experience.company_name} | {experience.date}
                    </p>
                    <ul className="list-disc ml-4 space-y-2">
                      {experience.points.map((point, i) => (
                        <li key={i} className="text-[#546E7A] text-[15px] leading-6 font-medium">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");

