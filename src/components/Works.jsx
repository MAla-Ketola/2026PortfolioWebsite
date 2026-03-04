import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

/* --- [Palette Definition] --- */
const palette = [
  "#25E995", // Green
  "#F087FE", // Light Purple
  "#8C52FD", // Deep Purple
  "#FED814", // Yellow
  "#01D6FB", // Cyan
  "#F844C2", // Hot Pink
];


const buttonBorderColors = [
  "#F844C2",
  "#F087FE",
  "#FED814",
];

const gradientBorderStyle = {
  background: `
    linear-gradient(#1a1a1a, #1a1a1a) padding-box,
    linear-gradient(150deg, ${buttonBorderColors.join(", ")}) border-box
  `,
  border: "2px solid transparent",
  borderRadius: "9999px",
};

/* --- [Custom Button: Glow Pill (For Cards)] --- */
const GlowButton = ({ href, onClick, children, external = false }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      style={gradientBorderStyle}
      className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-1 hover:rotate-[-6deg] cursor-pointer"
    >
      <div className="font-bold text-white text-xl md:text-2xl tracking-wide group-hover:opacity-80 transition-opacity">
        {children}
      </div>
    </a>
  );
};

/* --- [Custom Button: Glow Icon (For GitHub)] --- */
const GlowIconButton = ({ href, icon, external = false }) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      style={gradientBorderStyle}
      className="group relative flex items-center justify-center w-16 h-16 shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-1 hover:rotate-[-6deg] cursor-pointer"
    >
      <img
        src={icon}
        alt="source code"
        className="w-7 h-7 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );
};

/* --- [Gradient Button (For View All)] --- */
const GradientViewButton = ({ href, children }) => {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-1 hover:rotate-[-6deg]"
      style={{
        // Gradient: Light Purple -> Deep Purple -> Yellow
        background: "linear-gradient(90deg, #F087FE 0%, #8C52FD 50%, #FED814 100%)",
        // Border: Light Purple
        border: "3px solid #F087FE", 
      }}
    >
      <span className="font-bold text-white text-xl tracking-widest uppercase drop-shadow-md">
        {children}
      </span>
    </a>
  );
};

