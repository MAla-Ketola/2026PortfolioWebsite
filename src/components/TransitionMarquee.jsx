import React from "react";
import { motion } from "framer-motion";

const MarqueeItem = ({ text }) => (
  <span className="mx-4 text-black font-black text-4xl md:text-6xl uppercase italic tracking-tighter">
    {text} •
  </span>
);

const TransitionMarquee = () => {
  return (
    <div className="relative w-full py-10 bg-black overflow-hidden z-20">
      {/* Rotated Container */}
      <div className="absolute inset-0 flex items-center justify-center transform -rotate-2 scale-110">
        <div className="relative w-full bg-[#ebff36] border-y-4 border-white py-3 shadow-[0_0_30px_rgba(235,255,54,0.3)]">
          
          {/* Infinite Scroll Track */}
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <MarqueeItem text="Selected Works" />
                <MarqueeItem text="Featured Projects" />
                <MarqueeItem text="Creative Dev" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransitionMarquee;