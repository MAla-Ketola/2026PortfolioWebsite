import { useMemo, useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const TechCanvas = lazy(() => import("./TechCanvas"));

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
    <section ref={sectionRef} className="relative w-full min-h-[120vh] overflow-hidden bg-black flex flex-col items-center justify-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_70%)] opacity-50 z-0 pointer-events-none" />

      <Sparkles isMobile={isMobile} />

      <motion.div
        onViewportEnter={() => setTriggerAnimation(true)}
        viewport={{ once: true, amount: 0 }}
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

      {isMobile && (
        <div className="absolute inset-0 z-[15]" style={{ touchAction: "pan-y" }} />
      )}

      <div
        ref={canvasContainerRef}
        className={`absolute inset-0 z-10 ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
      >
        <TechShimmer visible={canvasReady && !sceneLoaded} />
        {canvasReady && (
          <Suspense fallback={null}>
            <TechCanvas isMobile={isMobile} onReady={() => setSceneLoaded(true)} />
          </Suspense>
        )}
      </div>

    </section>
  );
};

export default SectionWrapper(Tech, "tech");
