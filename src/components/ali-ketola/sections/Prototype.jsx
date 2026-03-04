import React from "react";
import { motion } from "framer-motion";
import { SectionHeader, CTAButton } from "../shared/ui";

import AKsolutionBranding from "../../../assets/ali-ketola/solutions1/1.webp";
import AKsolutionNavigation from "../../../assets/ali-ketola/solutions1/2.webp";
import AKsolutionHierarchy from "../../../assets/ali-ketola/solutions1/3.webp";
import AKsolutionReadability from "../../../assets/ali-ketola/solutions1/4.webp";
import AKsolutionListings from "../../../assets/ali-ketola/solutions1/5.webp";
import AKprototypeShowcase from "../../../assets/ali-ketola/laptop&phone.webp";

const solutions = [
  {
    title: "Solved: Inconsistent branding",
    image: AKsolutionBranding,
  },
  {
    title: "Solved: Cluttered navigation",
    image: AKsolutionNavigation,
  },
  {
    title: "Solved: Poor hierarchy",
    image: AKsolutionHierarchy,
  },
  {
    title: "Solved: Low readability",
    image: AKsolutionReadability,
  },
  {
    title: "Solved: Unstructured listings",
    image: AKsolutionListings,
  },
];

export default function Prototype() {
  return (
    <section id="prototype" className="mt-12">
      <SectionHeader label="PROTOTYPE" title="From Pain Points to Solutions" color="#8C52FD" />

      <div className="flex flex-col mt-10 gap-6">
        {solutions.map((item, i) => (
          <motion.figure
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          >
            <div className="relative w-full overflow-hidden rounded-[20px] shadow-lg min-h-[300px] lg:min-h-0 lg:h-full">
              <img
                src={item.image}
                alt={`${item.title} screenshot`}
                className="h-full w-full object-cover select-none"
                loading="lazy"
              />
            </div>
          </motion.figure>
        ))}
      </div>

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        A Down-to-Earth, Rustic-Inspired Design for Ali-Ketola's Farm
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto mb-10">
        Refining our desktop-first framework, we crafted a welcoming visual narrative that captures Ali‑Ketola’s tranquil farm atmosphere and community spirit. We balanced rustic-inspired wood and linen textures with clean, modern layouts, pairing authentic onsite photography with forest green and warm beige accents. Modular design elements—like well-spaced card grids and clear typographic hierarchy—ensure a comfortable, intuitive browsing experience, highlighting accommodations, services, and calls to action in a cohesive flow.
      </p>

      <h3
        className="text-2xl md:text-4xl font-black text-white mt-16 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        View the hi-fi prototypes
      </h3>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <CTAButton
          href="https://www.figma.com/proto/PFYY1ANxh0vWW3FwS1cKMe/Ali-Ketolan-Tila?node-id=21-133&p=f&t=0xzY7dbBdL4WLR0w-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=21%3A133"
          target="_blank"
          label="View the desktop prototype image"
        >
          View the desktop prototype
        </CTAButton>
        <CTAButton
          href="https://www.figma.com/proto/PFYY1ANxh0vWW3FwS1cKMe/Ali-Ketolan-Tila?node-id=324-527&p=f&t=TUezdpLpYqR25G49-1&scaling=scale-down&content-scaling=fixed&page-id=324%3A526&starting-point-node-id=324%3A527"
          target="_blank"
          label="View the mobile prototype image"
        >
          View the mobile prototype
        </CTAButton>
      </div>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full overflow-hidden rounded-[20px]">
          <img
            src={AKprototypeShowcase}
            alt="Ali-Ketola hi-fi desktop and mobile prototype showcase"
            className="w-full h-auto object-cover select-none"
            loading="lazy"
          />
        </div>
      </motion.figure>
    </section>
  );
}
