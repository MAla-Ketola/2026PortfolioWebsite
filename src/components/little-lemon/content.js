export const meta = {
  project: "A case study of a complete design and development process for a restaurant booking app.",
  role: "UX/UI Designer & React Developer",
  industry: "Food & Hospitality",
  tools: ["React", "HTML/CSS", "Figma"],
};

export const objectives = [
  "Select date, time, party size, and seating preference",
  "Confirm their booking seamlessly online",
  "Reduce reliance on phone calls or in-person reservations",
];

export const goals = [
  { emoji: "⚡", label: "Quick & user-friendly booking experience" },
  { emoji: "🔓", label: "Reduced friction by removing unnecessary booking steps" },
  { emoji: "🎨", label: "Clear, simple, accessible design aligned to Little Lemon’s brand" },
  { emoji: "😊", label: "Increased customer satisfaction and engagement" },
];

export const wireframeNotes = [
  "Mapped 6 key screens — Home, Menu, Dish Detail, Reservation, Confirmation, and Profile — with low-fidelity wireframes.",
  "Defined primary user flows: browse and filter the menu, and reserve a table in under 3 taps.",
  "Annotated interactive elements with usability notes to surface ambiguous navigation before investing in hi-fi visuals.",
];

export const designDecisions = [
  {
    emoji: "🍋",
    title: "Brand-Led Visual Identity",
    desc: "Applied Little Lemon's signature yellow and dark teal across all components to create a warm, appetising, and instantly recognisable experience.",
  },
  {
    emoji: "📐",
    title: "Card-Based Menu Layout",
    desc: "Replaced a dense list view with card tiles showing a dish photo, name, price, and diet tags, reducing scan time in usability tests.",
  },
  {
    emoji: "📅",
    title: "3-Step Reservation Flow",
    desc: "Simplified booking to Date → Party size → Confirm, meeting the key insight that users want to reserve in under 3 taps.",
  },
];

export const implementHighlights = [
  "Developed the multi-step booking flow in React with functional components and React Router.",
  "Integrated API-driven time slot availability to prevent double bookings, implemented HTML5 and React form validation, and added modify/cancel functionality with preserved state.",
  "Applied responsive design principles using CSS Grid and Flexbox.",
];

export const keyFeatures = [
  { emoji: "📅", desc: "Multi-step booking flow (Booking Form → Contact Info → Confirmation)" },
  { emoji: "⏳", desc: "API-driven availability updates to prevent double bookings" },
  { emoji: "📝", desc: "Modify and cancel bookings with preserved state" },
  { emoji: "📧", desc: "Lightweight \"View My Bookings\" feature — users can retrieve reservations via email lookup" },
];

export const gapsVsResearch = [
  [{ text: "No " }, { text: "loyalty programme", bold: true }, { text: " or order history within the prototype scope." }],
  [{ text: "Real-time " }, { text: "table availability", bold: true }, { text: " was mocked rather than live — would require a backend integration." }],
  [{ text: "Push notifications for " }, { text: "reservation reminders", bold: true }, { text: " were designed but not prototyped." }],
];

export const tradeoffs = [
  "Focused on the reservation and menu browsing flows to deliver a testable prototype within the course timeline.",
  "Deferred loyalty and personalisation features to keep scope manageable and usability findings actionable.",
];

export const nextSteps = [
  { emoji: "🔔", title: "Push Notifications", desc: "Design and test reservation reminder notifications to reduce no-shows." },
  { emoji: "⭐", title: "Loyalty Programme", desc: "Add a stamps-based rewards screen to encourage repeat visits." },
  { emoji: "🛒", title: "Online Pre-Order", desc: "Extend the menu flow to allow customers to pre-order dishes alongside their reservation." },
  { emoji: "♿", title: "Accessibility Audit", desc: "Conduct a WCAG 2.1 AA audit and resolve colour contrast and touch-target issues." },
];
