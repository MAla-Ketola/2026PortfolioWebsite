import React, {
  useRef,
  Suspense,
  useMemo,
  useState,
  useId,
  useEffect,
} from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  PerspectiveCamera,
  Resize,
  Center,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SplineLoader from "@splinetool/loader";
import * as THREE from "three";
import CanvasLoader from "./Loader";
import { SectionWrapper } from "../hoc";

// --- 1. Noise Texture ---
const NoiseOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }}
  />
);

/**
 * Helper: replace all Spline materials with safe MeshStandardMaterial
 */
function styleSplineObject(spline) {
  spline.traverse((child) => {
    if (child?.isObject3D) child.raycast = () => null;

    if (child?.isMesh) {
      child.raycast = THREE.Mesh.prototype.raycast;

      const name = (child.name || "").toLowerCase();
      const isCenter = name.includes("sphere") || name.includes("center");

      child.material = new THREE.MeshStandardMaterial({
        color: isCenter ? "#ffeebb" : "#ffc4d6",
        roughness: 0.35,
        metalness: 0.0,
        emissive: isCenter ? "#ffaa00" : "#ff88aa",
        emissiveIntensity: isCenter ? 0.4 : 0.15,
      });
    }
  });

  return spline;
}

function getScrollParent(node) {
  if (!node) return window;
  let parent = node.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);
    const overflowY = style.overflowY;
    const isScrollable =
      (overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowY === "overlay") &&
      parent.scrollHeight > parent.clientHeight;

    if (isScrollable) return parent;
    parent = parent.parentElement;
  }

  return window;
}

/**
 * --- MAIN 3D FLOWER (Hero Tile) ---
 */
const HeroScene = ({ boostBloom = 0 }) => {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.1;
  }, [gl]);

  const rawSpline = useLoader(
    SplineLoader,
    "https://prod.spline.design/Rec6PcROBqV3gDTB/scene.splinecode"
  );
  const spline = useMemo(() => styleSplineObject(rawSpline), [rawSpline]);

  const spinRef = useRef();
  const [hovered, setHovered] = useState(false);
  const rotationSpeed = useRef(0);

  useFrame((state, delta) => {
    if (!spinRef.current) return;

    // Spinning
    const targetSpeed = hovered ? 3 : 0;
    rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 4 * delta;
    spinRef.current.rotation.z -= rotationSpeed.current * delta;
    spinRef.current.rotation.z -= (hovered ? 0 : 0.18) * delta;

    // Parallax
    const x = state.pointer.x * 0.2;
    const y = state.pointer.y * 0.2;

    spinRef.current.rotation.x = THREE.MathUtils.lerp(
      spinRef.current.rotation.x,
      -0.05 - y,
      0.1
    );
    spinRef.current.rotation.y = THREE.MathUtils.lerp(
      spinRef.current.rotation.y,
      -0.25 + x,
      0.1
    );
  });

  const bloomIntensity =
    0.25 + (hovered ? 0.15 : 0) + Math.min(0.35, boostBloom);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <ambientLight intensity={0.8} color="#ffe0f0" />

      <directionalLight position={[5, 10, 5]} intensity={2.0} color="#fff0f5" />
      <spotLight
        position={[-5, 5, -5]}
        intensity={2.0}
        color="#ffffff"
        angle={0.5}
        penumbra={1}
      />

      <Float
        speed={2}
        rotationIntensity={0.55}
        floatIntensity={2}
        floatingRange={[-0.1, 0.1]}
      >
        <group
          ref={spinRef}
          rotation={[-0.05, -0.25, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
        >
          <Resize scale={6.8}>
            <Center>
              <primitive object={spline} />
            </Center>
          </Resize>
        </group>
      </Float>

      {/*<ContactShadows
        position={[0, -3.35, 0]}
        opacity={0.16}
        scale={40}
        resolution={512}
        blur={2.5}
        far={4}
        color="#2b2b2b"
      />*/}

      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.85}
          mipmapBlur
          intensity={bloomIntensity}
          radius={0.35}
        />
      </EffectComposer>

      <Sparkles
        count={45}
        scale={10}
        size={2}
        speed={0.4}
        noise={0.2}
        opacity={0.6}
        color="#FFC947"
      />
    </>
  );
};

