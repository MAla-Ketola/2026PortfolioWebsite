import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader, Card } from "../shared/ui";
import { feedback, analyticsCards, wentWellText, opportunitiesText, lessonsFull } from "../content";
import analytics1 from "../../../assets/ali-ketola/analytics1.webp";
import analytics2 from "../../../assets/ali-ketola/analytics2.webp";
import analytics3 from "../../../assets/ali-ketola/analytics3.webp";
import analytics4 from "../../../assets/ali-ketola/analytics4.webp";

function CountUpStat({ stat, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(() => stat.replace(/\d+/g, "0"));

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const startTime = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const rangeMatch = stat.match(/^(\d+)\s*[–—-]\s*(\d+)$/);
    const numMatch = stat.match(/^(\d+)(.*)$/);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const e = ease(progress);
      if (rangeMatch) {
        setDisplayed(`${Math.round(parseInt(rangeMatch[1]) * e)}–${Math.round(parseInt(rangeMatch[2]) * e)}`);
      } else if (numMatch) {
        setDisplayed(`${Math.round(parseInt(numMatch[1]) * e)}${numMatch[2]}`);
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, stat]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-black tracking-tight leading-none"
      style={{ fontFamily: "'Milkyway', sans-serif", color }}
    >
      {displayed}
    </span>
  );
}

const analyticsImages = [
  { src: analytics1, label: "Traffic Overview" },
  { src: analytics2, label: "Sessions by device" },
  { src: analytics3, label: "Behavior Overview" },
  { src: analytics4, label: "Top navigation flows" },
];

function AnalyticsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-10 rounded-[20px] overflow-hidden shadow-xl p-6"
      style={{ backgroundColor: "#F087FE" }}
    >
      <div className="grid grid-cols-2 gap-3">
        {analyticsImages.map((img) => (
          <div key={img.label} className="rounded-xl overflow-hidden">
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-auto object-cover select-none"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}


export default function Validate() {
  return (
    <section id="validate" className="mt-12">
      <SectionHeader label="VALIDATE" title="Outcomes & Reflections" color="#01D6FB" />

      <p className="mt-8 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Post-launch, we gathered both quantitative data and direct user feedback to optimize the experience:
      </p>

      {/* Analytics insight cards 2×2 */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        {analyticsCards.map((card, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="flex items-baseline gap-3 mb-4">
                <CountUpStat stat={card.stat} color={card.color} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: card.color }}>
                  {card.note}
                </span>
              </div>
              <h4 className="font-bold text-white text-base mb-2">{card.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics screenshots grid */}
      <AnalyticsGrid />

      {/* Client feedback highlights */}
      <div className="mt-16 bg-[#111] rounded-[20px] border border-white/10 p-8 md:p-12 relative overflow-hidden">
        <h4 className="relative z-10 text-center font-bold text-white text-xl mb-8">
          Client feedback highlights
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
          {feedback.map((quote, i) => (
            <p
              key={i}
              className="text-center text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {quote}
            </p>
          ))}
        </div>
      </div>

      {/* Reflections & Next Steps */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Reflections & Next Steps
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Looking back, the project delivered on its goals but also revealed opportunities for continuous improvement:
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-full">
          <div className="text-3xl mb-4" style={{ color: "#25E995" }}>✓</div>
          <h4 className="font-bold text-white text-lg mb-3">What Went Well</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{wentWellText}</p>
        </Card>
        <Card className="h-full">
          <div className="text-3xl mb-4">🕐</div>
          <h4 className="font-bold text-white text-lg mb-3">Future Opportunities</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{opportunitiesText}</p>
        </Card>
      </div>

      {/* What I Learned */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        What I Learned
      </h3>

      <motion.div
        className="mt-8 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
        }}
      >
        <ul className="space-y-6">
          {lessonsFull.map((lesson, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4"
            >
              <span className="text-2xl flex-shrink-0">💡</span>
              <p className="text-lg text-gray-400 leading-relaxed">{lesson}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
