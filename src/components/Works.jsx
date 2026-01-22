import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// --- PROJECT BUTTON (Unchanged) ---
const ProjectButton = ({ href, onClick, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group relative inline-block font-bold text-sm focus:outline-none"
    >
      <span 
        className="absolute inset-0 rounded-xl border-2 border-white/40 translate-x-[3px] translate-y-[3px] transition-transform duration-200 ease-out group-hover:translate-x-[1px] group-hover:translate-y-[1px]" 
      />
      <span className="relative block rounded-xl border-2 border-white px-5 py-3 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:translate-y-[2px] bg-black text-white hover:bg-white/10">
        <div className="flex items-center gap-2">
          {children}
        </div>
      </span>
    </a>
  );
};

// --- PROJECT CARD (Unchanged) ---
const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo, page }) => {
  const topOffset = 140 + (index * 30); 

  return (
    <div 
      className="sticky mb-[10vh]"
      style={{ 
        top: `${topOffset}px`, 
        zIndex: index + 1 
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative w-full max-w-5xl mx-auto md:h-[500px] rounded-[40px] bg-[#111] border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-[45%] h-[250px] md:h-auto overflow-hidden group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-[#111]">
          <h3 className="text-white font-sans font-black text-[32px] md:text-[40px] leading-tight tracking-tight">
            {name}
          </h3>
          <p className="mt-4 text-[#dedede] font-sans text-[18px] leading-relaxed max-w-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag.name} 
                className="text-[14px] font-mono font-medium px-4 py-1.5 rounded-full border border-white/20 text-white/80"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {page ? (
               <ProjectButton href={page}>View Case Study</ProjectButton>
            ) : live_demo ? (
               <ProjectButton href={live_demo}>Live Demo</ProjectButton>
            ) : null}

            {source_code_link && (
              <ProjectButton href={source_code_link}>
                <img src={github} alt="github" className="w-5 h-5 object-contain invert" />
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
    // CHANGE: Added -mt-32 to pull section UP into Hero, and relative z-10 to sit on top of the Hero's bottom edge
    <div className="pb-40 -mt-32 relative z-10"> 
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-mono tracking-widest uppercase text-white/60`}>
          My Work
        </p>
        <h2 className={`${styles.sectionHeadText} text-white font-sans font-black tracking-tighter mt-2`}>
          Selected Projects.
        </h2>
      </motion.div>

      <div className="w-full flex mb-20">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-[#dedede] font-sans text-[20px] max-w-3xl leading-[1.8]"
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

export default SectionWrapper(Works, "work");


