import { motion } from "framer-motion";
import { SectionHeader, ShapeBullet } from "../shared/ui";
import fix1Img from "../../../assets/Happy Tracker/Fixes/10.webp";
import fix2Img from "../../../assets/Happy Tracker/Fixes/11.webp";

const implementationHighlights = [
  "Built the core loop for a vertical slice: create habit, mark completion, edit details, and delete.",
  "Prioritized clarity over feature breadth to validate interaction quality before expanding scope.",
  "Captured usability feedback and shipped two focused fixes from early moderated testing.",
];

export default function Implement() {
  return (
    <section id="implement" className="mt-12">
      <SectionHeader label="IMPLEMENT" title="What was built in the vertical slice" color="#FED814" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        <span className="font-bold text-white">Scope & constraints: </span>
        vertical slice focused on the core loop (create -&gt; check -&gt; edit/delete).
      </p>

      <ul className="mt-8 max-w-3xl mx-auto space-y-4">
        {implementationHighlights.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <ShapeBullet type="heart" color="#FED814" className="mt-1" />
            <p className="text-base text-gray-400 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={fix1Img}
            alt="Fix 1 user testing artifact"
            className="w-full p-4"
            loading="lazy"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={fix2Img}
            alt="Fix 2 user testing artifact"
            className="w-full p-4"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
