import { motion } from "framer-motion";
import { SectionHeader, CTAButton, ShapeBullet } from "../shared/ui";
import { buildPoints } from "../content";
import AKmobileShowcase from "../../../assets/ali-ketola/mobilePhoto.png";
import AKtrainingSnippet from "../../../assets/ali-ketola/Training video GIF.gif";

const buildHighlights = [
  "Translated final mockups into a fully functional Wix site using repeatable strips for services and accommodations, enabling easy content updates across languages.",
  "Configured the global header and footer as site-wide elements to enforce brand consistency.",
  "Integrated the multilingual toggle into the sticky header for seamless language switching.",
  "Enhanced on-page SEO by defining meta titles, descriptions, and image alt text directly within the Wix editor.",
];

const handoffPoints = buildPoints.slice(0);

export default function Implement() {
  return (
    <section id="implement" className="mt-12">
      <SectionHeader label="IMPLEMENT" title="Build & Handoff" color="#FED814" />

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Build
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
        <ul className="space-y-5">
          {buildHighlights.map((point, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4"
            >
              <ShapeBullet type="heart" color="#FED814" className="mt-2" />
              <p className="text-lg text-gray-400 leading-relaxed">{point}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <CTAButton
          href="https://en.ali-ketolantila.fi/"
          target="_blank"
          label="View live Ali-Ketola website"
        >
          View live website
        </CTAButton>
      </div>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full overflow-hidden rounded-[20px] shadow-lg">
          <img
            src={AKmobileShowcase}
            alt="Ali-Ketola mobile website screens"
            className="w-full h-auto object-cover select-none"
            loading="lazy"
          />
        </div>
      </motion.figure>

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Handoff & Training
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
        <ul className="space-y-5">
          {handoffPoints.map((point, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4"
            >
              <ShapeBullet type="heart" color="#FED814" className="mt-2" />
              <p className="text-lg text-gray-400 leading-relaxed">{point}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full overflow-hidden rounded-[20px] shadow-lg">
          <img
            src={AKtrainingSnippet}
            alt="Snippet of the client training video in the Wix editor"
            className="w-full h-auto object-cover select-none"
            loading="lazy"
          />
        </div>
        <figcaption className="mt-3 text-center text-base text-white/80">
          Snippet of a training video for the client
        </figcaption>
      </motion.figure>
    </section>
  );
}
