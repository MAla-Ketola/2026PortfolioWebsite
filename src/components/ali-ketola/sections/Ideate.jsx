import { SectionHeader, Card, ShapeBullet } from "../shared/ui";
import { palette, typography } from "../content";
import {
  AKmoodboard,
  AKgliker,
  AKquicksand,
  AKlogoB,
  AKlogoW,
  AKbutton1,
  AKbutton2,
  AKcard,
  AKphoto1,
  AKphoto2,
  AKphoto3,
  AKphoto4,
  AKphoto5,
  AKsitemap,
  AKwireframeHome,
  AKwireframeServices,
  AKwireframeAccommodation,
} from "../../../assets";
import { motion } from "framer-motion";

const photos = [AKphoto1, AKphoto2, AKphoto3, AKphoto4, AKphoto5];

export default function Ideate() {
  return (
    <section id="ideate" className="mt-12">
      <SectionHeader label="IDEATE" title="Moodboard & Style Guide" color="#F087FE" />

      {/* Subsection: The Problem */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Rustic Charm with Down-to-Earth Design
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Drawing on Define insights, we established a unified visual direction
        that marries the farm’s authentic warmth with an understated celebratory
        spirit. Our streamlined moodboard featured:
      </p>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full overflow-hidden rounded-[20px] shadow-lg">
          <img
            src={AKmoodboard}
            alt="Ali-Ketola moodboard"
            className="w-full h-auto object-cover select-none"
            loading="lazy"
          />
        </div>
      </motion.figure>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Color & Texture">
          <div className="flex flex-wrap gap-2 mb-4">
            {palette.map((hex) => (
              <span
                key={hex}
                className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Forest green, sky blue, warm beige, and rich wood-brown swatches,
            paired with subtle jute and rope-inspired patterns.
          </p>
        </Card>

        <Card title="Typography Samples">
          <ul className="text-base leading-7 text-white/90 list-disc pl-5 mb-3">
            {typography.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-400 leading-relaxed">
            Rounded Gliker headings balanced by clean Quicksand body text for
            clarity and approachability.
          </p>
        </Card>

        <Card title="Imagery Snippets">
          <p className="text-sm text-gray-400 leading-relaxed">
            Genuine on-site photography — sunlit interiors, riverside vistas,
            and joyful event moments.
          </p>
        </Card>
      </div>

      <p className="mt-12 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        From these foundational elements, we crafted our Brand Guide:
      </p>

      <div className="mt-4 space-y-4">
        {/* Row 1: Typography (left) + Color Palette & Logos stacked (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
          <Card title="Typography" pad={false}>
            <div className="mx-5 mb-5 mt-3 p-4 rounded-xl overflow-hidden bg-white">
              <img
                src={AKgliker}
                alt="Gliker header typeface"
                className="w-full"
                loading="lazy"
              />
              <div className="border-t border-gray-200">
                <img
                  src={AKquicksand}
                  alt="Quicksand body typeface"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-4 h-full">
            <Card title="Color Palette">
              <div className="space-y-3">
                {palette.map((hex) => (
                  <div key={hex} className="flex items-center gap-3">
                    <div
                      className="flex-1 h-10 rounded-lg"
                      style={{ backgroundColor: hex }}
                    />
                    <code className="text-sm text-white/80 w-20 flex-shrink-0">
                      {hex}
                    </code>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Logos" className="flex-1">
              <div className="flex gap-4 items-center justify-around flex-wrap">
                <div className="bg-white rounded-xl p-4 w-36 h-36 flex items-center justify-center flex-shrink-0">
                  <img
                    src={AKlogoB}
                    alt="Ali-Ketola logo on light"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div
                  className="rounded-xl p-4 w-36 h-36 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#384B24" }}
                >
                  <img
                    src={AKlogoW}
                    alt="Ali-Ketola logo on dark"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Row 2: Buttons + Page Backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Buttons">
            <div className="flex gap-4 justify-around flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-xl px-6 py-5 flex items-center justify-center" style={{ backgroundColor: "#f6f6f4" }}>
                  <img src={AKbutton1} alt="Button light style" className="w-40" loading="lazy" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-xl px-6 py-5 flex items-center justify-center" style={{ backgroundColor: "#E4D0B5" }}>
                  <img src={AKbutton2} alt="Button dark style" className="w-40" loading="lazy" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Dark</span>
              </div>
            </div>
          </Card>
          <Card title="Page Backgrounds">
            <div className="flex flex-col gap-2">
              {palette.slice(1).map((hex) => (
                <div
                  key={hex}
                  className="h-10 rounded-lg"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3: Photo & Card Treatment */}
        <Card title="Photo & Card Treatment" pad={false}>
          <img
            src={AKcard}
            alt="Photo and card treatment example"
            className="w-full mt-4"
            loading="lazy"
          />
        </Card>

        {/* Row 4: Photography */}
        <Card title="Photography" pad={false}>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-px">
            {photos.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`Ali-Ketola photography ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

        <p className="mt-12 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        Simultaneously, we sketched out the site’s structure and early layouts....
      </p>

      {/* Sitemap subsection */}
          <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Designing for Seamless Navigation
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        I grouped the pages into{" "}
        <strong className="text-[#F087FE]">five clear categories</strong>—Home,
        Services, News, About, Contact—to streamline navigation and reflect user
        priorities. Subpages like Accommodations, Events, and Corporate were
        nested logically to reduce menu clutter and{" "}
        <strong className="text-[#F087FE]">
          guide visitors through the booking journey with minimal clicks.
        </strong>
      </p>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <div className="w-full overflow-hidden rounded-[20px] bg-[#111] border border-white/10 shadow-lg p-5">
          <img
            src={AKsitemap}
            alt="Ali-Ketola site map"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
          />
        </div>
      </motion.figure>

{/* Lo-fi Wireframes subsection */}
      <h3
        className="text-2xl md:text-4xl font-black text-white mt-12 uppercase tracking-tight text-center"
        style={{ fontFamily: "'Milkyway', sans-serif" }}
      >
        Lo-fi Wireframes
      </h3>
      
      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto mb-10">
        To distill our desktop-first wireframes into key building blocks, we
        focused on six foundational layout patterns:
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          { title: "Split-Screen Hero", desc: "Repeatable strips for services and accommodations for easy updates." },
          { title: "Alternating Sections", desc: "Swapped text-first and image-first blocks to guide the eye." },
          { title: "2×2 Card Grid", desc: "Standardised card sizes so users can scan offerings at a glance." },
          { title: "Testimonial Carousel", desc: "Compact carousel area for guest quotes to add social proof." },
          { title: "Background Bands", desc: "Alternating coloured bands to break up long text and define zones." },
          { title: "Global Nav Elements", desc: "Sticky header and unified footer for quick access everywhere." },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
               <ShapeBullet type="star" color="#F087FE" />
               <span className="font-bold text-white">{item.title}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Wireframe Showcase */}
      <div className="rounded-[20px] p-6 lg:p-10 bg-[#FED814] shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg border border-black/10">
            <img src={AKwireframeHome} alt="Home" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-black/10">
            <img src={AKwireframeServices} alt="Services" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-black/10">
            <img src={AKwireframeAccommodation} alt="Accommodation" className="w-full h-auto object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
