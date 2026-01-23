import React, { useMemo, useRef, useState, useEffect, useId } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { SectionWrapper } from "../hoc";

/* -------------------------------------------
   3D Flower Component
------------------------------------------- */
const Flower3D = ({
  position,
  color,
  centerColor,
  baseScale = 0.9,
  initialRotation = [0, 0, 0],
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentBaseScale = useRef(0);

  const distanceFromCenter = useMemo(() => {
    return Math.sqrt(position[0] ** 2 + position[1] ** 2);
  }, [position]);

  const [randomData] = useState(() => ({
    speed: 0.6 + Math.random() * 0.7,
    offset: Math.random() * 100,
    baseRotation: (Math.random() - 0.5) * 0.004,
    floatSpeed: 1.0 + Math.random() * 0.6,
    floatOffset: Math.random() * 100,
  }));

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.set(...initialRotation);
  }, [initialRotation]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    const staggerDelay = distanceFromCenter * 0.08;
    const hasStarted = t > staggerDelay;

    let targetScale = 0;
    if (hasStarted) {
      targetScale = hovered ? baseScale * 1.18 : baseScale;
    }

    currentBaseScale.current = THREE.MathUtils.lerp(
      currentBaseScale.current,
      targetScale,
      hasStarted ? 0.08 : 0.1
    );

    const breathing = hasStarted
      ? Math.sin(t * randomData.speed + randomData.offset) * 0.02
      : 0;

    const finalScale = currentBaseScale.current + breathing;
    const safeScale = Math.max(0, finalScale);
    meshRef.current.scale.set(safeScale, safeScale, safeScale);

    meshRef.current.rotation.z += randomData.baseRotation;
    const floatY =
      Math.sin(t * randomData.floatSpeed + randomData.floatOffset) * 0.08;
    meshRef.current.position.y = position[1] + (hasStarted ? floatY : 0);
  });

  return (
    <group
      position={[position[0], position[1], position[2]]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.33, 9, 9]} />
        <meshLambertMaterial color={centerColor ?? "#F6EFE6"} />
      </mesh>

      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.6;
        const y = Math.sin(rad) * 0.6;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, rad]}>
            <sphereGeometry args={[0.46, 9, 9]} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
};

/* -------------------------------------------
   Hero Flowers Manager
------------------------------------------- */
const HeroFlowers = ({ isMobile }) => {
  const activeLayout = 1; 
  const activeColorPattern = 1; 

  const flowers = useMemo(() => {
    const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];

    if (isMobile) {
      const getMobileFlower = (id, x, y, scale, colorIdx, z = 0) => {
        const color = palette[colorIdx % palette.length];
        const centerOptions = palette.filter((c) => c !== color);
        const centerColor = centerOptions[(colorIdx + 2) % centerOptions.length];
        return {
          id: `mob-${id}`,
          position: [x, y, z],
          color,
          centerColor,
          baseScale: scale,
          initialRotation: [0, 0, 0],
        };
      };
      return [
        getMobileFlower(1, -2.2, 6.0, 0.7, 0),
        getMobileFlower(2, 2.5, 5.2, 0.65, 3),
        getMobileFlower(3, -2.8, 2.2, 0.5, 2),
        getMobileFlower(4, 3.0, -1.5, 0.55, 1),
        getMobileFlower(5, -2.5, -5.5, 0.8, 4),
        getMobileFlower(6, 2.2, -6.5, 0.7, 0),
        getMobileFlower(7, 0, 8.5, 0.45, 1),
        getMobileFlower(8, 0, -8.5, 0.5, 2),
        getMobileFlower(9, -1.5, 4.0, 0.4, 3),
        getMobileFlower(10, 1.5, -3.5, 0.4, 4),
      ];
    }

    const layouts = {
      1: [
        { x: -9, y: -5.5, z: 0.5, s: 1.6 },
        { x: 9, y: 5.5, z: 0.5, s: 1.5 },
        { x: -10.5, y: 5, z: 0, s: 1.4 },
        { x: 10.5, y: -5, z: 0, s: 1.4 },
        { x: -8, y: 1.5, z: 0, s: 1.2 },
        { x: 6.5, y: -1.5, z: 0, s: 1.2 },
        { x: -11, y: 0, z: 0, s: 0.85 },
        { x: 11, y: 0, z: 0, s: 0.85 },
        { x: -8, y: -2, z: 0, s: 0.9 },
        { x: 8, y: 2, z: 0, s: 0.9 },
        { x: -5, y: 6, z: 0, s: 0.75 },
        { x: 5, y: -5, z: 0, s: 0.75 },
        { x: 0, y: 5, z: 0, s: 0.75 },
        { x: 0, y: -6.2, z: 0, s: 0.6 },
        { x: -3.2, y: 4.2, z: 0, s: 0.6 },
        { x: 3.2, y: 3.8, z: 0, s: 0.6 },
        { x: 3.5, y: -4.2, z: 0, s: 0.65 },
        { x: -4, y: -2.5, z: 0, s: 0.65 },
        { x: 0, y: -3, z: 0, s: 0.85 },
      ],
    };

    const colorMaps = {
      1: [
        0, 1, 4, 2, 3, 0, 2, 3, 1, 4, 0, 1, 2, 4, 3, 0, 2, 2, 4, 1, 2, 0, 3, 4,
        1, 0, 2, 3, 4, 1,
      ],
    };

    const chosenPositions = layouts[activeLayout] || layouts[1];
    const chosenColors = colorMaps[activeColorPattern] || colorMaps[1];

    return chosenPositions.map((pos, i) => {
      const colorIdx = chosenColors[i];
      const color = palette[colorIdx];
      const centerOptions = palette.filter((c) => c !== color);
      const centerColor = centerOptions[(i * 3) % centerOptions.length];

      return {
        id: `flower-${i}`,
        position: [pos.x, pos.y, pos.z],
        baseScale: pos.s,
        color,
        centerColor,
        initialRotation: [0, 0, i * 0.5],
      };
    });
  }, [isMobile, activeLayout, activeColorPattern]);

  return (
    <group>
      {flowers.map((f) => (
        <Flower3D
          key={f.id}
          position={f.position}
          color={f.color}
          centerColor={f.centerColor}
          baseScale={f.baseScale}
          initialRotation={f.initialRotation}
        />
      ))}
    </group>
  );
};

