import React, { useMemo, useRef, useState, useEffect, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useAnimation,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { SectionWrapper } from "../hoc";

/* -------------------------------------------
   SVG Texture Hook (renders SVG at 256px for crisp decals)
------------------------------------------- */
const useSVGTexture = (url) => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(canvas);
      setTexture(tex);
    };
    img.src = url;
  }, [url]);
  return texture;
};

/* -------------------------------------------
   Decal position/scale per shape type
------------------------------------------- */
const DECAL_CONFIG = {
  box: { position: [0, 0, 0.46], scale: 0.6 },
  sphere: { position: [0, 0, 0.56], scale: 0.55 },
  torus: { position: [0, 0, 0.19], scale: 0.4 },
  dodecahedron: { position: [0, 0, 0.56], scale: 0.55 },
  octahedron: { position: [0, 0, 0.61], scale: 0.5 },
  icosahedron: { position: [0, 0, 0.56], scale: 0.55 },
  cone: { position: [0, 0.1, 0.35], scale: 0.45 },
  heart: { position: [0, 0, 0.26], scale: 0.45 },
  star: { position: [0, 0, 0.2], scale: 0.4 },
};

/* -------------------------------------------
   3D Shape Component
------------------------------------------- */
const Shape3D = ({
  position,
  color,
  shapeType,
  baseScale = 1,
  icon,
  bobOffset = 0,
  entranceDelay = 0,
  depthFadeRef,
  shapeIndex = 0,
  shapeCount = 1,
  visibleStartIndex = 0,
  isMobile = false,
}) => {
  const meshRef = useRef();
  const matRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useSVGTexture(icon ? `/icons/${icon}.svg` : null);
  const decal = DECAL_CONFIG[shapeType] || DECAL_CONFIG.sphere;

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
    if (shapeType === "box") {
      const s = new THREE.Shape();
      const hw = 0.39,
        hh = 0.39,
        r = 0.12;
      s.moveTo(-hw + r, -hh);
      s.lineTo(hw - r, -hh);
      s.quadraticCurveTo(hw, -hh, hw, -hh + r);
      s.lineTo(hw, hh - r);
      s.quadraticCurveTo(hw, hh, hw - r, hh);
      s.lineTo(-hw + r, hh);
      s.quadraticCurveTo(-hw, hh, -hw, hh - r);
      s.lineTo(-hw, -hh + r);
      s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.78,
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

  const targetScale = useRef(baseScale);
  const currentScale = useRef(baseScale);
  const targetEmissiveIntensity = useRef(0);
  const currentEmissiveIntensity = useRef(0);
  const baseRotation = shapeType === "heart" ? Math.PI : 0;
  const rotationDir = shapeIndex % 2 === 0 ? 1 : -1;

  // Bouncy lift curve (pure function of p; reversible + ends exactly at 0/1).
  const applyBouncyLift = (p) => {
    if (p === 0 || p === 1) return p;
    const amp = 0.22; // overshoot amplitude (~18–20% peak)
    const c4 = (2 * Math.PI) / 3; // 1–2 bounces
    return 1 + Math.pow(2, -10 * p) * Math.sin((p * 10 - 0.75) * c4) * amp;
  };

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const depthFade = depthFadeRef?.current ?? 0;
    const effectiveCount = shapeCount - 2 * visibleStartIndex;
    const clampedIndex =
      Math.min(shapeCount - 1 - visibleStartIndex, Math.max(visibleStartIndex, shapeIndex)) -
      visibleStartIndex;
    const order = effectiveCount > 1 ? clampedIndex / (effectiveCount - 1) : 0;
    const liftStart = order * 0.75;
    const liftWindow = 0.5;
    const liftProgress = Math.min(
      1,
      Math.max(0, (depthFade - liftStart) / liftWindow),
    );
    const liftBouncy = applyBouncyLift(liftProgress);

    // Bobbing
    const t = clock.getElapsedTime();
    const bob = Math.sin(t * 0.8 + bobOffset) * 0.15;
    const targetY = position[1] + bob + liftBouncy * 2.4;
    const targetRotZ = baseRotation + liftBouncy * 0.35 * rotationDir;
    // Damped interpolation for stable motion under uneven scroll deltas.
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetY,
      18,
      delta,
    );
    meshRef.current.rotation.z = THREE.MathUtils.damp(
      meshRef.current.rotation.z,
      targetRotZ,
      18,
      delta,
    );

    // Entrance animation (scale from 0 with easeOutBack)
    const entranceT = Math.min(1, Math.max(0, (t - entranceDelay) / 2.0));
    const c1 = 1.7;
    const entrance =
      entranceT === 1
        ? 1
        : 1 +
          (c1 + 1) * Math.pow(entranceT - 1, 3) +
          c1 * Math.pow(entranceT - 1, 2);

    // Smooth scale lerp toward hover target
    const effectiveBase = baseScale * entrance;
    targetScale.current = hovered ? effectiveBase * 1.18 : effectiveBase;
    currentScale.current += (targetScale.current - currentScale.current) * 0.08;
    const s = currentScale.current;
    meshRef.current.scale.set(s, s, s);

    // Smooth emissive glow on hover
    if (matRef.current) {
      targetEmissiveIntensity.current = hovered ? 0.4 : 0;
      currentEmissiveIntensity.current +=
        (targetEmissiveIntensity.current - currentEmissiveIntensity.current) *
        0.08;
      matRef.current.emissiveIntensity = currentEmissiveIntensity.current;
    }
  });

  const renderGeometry = () => {
    if (geometry) return null;
    switch (shapeType) {
      case "sphere":
        return <sphereGeometry args={[0.55, 16, 16]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.18, 16, 32]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.55]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.55]} />;
      case "cone":
        return <coneGeometry args={[0.5, 0.9, 6]} />;
      default:
        return <sphereGeometry args={[0.55, 16, 16]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
      geometry={geometry || undefined}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {renderGeometry()}
      {isMobile ? (
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.4}
        />
      ) : (
        <meshPhysicalMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0}
          roughness={0.3}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          sheen={0.5}
          sheenRoughness={0.5}
          sheenColor="#8C52FD"
          ior={1.5}
          reflectivity={0.5}
          polygonOffset
          polygonOffsetFactor={-5}
        />
      )}
      {texture && (
        <Decal
          position={decal.position}
          rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
          scale={decal.scale}
          map={texture}
        ></Decal>
      )}
    </mesh>
  );
};

