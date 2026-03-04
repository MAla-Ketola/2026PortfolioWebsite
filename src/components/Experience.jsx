import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

import sticker1 from "/Stickers/1.png";
import sticker2 from "/Stickers/2.png";
import sticker3 from "/Stickers/3.png";
import sticker4 from "/Stickers/4.png";
import sticker5 from "/Stickers/5.png";
import sticker6 from "/Stickers/6.png";

const palette = ["#25E995", "#F087FE", "#8C52FD", "#FED814", "#01D6FB", "#F844C2"];

export const stickers = [sticker2, sticker1, sticker3, sticker4, sticker5, sticker6];

// --- Glass Sphere ---
const GlassSphere = () => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={3}>
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#FED814"
          emissive="#FED814"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.4}
          reflectivity={0.5}
        />
      </mesh>
    </Float>
  );
};

// --- Heart Shape ---
const heartGeometry = (() => {
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
})();

const HeartShape = () => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh geometry={heartGeometry} scale={3} rotation={[-0.1, -0.3, Math.PI]}>
        <meshPhysicalMaterial
          color="#F087FE"
          emissive="#F087FE"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.4}
          reflectivity={0.5}
        />
      </mesh>
    </Float>
  );
};

const HeartCanvas = () => (
  <div className="w-[200px] md:w-[240px] h-[150px] md:h-[200px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#F087FE" />
        <pointLight position={[3, 3, 2]} intensity={0.5} color="#01D6FB" />
        <HeartShape />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  </div>
);

const GlassSphereCanvas = () => (
  <div className="w-[200px] md:w-[200px] h-[100px] md:h-[200px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#F087FE" />
        <pointLight position={[3, 3, 2]} intensity={0.5} color="#01D6FB" />
        <GlassSphere />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  </div>
);

const extraCard = {
  title: "Next Chapter",
  company_name: "Ready to build scalable applications and creative web experiences.",
  icon: experiences[0].icon,
  iconBg: "#383E56",
  date: "2026",
  points: [
    "Looking forward to new challenges and opportunities.",
  ],
};

const allExperiences = [...experiences];

// --- Sticker with company icon ---
const Sticker = ({ sticker, icon }) => (
 /* <div
    className="w-14 h-14 rounded-full flex items-center justify-center"
    style={{ backgroundColor: color }}
  >
    <img src={icon} alt="company" className="w-9 h-9 object-contain rounded-full" />
  </div>*/

    <div style={{ position: "relative", width: "15%", aspectRatio: "1 / 1" }}
  >
    <img src={sticker} alt="sticker" style={{ 
      position: "absolute",
      inset: 0,
      width: "100%", 
      height: "100%", 
      objectFit: "contain", 
      display: "block" }} />

    <img src={icon} alt="company" style={{
      position: "absolute",
      inset: 0,
      transform: "translate(33%, 33%)",
      width: "60%",
      height: "60%",
      objectFit: "contain",
      zIndex: 2,
    }} />
  </div>
);

