import { motion } from "framer-motion";
import { CTAButton } from "../shared/ui";
import { meta } from "../content";
import heroGif from "../../../assets/Happy Tracker/Hero GIF.gif";

export default function Hero() {
  const roleParts = Array.isArray(meta.role)
    ? meta.role
    : `${meta.role}`.split(/[;•·|]/).map((s) => s.trim()).filter(Boolean);

  const tools = Array.isArray(meta.tools)
    ? meta.tools
    : `${meta.tools}`.split(/[;,]/).map((s) => s.trim()).filter(Boolean);

  return (
    <>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center px-4"
      >
        <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest mb-4">
          Case Study
        </p>
        <h1
          className="font-black text-white text-5xl md:text-8xl uppercase tracking-tighter leading-[0.9]"
          style={{ fontFamily: "'Milkyway', sans-serif", textShadow: "4px 4px 0 #01D6FB" }}
        >
          Happy Tracker
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
        >
          Happy Tracker is a mobile habit‑building app that helps users create and maintain daily routines through custom reminders, streak tracking, and visual progress charts.
        </motion.p>
      </motion.div>

      {/* Image + Meta side by side */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:items-stretch">

        {/* Left: Hero image placeholder */}
        <motion.figure
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-full h-[280px] md:h-full min-h-[400px] rounded-[20px] md:rounded-[32px] shadow-2xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "#01D6FB" }}
          >
            <img
              src={heroGif}
              alt="Happy Tracker app demo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.figure>

        {/* Right: Spec list card */}
        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="bg-[#111] rounded-[20px] border border-white/10 overflow-hidden flex-1"
          >
            {[
              { label: "Project", value: meta.project,        color: "#01D6FB" },
              { label: "Role",    value: roleParts.join(" / "), color: "#8C52FD" },
              { label: "Industry",value: meta.industry,       color: "#25E995" },
              { label: "Tools",   value: tools.join(", "),    color: "#FED814" },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`flex flex-col gap-1 px-6 py-5 ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
                <p className="text-white text-base leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
