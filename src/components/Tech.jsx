import React, { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Decal, Float, OrbitControls, Environment } from "@react-three/drei";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import * as THREE from "three";

// --- 1. Math Helper: Cylindrical Spiral ---
const getCylinderPositions = (count, radius, isMobile) => {
  const positions = [];
  // TWEAKED: Slightly reduced spread (3.5 -> 3.2) to keep the stack closer together
  const verticalSpread = isMobile ? 2.5 : 2.0; 
  
  for (let i = 0; i < count; i++) {
    const y = ((i / (count - 1)) * verticalSpread * 2) - verticalSpread;
    const theta = i * 2.4; 

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    positions.push([x, y, z]);
  }
  return positions;
};

// --- Decal Config ---
const DECAL_CONFIG = {
  box:    { position: [0, 0, 0.46], scale: 0.6 },
  sphere: { position: [0, 0, 0.56], scale: 0.65 },
  torus:  { position: [0, 0, 0.19], scale: 0.5 },
  heart:  { position: [0, 0, 0.26], scale: 0.5 },
  star:   { position: [0, 0, 0.2],  scale: 0.4 },
};

// --- 2. Tech Shape ---
const TechShape = ({ position, icon, color, shapeType, isMobile }) => {
  const texture = useTexture(icon);
  const decal = DECAL_CONFIG[shapeType] || DECAL_CONFIG.sphere;
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  // Billboarding
  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      if (shapeType === "heart") {
        meshRef.current.rotation.z += Math.PI;
      }
    }
  });

  const geometry = useMemo(() => {
    if (shapeType === "heart") {
      const s = new THREE.Shape();
      s.moveTo(0.25, 0.25);
      s.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
      s.bezierCurveTo(-0.35, 0, -0.35, 0.35, -0.35, 0.35);
      s.bezierCurveTo(-0.35, 0.55, -0.15, 0.77, 0.25, 0.95);
      s.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
      s.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
      s.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 3,
      });
      geo.center();
      return geo;
    }
    if (shapeType === "star") {
      const s = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? 0.5 : 0.22;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
      }
      s.closePath();
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2,
      });
      geo.center();
      return geo;
    }
    return null;
  }, [shapeType]);

  const renderGeometry = () => {
    if (geometry) return <primitive object={geometry} />;
    switch (shapeType) {
      case "box":    return <boxGeometry args={[0.85, 0.85, 0.85]} />;
      case "torus":  return <torusGeometry args={[0.5, 0.2, 32, 64]} />;
      default:       return <sphereGeometry args={[0.65, 32, 32]} />;
    }
  };

  const baseScale = isMobile ? 0.8 : 1.2;
  const hoverScale = isMobile ? 1.2 : 1.4;

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
          onPointerOut={() => setHover(false)}
          scale={hovered ? hoverScale : baseScale}
          rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
          geometry={geometry || undefined}
        >
          {renderGeometry()}
          
          {isMobile ? (
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.8 : 0.15}
              roughness={0.2}
              metalness={0.4}
            />
          ) : (
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.8 : 0.15}
              roughness={0.2}
              metalness={0.4}
              reflectivity={0.5}
            />
          )}

          {texture && (
            <Decal
              position={decal.position}
              rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
              scale={decal.scale}
            >
              <meshBasicMaterial
                map={texture}
                toneMapped={false}
                transparent
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </Decal>
          )}
        </mesh>
      </Float>
    </group>
  );
};

