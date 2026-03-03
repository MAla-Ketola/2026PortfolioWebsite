import { motion } from "framer-motion";

/* Homepage palette for accent colors */
const palette = [
  "#25E995", "#F087FE", "#8C52FD", "#FED814", "#01D6FB", "#F844C2",
];

/* Gradient border style matching homepage buttons */
const buttonBorderColors = ["#F844C2", "#F087FE", "#FED814"];
const gradientBorderStyle = {
  background: `
    linear-gradient(#1a1a1a, #1a1a1a) padding-box,
    linear-gradient(150deg, ${buttonBorderColors.join(", ")}) border-box
  `,
  border: "2px solid transparent",
  borderRadius: "9999px",
};

export const CTAButton = ({
  href,
  onClick,
  children,
  label,
  target = "_blank",
  className = "",
}) => {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      href={href}
      onClick={onClick}
      aria-label={label}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={gradientBorderStyle}
      className={`inline-flex items-center gap-2 px-8 py-3.5 font-bold text-white text-lg tracking-wide shadow-xl transition-all duration-200 transform-gpu hover:opacity-90 active:opacity-80 hover:-translate-y-1 hover:rotate-[-6deg] cursor-pointer ${className}`}
    >
      {children}
    </Comp>
  );
};

export function Card({ title, children, className = "", pad = true }) {
  return (
    <div
      className={[
        "bg-[#111] rounded-[20px] border border-white/10 overflow-hidden flex flex-col shadow-lg",
        className,
      ].join(" ")}
    >
      {title && (
        <div className="px-5 pt-5 pb-0">
          <h4
            className="font-black text-white text-lg uppercase tracking-tight"
            style={{ fontFamily: "'Milkyway', sans-serif" }}
          >
            {title}
          </h4>
        </div>
      )}
      <div className={pad ? "p-5" : ""}>{children}</div>
    </div>
  );
}

export function Stat({ label, value, note }) {
  return (
    <div className="flex items-baseline gap-3">
      <div
        className="text-2xl md:text-3xl font-black tracking-tight"
        style={{ color: "#25E995" }}
      >
        {value}
      </div>
      <div className="text-sm text-white/80">
        {label}
        {note ? <span className="ml-2 text-xs text-white/60">{note}</span> : null}
      </div>
    </div>
  );
}

function ShapeIcon({ type, color, size }) {
  if (type === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (type === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
        <circle cx="12" cy="12" r="12" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
    </svg>
  );
}

const DIVIDER_SHAPES = ["heart", "star", "circle", "roundedSquare", "star", "heart", "circle"];
const DIVIDER_COLORS = ["#25E995", "#F087FE", "#8C52FD", "#FED814", "#01D6FB", "#F844C2", "#25E995"];

export function ShapeDivider() {
  return (
    <motion.div
      className="flex justify-center items-center gap-4 py-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {DIVIDER_SHAPES.map((type, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ShapeIcon type={type} color={DIVIDER_COLORS[i]} size={18} />
        </motion.span>
      ))}
    </motion.div>
  );
}

export function ShapeBullet({ type = "star", color, className = "" }) {
  return (
    <span className={`flex-shrink-0 inline-flex ${className}`}>
      <ShapeIcon type={type} color={color} size={18} />
    </span>
  );
}

export function SectionHeader({ label, title, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <p
        className="text-sm md:text-base uppercase tracking-widest mb-2 font-bold"
        style={{ color: color ?? "#9ca3af" }}
      >
        {label}
      </p>
      <h2
        className="font-black text-white text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9]"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
