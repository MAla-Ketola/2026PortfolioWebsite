import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { problems, targetUsers, competitiveHighlights, insights } from "../content";
import screenVideo from "../../../assets/step&bloom/Screen video.mp4";


export default function Define() {
  return (
    <section id="project-summary" className="mt-12">
      <SectionHeader label="PROJECT SUMMARY" title="Gameplay Mechanics" color="#25E995" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Step & Bloom is a vertical slice of a gamified step-tracker app built in Unity that leverages real-world walking to drive in-game progress: each step the player takes acts as a water source for planting and growing virtual flowers. The app uses proven game elements to motivate physical activity by:
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
        {problems.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <span className="text-5xl">{item.emoji}</span>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  <strong className="text-white">{item.title}</strong>{" "}{item.desc}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

            <p className="mt-10 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        This data-driven design gives users real-time feedback and goal-setting mechanics—flowers visibly bloom, pop-up celebrations punctuate progress, and an engaging reward loop keeps users coming back for more.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl flex justify-center">
          <video
            src={screenVideo}
            autoPlay
            loop
            muted
            playsInline
            className="max-h-[600px] object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
}
