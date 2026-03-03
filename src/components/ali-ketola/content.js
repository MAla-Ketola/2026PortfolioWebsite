// src/components/case-studies/ali-ketola/content.js
export const meta = {
  project: "End-to-end responsive website + branding",
  role: "Sole UX/UI & brand designer; Wix build",
  industry: "Hospitality",
  tools: ["Figma", "Wix Editor"],
};

export const interview = [
  "We need a warmer, more personal tone that feels like stepping into our home.",
  "Our previous site felt out of touch with the actual place; we want visitors to see real photos, not stock images.",
  "We offer diverse services — accommodation, weddings, retreats — but don't want to overwhelm users. Everything should feel organized and intuitive.",
];

export const problems = [
  "Inconsistent branding",
  "Cluttered navigation",
  "Poor content hierarchy",
  "CMS friction & multilingual duplication",
  "Visual overload & readability issues",
  "Over-reliance on stock imagery",
];

export const goals = [
  "Establish a clear, cohesive visual identity",
  "Improve information architecture & navigation",
  "Showcase services & accommodations (card-based layouts)",
  "Streamline multilingual support",
  "Empower the client with a user-friendly CMS",
  "Honor client booking preference",
];

export const goalsParagraph = [
  "Develop a comprehensive brand guide: logo lockups, natural color palette, typographic scale, and UI components.",
  "Consolidate pages under broad categories (Home, Services, News, About Us, Contact), implement a sticky header, and add clear section headings and breadcrumb trails.",
  "Replace fullscreen backgrounds with split-screen heroes and use responsive, card-based layouts for accommodations, event packages, and corporate retreats.",
  "Enable Wix’s multilingual feature to centralize content management and eliminate manual duplication across language versions.",
  "Build the site using repeatable Wix card strips and provide a concise training guide so non-technical staff can add, edit, or remove content independently.",
  "Honor booking preference: Omit on-site booking flows and instead reinforce direct contact with “Get in touch” strip on key pages—making it effortless for visitors to call or email for reservations. call/email contact over on-site checkout",
];

export const competitors = [
  {
    name: "Green Escape",
    notes: "Full-width autoplay hero + search; deep green palette; card grid.",
    takeaway: "Immersive video storytelling and front-and-center CTAs.",
    imgPosition: "top",
  },
  {
    name: "Ahlström Noormarkku",
    notes: "Looping hero, floating phone callout, fixed booking button; muted taupe/brown-gray.",
    takeaway: "Persistent floating CTAs keep contact options visible at all times.",
    imgPosition: "center",
  },
  {
    name: "Kauttuan Ruukinkartano",
    notes: "Static hero with single CTA; warm terracotta + serif type.",
    takeaway: "Warm palette and serif typography signal quality and authenticity.",
    imgPosition: "top",
  },
];

export const palette = ["#384B24", "#d9e4ea", "#DBC09D", "#E4D0B5"];
export const typography = ["Gliker (headings)", "Quicksand (body)"];

export const patterns = [
  "Split-screen hero",
  "Alternating image/text sections",
  "2×2 card grid for Services & Accommodations",
  "Compact testimonial carousel",
  "Background colour bands for scannability",
  "Global sticky header & unified footer",
];

export const buildPoints = [
  "Delivered a concise PDF training guide covering general content edits and site maintenance.",
  "Produced a focused 2‑minute video tutorial demonstrating how to add, edit, and remove News posts.",
  "Provided quick-reference instructions for simple text updates, such as changing prices or copy, directly within the editor.",
  "Conducted a soft launch to verify analytics setup and user flows before going live.",
];

export const feedback = [
  "The new site finally feels like us — warm, authentic, inviting.",
  "Branding is cohesive across every page.",
  "It’s easy to find and update content now.",
];

export const analyticsCards = [
  {
    stat: "48%",
    note: "↓ 17%",
    color: "#25E995",
    title: "Bounce Rate & Engagement",
    desc: "Bounce rate improved to 48% (a 17% drop), and average pages per session rose to 2.0 (up 21%), showing increased exploration.",
  },
  {
    stat: "22%",
    note: "navigated to Services first",
    color: "#F087FE",
    title: "Top Pages & Navigation Flows",
    desc: "The Services page (/palvelut) was the most-visited after the homepage, followed by Accommodations and Event spaces — validating our IA focus.",
  },
  {
    stat: "30–45",
    note: "sessions / day",
    color: "#FED814",
    title: "Overall Traffic Trends",
    desc: "Sessions stabilized with a slight dip immediately post-launch followed by a steady climb — indicating user acclimation to the new design.",
  },
  {
    stat: "77%",
    note: "mobile (23% desktop)",
    color: "#8C52FD",
    title: "Device Breakdown",
    desc: "Mobile dominated sessions, confirming the need to prioritize mobile CTA prominence and responsive behavior.",
  },
];

export const wentWellText =
  "Rapid prototyping and stakeholder alignment accelerated the build; repeatable strips empowered the client to maintain content without developer support.";

export const opportunitiesText =
  "Plan an SEO audit to boost organic traffic, implement a dynamic events calendar to keep visitors engaged, and schedule quarterly analytics reviews to inform ongoing enhancements.";

export const lessonsFull = [
  "Invest more time in mastering Wix’s CMS features to streamline content management and translations.",
  "Prioritize responsive design workflows earlier, using flexible grids and breakpoints to ensure mobile consistency.",
  "Explore alternative layout techniques (e.g., Collection elements or custom code) instead of relying solely on repeatable strips for card modules.",
  "Conduct formal usability tests on mobile CTAs and implement A/B tests for hero messaging.",
];
