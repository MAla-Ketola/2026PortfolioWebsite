import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { designSteps, wireframeNotes, userTesting } from "../content";
import cardPhotos from "../../../assets/step&bloom/Card photos.png";

export default function DesignProcess() {
  return (
    <section id="ux-design" className="mt-12">
      <SectionHeader
        label="UX & INTERFACE DESIGN"
        title="Visual Design"
        color="#F087FE"
      />

      <p className="mt-8 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        To make the app both intuitive and engaging, I applied established UX principles throughout every screen and interaction:
      </p>

      <motion.div
        className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        {designSteps.map((step, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-center text-center gap-3 h-full">
                <span className="text-4xl">{step.emoji}</span>
                <h4 className="font-bold text-white text-base">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Card photos image */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div
          className="w-full rounded-[20px] overflow-hidden shadow-xl"
          style={{ backgroundColor: "#FED814" }}
        >
          <img
            src={cardPhotos}
            alt="Step & Bloom design cards"
            className="w-full p-4"
          />
        </div>
      </motion.div>
    </section>
  );
}
