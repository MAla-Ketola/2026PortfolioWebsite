import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { technicalCards } from "../content";

export default function Implement() {
  return (
    <section id="technical" className="mt-12">
      <SectionHeader label="TECHNICAL ARCHITECTURE" title="What was built in the vertical slice" color="#FED814" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Under the hood, Step & Bloom is built on a modular, data-driven architecture designed for flexibility, performance, and clean separation of concerns. Key technical highlights include:
      </p>

      <motion.div
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        {technicalCards.map((card, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-center text-center gap-3 h-full">
                <span className="text-4xl">{card.emoji}</span>
                <h4 className="font-bold text-white text-base">{card.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