/* --- [ProjectCard] --- */
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo,
  page,
}) => {
  const number = String(index + 1).padStart(2, "0");

  const baseTop = "clamp(76px, 9vh, 130px)";
  const stepPx = 22;
  const rampCount = 4;
  const ramp = Math.min(index, rampCount) * stepPx;

  const currentHex = palette[index % palette.length];

  return (
    <div
      className="lg:sticky mb-4 lg:mb-[10vh]"
      style={{
        top: `calc(${baseTop} + ${ramp}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45, delay: index * 0.07 }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div className="bg-black rounded-[20px] lg:rounded-[40px] border border-white/10 p-2 lg:p-4 flex flex-col lg:flex-row gap-3 lg:gap-4 lg:h-[550px] overflow-hidden shadow-2xl">

          {/* LEFT: Content Panel */}
          <div className="flex-1 flex flex-col justify-between p-4 lg:p-8">
            <div>
              <div className="flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-8">
                <span className="font-black text-2xl lg:text-5xl text-white tracking-tighter" style={{ fontFamily: "impact, sans-serif" }}>
                  {number}
                </span>

                <h3
                  className="font-black text-2xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.9] break-words"
                  style={{ fontFamily: "'Milkyway', sans-serif" }}
                >
                  {name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-8">
                {tags.map((tag, i) => (
                  <div
                    key={`${name}-${tag.name}`}
                    className="flex items-center gap-1.5 lg:gap-2 bg-[#1C1C21] px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-white/5"
                  >
                    <span
                        className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full"
                        style={{ backgroundColor: palette[i % palette.length] }}
                    />
                    <span className="text-xs lg:text-sm font-bold text-gray-300 uppercase tracking-wider">
                      {tag.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 font-medium text-sm lg:text-xl leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:gap-4 mt-4 lg:mt-8">
              {page ? (
                <GlowButton href={page}>VIEW</GlowButton>
              ) : live_demo ? (
                <GlowButton href={live_demo} external>
                  VIEW
                </GlowButton>
              ) : null}

              {source_code_link && (
                <GlowIconButton href={source_code_link} icon={github} external />
              )}
            </div>
          </div>

          {/* RIGHT: Visual Panel */}
          <div
            className="w-full lg:w-[50%] h-[200px] lg:h-full rounded-[16px] lg:rounded-[32px] overflow-hidden relative flex items-center justify-center"
            style={{ backgroundColor: currentHex }}
          >
            <div className="relative w-[90%] h-[90%] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* --- [Sparkles] --- */
const SPARKLE_COUNT_DESKTOP = 20;
const SPARKLE_COUNT_MOBILE = 10;

// Generate positions mainly around Title (Top) and CTA (Bottom)
const getSparklePosition = () => {
  const isTop = Math.random() < 0.2;
  // Horizontal spread across full width
  const left = Math.random() * 100;
  
  let top;
  if (isTop) {
    // Top Zone: Clusters around the "Projects" title (0-15%)
    top = Math.random() * 10;
  } else {
    // Bottom Zone: Clusters around the CTA button (85-100%)
    top = 90 + Math.random() * 10;
  }
  
  return { top: `${top}%`, left: `${left}%` };
};

const Sparkles = ({ isMobile }) => {
  const count = isMobile ? SPARKLE_COUNT_MOBILE : SPARKLE_COUNT_DESKTOP;
  const sparkles = useMemo(() =>
    Array.from({ length: count }, () => {
      const pos = getSparklePosition();
      return {
        ...pos,
        size: 10 + Math.random() * 18,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 3,
        rotate: Math.random() * 360,
      };
    }),
  [count]);

  return (
    <>
      {sparkles.map((s, i) => (
        <img
          key={`sparkle-${i}`}
          src="/star.webp"
          alt=""
          className="absolute pointer-events-none select-none z-0"
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
    </>
  );
};

/* --- [Works Main Component] --- */
const Works = () => {
  const featuredProjects = projects.slice(0, 5);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="pb-40 relative z-10">
      {/* Placed at root to span the full section height */}
      <Sparkles isMobile={isMobile} />
      
      <motion.div 
        onViewportEnter={() => setTriggerAnimation(true)}
        viewport={{ once: true, amount: 0 }}
        className="w-full flex justify-center items-center py-20 md:py-32 mb-10"
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
          Projects
        </h2>
      </motion.div>

      <div className="relative flex flex-col gap-10">
        {/* Decorative stars — mobile positions first, md: overrides for desktop */}
        {[
          { pos: "top-[-2%] right-[3%] md:top-[-5%] md:right-[8%]", size: "w-5 md:w-7", rotate: "10deg" },
          { pos: "top-[-1%] right-[15%] md:top-[-4%] md:right-[12%]", size: "w-3 md:w-5", rotate: "0deg" },
          { pos: "top-[-2%] left-[5%] md:top-[-4%] md:left-[10%]", size: "w-7 md:w-6", rotate: "-15deg" },
          { pos: "top-[100.5%] left-[4%] md:top-[100%] md:left-[5%]", size: "w-8 md:w-10", rotate: "-5deg" },
          { pos: "top-[100%] right-[-2%] md:top-[100%] md:right-[0%]", size: "w-5 md:w-10", rotate: "5deg" },
          { pos: "top-[102%] left-[2%] md:top-[102%] md:left-[-3%]", size: "w-4 md:w-6", rotate: "-4deg" },
          { pos: "top-[104%] right-[3%] md:top-[104%] md:right-[8%]", size: "w-3 md:w-7", rotate: "10deg" },
          { pos: "top-[102%] right-[8%] md:top-[102%] md:right-[12%]", size: "w-3 md:w-5", rotate: "0deg" },
          { pos: "top-[100%] left-[-2%] md:top-[99%] md:left-[-6%]", size: "w-7 md:w-6", rotate: "-15deg" },
        ].map((star, i) => (
          <img
            key={`star-${i}`}
            src="/star.webp"
            alt=""
            className={`absolute pointer-events-none select-none z-0 ${star.size} ${star.pos}`}
            style={{ transform: `rotate(${star.rotate})` }}
          />
        ))}

        {featuredProjects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="mt-24 flex justify-center animate-fade-up delay-300 opacity-0">
         <GradientViewButton href="/projects">
            View all projects
         </GradientViewButton>
      </div>
      {/*<div className="h-[50vh]" aria-hidden="true" />*/}
      {/* Uses global .animate-hero-fill-fade-white */}
    </div>
  );
};

export default SectionWrapper(Works, "work");


