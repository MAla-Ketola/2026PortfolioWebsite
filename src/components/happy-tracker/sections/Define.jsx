import { motion } from "framer-motion";
import { SectionHeader, Card, ShapeBullet } from "../shared/ui";
import { problems, targetUsers, competitiveHighlights, insights } from "../content";
import habiticaImg from "../../../assets/Happy Tracker/Habitica.webp";
import productiveImg from "../../../assets/Happy Tracker/Productive.webp";

const palette = [
  "#25E995",
  "#F087FE",
  "#8C52FD",
  "#FED814",
  "#01D6FB",
  "#F844C2",
];

export default function Define() {
  return (
    <section id="define" className="mt-12">
      <SectionHeader label="DEFINE" title="The Problem" color="#25E995" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Many existing habit-tracking apps require lengthy onboarding and lack
        personalization, causing users to abandon them before forming lasting
        habits. Happy Tracker addresses this by enabling:
      </p>

      {/* Problem Cards */}
      <motion.div
        className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {problems.map((text, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Card className="h-full">
              <div className="p-5 min-h-[140px] flex flex-col">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-black mb-4 self-start flex-shrink-0"
                  style={{ backgroundColor: palette[i % palette.length] }}
                >
                  {i + 1}
                </span>
                <p className="text-base md:text-lg text-white/90 leading-relaxed flex-1 flex items-center">
                  {text}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* target users */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Target users are:
      </h3>

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {targetUsers.map((user, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-start gap-3">
                <span className="text-4xl">{user.emoji}</span>
                <p className="font-bold text-white text-base">{user.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        ...seeking for a{" "}
        <strong className="text-[#25E995]">low friction</strong> habit tracker.
      </p>

      {/* competitive audit */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Competitive Audit Highlights
      </h3>

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {competitiveHighlights.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-start gap-3">
                <span className="text-4xl">{item.emoji}</span>
                <p className="text-base text-white/90 leading-relaxed">{item.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Competitor screenshots */}
      <motion.div
        className="mt-10 grid grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          { src: habiticaImg,   label: "Habitica" },
          { src: productiveImg, label: "Productive" },
        ].map(({ src, label }) => (
          <motion.figure
            key={label}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-full rounded-[20px] overflow-hidden border border-white/10 shadow-xl">
              <img src={src} alt={label} className="w-full h-full object-cover" />
            </div>
            <figcaption className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              {label}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="flex justify-center mt-12"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="16" y1="0" x2="16" y2="36" stroke="#FED814" strokeWidth="2.5" strokeLinecap="round"/>
          <polyline points="6,26 16,40 26,26" stroke="#FED814" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </motion.div>

      {/* Insights */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-8 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Insights:
      </h3>

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {insights.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-start gap-3">
                <span className="text-4xl">{item.emoji}</span>
                <p className="text-base text-white/90 leading-relaxed">
                  {item.label.split(item.bold).map((part, j, arr) =>
                    j < arr.length - 1
                      ? <span key={j}>{part}<strong className="text-white">{item.bold}</strong></span>
                      : <span key={j}>{part}</span>
                  )}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
