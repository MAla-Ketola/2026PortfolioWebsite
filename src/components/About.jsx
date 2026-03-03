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
          viewport={{ once: true, amount: 0.2 }}
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-xl md:text-2xl text-gray-900 leading-relaxed font-medium mb-8">
              I started in hospitality and graduated in Games Technology. Now I’m focused on my own projects—exploring UX, AI, and game-inspired interactions—with the aim of stepping into a junior software developer role.
              <br /><br />
              Tools I’m using: <strong>React</strong>, <strong>Three.js</strong>, <strong>JavaScript</strong> plus <strong>C#/C++</strong> from my Games Tech degree.
            </motion.p>

            {/* TAGS */}
            <div className="flex items-center justify-center gap-4 font-black text-xl uppercase tracking-wider text-black">
              {["WEB", "✨", "MOBILE", "✨", "UX"].map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className={tag === "✨" ? "text-2xl text-[#FED814]" : ""}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT IMAGE */}
          <div className="flex-shrink-0">
            {/* Light Purple Container (#F087FE) */}
            <div className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] bg-[#25E995] rounded-[40px] overflow-hidden relative flex items-end justify-center shadow-lg">
              <img 
                src="/portrait2.png" 
                alt="Self Portrait" 
                className="w-full h-full object-cover drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
      
      {/* Keyframes for the title animation */}
      <style>{`
        @keyframes fillFade {
          0% { color: transparent; text-shadow: 0px 0px 0 transparent; opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          50% { color: transparent; text-shadow: 0px 0px 0 transparent; }
          100% { color: #000000; text-shadow: 4px 4px 0 #F087FE; opacity: 1; transform: translateY(0); }
        }
        .animate-hero-fill-fade-about {
          color: transparent;
          -webkit-text-stroke: 2px #000000;
          animation: fillFade 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(About, "about");
