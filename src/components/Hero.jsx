import React, { useRef, useState, useEffect, useId } from "react";
import { SectionWrapper } from "../hoc";

/* -------------------------------------------
   UI Helper Components (Unchanged)
------------------------------------------- */
const OffsetButton = ({ href, onClick, children, variant = "primary" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-block font-bold text-lg cursor-pointer pointer-events-auto rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <span className="absolute inset-0 rounded-[16px] border-2 border-white bg-transparent translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0 opacity-40" />
      <span
        className={[
          "relative block rounded-[16px] border-2 border-white px-8 py-3 transition-transform duration-200 ease-out",
          "group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-1.5 group-active:translate-y-1.5",
          variant === "primary"
            ? "bg-white text-black"
            : "bg-transparent text-white hover:bg-white/10",
        ].join(" ")}
      >
        {children}
      </span>
    </a>
  );
};

const ScrollFlowerIndicator = ({ onClick }) => {
  const pathId = useId().replace(/:/g, "");
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to About section"
      className="group relative h-28 w-28 md:h-32 md:w-32 rounded-full cursor-pointer pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <style>{`
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .scrollRing { animation: spinRing 10s linear infinite; transform-origin: 50% 50%; opacity: 0.9; }
        .group:hover .scrollRing { animation-duration: 6s; opacity: 1; }
      `}</style>

      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          id={pathId}
          d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          fill="none"
        />
        <text className="fill-white/80 font-mono text-[9px] tracking-[0.28em] uppercase scrollRing">
          <textPath href={`#${pathId}`} startOffset="0%">
            scroll down • scroll down • scroll down •{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
      </div>
    </button>
  );
};

/* -------------------------------------------
   Main Hero
------------------------------------------- */
const Hero = () => {
  const heroRef = useRef(null);
  const [scrollFade, setScrollFade] = useState(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const fadeDistance = heroHeight * 0.6;
      const progress = Math.min(scrollContainer.scrollTop / fadeDistance, 1);
      setScrollFade(progress);
    };

    handleScroll();
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-screen h-[100svh] min-h-[640px] left-1/2 -translate-x-1/2 overflow-hidden"
    >

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.10), rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-20 md:pb-24 pointer-events-none transition-[opacity,transform] duration-200 ease-out"
        style={{
          opacity: 1 - scrollFade,
          transform: `translateY(${scrollFade * 24}px)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-black/40 blur-[100px] -z-10 rounded-full pointer-events-none" />

        <div
          className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2
             w-[1200px] h-[520px]
             pointer-events-none -z-10
             bg-black/0 backdrop-blur-[4px]"
          style={{
            WebkitMaskImage: `
      radial-gradient(ellipse at center,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 38%,
        rgba(0,0,0,0.6) 62%,
        rgba(0,0,0,0) 92%),
      linear-gradient(to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 62%,
        rgba(0,0,0,0) 78%)
    `,
            WebkitMaskComposite: "source-in",
            maskImage: `
      radial-gradient(ellipse at center,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 38%,
        rgba(0,0,0,0.6) 62%,
        rgba(0,0,0,0) 92%),
      linear-gradient(to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 62%,
        rgba(0,0,0,0) 78%)
    `,
          }}
        />

        <div className="pointer-events-auto text-center animate-fade-up">
          <h1
            className="
              font-sans font-black tracking-tighter
              text-6xl md:text-9xl
              text-[#F5F1E8] leading-[0.9] mb-8
              drop-shadow-2xl
              [text-shadow:3px_3px_0_#1328f0]
            "
          >
            Hi, I’m Marjut
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-white/70 font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
            <span>UI/UX</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Frontend</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Creative Dev</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <OffsetButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              variant="primary"
            >
              Contact Me
            </OffsetButton>

            <OffsetButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("projects");
              }}
              variant="primary"
            >
              View Work
            </OffsetButton>
          </div>
        </div>

        <div className="absolute bottom-3 md:bottom-6 pointer-events-auto">
          <ScrollFlowerIndicator onClick={() => scrollToId("about")} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default SectionWrapper(Hero, "hero");
