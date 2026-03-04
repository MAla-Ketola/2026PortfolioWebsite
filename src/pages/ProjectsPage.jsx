import React from "react";
import { motion } from "framer-motion";
import { github } from "../assets";
import { projects } from "../constants";
import Footer from "../components/Footer";

const palette = [
  "#25E995",
  "#F087FE",
  "#8C52FD",
  "#FED814",
  "#01D6FB",
  "#F844C2",
];

const buttonBorderColors = ["#F844C2", "#F087FE", "#FED814"];

const gradientBorderStyle = {
  background: `
    linear-gradient(#1a1a1a, #1a1a1a) padding-box,
    linear-gradient(150deg, ${buttonBorderColors.join(", ")}) border-box
  `,
  border: "2px solid transparent",
  borderRadius: "9999px",
};

const GlowButton = ({ href, children, external = false }) => (
  <a
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : ""}
    style={gradientBorderStyle}
    className="group inline-flex items-center justify-center px-5 py-2.5 shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-0.5 cursor-pointer"
  >
    <span className="font-bold text-white text-sm tracking-wide group-hover:opacity-80 transition-opacity">
      {children}
    </span>
  </a>
);

const GlowIconButton = ({ href, icon, external = false }) => (
  <a
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : ""}
    style={gradientBorderStyle}
    className="group flex items-center justify-center w-10 h-10 shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-0.5 cursor-pointer"
  >
    <img
      src={icon}
      alt="source code"
      className="w-4 h-4 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
    />
  </a>
);

const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo, page }) => {
  const colorHex = palette[index % palette.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="bg-black rounded-[20px] border border-white/10 overflow-hidden flex flex-col shadow-xl"
    >
      {/* Image panel */}
      <div
        className="w-full h-[200px] flex items-center justify-center p-6"
        style={{ backgroundColor: colorHex }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      {/* Content panel */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3
            className="font-black text-2xl text-white uppercase tracking-tighter leading-[0.9] break-words"
            style={{ fontFamily: "'Milkyway', sans-serif" }}
          >
            {name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <div
              key={`${name}-${tag.name}`}
              className="flex items-center gap-1.5 bg-[#1C1C21] px-3 py-1.5 rounded-lg border border-white/5"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: palette[i % palette.length] }}
              />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                {tag.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex items-center gap-2.5 mt-auto pt-2">
          {page ? (
            <GlowButton href={page}>VIEW</GlowButton>
          ) : live_demo ? (
            <GlowButton href={live_demo} external>VIEW</GlowButton>
          ) : null}
          {source_code_link && (
            <GlowIconButton href={source_code_link} icon={github} external />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <>
      <main className="relative z-10 min-h-screen bg-black pt-28 pb-20 px-4 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <a
              href="/#work"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors mb-8"
            >
              <span>←</span> Back
            </a>
            <h1
              className="font-black text-[12vw] sm:text-[10vw] lg:text-[8vw] text-white uppercase tracking-tighter leading-[0.9] text-center"
              style={{ fontFamily: "'Milkyway', sans-serif", textShadow: "4px 4px 0 #F087FE" }}
            >
              All Projects
            </h1>
            <p className="text-gray-400 text-lg mt-4 text-center">
              {projects.length} projects
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={`project-${index}`} index={index} {...project} />
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
