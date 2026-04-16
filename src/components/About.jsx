import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  return (
    <div
      // FULL WIDTH HACK: w-screen + negative margins/translate forces this div
      // to stretch to the viewport edges, ignoring the parent SectionWrapper's max-width.
      className="w-screen relative left-1/2 -translate-x-1/2 bg-[#fdfbf7] pb-24 sm:pb-32 rounded-[50px]"
    >
      {/* Clouds overlapping into previous section (Works) */}
      <div className="pointer-events-none absolute left-0 right-0 -top-40 sm:-top-64 md:-top-80 lg:-top-96 h-32 sm:h-40 z-0">
        <img
          src="/clouds/2.png"
          alt=""
          className="absolute left-2 sm:left-8 lg:-left-12 top-0 sm:-top-4 md:-top-6 lg:-top-8 w-60 sm:w-[32rem] md:w-[40rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
        <img
          src="/clouds/3.png"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-0 w-72 sm:w-[32rem] md:w-[40rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
        <img
          src="/clouds/4.png"
          alt=""
          className="absolute right-2 sm:right-8 top-0 sm:-top-2 md:-top-4 lg:-top-6 w-56 sm:w-[30rem] md:w-[38rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
      </div>

      {/* Inner Container to keep content constrained and centered */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 pt-10">
        {/* HEADER */}
        <motion.div
          onViewportEnter={() => setTriggerAnimation(true)}
          viewport={{ once: true, amount: 0 }}
          className="relative z-10 w-full flex justify-center items-center py-16 md:py-24 mb-8"
        >
          <h2
            className={`
              font-black 
              text-[14vw] 
              leading-[0.9] uppercase tracking-tighter text-center 
              pointer-events-none select-none 
              drop-shadow-xl
              ${triggerAnimation ? "animate-hero-fill-fade-about" : "opacity-0"}
            `}
            style={{ fontFamily: "'Milkyway', sans-serif" }}
          >
            About Me
          </h2>
        </motion.div>

        {/* CONTENT LAYOUT */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          {/* LEFT COLUMN: TEXT CONTENT */}
          {/* Added 'text-center' to center the paragraph text as requested */}
          <div className="flex-1 flex flex-col items-center md:items-center text-center max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-xl md:text-2xl text-gray-900 leading-relaxed font-medium mb-8 px-2 sm:px-0 flex flex-col gap-5"
            >
              <p>I spent most of my twenties <span className="font-black text-[#8C52FD]">travelling</span> through South America, Southeast Asia, Australia, and New Zealand, working in hospitality and figuring out what I actually wanted to do with my life. The answer turned out to be <span className="font-black text-[#8C52FD]">tech</span>, which surprised me more than anyone.</p>
              <p>I came to it late, on my own terms, with a <span className="font-black text-[#8C52FD]">BSc in Games Technology</span> from UWE Bristol. Hard for someone who was never a science or maths person, and that's exactly why I'm glad I did it.</p>
              <p>What pulled me toward <span className="font-black text-[#8C52FD]">UX</span> was the psychology of it. Good design is <span className="font-black text-[#8C52FD]">applied empathy</span>: understanding what someone needs, sometimes before they can say it themselves. I design in <span className="font-black text-[#8C52FD]">Figma</span>, build in <span className="font-black text-[#8C52FD]">React</span>, and care about products that are accessible, purposeful, and genuinely useful.</p>
            </motion.div>

            {/* TAGS */}
            <div className="flex items-center justify-center gap-4 font-black text-lg sm:text-xl uppercase tracking-wider text-black px-2 sm:px-0">
              {["WEB", "✨", "MOBILE", "✨", "UX", "✨", "GAMES"].map(
                (tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className={tag === "✨" ? "text-xl sm:text-2xl text-[#FED814]" : ""}
                  >
                    {tag}
                  </motion.span>
                ),
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT IMAGE */}
          <motion.div
            className="flex-shrink-0 md:self-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              y: -6,
              rotate: -2,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <div className="w-[300px] md:w-[350px] h-full max-h-[500px] bg-[#25E995] rounded-[40px] overflow-hidden relative flex items-end justify-center shadow-lg">
              <img
                src="/portrait2.webp"
                alt="Self Portrait"
                className="w-full h-full object-cover drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Keyframes for the title animation */}
    </div>
  );
};

export default SectionWrapper(About, "about");

