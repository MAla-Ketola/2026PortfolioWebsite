import { motion } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { designSteps, wireframeNotes, userTesting } from "../content";
import lofiImg from "../../../assets/Happy Tracker/lofi-wireframe.webp";
import hifiImg from "../../../assets/Happy Tracker/hifi-wireframe.png";
import prototypeImg from "../../../assets/Happy Tracker/prototype.webp";
import problem1Img from "../../../assets/Happy Tracker/Problems/7.webp";
import problem2Img from "../../../assets/Happy Tracker/Problems/8.webp";
import problem3Img from "../../../assets/Happy Tracker/Problems/9.webp";

export default function DesignProcess() {
  return (
    <section id="design-process" className="mt-12">
      <SectionHeader
        label="DESIGN PROCESS"
        title="Mid-fidelity Wireframes"
        color="#F087FE"
      />

      <p className="mt-8 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Detailed grayscale screens showing core flows (Home calendar, Habit
        Detail, Create Habit), with realistic spacing and annotations.
      </p>

      <ul className="mt-6 max-w-2xl mx-auto flex flex-col gap-4">
        {wireframeNotes.map((note, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex-shrink-0 text-base leading-none"
              style={{ color: "#FED814" }}
            >
              ★
            </span>
            <p className="text-base text-gray-400 leading-relaxed">{note}</p>
          </li>
        ))}
      </ul>

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
            src={lofiImg}
            alt="Low-fidelity wireframe"
            className="w-full p-4"
          />
        </div>
      </motion.div>

      {/* High-fid wireframes */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-8 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        High-fidelity wireframes
      </h3>

      {/* Design step cards */}
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
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col gap-3 h-full">
                <span className="text-4xl">{step.emoji}</span>
                <h4 className="font-bold text-white text-base">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

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
            src={hifiImg}
            alt="High-fidelity wireframe"
            className="w-full p-4"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={prototypeImg}
            alt="High-fidelity wireframe"
            className="w-full p-4"
          />
        </div>
      </motion.div>

      {/* Placeholder for wireframes / mockups / research artifacts */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Prototype & User Testing
      </h3>

      <ul className="mt-6 max-w-2xl mx-auto flex flex-col gap-4">
        {userTesting.map((note, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex-shrink-0 text-base leading-none"
              style={{ color: "#F844C2" }}
            >
              ★
            </span>
            <p className="text-base text-gray-400 leading-relaxed">
              <strong className="text-white">{note.prefix}</strong>
              {note.text}
            </p>
          </li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={problem1Img}
            alt="Problem 1 user testing artifact"
            className="w-full p-4"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={problem2Img}
            alt="Problem 2 user testing artifact"
            className="w-full p-4"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={problem3Img}
            alt="Problem 3 user testing artifact"
            className="w-full p-4"
          />
        </div>
      </motion.div>
    </section>
  );
}
