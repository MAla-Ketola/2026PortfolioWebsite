// src/components/happy-tracker/content.js
// ─── Project meta ──────────────────────────────────────────────────────────
export const meta = {
  project: "Vertical slice prototype implemented in SwiftUI for iOS",
  role: "UX/UI Designer & iOS Developer",
  industry: "Health & Wellbeing",
  tools: ["SwiftUI", "Xcode", "Canva"],
};

// ─── Define ────────────────────────────────────────────────────────────────
export const problems = [
  "Instant habit creation",
  "Simple progress visualization",
  "Tailored motivations such as streaks and affirmations",
];

export const targetUsers = [
  { emoji: "👩‍💻", label: "Busy professionals" },
  { emoji: "👨‍👩‍👧", label: "Busy parents" },
  { emoji: "🎓", label: "Busy students" },
];

export const competitiveHighlights = [
  { emoji: "🔄", label: "Most apps require multi-step habit setup before first use" },
  { emoji: "📋", label: "Pre-built habit templates (e.g., Productive) streamline onboarding" },
  { emoji: "🎮", label: "Gamification (e.g., Habitica) drives engagement but can overwhelm new users" },
];

export const insights = [
  { emoji: "⚡", bold: "immediate setup",  label: "Users prefer immediate setup over multi‑step wizards" },
  { emoji: "📈", bold: "Visual progress",  label: "Visual progress (streaks, charts) increases motivation" },
  { emoji: "🎨", bold: "Customization",    label: "Customization (colors/icons) enhances ownership" },
];

// ─── Design Process ─────────────────────────────────────────────────────────
export const wireframeNotes = [
  "Mapped out 8 key screens and their navigational links using red callouts to validate user paths.",
  "Defined container layouts with SwiftUI-like placeholders (e.g., VStack blocks, LazyHStack rows) to test alignment and component hierarchy.",
  "Annotated interactive elements (buttons, date selectors, toggles) for early usability feedback before visual styling.",
];

export const userTesting = [
  { prefix: "Participants:", text: " 4 users from the target demographic participated in moderated sessions." },
  { prefix: "Methods:", text: " In-person testing with an app simulator, followed by open-ended interviews and screen captures." },
  { prefix: "Key Findings:", text: "" },
]

export const designSteps = [
  {
    emoji: "🎨",
    title: "Visual Style & Branding",
    desc: "Applied the finalized color palette, typography scale, and custom illustrations to evoke a warm, friendly tone.",
  },
  {
    emoji: "📱",
    title: "Responsive Layouts",
    desc: "Demonstrated how the interface adapts across different iPhone screen sizes, ensuring consistent spacing and legibility.",
  },
  {
    emoji: "🚀",
    title: "Prototype Flow",
    desc: "Created clickable prototypes linking all primary screens (Home, Create Habit, Habit Detail, Settings) to simulate realistic navigation during user tests.",
  },
];

// ─── Implement ──────────────────────────────────────────────────────────────
export const buildPoints = [
  "Placeholder implementation detail 1.",
  "Placeholder implementation detail 2.",
  "Placeholder implementation detail 3.",
];

// ─── Results ────────────────────────────────────────────────────────────────
export const analyticsCards = [
  {
    stat: "—",
    note: "placeholder",
    color: "#01D6FB",
    title: "Result metric 1",
    desc: "Placeholder result description.",
  },
  {
    stat: "—",
    note: "placeholder",
    color: "#25E995",
    title: "Result metric 2",
    desc: "Placeholder result description.",
  },
  {
    stat: "—",
    note: "placeholder",
    color: "#FED814",
    title: "Result metric 3",
    desc: "Placeholder result description.",
  },
];

// ─── Results & Reflections ───────────────────────────────────────────────────
export const gapsVsResearch = [
  [{ text: "No " }, { text: "Monthly", bold: true }, { text: " option for frequency." }],
  [{ text: "No " }, { text: "streak", bold: true }, { text: " or " }, { text: "progress chart", bold: true }, { text: " (designed only)." }],
  [{ text: "No " }, { text: "per-habit color/icon", bold: true }, { text: " picker (global palette only)." }],
];

export const tradeoffs = [
  "Prioritised the core loop (create → check → edit/delete) to hit the vertical-slice deadline.",
  "Deferred analytics/personalisation to avoid scope creep and keep the codebase simple.",
];

export const nextSteps = [
  { emoji: "🗓️", title: "Frequency Options",  desc: "Add Every Day / Every Week / Every Month; run quick copy tests + 5 usability sessions." },
  { emoji: "📊", title: "Streaks & Charts",   desc: "Ship streaks + a mini 30-day chart on Habit Detail." },
  { emoji: "🎨", title: "Personalisation",    desc: "Introduce light personalisation (limited color/icon sets)." },
  { emoji: "📋", title: "Starter Templates",  desc: "Offer 4–6 starter templates to reduce blank-page friction." },
];