/* -------------------------------------------
   Shapes Marquee Row
------------------------------------------- */
const ShapesRow = ({ isMobile, depthFadeRef }) => {
  const groupRef = useRef();

  const { shapes, totalWidth } = useMemo(() => {
    const desktopItems = [
      { type: "heart", color: "#8C52FD", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "box", color: "#25E995", scale: 2.2, icon: "mobile_code" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
      { type: "torus", color: "#01D6FB", scale: 2.2, icon: "code" },
      { type: "heart", color: "#25E995", scale: 2, icon: "computer" },
      { type: "sphere", color: "#8C52FD", scale: 2.2, icon: "design_services" },
      { type: "box", color: "#01D6FB", scale: 2.2, icon: "mobile_code" },
      { type: "heart", color: "#FED814", scale: 2, icon: "controller" },
      { type: "star", color: "#F087FE", scale: 2.2, icon: "code" },
      { type: "sphere", color: "#01D6FB", scale: 2.2, icon: "computer" },
    ];

    // 1. Extended list to fix gaps on mobile
    const mobileItems = [
      { type: "heart", color: "#25E995", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
      { type: "heart", color: "#25E995", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
    ];

    const items = isMobile ? mobileItems : desktopItems;

    const sp = isMobile ? 1.7 : 2.65;
    const mobileScale = isMobile ? 0.7 : 1;
    const total = items.length * sp;

    const shapesData = items.map((item, i) => ({
      ...item,
      scale: item.scale * mobileScale,
      x: i * sp,
    }));

    return { shapes: shapesData, totalWidth: total };
  }, [isMobile]);

  const yPos = isMobile ? -3 : -2.5;

  // 2. Calculate offset to skip delaying off-screen items (Left side)
  // On mobile, the first ~2 items are off-screen. On desktop, ~3.
  const visibleStartIndex = isMobile ? 2 : 3;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const speed = 0.7;
    const offset = (clock.getElapsedTime() * speed) % totalWidth;
    groupRef.current.position.x = -totalWidth / 2 - offset;
    groupRef.current.position.z = 1;
    groupRef.current.position.y = yPos;
    groupRef.current.scale.set(1, 1, 1);
  });

  return (
    <group ref={groupRef} position={[0, yPos, 1]}>
      {[0, 1].map((set) =>
        shapes.map((shape, i) => {
          // 3. Logic: If item is before the visible start, delay is 0.
          // Otherwise, stagger them linearly. Set 1 (the loop) comes later.
          const baseDelay = Math.max(0, (i - visibleStartIndex) * 0.1);
          const finalDelay = set === 0 ? baseDelay : baseDelay + 1.0;

          return (
            <Shape3D
              key={`${set}-${i}`}
              position={[shape.x + set * totalWidth, 0, 0]}
              color={shape.color}
              shapeType={shape.type}
              baseScale={shape.scale}
              icon={shape.icon}
              bobOffset={i * 0.6}
              entranceDelay={finalDelay}
              depthFadeRef={depthFadeRef}
              shapeIndex={i + set * shapes.length}
              shapeCount={shapes.length * 2}
              visibleStartIndex={visibleStartIndex}
              isMobile={isMobile}
            />
          );
        }),
      )}
    </group>
  );
};

/* --- [Sparkles] --- */
const Sparkles = ({ isMobile }) => {
  const count = isMobile ? 10 : 20;
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
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
            "--sparkle-rotate": `${s.rotate}deg`,
            animation: `sparkle-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------
   Hero Dots Loader
------------------------------------------- */
const HeroShimmer = ({ visible }) => (
  <div
    className="absolute inset-0 pointer-events-none flex items-start justify-center transition-opacity duration-500"
    style={{ zIndex: 5, opacity: visible ? 1 : 0 }}
    aria-hidden="true"
  >
    <style>{`
      @keyframes bounce-dot {
        0%, 80%, 100% { transform: translateY(0); }
        40%            { transform: translateY(-14px); }
      }
    `}</style>
    <div className="flex items-center gap-3" style={{ marginTop: "calc(50svh + 150px)" }}>
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

/* Mounts after Suspense resolves — signals scene is ready */
const HeroSceneReady = ({ onReady }) => {
  useEffect(() => { onReady(); }, []);
  return null;
};

/* -------------------------------------------
   Main Hero Section
------------------------------------------- */
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const pinRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const depthFadeRef = useRef(0);
  const [textHidden, setTextHidden] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const ringControls = useAnimation();

  const { scrollYProgress } = useScroll({
    container: containerReady ? scrollContainerRef : undefined,
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll->animation mapping without changing timing/ranges.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.7,
  });

  const shapesProgress = useTransform(smoothProgress, [0.18, 1], [0, 1]);
  const textOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.18], [0, 12]);
  const textBlur = useTransform(
    smoothProgress,
    [0, 0.18],
    ["blur(0px)", "blur(4px)"],
  );

  useEffect(() => {
    scrollContainerRef.current = document.getElementById("app-scroll");
    setContainerReady(!!scrollContainerRef.current);
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const handleMediaChange = (e) => setIsMobile(e.matches);
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      depthFadeRef.current = 0;
      return;
    }
    const unsub = shapesProgress.on("change", (v) => {
      depthFadeRef.current = Math.min(1, Math.max(0, v));
    });
    return () => unsub();
  }, [reduceMotion, shapesProgress]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (reduceMotion) {
      setTextHidden(false);
      return;
    }
    setTextHidden(v >= 0.18);
  });


  return (
    <div
      ref={pinRef}
      className={
        reduceMotion ? "relative w-full" : "relative w-full h-[250svh]"
      }
    >
      <section
        ref={heroRef}
        className={[
          "hero-depth-fade w-full h-[100svh] min-h-[640px] overflow-hidden bg-black",
          reduceMotion ? "relative" : "sticky top-0",
        ].join(" ")}
      >
        {/* Sparkles (Custom DOM version) - Z-0 */}
        <Sparkles isMobile={isMobile} />

        {/* 1. THE 3D CANVAS - Z-0 (Transparent to show sparkles behind) */}
        <div className="absolute inset-0 z-0">
          <HeroShimmer visible={!heroLoaded} />
          <Canvas
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ alpha: true, antialias: false }}
            onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
            camera={{ position: [0, 0, 18], fov: isMobile ? 48 : 36 }}
          >
            <ambientLight intensity={0.5} />
            {isMobile ? (
              <directionalLight position={[10, 10, 5]} intensity={1} />
            ) : (
              <>
                <directionalLight position={[6, 10, 6]} intensity={0.8} color="#fff5e6" />
                <directionalLight position={[-6, 4, 4]} intensity={0.8} color="#c8d8ff" />
              </>
            )}

            <Suspense fallback={null}>
              {/* HDR environment for realistic reflections on clearcoat — desktop only */}
              {isMobile ? (
                <Environment preset="city" />
              ) : (
                <Environment
                  files="/empty_warehouse_01_1k.hdr"
                  environmentIntensity={1.5}
                  blur={0.5}
                />
              )}

              <ShapesRow isMobile={isMobile} depthFadeRef={depthFadeRef} />

              {!isMobile && (
                <EffectComposer disableNormalPass>
                  <Noise opacity={0.003} />
                </EffectComposer>
              )}

              <HeroSceneReady onReady={() => setHeroLoaded(true)} />
            </Suspense>
          </Canvas>
        </div>

        {/* 3. CONTENT */}
        <div className="hero-content relative z-10 h-full flex flex-col items-center justify-center px-4 pb-72 md:pb-80 pointer-events-none">
          <motion.div
            className={[
              "pointer-events-auto text-center relative",
              textHidden ? "pointer-events-none" : "",
            ].join(" ")}
            style={
              reduceMotion
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                    willChange: "transform, opacity, filter",
                  }
                : {
                    opacity: textOpacity,
                    y: textY,
                    filter: textBlur,
                    willChange: "transform, opacity, filter",
                  }
            }
            aria-hidden={textHidden}
          >
            <h1
              className="
              animate-hero-fill-fade
              tracking-tighter
              text-[16vw] sm:text-[11vw]
              leading-[0.9] mb-8
            "
              style={{ fontFamily: "'Milkyway', sans-serif" }}
            >
              Hi, I'm Marjut
            </h1>
            {/* TAGS */}
            <div className="animate-fade-up delay-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-white/80 font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-0">
              <span>Frontend</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>UI/UX</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Creative Coder</span>
            </div>

            {/* SCROLL CUE */}
            <div className="animate-fade-up delay-300 flex items-center justify-center opacity-0">
              {/* Circular scroll cue */}
              <div
                className="relative w-[110px] h-[110px] flex-shrink-0 pointer-events-auto cursor-pointer"
                aria-hidden="true"
                onMouseEnter={() => !reduceMotion && ringControls.start({ rotate: 360, transition: { duration: 3, repeat: Infinity, ease: "linear" } })}
                onMouseLeave={() => ringControls.start({ rotate: 0, transition: { duration: 0.6, ease: "easeOut" } })}
              >
                {/* Ring with gap at top for text */}
                <motion.svg width="110" height="110" viewBox="0 0 100 100" fill="none" className="absolute inset-0" animate={ringControls}>
                  <defs>
                    <path id="hero-scroll-path" d="M 8,50 A 42,42 0 0,1 50,8 A 42,42 0 0,1 92,50 A 42,42 0 0,1 50,92 A 42,42 0 0,1 8,50" />
                    {/* 150deg gradient: #F844C2 → #F087FE → #FED814 */}
                    <linearGradient id="ringGradient" gradientUnits="userSpaceOnUse" x1="29" y1="14" x2="71" y2="86">
                      <stop offset="0%" stopColor="#F844C2" />
                      <stop offset="50%" stopColor="#F087FE" />
                      <stop offset="100%" stopColor="#FED814" />
                    </linearGradient>
                  </defs>
                  {/* Arc that skips the top ~120° where the text sits */}
                  <path
                    d="M 86.4,29 A 42,42 0 1,1 13.6,29"
                    stroke="url(#ringGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* dy="4" shifts baseline inward so ring stroke bisects the letters */}
                  <text fontSize="8" fill="url(#ringGradient)" fillOpacity="1" letterSpacing="1.5" fontFamily="monospace" fontWeight="700">
                    <textPath href="#hero-scroll-path" startOffset="25%" textAnchor="middle" dy="4">SCROLL DOWN</textPath>
                  </text>
                </motion.svg>
                {/* Bouncing heart */}
                <motion.svg
                  width="110" height="110" viewBox="0 0 100 100" fill="none"
                  className="absolute inset-0"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M 50,65 C 50,65 37,55 37,47 C 37,41 41,38 45,41 C 47,42 49,45 50,48 C 51,45 53,42 55,41 C 59,38 63,41 63,47 C 63,55 50,65 50,65 Z"
                    fill="#F844C2"
                    fillOpacity="0.85"
                  />
                </motion.svg>
              </div>
            </div>

          </motion.div>
        </div>

        {/* 4. THE ABYSS GRADIENT */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none z-[5]" />

      </section>
    </div>
  );
};

export default SectionWrapper(Hero, "hero");
