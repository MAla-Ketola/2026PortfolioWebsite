import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { lessonsProcess, lessonsProduct } from "../content";

const allLessons = [
  { heading: "What I'd do differently", subtitle: "Process & design", color: "#01D6FB", items: lessonsProcess },
  { heading: "What I learned", subtitle: "Product & ethics", color: "#F087FE", items: lessonsProduct },
];

export default function ResultsReflections() {
  return (
    <section id="lessons" className="mt-12">
      <SectionHeader label="LESSONS LEARNED" title="Key Takeaways" color="#01D6FB" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Reflecting on Step &amp; Bloom, I identified key takeaways to guide future projects:
      </p>

      {allLessons.map((group) => (
        <div key={group.heading} className="mt-14">
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center"
            style={{ fontFamily: "'Milkyway', sans-serif", color: group.color }}
          >
            {group.heading}
          </h3>

          <motion.div
            className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
          >
            {group.items.map((item, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              >
                <Card className="h-full">
                  <div className="p-6 flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">💡</span>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
