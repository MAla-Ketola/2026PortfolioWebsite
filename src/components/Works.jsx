import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

/* --- [OffsetButton Helper] --- */
const OffsetButton = ({
  href,
  onClick,
  children,
  variant = "primary",
  external = false,
  className = "",
}) => {
  const commonProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      onClick={onClick}
      {...commonProps}
      className="group relative inline-block font-bold text-lg cursor-pointer pointer-events-auto rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <span className="absolute inset-0 rounded-[16px] border-2 border-white bg-transparent translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0 opacity-40" />
      <span
        className={[
          "relative block rounded-[16px] border-2 border-white transition-transform duration-200 ease-out",
          "group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-1.5 group-active:translate-y-1.5",
          variant === "primary"
            ? "bg-white text-black"
            : "bg-transparent text-white hover:bg-white/10",
          className || "px-4 md:px-6 py-1.5",
        ].join(" ")}
      >
        {children}
      </span>
    </a>
  );
};

const OffsetIconButton = ({
  href,
  children,
  external = false,
  label,
  variant = "secondary",
}) => {
  const commonProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...commonProps}
      className="group relative inline-flex items-center justify-center rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <span className="absolute inset-0 rounded-[16px] border-2 border-white bg-transparent translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0 opacity-40" />
      <span
        className={[
          "relative inline-flex items-center justify-center w-11 h-11 rounded-[16px] border-2 border-white transition-transform duration-200 ease-out",
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

  const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];
  const shadowColor = palette[index % palette.length];

  const baseTop = "clamp(76px, 9vh, 130px)";
  const stepPx = 22;
  const rampCount = 4;
  const ramp = Math.min(index, rampCount) * stepPx;

  return (
    <div
      className="sticky mb-[10vh]"
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
        style={{
          boxShadow: `8px 8px 0px 0px ${shadowColor}`,
        }}
        className={[
          "relative w-full max-w-6xl mx-auto bg-black border-2 border-white overflow-hidden",
          "rounded-[24px]",
          "flex flex-col",
          "md:h-[min(460px,calc(100vh-220px))]",
        ].join(" ")}
      >
        <div className="relative z-20 flex items-center justify-between gap-4 px-6 py-5 border-b-2 border-white bg-black">
          <div className="flex items-baseline gap-4 min-w-0">
            <span
              className="shrink-0 font-mono font-black text-[24px] md:text-[32px] leading-none"
              style={{ color: shadowColor }}
            >
              {number}
            </span>
            <h3 className="min-w-0 text-white font-sans font-black text-[24px] md:text-[32px] leading-none tracking-tight truncate">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {page ? (
              <OffsetButton href={page} variant="primary">
                <span className="hidden sm:inline">View Case Study</span>
                <span className="sm:hidden">Case Study</span>
              </OffsetButton>
            ) : live_demo ? (
              <OffsetButton href={live_demo} external variant="primary">
                Live Demo
              </OffsetButton>
            ) : null}

            {source_code_link && (
              <OffsetIconButton
                href={source_code_link}
                external
                label="Source code (GitHub)"
                variant="primary"
              >
                <img
                  src={github}
                  alt=""
                  className="w-6 h-6 object-contain invert"
                />
              </OffsetIconButton>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row-reverse">
          <div className="relative w-full md:w-[55%] h-[240px] md:h-full border-b-2 md:border-b-0 md:border-l-2 border-white overflow-hidden bg-black group">
            <div className="relative w-full h-full p-6 flex items-center justify-center">
              <img
                src={image}
                alt={name}
                className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="flex-1 px-6 py-6 md:p-8 flex flex-col justify-center bg-black relative">
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="text-[13px] font-mono font-bold px-4 py-1.5 rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors cursor-default"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <p className="text-white font-sans text-[18px] md:text-[22px] leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* --- [Works Main Component] --- */
const Works = () => {
  const featuredProjects = projects.slice(0, 5);
  // State to trigger animation only when scrolled into view
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  return (
    <div className="pb-40 relative z-10">
      {/* 1. Header with "Hollow to Solid" Animation */}
      {/* We use motion.div just to detect viewport entry */}
      <motion.div 
        onViewportEnter={() => setTriggerAnimation(true)}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex justify-center items-center py-20 md:py-32 mb-10"
      >
        <h2
          className={`
            font-black 
            text-[14vw] 
            leading-[0.9] uppercase tracking-tighter text-center 
            pointer-events-none select-none 
            drop-shadow-xl
            ${triggerAnimation ? "animate-fill-fade" : "opacity-0"}
          `}
        >
          Projects
        </h2>
      </motion.div>

      {/* 2. Project Stack */}
      <div className="relative flex flex-col gap-10">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* 3. View All Projects Button */}
      <div className="mt-16 flex justify-center">
        <OffsetButton
          href="/projects"
          variant="primary"
          className="px-8 py-3 text-lg md:text-xl"
        >
          View all projects
        </OffsetButton>
      </div>

      {/* Animation Styles */}
      <style>{`
        /* * Animation: Hollow -> Solid + Shadow Pop
         * 1. Starts hidden/hollow.
         * 2. Fills with white.
         * 3. Shadow pops in at the end.
         */
        @keyframes fillFade {
          0% { 
            color: transparent; 
            text-shadow: 0px 0px 0 transparent; 
            opacity: 0; 
            transform: translateY(20px); 
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            color: transparent; /* Text is still hollow */
            text-shadow: 0px 0px 0 transparent; /* Shadow hidden */
          }
          100% { 
            color: #ffffff; /* Solid White */
            text-shadow: 4px 4px 0 #1328f0; /* Blue Shadow Pop */
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fill-fade {
          color: transparent;
          -webkit-text-stroke: 2px #ffffff; /* White Outline */
          animation: fillFade 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Works, "work");