// --- Experience Card ---
const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;
  const color = palette[index % palette.length];
  const sticker = stickers[index % stickers.length];

  return (
    <div className={`flex items-center w-full mb-12 md:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Card side */}
      <div className="flex-1 flex justify-start md:justify-end md:pr-0">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full max-w-md ${isLeft ? "md:mr-12" : "md:ml-12"}`}
        >
          <div
            className="relative p-6 rounded-2xl border border-white/10 bg-[#111111] overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            style={{
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 25px ${color}33, 0 0 50px ${color}1a`;
              e.currentTarget.style.borderColor = `${color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {/* Sticker + date row */}
            <div className="flex items-center gap-4 mb-4">
              <Sticker sticker={sticker} icon={experience.icon} />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
                {experience.date}
              </span>
            </div>

            <h3
              className="text-white text-xl font-black uppercase tracking-wide leading-tight mb-2"
              style={{ fontFamily: "'Milkyway', sans-serif" }}
            >
              {experience.title}
            </h3>

            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-4">
              {Array.isArray(experience.company_name)
                ? experience.company_name.join(" — ")
                : experience.company_name}
            </p>

            {experience.points.length > 0 && (
              <ul className="space-y-2">
                {experience.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      {/* Center timeline spacer - desktop only */}
      <div className="hidden md:flex w-[6px] flex-shrink-0" />

      {/* Empty side for layout balance - desktop only */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

/* --- [Sparkles] --- */
const SPARKLE_COUNT = 15;

const Sparkles = () => {
  const sparkles = useMemo(() =>
    Array.from({ length: SPARKLE_COUNT }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      rotate: Math.random() * 360,
    })),
  []);

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
            '--sparkle-rotate': `${s.rotate}deg`,
            animation: `sparkle-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

// --- Main Component ---
const Experience = () => {
  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const tipRef = useRef(null);
  const heartSentinelRef = useRef(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [triggerHeart, setTriggerHeart] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById("app-scroll") || window;

    const onScroll = () => {
      if (!containerRef.current || !fillRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = rect.top - viewH * 0.8;
      const end = rect.bottom - viewH * 0.4;
      const progress = Math.min(1, Math.max(0, -start / (end - start)));
      fillRef.current.style.height = `${progress * 100}%`;
      if (tipRef.current) {
        tipRef.current.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
      }

      // Trigger heart when sentinel scrolls into view
      if (heartSentinelRef.current) {
        const heartRect = heartSentinelRef.current.getBoundingClientRect();
        if (heartRect.top < viewH * 0.9) {
          setTriggerHeart(true);
        }
      }
    };
    onScroll();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative w-full pb-16 md:pb-24">
      {/* Sparkles added here with relative wrapper */}
      <Sparkles />

      <motion.div
        onViewportEnter={() => setTriggerAnimation(true)}
        viewport={{ once: true, amount: 0 }}
        className="w-full flex justify-center items-center py-20 md:py-8 mb-0"
      >
        <h2
          className={`
            font-black
            text-[14vw]
            leading-[0.9] uppercase tracking-tighter text-center
            pointer-events-none select-none
            drop-shadow-xl
            ${triggerAnimation ? "animate-hero-fill-fade-white" : "opacity-0"}
          `}
          style={{ fontFamily: "'Milkyway', sans-serif" }}
        >
          Experience
        </h2>
      </motion.div>

      <motion.div
        className="w-full flex justify-start -ml-16 md:-ml-24"
        initial={{ x: "-100%", opacity: 0 }}
        animate={triggerAnimation ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <GlassSphereCanvas />
      </motion.div>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
        {/* Decorative clouds - behind cards */}
        <img
          src="/clouds/2.png"
          alt=""
          className="absolute pointer-events-none select-none opacity-90 z-0
            top-[20%] -right-[50%] w-[70%]
            md:top-[-20%] md:-right-[35%] md:w-[45%]"
        />
        <img
          src="/clouds/2.png"
          alt=""
          className="absolute pointer-events-none select-none opacity-90 z-0
            -top-[12%] -left-[10%] w-[70%]
            md:top-[40%] md:-left-[25%] md:w-[45%]"
        />
        <img
          src="/clouds/3.png"
          alt=""
          className="absolute pointer-events-none select-none opacity-90 z-0
            top-[50%] -right-[10%] w-[70%]
            md:top-[55%] md:-right-[35%] md:w-[45%]"
        />
        {/* Decorative stars — mobile positions first, md: overrides for desktop */}
        {[
          { pos: "top-[-17%] left-[3%] md:top-[5%] md:left-[8%]", size: "w-10 md:w-8", rotate: "-12deg" },
          { pos: "top-[1%] right-[10%] md:top-[15%] md:right-[12%]", size: "w-3 md:w-5", rotate: "0deg" },
          { pos: "top-[28%] right-[4%] md:top-[30%] md:right-[-5%]", size: "w-4 md:w-6", rotate: "20deg" },
          { pos: "top-[27%] left-[5%] md:top-[42%] md:left-[12%]", size: "w-3 md:w-4", rotate: "-10deg" },
          { pos: "-top-[8%] right-[2%] md:-top-[10%] md:right-[0%]", size: "w-5 md:w-6", rotate: "15deg" },
          { pos: "top-[59%] left-[1%] md:top-[50%] md:left-[3%]", size: "w-5 md:w-7", rotate: "-5deg" },
          { pos: "top-[59%] right-[10%] md:top-[75%] md:right-[40%]", size: "w-3 md:w-5", rotate: "5deg" },
          { pos: "top-[95%] right-[3%] md:top-[85%] md:right-[10%]", size: "w-6 md:w-5", rotate: "20deg" },
          { pos: "top-[100%] left-[5%] md:top-[92%] md:left-[10%]", size: "w-10 md:w-6", rotate: "-20deg" },
        ].map((star, i) => (
          <img
            key={i}
            src="/star.webp"
            alt=""
            className={`absolute pointer-events-none select-none z-0 ${star.size} ${star.pos}`}
            style={{ transform: `rotate(${star.rotate})` }}
          />
        ))}

        {/* Center timeline track - desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[12px] z-10">
          {/* Background track */}
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          {/* Scroll-fill bar */}
          <div
            ref={fillRef}
            className="absolute top-0 left-0 w-full rounded-full origin-top"
            style={{
              height: "0%",
              background: "linear-gradient(180deg, #F087FE, #8C52FD, #FED814,  #F844C2)",
            }}
          >
            {/* Glowing tip */}
            <div
              ref={tipRef}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{
                opacity: 0,
                background: "#F844C2",
              }}
            />
          </div>
        </div>

        {/* Experience cards */}
        <div className="relative z-[1] flex flex-col md:gap-16 gap-6 py-8 border-l-2 border-white/10 pl-4 md:border-l-0 md:pl-0">
          {allExperiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>

      <div ref={heartSentinelRef} />
      <motion.div
        className="w-full flex justify-end -mr-16 md:-mr-24"
        initial={{ x: "100%", opacity: 0 }}
        animate={triggerHeart ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <HeartCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