// ... (MiniFlowerScene & ScrollFlowerIndicator remain exactly the same) ...
const MiniFlowerScene = ({ hovered = false }) => {
  const rawSpline = useLoader(
    SplineLoader,
    "https://prod.spline.design/Rec6PcROBqV3gDTB/scene.splinecode?mini=1"
  );
  const spline = useMemo(() => styleSplineObject(rawSpline), [rawSpline]);
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= (hovered ? 0.9 : 0.45) * delta;
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={42} />
      <ambientLight intensity={0.6} color="#fff3fb" />
      <directionalLight position={[4, 8, 6]} intensity={1.2} color="#ffffff" />
      <spotLight
        position={[-5, 5, -5]}
        intensity={1.0}
        color="#ffffff"
        angle={0.5}
        penumbra={1}
      />
      <Float
        speed={hovered ? 2.6 : 2.0}
        rotationIntensity={0.35}
        floatIntensity={0.8}
        floatingRange={[-0.08, 0.08]}
      >
        <group ref={ref}>
          <Resize scale={6}>
            <Center>
              <primitive object={spline} />
            </Center>
          </Resize>
        </group>
      </Float>
    </>
  );
};

const Tile = ({ className = "", style = {}, children }) => (
  <div
    className={[
      "relative overflow-hidden rounded-[32px] border border-black/5",
      "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
      "backdrop-blur-sm",
      "transition-all duration-500 hover:-translate-y-[4px] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)]",
      className,
    ].join(" ")}
    style={style}
  >
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/0 to-transparent opacity-50" />
    {children}
  </div>
);

const ScrollFlowerIndicator = ({ onClick }) => {
  const pathId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label="Scroll down"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative h-28 w-28 md:h-32 md:w-32 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2b2b2b]/35"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .scrollRing { animation: spinRing 10s linear infinite; transform-origin: 50% 50%; }
          .group:hover .scrollRing { animation-duration: 6s; }
          .miniFloat { animation: miniBob 1.8s ease-in-out infinite; }
        }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes miniBob { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
      `}</style>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id={pathId}
            d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          />
        </defs>
        <g className="scrollRing">
          <text className="fill-[#2b2b2b] font-mono text-[9px] tracking-[0.28em] uppercase">
            <textPath href={`#${pathId}`} startOffset="0%">
              {"scroll down • scroll down • scroll down • "}
            </textPath>
          </text>
        </g>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="miniFloat relative h-12 w-12 md:h-14 md:w-14">
          <div className="absolute inset-0 pointer-events-none">
            <Canvas
              className="w-full h-full"
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <MiniFlowerScene hovered={hovered} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </button>
  );
};

/**
 * NEW BUTTON COMPONENT: The "Hard Offset" / "Two Squares" Style
 */
const OffsetButton = ({ href, onClick, children, variant = "primary" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-block font-bold text-lg focus:outline-none"
    >
      {/* 1. The "Shade" (Bottom Layer) - Hollow with Black Border */}
      <span className="absolute inset-0 rounded-[16px] border-2 border-[#2b2b2b] bg-transparent translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0" />
      
      {/* 2. The Button (Top Layer) - Solid Color */}
      <span
        className={[
          "relative block rounded-[16px] border-2 border-[#2b2b2b] px-8 py-3 transition-transform duration-200 ease-out",
          "group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-1.5 group-active:translate-y-1.5",
          // Variant Styles
          variant === "primary" 
            ? "bg-[#2b2b2b] text-white" 
            : "bg-[#F7F3E9] text-[#2b2b2b]" // Secondary matches the cream BG
        ].join(" ")}
      >
        {children}
      </span>
    </a>
  );
};

