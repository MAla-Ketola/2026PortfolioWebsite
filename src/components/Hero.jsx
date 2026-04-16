import React, { useMemo, useRef, useState, useEffect, Suspense, lazy } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useAnimation,
} from "framer-motion";
import { SectionWrapper } from "../hoc";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

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
          <Suspense fallback={null}>
            <HeroCanvas
              isMobile={isMobile}
              depthFadeRef={depthFadeRef}
              onReady={() => setHeroLoaded(true)}
            />
          </Suspense>
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
              <div
                className="relative w-[110px] h-[110px] flex-shrink-0 pointer-events-auto cursor-pointer"
                aria-hidden="true"
                onMouseEnter={() => !reduceMotion && ringControls.start({ rotate: 360, transition: { duration: 3, repeat: Infinity, ease: "linear" } })}
                onMouseLeave={() => ringControls.start({ rotate: 0, transition: { duration: 0.6, ease: "easeOut" } })}
              >
                <motion.svg width="110" height="110" viewBox="0 0 100 100" fill="none" className="absolute inset-0" animate={ringControls}>
                  <defs>
                    <path id="hero-scroll-path" d="M 8,50 A 42,42 0 0,1 50,8 A 42,42 0 0,1 92,50 A 42,42 0 0,1 50,92 A 42,42 0 0,1 8,50" />
                    <linearGradient id="ringGradient" gradientUnits="userSpaceOnUse" x1="29" y1="14" x2="71" y2="86">
                      <stop offset="0%" stopColor="#F844C2" />
                      <stop offset="50%" stopColor="#F087FE" />
                      <stop offset="100%" stopColor="#FED814" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 86.4,29 A 42,42 0 1,1 13.6,29"
                    stroke="url(#ringGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <text fontSize="8" fill="url(#ringGradient)" fillOpacity="1" letterSpacing="1.5" fontFamily="monospace" fontWeight="700">
                    <textPath href="#hero-scroll-path" startOffset="25%" textAnchor="middle" dy="4">SCROLL DOWN</textPath>
                  </text>
                </motion.svg>
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
