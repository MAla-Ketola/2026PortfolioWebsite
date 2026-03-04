import { useRef, useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

import { SectionWrapper } from "../hoc";

/* --- Floating 3D Heart --- */
const heartGeometry = (() => {
  const s = new THREE.Shape();
  s.moveTo(0.25, 0.25);
  s.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
  s.bezierCurveTo(-0.35, 0, -0.35, 0.35, -0.35, 0.35);
  s.bezierCurveTo(-0.35, 0.55, -0.15, 0.77, 0.25, 0.95);
  s.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
  s.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
  s.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 3,
  });
  geo.center();
  return geo;
})();

const HeartShape = () => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} geometry={heartGeometry} scale={2.2} rotation={[-0.1, -0.3, Math.PI]} position={[0, 0.4, 0]}>
        <meshPhysicalMaterial
          color="#F844C2"
          emissive="#F844C2"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.4}
          reflectivity={0.5}
        />
      </mesh>
    </Float>
  );
};

const HeartCanvas = () => (
  <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[160px] md:h-[160px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#F087FE" />
        <pointLight position={[3, 3, 2]} intensity={0.5} color="#FED814" />
        {/*<HeartShape />*/}
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  </div>
);

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/marjutalaketola",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/marjut-ala-ketola-1b818b323",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.84 20.452H3.834V9H6.84v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/MAla-Ketola",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@marjutalaketola",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [botTrap, setBotTrap] = useState("");
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (botTrap) return;
    setLoading(true);
    setStatus("");

    emailjs
      .send(
        "service_i2ymbsd",
        "template_2mvtbla",
        {
          from_name: form.name,
          to_name: "Marjut",
          from_email: form.email,
          to_email: "alaketolamarjut@gmail.com",
          message: form.message,
        },
        "FkqkSeY1cAdzcAY6h"
      )
      .then(() => {
        setLoading(false);
        setStatus("Thanks! Your message is on its way.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setStatus("Oops\u2014something went wrong. Try again?");
      });
  };

  return (
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 rounded-[50px] bg-[#fdfbf7]">
      {/* Clouds overlapping into previous section */}
      <div className="pointer-events-none absolute left-0 right-0 -top-28 sm:-top-60 md:-top-60 lg:-top-96 h-32 sm:h-40 z-0">
        <img
          src="/clouds/2.png"
          alt=""
          className="absolute left-2 sm:-left-8 top-0 sm:-top-2 md:-top-3 lg:-top-12 w-60 sm:w-[32rem] md:w-[40rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
        <img
          src="/clouds/3.png"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-0 w-72 sm:w-[32rem] md:w-[40rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
        <img
          src="/clouds/4.png"
          alt=""
          className="absolute right-2 sm:right-8 top-0 sm:-top-1 md:-top-2 lg:top-8 w-56 sm:w-[30rem] md:w-[38rem] lg:w-[48rem] opacity-100"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-16">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left: Title + email + socials */}
        <motion.div
          onViewportEnter={() => setTriggerAnimation(true)}
          viewport={{ once: true, amount: 0.2 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 3D Heart + Title row */}
          <div className="flex items-end gap-2">
            <h2
              className={`mb-8 text-6xl font-black uppercase leading-[1] tracking-tight md:text-8xl lg:text-8xl ${
                triggerAnimation ? "animate-contact-fill-fade" : "opacity-0"
              }`}
              style={{ fontFamily: "'Milkyway', sans-serif" }}
            >
              Let&apos;s<br />
              Get In<br />
              Touch!{'\u2060'}✨
            </h2>
            <div className="flex-shrink-0 mb-8 sm:mb-6 md:mb-4">
              <HeartCanvas />
            </div>
          </div>

          <a
            href="mailto:alaketolamarjut@gmail.com"
            className="text-lg font-medium text-black transition-opacity hover:text-[#fb5d35] md:text-xl"
          >
            alaketolamarjut@gmail.com
          </a>

          {/* Social icons with hover bounce */}
          <div className="flex items-center gap-5 mt-6">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="text-black transition-colors duration-200 hover:text-[#fb5d35]"
                whileHover={{ scale: 1.25, rotate: -8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" aria-live="polite">
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={botTrap}
              onChange={(e) => setBotTrap(e.target.value)}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            <label className="contact-field flex flex-col">
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-black transition-colors duration-300">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-all duration-300 focus:border-[#8C52FD] focus:ring-2 focus:ring-[#8C52FD] focus:shadow-[0_0_15px_rgba(140,82,253,0.2)]"
                required
              />
            </label>

            <label className="contact-field flex flex-col">
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-black transition-colors duration-300">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-all duration-300 focus:border-[#8C52FD] focus:ring-2 focus:ring-[#8C52FD] focus:shadow-[0_0_15px_rgba(140,82,253,0.2)]"
                required
              />
            </label>

            <label className="contact-field flex flex-col">
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-black transition-colors duration-300">
                Message
              </span>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                className="resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-all duration-300 focus:border-[#8C52FD] focus:ring-2 focus:ring-[#8C52FD] focus:shadow-[0_0_15px_rgba(140,82,253,0.2)]"
                required
              />
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative rounded-full px-12 py-4 font-bold text-lg tracking-widest uppercase text-black border-2 border-[#F087FE] transition-all duration-200 hover:opacity-90 active:opacity-80 hover:border-[#8C52FD] hover:-translate-y-1 hover:rotate-[-6deg] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:rotate-0"
                style={{
                  background: "linear-gradient(130deg, #F087FE 10%, #FED814 50%, #FED814 70%, #8C52FD 100%)",
                }}
              >
                {loading ? "Sending..." : "Send"}
              </button>
              {status && (
                <span className="text-sm text-gray-700">{status}</span>
              )}
            </div>
          </form>
        </motion.div>
      </div>
      </div>

      {/* Title fill-fade animation (dark text version, matching About) */}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
