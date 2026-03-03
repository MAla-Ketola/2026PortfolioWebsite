import { useState, useEffect } from "react";
import HappyTracker from "../components/happy-tracker/HappyTracker";
import Footer from "../components/Footer";

const sections = [
  { id: "define",         label: "DEFINE",         color: "#25E995" },
  { id: "design-process", label: "DESIGN",         color: "#F087FE" },
  { id: "implement",      label: "IMPLEMENT",      color: "#FED814" },
  { id: "results",        label: "RESULTS & REFLECTIONS",        color: "#01D6FB" },
];

function CaseStudyProgress() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav
      aria-label="Case study sections"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-end"
    >
      {sections.map(({ id, label, color }) => {
        const isActive = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center gap-2">
            <span
              className="text-[10px] font-black uppercase tracking-widest transition-[opacity,transform] duration-200 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: isActive ? color : "#6b7280" }}
            >
              {label}
            </span>
            <span
              className="flex-shrink-0 rounded-full transition-all duration-300"
              style={{
                width:  isActive ? 11 : 7,
                height: isActive ? 11 : 7,
                backgroundColor: isActive ? color : "#374151",
                boxShadow: isActive ? `0 0 8px ${color}99` : "none",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}

export default function HappyTrackerPage() {
  return (
    <>
      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 bg-black">
        <CaseStudyProgress />
        <HappyTracker />
      </main>
      <Footer />
    </>
  );
}