/* -------------------------------------------
   UI Helper Components
------------------------------------------- */
const OffsetButton = ({ href, onClick, children, variant = "primary" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-block font-bold text-lg cursor-pointer pointer-events-auto rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <span className="absolute inset-0 rounded-[16px] border-2 border-white bg-transparent translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0 opacity-40" />
      <span
        className={[
          "relative block rounded-[16px] border-2 border-white px-8 py-3 transition-transform duration-200 ease-out",
          "group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-1.5 group-active:translate-y-1.5",
          variant === "primary"
            ? "bg-white text-black"
            : "bg-transparent text-white hover:bg-white/10",
        ].join(" ")}
      >
        {children}
      </span>
    </a>
  );
};

const ScrollFlowerIndicator = ({ onClick }) => {
  const pathId = useId().replace(/:/g, "");
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to About section"
      className="group relative h-28 w-28 md:h-32 md:w-32 rounded-full cursor-pointer pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <style>{`
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .scrollRing { animation: spinRing 10s linear infinite; transform-origin: 50% 50%; opacity: 0.9; }
        .group:hover .scrollRing { animation-duration: 6s; opacity: 1; }
      `}</style>

      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          id={pathId}
          d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          fill="none"
        />
        <text className="fill-white/80 font-mono text-[9px] tracking-[0.28em] uppercase scrollRing">
          <textPath href={`#${pathId}`} startOffset="0%">
            scroll down • scroll down • scroll down •{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
      </div>
    </button>
  );
};

/* -------------------------------------------
   Main Hero Section
------------------------------------------- */
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const handleMediaChange = (e) => setIsMobile(e.matches);
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-screen h-[100svh] min-h-[640px] left-1/2 -translate-x-1/2 overflow-hidden bg-black">
      {/* 1. THE 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas
          flat
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ alpha: true, antialias: false }}
          onCreated={({ gl }) => {
            gl.setClearColor("#000000", 1);
          }}
          camera={{ position: [0, 0, 18], fov: isMobile ? 48 : 36 }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 10, 6]} intensity={2.0} />

          <HeroFlowers isMobile={isMobile} />
          
          <Sparkles
            count={12}
            scale={12}
            size={2}
            speed={0.15}
            opacity={0.05}
            color="#ffffff"
          />

          {!isMobile && (
            <EffectComposer disableNormalPass>
              <Noise opacity={0.003} />
              <Vignette eskil={false} offset={0.6} darkness={0.25} />
              <ChromaticAberration
                offset={[0.0015, 0.0015]}
                radialModulation={true}
                modulationOffset={0.3}
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {/* 2. BACKGROUND VIGNETTE */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.10), rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* 3. CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-20 md:pb-24 pointer-events-none">
        
        {/* Glow behind text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-black/40 blur-[100px] -z-10 rounded-full pointer-events-none" />

        <div className="pointer-events-auto text-center">
          
          {/* UPDATED TITLE:
            - animate-fill-fade class handles the "Hollow -> Solid + Shadow Pop"
            - Removed inline text-shadow (it's handled in keyframes now)
          */}
          <h1
            className="
              animate-fill-fade
              font-sans font-black tracking-tighter
              text-[11vw] 
              leading-[0.9] mb-8
              drop-shadow-2xl
            "
          >
            Hi, I’m Marjut
          </h1>

          {/* TAGS */}
          <div className="animate-fade-up delay-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-white/70 font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-0">
            <span>UI/UX</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Frontend</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Creative Dev</span>
          </div>

          {/* BUTTONS */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0">
            <OffsetButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              variant="primary"
            >
              Contact Me
            </OffsetButton>

            <OffsetButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("projects");
              }}
              variant="primary"
            >
              View Work
            </OffsetButton>
          </div>
        </div>

        <div className="absolute bottom-3 md:bottom-6 pointer-events-auto z-20">
          <ScrollFlowerIndicator onClick={() => scrollToId("about")} />
        </div>
      </div>

      {/* 4. THE ABYSS GRADIENT */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none z-[5]" 
      />

      <style>{`
        /* * FIX: We animate the text-shadow alongside the color fill.
         * 0%   -> Text is hollow, shadow is transparent (hidden).
         * 100% -> Text is solid white, shadow is solid blue (visible).
         * This prevents seeing the shadow "inside" the hollow glass text.
         */
        @keyframes fillFade {
          0% { 
            color: transparent; 
            text-shadow: 0px 0px 0 transparent; /* Hidden shadow */
            opacity: 0; 
            transform: translateY(20px); 
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            color: transparent; /* Still hollow */
            text-shadow: 0px 0px 0 transparent; /* Still hidden */
          }
          100% { 
            color: #F5F1E8; 
            text-shadow: 4px 4px 0 #1328f0; /* Shadow POPS in */
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fill-fade {
          color: transparent;
          -webkit-text-stroke: 2px #F5F1E8; 
          animation: fillFade 1.6s ease-out forwards;
        }

        /* General Fade Up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
};

export default SectionWrapper(Hero, "hero");
