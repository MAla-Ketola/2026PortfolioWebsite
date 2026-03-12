import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader, ShapeBullet } from "../shared/ui";
import { implementHighlights } from "../content";
import demoVideo from "../../../assets/LittleLemon/demovideo.mp4";

export default function Implement() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, []);

  return (
    <section id="implement" className="mt-12">
      <SectionHeader label="IMPLEMENT" title="From Design to Code" color="#FED814" />

      <motion.div
        className="mt-8 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
        }}
      >
        <ul className="space-y-5">
          {implementHighlights.map((point, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4"
            >
              <ShapeBullet type="heart" color="#FED814" className="mt-2" />
              <p className="text-lg text-gray-400 leading-relaxed">{point}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-[20px] overflow-hidden shadow-xl"
      >
        <video
          ref={videoRef}
          src={demoVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
      </motion.div>

    </section>
  );
}
