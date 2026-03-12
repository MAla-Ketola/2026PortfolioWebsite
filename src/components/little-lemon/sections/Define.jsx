import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { objectives, goals } from "../content";


export default function Define() {
  return (
    <section id="define" className="mt-12">
      <SectionHeader label="DEFINE" title="The Problem" color="#25E995" />

{/* Context */}
                <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Context
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        💡Little Lemon, a popular restaurant, lacked an online reservation system. Customers had to call or visit in person to book a table — an inconvenient, time-consuming process that risked losing customers to competitors offering a smoother digital experience.
      </p>

               <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Objectives
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Design and develop a “Reserve a Table” feature that allows customers to:
      </p>

      {/* Objectives Cards */}
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
        {objectives.map((text, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Card className="h-full">
              <div className="p-5 min-h-[140px] flex flex-col">
                <span className="text-2xl mb-4 self-start flex-shrink-0">🎯</span>
                <p className="text-base md:text-lg text-white/90 leading-relaxed flex-1 flex items-center">
                  {text}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Goals */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Goals
      </h3>

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {goals.map((user, i) => (
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

      {/* Approach */}
                <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Approach
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        <strong className="text-[#25E995]">The solution was researched, wireframed, and prototyped in Figma</strong>, incorporating best UX/UI practices before being implemented in React.
      </p>
    </section>
  );
}