const Hero = () => {
  const [bloomBoost, setBloomBoost] = useState(0);
  const heroRef = useRef(null);
  const scrollerRef = useRef(window);
  const CUE_SIZE = 128;
  const PEEK_HIDE_PX = CUE_SIZE * 0.55;
  const REVEAL_DISTANCE = 10;
  const FADE_START_RATIO = 0.05;
  const FADE_DISTANCE = 120;

  const [cueStyle, setCueStyle] = useState({
    y: PEEK_HIDE_PX,
    opacity: 1,
    interactive: true,
  });
  const triggerBurst = () => {
    setBloomBoost(0.35);
    window.setTimeout(() => setBloomBoost(0), 500);
  };
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      window.location.hash = `#${id}`;
      return;
    }
    const NAV_OFFSET = 112;
    const scroller = scrollerRef.current || window;
    if (scroller === window) {
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = el.getBoundingClientRect();
    const y =
      scroller.scrollTop + (targetRect.top - scrollerRect.top) - NAV_OFFSET;
    scroller.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const scroller = getScrollParent(el);
    scrollerRef.current = scroller;
    const listenTarget = scroller === window ? window : scroller;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const heroHeight = rect.height;
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) {
        setCueStyle((prev) =>
          prev.opacity === 0
            ? prev
            : { y: PEEK_HIDE_PX, opacity: 0, interactive: false }
        );
        raf = 0;
        return;
      }
      const localY = Math.min(Math.max(0, -rect.top), heroHeight);
      const revealT = Math.min(Math.max(localY / REVEAL_DISTANCE, 0), 1);
      const translateY = (1 - revealT) * PEEK_HIDE_PX;
      const fadeStart = heroHeight * FADE_START_RATIO;
      const fadeT = Math.min(
        Math.max((localY - fadeStart) / FADE_DISTANCE, 0),
        1
      );
      const opacity = 1 - fadeT;
      setCueStyle({ y: translateY, opacity, interactive: opacity > 0.05 });
      raf = 0;
    };
    const scheduleUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    listenTarget.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      listenTarget.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-[#F7F3E9] pt-28 pb-24 md:pb-32 px-4 md:px-8 overflow-hidden"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <NoiseOverlay />

      <div className="relative w-full max-w-7xl mx-auto h-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* TEXT TILE */}
          <Tile
            className="lg:col-span-7 h-full"
            style={{ backgroundColor: "rgba(248, 200, 220, 0.85)" }}
          >
            <div className="relative h-full p-6 md:p-10 flex flex-col justify-center">
              <h1 className="mt-6 font-serif italic text-5xl md:text-7xl text-[#2b2b2b] leading-[0.95] animate-fade-up delay-100">
                Hi, I’m{" "}
                <span className="not-italic font-sans font-black">Marjut</span>
              </h1>
              <p className="mt-5 text-[#2b2b2b]/80 font-medium text-base md:text-lg max-w-xl leading-relaxed animate-fade-up delay-200">
                A Creative Developer building bold, accessible, and memorable
                digital experiences.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-6 animate-fade-up delay-300">
                {/* 1. Contact Me (Primary: Solid Dark) */}
                <OffsetButton 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); triggerBurst(); scrollToId("contact"); }}
                  variant="primary"
                >
                  Contact Me
                </OffsetButton>

                {/* 2. View Work (Secondary: Solid Light) */}
                <OffsetButton 
                  href="#projects" 
                  onClick={(e) => { e.preventDefault(); triggerBurst(); scrollToId("projects"); }}
                  variant="secondary"
                >
                  View Work
                </OffsetButton>
              </div>
            </div>
          </Tile>

          {/* FLOWER - UNBOXED */}
          <div className="lg:col-span-5 h-[42vh] lg:h-full relative">
            <div className="absolute inset-0">
              <Canvas className="w-full h-full">
                <Suspense fallback={<CanvasLoader />}>
                  <HeroScene boostBloom={bloomBoost} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* SCROLL CUE */}
        <div
          className="fixed left-1/2 bottom-0 z-50 transition-[transform,opacity] duration-300"
          style={{
            transform: `translateX(-50%) translateY(${cueStyle.y}px)`,
            opacity: cueStyle.opacity,
            pointerEvents: cueStyle.interactive ? "auto" : "none",
          }}
        >
          <ScrollFlowerIndicator
            onClick={() => {
              triggerBurst();
              scrollToId("about");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Hero, "hero");

