export const meta = {
  project: "Dissertation Project (a vertical-slice prototype of a gamified fitness app)",
  role: "Sole researcher, game designer & developer (responsible for concept, game design, UI/UX and full Unity/C# implementation)",
  industry: "Health, Games",
  tools: ["Unity", "C#"],
};

export const problems = [
  { emoji: "🌱", title: "Planting virtual flowers", desc: "with every step, transforming movement into blooming gardens" },
  { emoji: "🏅", title: "Leveling up", desc: "through XP and achievements that celebrate milestones" },
  { emoji: "🪙", title: "Spending currency", desc: "in an in-game shop to unlock new content" },
];

export const targetUsers = [
  { emoji: "🚶", label: "Casual walkers" },
  { emoji: "🌱", label: "Beginners starting fitness journeys" },
  { emoji: "🎮", label: "Players who enjoy light gamification" },
];

export const competitiveHighlights = [
  { emoji: "📊", label: "Most step trackers present raw numbers with no emotional hook" },
  { emoji: "🌸", label: "Nature metaphors (e.g. Forest) have proven effective at sustaining engagement" },
  { emoji: "⚙️", label: "Heavy gamification (badges, leaderboards) can feel pressuring for casual users" },
];

export const insights = [
  { emoji: "👁️", bold: "Visible growth", label: "Visible growth mechanics create a stronger sense of reward than numbers alone" },
  { emoji: "🧘", bold: "Low friction", label: "Low friction onboarding keeps casual users from dropping off early" },
  { emoji: "🎨", bold: "Visual tone", label: "Visual tone (soft colours, organic shapes) strongly influences the perceived effort of exercise" },
];

export const wireframeNotes = [
  "Mapped the core user journey: open app → view flower state → check steps → see growth update.",
  "Sketched layout hierarchy prioritising the flower visual at the top, with step count and progress beneath.",
  "Annotated key interactive states: watered/dry flower, daily goal met, and streak indicators.",
];

export const userTesting = [
  { prefix: "Participants:", text: " Informal playtesting with 3 users from the target demographic." },
  { prefix: "Methods:", text: " Observed sessions on a Unity build, followed by brief verbal feedback." },
  { prefix: "Key Findings:", text: " Users immediately understood the flower metaphor; they asked for clearer daily goal feedback and a visible step count at a glance." },
];

export const designSteps = [
  {
    emoji: "📱",
    title: "Consistent Layout",
    desc: "Tab-bar nav with uniform iconography and typography across Home, Shop, Inventory and Profile screens.",
  },
  {
    emoji: "🌷",
    title: "Immediate Feedback",
    desc: "Flowers visibly bloom in stages; pop-up celebrations on level-up and order completion.",
  },
  {
    emoji: "🔄",
    title: "Familiar Patterns",
    desc: "Drag-and-drop inventory, button-driven shop flow, and modal confirmations align with mobile-game conventions.",
  },
];

export const technicalCards = [
  {
    emoji: "🧩",
    title: "Data-Driven Content",
    desc: "All gameplay entities (flowers, orders, achievements) defined as ScriptableObjects—no code changes needed to add or balance content.",
  },
  {
    emoji: "🔄",
    title: "Event-Based System",
    desc: "Lightweight event bus decouples step tracking, garden growth, achievement logic and shop/inventory, improving modularity and testability.",
  },
  {
    emoji: "💾",
    title: "Persistent State",
    desc: "At startup, the game deserializes saved data to restore XP, levels, coins, and inventory; on exit, SaveGameData serializes the updated state back to JSON.",
  },
  {
    emoji: "🏃",
    title: "Sensor Integration",
    desc: "Directly reads device accelerometer/gyroscope for step counts (future work: integrate pedometer API for higher accuracy).",
  },
];

export const lessonsProcess = [
  {
    title: "Validate with real users",
    desc: "Without any user testing, it's impossible to know if the gamification actually motivates activity. Next time, I'd recruit participants early—run task-based sessions to gather qualitative feedback and iterate.",
  },
  {
    title: 'Beware the "vertical slice" trap',
    desc: "A narrow demo can showcase core mechanics but may not sustain engagement. I'd expand content breadth or stagger feature releases to keep users exploring over time.",
  },
  {
    title: "Plan for team scale-up",
    desc: "Working solo meant minimal polish on art, animations, and accessibility. In a team setting, I'd establish shared style guides and asset pipelines so UX and visual design evolve in parallel.",
  },
  {
    title: "Address sensor variability early",
    desc: "Relying on raw accelerometer/gyroscope data led to drift and false readings. I'd prototype with a pedometer API or implement smoothing filters from day 1 to ensure consistent step counts.",
  },
  {
    title: "Embrace design pivots",
    desc: "Dropping the original isometric grid for a simpler UI proved beneficial—each garden patch as an independent object made code clearer and interactions more direct. Don't be afraid to pivot when complexity outweighs value.",
  },
];

export const lessonsProduct = [
  {
    title: "Integrate social features",
    desc: "Research shows collaborative or competitive elements boost motivation, yet my prototype lacked any social layer. Future versions should include leaderboards or community challenges.",
  },
  {
    title: "Watch for unintended impacts",
    desc: "Gamified rewards can drive unhealthy goals or defeatism. It's vital to build in adjustable difficulty, clear health caveats, and perhaps \"rest day\" mechanics to protect user well-being.",
  },
];

export const gapsVsResearch = [
  [{ text: "No " }, { text: "real-time pedometer integration", bold: true }, { text: " — steps were simulated in the vertical slice." }],
  [{ text: "No " }, { text: "streak tracking", bold: true }, { text: " or push notifications (designed only)." }],
  [{ text: "No " }, { text: "customisable daily goal", bold: true }, { text: " — hard-coded step target in the prototype." }],
];

export const tradeoffs = [
  "Prioritised the core visual loop (steps → growth) to validate the concept before building tracking infrastructure.",
  "Deferred real pedometer API integration to keep the vertical slice focused on the UX and visual design.",
];

export const nextSteps = [
  { emoji: "👟", title: "Real Step Tracking", desc: "Integrate device pedometer APIs to replace the simulated step input with genuine movement data." },
  { emoji: "🔔", title: "Notifications & Streaks", desc: "Add daily reminders and a streak system to reinforce the habit loop." },
  { emoji: "🎯", title: "Customisable Goals", desc: "Let users set their own daily step target to suit different fitness levels." },
  { emoji: "🌻", title: "More Plant Varieties", desc: "Introduce seasonal or unlockable flowers to add long-term collectible motivation." },
];
