import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc"; // Ensure this matches your folder structure
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// --- BUTTON COMPONENT ---
const ProjectButton = ({ href, onClick, children, variant = "dark" }) => {
  const isDark = variant === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group relative inline-block font-bold text-sm focus:outline-none"
    >
      <span
        className={`absolute inset-0 rounded-xl border border-white/25 translate-x-[3px] translate-y-[3px] transition-transform duration-200 ease-out group-hover:translate-x-[1px] group-hover:translate-y-[1px] ${
          isDark ? "bg-white/25" : "bg-white/10"
        }`}
      />
      <span
        className={[
          "relative block rounded-xl border border-white/35 px-5 py-3 transition-transform duration-200 ease-out backdrop-blur-xl",
          "group-hover:translate-x-[2px] group-hover:translate-y-[2px]",
          isDark
            ? "bg-white/90 text-[#111827]"
            : "bg-white/20 text-white"
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          {children}
        </div>
      </span>
    </a>
  );
};

// --- STACKING CARD COMPONENT ---
const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo, page, totalProjects }) => {
  
  // 1. OFFSET: This determines how much of the header is visible
  // We keep this linear so every card sticks at the exact same interval
  const topOffset = 140 + (index * 30); 

  return (
    <div 
      className="sticky mb-[10vh]" // Keeps the scrolling spacing consistent
      style={{ 
        top: `${topOffset}px`, 
        zIndex: index + 1 
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }} // REMOVED SCALE here
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        // Added 'h-[500px]' explicitly so every card is physically the same height
        className="relative w-full max-w-5xl mx-auto md:h-[500px] rounded-[40px] bg-white/15 border border-white/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col md:flex-row"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/35 via-white/10 to-transparent opacity-80" />
        
        {/* IMAGE */}
        <div className="relative w-full md:w-[45%] h-[250px] md:h-auto overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#2b2b2b]/5 mix-blend-overlay pointer-events-none" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          
          <h3 className="text-white font-serif font-bold text-[32px] md:text-[40px] leading-tight">
            {name}
          </h3>
          
          <p className="mt-4 text-white/70 font-sans text-[18px] leading-relaxed max-w-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag.name} 
                className="text-[14px] font-mono font-medium px-4 py-1.5 rounded-full border border-white/20 bg-white/15 text-white/80"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {page ? (
               <ProjectButton href={page} variant="light">View Case Study</ProjectButton>
            ) : live_demo ? (
               <ProjectButton href={live_demo} variant="light">Live Demo</ProjectButton>
            ) : null}

            {source_code_link && (
              <ProjectButton href={source_code_link} variant="dark">
                <img src={github} alt="github" className="w-5 h-5 object-contain" />
                <span>Source Code</span>
              </ProjectButton>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Works = () => {
  return (
    <div className="relative z-20 pb-40 pt-24"> 
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-mono tracking-widest uppercase text-white/70`}>
          My Work
        </p>
        <h2 className={`${styles.sectionHeadText} text-white font-serif italic mt-2`}>
          Selected Projects.
        </h2>
      </motion.div>

      <div className="w-full flex mb-20">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white/70 font-sans text-[20px] max-w-3xl leading-[1.8]"
        >
          A collection of digital experiments, applications, and experiences.
          Scroll down to explore the stack.
        </motion.p>
      </div>

      <div className="relative flex flex-col gap-10">
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index}
            totalProjects={projects.length}
            {...project} 
          />
        ))}
      </div>
    </div>
  );
};

export default Works;

