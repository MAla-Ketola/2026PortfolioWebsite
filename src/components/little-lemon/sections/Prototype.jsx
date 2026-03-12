import { motion } from "framer-motion";
import { SectionHeader, Card, CTAButton } from "../shared/ui";
import { wireframeNotes, designDecisions } from "../content";
import heroPicImg from "../../../assets/LittleLemon/HeroPic.png";
import personaImg from "../../../assets/LittleLemon/Persona.png";
import userJourneyImg from "../../../assets/LittleLemon/User Journey.png";
import lofiHome from "../../../assets/LittleLemon/lofi Home.png";
import lofiReserve from "../../../assets/LittleLemon/lofi Reserve Table.png";
import lofiContact from "../../../assets/LittleLemon/lofi Contact Information.png";
import lofiConfirm from "../../../assets/LittleLemon/lofi Confirmation of Booking.png";

const lofiWireframes = [
  { src: lofiHome,    alt: "Lo-fi wireframe — Home" },
  { src: lofiReserve, alt: "Lo-fi wireframe — Reserve Table" },
  { src: lofiContact, alt: "Lo-fi wireframe — Contact Information" },
  { src: lofiConfirm, alt: "Lo-fi wireframe — Confirmation of Booking" },
];

export default function Prototype() {
  return (
    <section id="prototype" className="mt-12">
      <SectionHeader label="PROTOTYPE" title="From Pain Points to Solutions" color="#F087FE" />

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Research and design planning began with identifying target users and mapping their journey to uncover key needs and pain points. The persona and journey map highlighted the importance of a fast, intuitive booking flow with minimal steps. These insights informed the creation of low-fidelity wireframes to explore layout options and user flow. Feedback from early designs guided the high-fidelity prototypes, which incorporated branding, colors, and accessibility considerations to ensure the final product addressed real user priorities.
      </p>

      {/* Wireframe notes */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Persona
      </h3>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className="w-full rounded-[20px] overflow-hidden border border-white/10 shadow-xl">
          <img
            src={personaImg}
            alt="Little Lemon user persona"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </motion.figure>

            <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        A representation of our target user, Emma, outlining her goals, frustrations, and needs. This helped ensure design decisions stayed user-focused throughout the process.
      </p>

      {/*User Journey */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        User Journey
      </h3>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className="w-full rounded-[20px] overflow-hidden border border-white/10 shadow-xl">
          <img
            src={userJourneyImg}
            alt="Little Lemon user journey map"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </motion.figure>

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Low-Fidelity Wireframes
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Early layout explorations to define page structure, booking steps, and navigation without visual styling distractions.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 rounded-[20px] shadow-xl p-6 grid grid-cols-2 gap-4"
        style={{ backgroundColor: "#FED814" }}
      >
        {lofiWireframes.map((frame, i) => (
          <img
            key={i}
            src={frame.src}
            alt={frame.alt}
            className="w-full h-auto object-contain drop-shadow-lg"
            loading="lazy"
          />
        ))}
      </motion.div>

        <h3
        className="text-2xl md:text-4xl font-black text-white mt-24 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        High-Fidelity Wireframes
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Finalized designs with branding, color palette, and typography applied, ready for development.
      </p>

      {/* REMEMBER TO DELETE LATER */}
      {/*<motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        {designDecisions.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full">
              <div className="p-6 flex flex-col gap-3 h-full">
                <span className="text-4xl">{item.emoji}</span>
                <h4 className="font-bold text-white text-base">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>*/}

      {/* View Prototype CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex justify-center"
      >
        <CTAButton
          href="https://www.figma.com/proto/LJY7iPrgGyd7GFbAsJYIdY/Little-Lemon-Website?node-id=9-3&t=zt57Y9kjp1IIJWMj-1&scaling=min-zoom&content-scaling=fixed&page-id=9%3A2&starting-point-node-id=11%3A197"
          target="_blank"
        >
          View Desktop Prototype
        </CTAButton>
      </motion.div>

      {/* Hero image */}
      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
          <img
            src={heroPicImg}
            alt="Little Lemon hi-fi prototype screens"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </motion.figure>
    </section>
  );
}
