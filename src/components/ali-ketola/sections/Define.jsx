import { SectionHeader, Card } from "../shared/ui";
import { problems, goals, goalsParagraph, competitors, interview } from "../content";
import { motion } from "framer-motion";

import {
  AKproblem1,
  AKproblem2,
  AKproblem3,
  AKproblem4,
  AKproblem5,
  AKproblem6,
  heroGreenEscape,
  heroAhlstrom,
  heroKauttua,
} from "../../../assets";

const competitorImages = [heroGreenEscape, heroAhlstrom, heroKauttua];

const palette = [
  "#25E995",
  "#F087FE",
  "#8C52FD",
  "#FED814",
  "#01D6FB",
  "#F844C2",
];

const akProblemShots = [
  { src: AKproblem1, alt: "AK problem 01" },
  { src: AKproblem2, alt: "AK problem 02" },
  { src: AKproblem3, alt: "AK problem 03" },
  { src: AKproblem4, alt: "AK problem 04" },
  { src: AKproblem5, alt: "AK problem 05" },
  { src: AKproblem6, alt: "AK problem 06" },
];

const goalItems = goals.map((title, i) => ({
  title,
  desc: (goalsParagraph && goalsParagraph[i]) || "",
}));

export default function Define() {
  return (
    <section id="define" className="mt-12">
      <SectionHeader label="DEFINE" title="The Problem & Goals" color="#25E995" />

      {/* Subsection: The Problem */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        The Problem
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        The previous Ali-Ketolan Tila website suffered from an outdated design
        and an unwieldy layout that undercut the farm's potential to engage
        visitors:
      </p>

      {/* Problem Cards */}
      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
              <div className="p-5 min-h-[160px] flex flex-col">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-black mb-4 self-start flex-shrink-0"
                  style={{ backgroundColor: palette[i % palette.length] }}
                >
                  {i + 1}
                </span>
                <p className="text-base md:text-lg text-white/90 leading-relaxed text-center flex-1 flex items-center justify-center">
                  {text}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-12 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Let's zoom in on the details:
      </p>

      {/* Problem screenshots */}
      <div className="flex flex-col mt-10 gap-6">
        {akProblemShots.map((img, i) => (
          <motion.figure
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            key={`ak-${i}`}
          >
            <div className="relative w-full overflow-hidden rounded-[20px] shadow-lg min-h-[300px] lg:min-h-0 lg:h-full">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover select-none"
                loading="lazy"
              />
            </div>
          </motion.figure>
        ))}
      </div>

      {/* Subsection: Goals */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Goals
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        To address these issues, we set out{" "}
        <strong className="text-[#F087FE]"> six key goals</strong>:
      </p>

      {/* Goal Rows */}
      <motion.div
        className="mt-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        <Card>
          {goalItems.map((item, i, arr) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className={`flex gap-4 p-5 md:p-6 ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-black flex-shrink-0 mt-0.5"
                style={{ backgroundColor: palette[i % palette.length] }}
              >
                {i + 1}
              </span>
              <div className="flex-1 md:grid md:grid-cols-[5fr_8fr] md:gap-8">
                <h4 className="font-bold text-white text-base leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1 md:mt-0 text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>

      {/* Competitive Landscape */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Competitive Landscape
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
       <strong className="text-[#F087FE]">We benchmarked three similar hospitality venues</strong> {" "}to surface best practices and differentiation opportunities:
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((c, i) => (
          <div
            key={i}
            className="bg-[#111] rounded-[20px] border border-white/10 overflow-hidden"
          >
            <div className="w-full h-40 overflow-hidden">
              <img
                src={competitorImages[i]}
                alt={`${c.name} website`}
                className="w-full h-full object-cover"
                style={{ objectPosition: c.imgPosition || "top" }}
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="text-base font-bold text-white">{c.name}</div>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {c.notes}
              </p>
              {c.takeaway && (
                <div className="mt-4 border-l-2 border-[#FED814] pl-3 flex items-start gap-2">
                  <span className="text-base leading-none mt-0.5">🔍</span>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="font-bold text-white">Key takeaway:</span> {c.takeaway}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Client Interview Highlights */}
      <div className="mt-16 bg-[#111] rounded-[20px] border border-white/10 p-8 md:p-12 relative overflow-hidden">
        <h4 className="relative z-10 text-center font-bold text-white text-xl mb-8">
          Client interview highlights
        </h4>
        <span
          className="absolute z-0 top-3 left-3 md:top-6 md:left-6 text-5xl md:text-7xl font-black leading-none select-none pointer-events-none"
          style={{ color: "#FED814", opacity: 0.70 }}
        >
          "
        </span>
        <span
          className="absolute z-0 bottom-1 right-3 md:bottom-4 md:right-6 text-5xl md:text-7xl font-black leading-none select-none pointer-events-none"
          style={{ color: "#FED814", opacity: 0.70 }}
        >
          "
        </span>
        <div className="relative z-10 space-y-6">
          {interview.map((quote, i) => (
            <p
              key={i}
              className="text-center text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {quote}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
