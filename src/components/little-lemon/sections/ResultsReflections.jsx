import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { tradeoffs, nextSteps, keyFeatures } from "../content";
import mobileImg from "../../../assets/LittleLemon/Mobile.png";

function BulletList({ items, color, renderItem }) {
  return (
    <ul className="mt-6 max-w-2xl mx-auto flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 text-xl leading-none" style={{ color }}>&#9733;</span>
          <p className="text-base text-gray-400 leading-relaxed">{renderItem(item)}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ResultsReflections() {
  return (
    <section id="results" className="mt-12">
      <SectionHeader label="RESULTS & REFLECTIONS" title="Outcomes" color="#01D6FB" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        &#x2705; Delivered a fully functional, responsive booking system that mimics real-world restaurant reservation flows.
      </p>

      {/* Key Features Implemented */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Key Features Implemented
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
        {keyFeatures.map((feature, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col gap-3 h-full">
                <span className="text-4xl">{feature.emoji}</span>
                <p className="text-base text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Reflections */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Reflections
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        &#x1F50D; This project strengthened my skills in React state management, API integration, and form validation. If revisiting, I&apos;d expand the &quot;View My Bookings&quot; feature into a secure dashboard with authentication, and explore adding analytics for usage tracking.
      </p>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={mobileImg}
            alt="Little Lemon mobile screens"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </motion.figure>
    </section>
  );
}
