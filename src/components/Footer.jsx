import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const quickLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// The palette extracted from your original code
const palette = [
  "#F844C2",
  "#FED814",
  "#F087FE",
  "#8C52FD",
  "#25E995",
  "#E5E5E5",
  "#01D6FB",
];

const rowShapes = [
  { type: "heart" },
  { type: "roundedSquare" },
  { type: "circle" },
  { type: "star" },
  { type: "heart" },
  { type: "circle" },
  { type: "roundedSquare" },
  { type: "circle" },
  { type: "star" },
  { type: "roundedSquare" },
];

const FooterShapesRow = () => {
  const generateValidColors = useCallback(() => {
    const newColors = [];
    for (let i = 0; i < rowShapes.length; i++) {
      const previousColor = newColors[i - 1];
      const availablePalette = palette.filter(
        (color) => color !== previousColor,
      );
      const randomColor =
        availablePalette[Math.floor(Math.random() * availablePalette.length)];
      newColors.push(randomColor);
    }
    return newColors;
  }, []);

  const [currentColors, setCurrentColors] = useState(generateValidColors());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColors(generateValidColors());
    }, 3000);

    return () => clearInterval(interval);
  }, [generateValidColors]);

  const renderShape = (type, color, index) => {
    const transitionStyle = {
      transitionProperty: "fill, background-color, border-radius",
      transitionDuration: "1000ms",
      transitionTimingFunction: "ease-in-out",
      transitionDelay: `${index * 100}ms`,
    };

    if (type === "heart") {
      return (
        <svg
          style={{ width: "100%", height: "100%", ...transitionStyle }}
          viewBox="0 0 24 24"
          fill={color}
          aria-hidden
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    }

    if (type === "star") {
      return (
        <svg
          style={{ width: "100%", height: "100%", ...transitionStyle }}
          viewBox="0 0 24 24"
          fill={color}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    const style = {
      width: "100%",
      height: "100%",
      backgroundColor: color,
      ...transitionStyle,
    };

    if (type === "circle") style.borderRadius = "50%";
    else if (type === "roundedSquare") style.borderRadius = "12px";

    return <div style={style} aria-hidden />;
  };

  return (
    <div className="w-full overflow-hidden bg-black">
      <div className="flex flex-row justify-center">
        {rowShapes.map((shape, i) => {
          let displayClass = "block";
          if (i >= 6) displayClass = "hidden md:block";
          if (i >= 9) displayClass = "hidden lg:block";

          return (
            <div
              key={`${shape.type}-${i}`}
              className={`flex items-center justify-center ${displayClass} w-20 h-20 sm:w-28 sm:h-28 lg:h-[150px] lg:w-[150px]`}
            >
              {renderShape(shape.type, currentColors[i], i)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollCurrentPageToTop = () => {
    const appScroll = document.getElementById("app-scroll");
    if (appScroll) {
      appScroll.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToId = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      navigate(`/#${id}`, { replace: true });
    }
  };

  return (
    <footer className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-10 pt-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div>
          <p
            className="text-5xl font-black uppercase tracking-tight md:text-7xl"
            style={{
              fontFamily: "'Milkyway', sans-serif",
              WebkitTextStroke: "1px white",
              color: "black",
            }}
          >
            MARJUT <br />
            ALA-KETOLA
          </p>
          <p className="mt-2 text-sm font-mono uppercase tracking-wider text-white/70">
            Creative Frontend Developer
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
          {quickLinks.map((link) => (
            <motion.button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-[#F844C2]"
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.button
            type="button"
            onClick={scrollCurrentPageToTop}
            className="text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-[#FED814]"
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Back To Top
          </motion.button>
        </nav>

        <p className="text-xs font-mono uppercase tracking-wider text-white/60">
          © {year} Marjut Ala-Ketola
        </p>
      </div>

      <FooterShapesRow />
    </footer>
  );
};

export default Footer;
