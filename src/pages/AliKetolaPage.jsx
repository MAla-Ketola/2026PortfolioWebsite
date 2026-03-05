import { useState, useEffect } from "react";
import AliKetola from "../components/ali-ketola/AliKetola";
import Footer from "../components/Footer";

const sections = [
  { id: "overview",  label: "OVERVIEW",  color: "#FFFFFF" },
  { id: "define",    label: "DEFINE",    color: "#25E995" },
  { id: "ideate",    label: "IDEATE",    color: "#F087FE" },
  { id: "prototype", label: "PROTOTYPE", color: "#8C52FD" },
  { id: "implement", label: "IMPLEMENT", color: "#FED814" },
  { id: "validate",  label: "VALIDATE",  color: "#01D6FB" },
];

const SECTION_ORDER = sections.map((s) => s.id);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const idx = SECTION_ORDER.indexOf(id);
  const unloaded = SECTION_ORDER.slice(0, idx).flatMap((sid) => {
    const sec = document.getElementById(sid);
    return sec
      ? Array.from(sec.querySelectorAll("img")).filter((img) => !img.complete)
      : [];
  });

  const doScroll = () => el.scrollIntoView({ behavior: "instant", block: "start" });

  if (unloaded.length === 0) {
    doScroll();
    return;
  }

  Promise.all(
    unloaded.map(
      (img) =>
        new Promise((resolve) => {
          const loader = new Image();
          loader.onload = resolve;
          loader.onerror = resolve;
          loader.src = img.src;
          img.addEventListener("load", resolve, { once: true });
          setTimeout(resolve, 2000);
        })
    )
  ).then(doScroll);
}

function CaseStudyProgress() {
  const [active, setActive] = useState(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("app-scroll");
    if (!container) return;

    const getActive = () => {
      const center = container.getBoundingClientRect().top + container.clientHeight * 0.4;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= center) current = id;
      }
      return current;
    };

    const onScroll = () => {
      setActive(getActive());
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const activeColor = sections.find((s) => s.id === active)?.color ?? "#FFFFFF";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] border-t border-white/[0.1]">
      {/* Progress bar */}
      <div className="h-[2px] bg-white/10 relative">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%`, backgroundColor: activeColor }}
        />
      </div>

      {/* Desktop: always-visible horizontal sections */}
      <div className="hidden lg:flex items-center px-6">
        {sections.map(({ id, label, color }, i) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex items-center px-4 py-4"
            >
              <span
                className="text-[10px] font-black uppercase tracking-widest transition-colors duration-200"
                style={{ color: isActive ? color : "rgba(255,255,255,0.35)" }}
              >
                {i === 0 ? label : `0${i} / ${label}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile/tablet: collapsible drawer */}
      <div className="lg:hidden">
        {/* Expandable section list */}
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${sections.length * 52 + 8}px` : 0 }}
        >
          {sections.map(({ id, label, color }, i) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => { scrollToSection(id); setIsOpen(false); }}
                className="w-full flex items-center px-6 py-3 border-b border-white/[0.06] text-left"
              >
                <span
                  className="text-[11px] font-black uppercase tracking-widest"
                  style={{ color: isActive ? color : "rgba(255,255,255,0.55)" }}
                >
                  {i === 0 ? label : `0${i} / ${label}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toggle bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-4"
        >
          <span className="text-[11px] font-black uppercase tracking-widest text-white/80">
            Jump to Section
          </span>
          <svg
            className="w-4 h-4 text-white/60 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AliKetolaPage() {
  return (
    <>
      <main id="overview" className="relative z-10 pt-6 pb-24 lg:pb-16 px-4 sm:px-6 bg-black">
        <CaseStudyProgress />
        <AliKetola />
      </main>
      <div className="pb-14">
        <Footer />
      </div>
    </>
  );
}
