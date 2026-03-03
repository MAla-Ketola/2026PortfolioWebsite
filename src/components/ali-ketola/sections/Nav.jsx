import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";
import { SectionHeader } from "../shared/ui";

const clouds = ["/Stickers/2.png", "/Stickers/1.png", "/Stickers/3.png", "/Stickers/4.png", "/Stickers/5.png"];

export default function Nav() {
  const steps = [
    { id: "define",    label: "DEFINE",    emoji: "🧭" },
    { id: "ideate",    label: "IDEATE",    emoji: "💡" },
    { id: "prototype", label: "PROTOTYPE", emoji: "🧪" },
    { id: "implement", label: "IMPLEMENT", emoji: "🛠️" },
    { id: "validate",  label: "VALIDATE",  emoji: "✅" },
  ];

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  return (
    <section id="nav" className="mt-8">
      <SectionHeader label="Steps" title="The Process" />

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-1 md:gap-2"
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((s, i) => (
          <motion.a
            key={s.id}
      href={`#${s.id}`}
      // 2. Add width classes to the child element:
      className="group block w-[31%] lg:w-[19%]"
      variants={fadeIn("up", "spring", i * 0.08, 0.55)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src={clouds[i % clouds.length]}
                alt=""
                className="w-full select-none"
                draggable={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pb-3">
                <span className="text-3xl md:text-4xl leading-none">
                  {s.emoji}
                </span>
                <span
                  className="text-sm font-black uppercase tracking-wider text-black"
                >
                  {s.label}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