// --- 3. The Scene ---
const TechScene = ({ isMobile }) => {
  const radius = isMobile ? 2 : 4.5;
  const positions = useMemo(
    () => getCylinderPositions(technologies.length, radius, isMobile),
    [radius, isMobile],
  );
  
  const palette = ["#8C52FD", "#FED814", "#F087FE", "#25E995", "#01D6FB"];
  const shapeTypes = isMobile
    ? ["sphere", "star", "sphere", "sphere", "sphere", "heart", "heart", "star", "sphere", "sphere", "sphere"]
    : ["sphere", "star", "torus", "sphere", "sphere", "heart", "heart", "star", "sphere", "sphere", "sphere"];

  // --- POSITION OFFSET ---
  // With a taller canvas (120vh), the center (0,0) is lower.
  // We reduce the offsets slightly so they don't look TOO low.
  const yOffset = isMobile ? 0.5 : -1;

  return (
    <group position={[0, yOffset, 0]} rotation={[0, 0, 0.1]}>
      {technologies.map((tech, i) => (
        <TechShape
          key={tech.name}
          position={positions[i]}
          icon={tech.icon}
          color={palette[i % palette.length]}
          shapeType={shapeTypes[i] || "sphere"}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
};

/* --- [Sparkles] --- */
const SPARKLE_COUNT_DESKTOP = 20;
const SPARKLE_COUNT_MOBILE = 10;

const Sparkles = ({ isMobile }) => {
  const count = isMobile ? SPARKLE_COUNT_MOBILE : SPARKLE_COUNT_DESKTOP;
  const sparkles = useMemo(() =>
    Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      rotate: Math.random() * 360,
    })),
  [count]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      <style>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(var(--sparkle-rotate)); }
          50% { opacity: 0.8; transform: scale(1) rotate(var(--sparkle-rotate)); }
        }
      `}</style>
      {sparkles.map((s, i) => (
        <img
          key={`sparkle-${i}`}
          src="/star.webp"
          alt=""
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            '--sparkle-rotate': `${s.rotate}deg`,
            animation: `sparkle-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* DOTS LOADER                                                                */
/* -------------------------------------------------------------------------- */
const TechShimmer = ({ visible }) => (
  <div
    className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center transition-opacity duration-500"
    style={{ opacity: visible ? 1 : 0 }}
    aria-hidden="true"
  >
    <style>{`
      @keyframes bounce-dot {
        0%, 80%, 100% { transform: translateY(0); }
        40%            { transform: translateY(-14px); }
      }
    `}</style>
    <div className="flex items-center gap-3">
      {["#F087FE", "#8C52FD", "#FED814"].map((color, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

/* Mounts after Suspense resolves — signals textures are ready */
const SceneReady = ({ onReady }) => {
  useEffect(() => { onReady(); }, []);
  return null;
};

/* Manual auto-rotate for mobile (used when OrbitControls is disabled) */
const AutoRotate = () => {
  useFrame(({ camera }, delta) => {
    camera.position.applyAxisAngle({ x: 0, y: 1, z: 0 }, delta * 0.15);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
const Tech = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const sectionRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Capture wheel events before OrbitControls can stopPropagation/preventDefault them
  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;
    const onWheel = (e) => window.scrollBy({ top: e.deltaY, behavior: "auto" });
    el.addEventListener("wheel", onWheel, { capture: true, passive: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // UPDATED: min-h increased to 120vh to prevent bottom cut-off
    <section ref={sectionRef} className="relative w-full min-h-[120vh] overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_70%)] opacity-50 z-0 pointer-events-none" />
      
      {/* Sparkles Layer (z-0: Background) */}
      <Sparkles isMobile={isMobile} />

      {/* --- TITLE OVERLAY --- */}
      <motion.div 
          onViewportEnter={() => setTriggerAnimation(true)}
          viewport={{ once: true, amount: 0 }}
          // Changed z-10 to z-20 to sit above Canvas
          className="absolute top-12 left-0 w-full z-20 flex flex-col items-center pointer-events-none"
        >
          <h2
            className={`
              font-black
              text-[14vw]
              leading-[0.9] uppercase tracking-tighter text-center
              drop-shadow-xl
              ${triggerAnimation ? "animate-hero-fill-fade-white" : "opacity-0"}
            `}
            style={{ fontFamily: "'Milkyway', sans-serif" }}
          >
            Tech
          </h2>
          <div className={`hidden md:block mt-2 md:-mt-2 transition-opacity duration-700 ${triggerAnimation ? "opacity-100" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-xs text-white/80 tracking-widest uppercase">
              <span aria-hidden>←</span>
              drag to explore
              <span aria-hidden>→</span>
            </span>
          </div>
      </motion.div>

      {/* Mobile scroll shield — sits above canvas, passes vertical swipes to browser */}
      {isMobile && (
        <div className="absolute inset-0 z-[15]" style={{ touchAction: "pan-y" }} />
      )}

      {/* 3D Canvas - Changed z-0 to z-10 so it sits ABOVE sparkles but BELOW title */}
      <div
        ref={canvasContainerRef}
        className={`absolute inset-0 z-10 ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
      >
        <TechShimmer visible={canvasReady && !sceneLoaded} />
        {canvasReady && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 14], fov: 50 }}
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = "none";
            gl.domElement.style.pointerEvents = "none";
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Environment preset="city" />

          <OrbitControls
            enabled={!isMobile}
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 + 0.5}
          />
          {isMobile && <AutoRotate />}

          <Suspense fallback={null}>
            <TechScene isMobile={isMobile} />
            <SceneReady onReady={() => setSceneLoaded(true)} />
          </Suspense>

        </Canvas>
        )}
      </div>

    </section>
  );
};

export default SectionWrapper(Tech, "tech");




