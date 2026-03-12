import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";
import { SectionHeader } from "../shared/ui";

const clouds = ["/Stickers/2.png", "/Stickers/1.png", "/Stickers/3.png", "/Stickers/4.png", "/Stickers/5.png"];

const SECTION_ORDER = ["define", "ideate", "prototype", "implement", "validate"];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const idx = SECTION_ORDER.indexOf(id);
  const unloaded = SECTION_ORDER.slice(0, idx).flatMap((sid) => {
    const sec = document.getElementById(sid);
    return sec
      ? Array.from(sec.querySelectorAll("img")).filter((img) => !img.complete)
      : [];
  });

  const doScroll = () => el.scrollIntoView({ behavior: "smooth", block: "start" });

  if (unloaded.length === 0) {
    doScroll();
    return;
  }

  Promise.all(
    unloaded.map(
      (img) =>
        new Promise((resolve) => {
          const loader = new Image();
          loader.onload = resolve;
          loader.onerror = resolve;
          loader.src = img.src;
          img.addEventListener("load", resolve, { once: true });
          setTimeout(resolve, 2000);
        })
    )
  ).then(doScroll);
}

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
            onClick={(e) => { e.preventDefault(); scrollToSection(s.id); }}
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
                  className="text-[10px] md:text-sm font-black uppercase tracking-wider text-black"
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
