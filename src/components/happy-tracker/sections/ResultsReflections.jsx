import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { gapsVsResearch, tradeoffs, nextSteps } from "../content";

function BulletList({ items, color, renderItem }) {
  return (
    <ul className="mt-6 max-w-2xl mx-auto flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 text-xl leading-none" style={{ color }}>★</span>
          <p className="text-base text-gray-400 leading-relaxed">{renderItem(item)}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Results() {
  return (
    <section id="results" className="mt-12">
      <SectionHeader label="RESULTS & REFLECTIONS" title="Gaps vs. research" color="#01D6FB" />

      <BulletList
        items={gapsVsResearch}
        color="#01D6FB"
        renderItem={(parts) =>
          parts.map((p, j) =>
            p.bold ? (
              <strong key={j} className="text-white">
                {p.text}
              </strong>
            ) : (
              <span key={j}>{p.text}</span>
            )
          )
        }
      />

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Trade-offs &amp; rationale
      </h3>

      <BulletList items={tradeoffs} color="#25E995" renderItem={(text) => text} />

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Next steps
      </h3>

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        {nextSteps.map((step, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col gap-3 h-full">
                <span className="text-4xl">{step.emoji}</span>
                <h4 className="font-bold text-white text-base">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
