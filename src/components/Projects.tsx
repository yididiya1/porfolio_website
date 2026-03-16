"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

// ── Inline SVG placeholder illustrations ─────────────────────────────────────
function SubscriberAnalyticsPreview() {
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {/* Grid lines */}
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="32" y1={y} x2="300" y2={y} stroke="#2E2520" strokeWidth="0.5" />
      ))}
      {/* Bars */}
      {[
        { x: 45,  h: 70, color: "#E8963C" },
        { x: 80,  h: 45, color: "#E8963C" },
        { x: 115, h: 90, color: "#5DB88A" },
        { x: 150, h: 55, color: "#E8963C" },
        { x: 185, h: 100, color: "#5DB88A" },
        { x: 220, h: 40, color: "#E8963C" },
        { x: 255, h: 75, color: "#3EC9B8" },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={130 - b.h} width="22" height={b.h} rx="3" fill={b.color} opacity="0.7" />
      ))}
      {/* Trend line */}
      <polyline
        points="56,90 91,105 126,72 161,88 196,58 231,112 266,83"
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {[56,91,126,161,196,231,266].map((x, i) => {
        const ys = [90,105,72,88,58,112,83];
        return <circle key={i} cx={x} cy={ys[i]} r="3" fill="#f59e0b" />;
      })}
      {/* Label */}
      <text x="32" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">subscriber_churn_analysis.py</text>
    </svg>
  );
}

function TradingPreview() {
  const candles = [
    { x: 40,  o: 88, c: 72,  h: 65,  l: 95 },
    { x: 68,  o: 72, c: 58,  h: 52,  l: 80 },
    { x: 96,  o: 58, c: 78,  h: 48,  l: 82 },
    { x: 124, o: 78, c: 65,  h: 58,  l: 85 },
    { x: 152, o: 65, c: 90,  h: 55,  l: 95 },
    { x: 180, o: 90, c: 70,  h: 62,  l: 95 },
    { x: 208, o: 70, c: 50,  h: 42,  l: 75 },
    { x: 236, o: 50, c: 68,  h: 40,  l: 72 },
    { x: 264, o: 68, c: 45,  h: 38,  l: 72 },
  ];
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {[40, 70, 100, 130].map((y) => (
        <line key={y} x1="24" y1={y} x2="300" y2={y} stroke="#2E2520" strokeWidth="0.5" />
      ))}
      {candles.map((c, i) => {
        const isGreen = c.c < c.o;
        const clr = isGreen ? "#10b981" : "#ef4444";
        const top  = Math.min(c.o, c.c);
        const ht   = Math.abs(c.o - c.c);
        return (
          <g key={i}>
            <line x1={c.x + 7} y1={c.h} x2={c.x + 7} y2={c.l} stroke={clr} strokeWidth="1.5" />
            <rect x={c.x} y={top} width="14" height={Math.max(ht, 3)} rx="1.5" fill={clr} opacity="0.85" />
          </g>
        );
      })}
      {/* Equity curve */}
      <polyline
        points="47,95 75,82 103,60 131,72 159,52 187,68 215,78 243,55 271,68"
        stroke="#E8963C"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <text x="24" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">trading_backtest.py  ■ equity curve</text>
    </svg>
  );
}

function FaceMLPreview() {
  const faces = [
    { cx: 72,  cy: 68, r: 26, age: "23", gender: "M" },
    { cx: 160, cy: 68, r: 26, age: "34", gender: "F" },
    { cx: 248, cy: 68, r: 26, age: "61", gender: "M" },
  ];
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {/* Neural net dots background */}
      {[...Array(20)].map((_, i) => (
        <circle key={i} cx={18 + (i % 5) * 70} cy={20 + Math.floor(i / 5) * 22} r="1.5" fill="#2E2520" />
      ))}
      {faces.map((f, i) => (
        <g key={i}>
          {/* Detection box */}
          <rect x={f.cx - f.r - 2} y={f.cy - f.r - 2} width={(f.r + 2) * 2} height={(f.r + 2) * 2}
            rx="3" stroke="#E8963C" strokeWidth="1.5" strokeDasharray="4 2" fill="transparent" opacity="0.7" />
          {/* Face circle */}
          <circle cx={f.cx} cy={f.cy} r={f.r} fill="#151d2e" stroke="#1e2d45" strokeWidth="1" />
          {/* Eyes */}
          <circle cx={f.cx - 9} cy={f.cy - 6} r="3.5" fill="#E8963C" opacity="0.5" />
          <circle cx={f.cx + 9} cy={f.cy - 6} r="3.5" fill="#E8963C" opacity="0.5" />
          {/* Smile */}
          <path d={`M${f.cx - 9} ${f.cy + 8} Q${f.cx} ${f.cy + 16} ${f.cx + 9} ${f.cy + 8}`}
            stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Label */}
          <rect x={f.cx - f.r - 2} y={f.cy + f.r} width={(f.r + 2) * 2} height="16"
            rx="2" fill="#E8963C" opacity="0.85" />
          <text x={f.cx} y={f.cy + f.r + 11} textAnchor="middle"
            fill="#0a0e17" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            {f.gender} · {f.age}y
          </text>
        </g>
      ))}
      <text x="14" y="128" fill="#94a3b8" fontSize="9" fontFamily="monospace">
        EfficientNet · MediaPipe · UTKFace
      </text>
    </svg>
  );
}

function HabitTrackerPreview() {
  const habits = ["Morning run", "Read 30 min", "Meditate", "Drink water"];
  const checks = [
    [true, true, false, true, true, true, true],
    [true, false, true, true, false, true, true],
    [false, true, true, true, true, true, false],
    [true, true, true, false, true, true, true],
  ];
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {/* Title bar */}
      <text x="14" y="16" fill="#94a3b8" fontSize="9" fontFamily="monospace">habit-tracker · week 12</text>
      {/* Streak badge */}
      <rect x="244" y="6" width="62" height="14" rx="7" fill="rgba(232,150,60,0.15)" stroke="rgba(232,150,60,0.4)" strokeWidth="1" />
      <text x="275" y="16" fill="#E8963C" fontSize="8" fontFamily="monospace" textAnchor="middle">🔥 14 day streak</text>
      {/* Habit rows */}
      {habits.map((h, row) => (
        <g key={row}>
          <text x="14" y={36 + row * 24} fill="#94a3b8" fontSize="8" fontFamily="monospace">{h}</text>
          {checks[row].map((done, col) => (
            <g key={col}>
              <rect x={112 + col * 28} y={24 + row * 24} width="16" height="16" rx="4"
                fill={done ? "rgba(93,184,138,0.2)" : "rgba(46,37,32,0.4)"}
                stroke={done ? "#5DB88A" : "#2E2520"} strokeWidth="1" />
              {done && (
                <path d={`M${116 + col * 28} ${32 + row * 24} l3 3 5-5`}
                  stroke="#5DB88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </g>
          ))}
        </g>
      ))}
      {/* Focus timer */}
      <rect x="14" y="122" width="80" height="12" rx="3" fill="rgba(62,201,184,0.08)" stroke="rgba(62,201,184,0.3)" strokeWidth="1" />
      <rect x="14" y="122" width="56" height="12" rx="3" fill="rgba(62,201,184,0.22)" />
      <text x="54" y="131" fill="#3EC9B8" fontSize="8" fontFamily="monospace" textAnchor="middle">Focus 25:00</text>
    </svg>
  );
}

function JobbirdPreview() {
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {/* Left panel - resume */}
      <rect x="14" y="14" width="110" height="112" rx="4" fill="#141210" stroke="#2E2520" strokeWidth="1" />
      <rect x="22" y="22" width="60" height="6" rx="2" fill="#E8963C" opacity="0.6" />
      <rect x="22" y="32" width="94" height="3" rx="1.5" fill="#2E2520" />
      <rect x="22" y="38" width="80" height="3" rx="1.5" fill="#2E2520" />
      <rect x="22" y="44" width="90" height="3" rx="1.5" fill="#2E2520" />
      <line x1="22" y1="52" x2="116" y2="52" stroke="#2E2520" strokeWidth="0.5" />
      <rect x="22" y="58" width="40" height="3" rx="1.5" fill="#E8963C" opacity="0.4" />
      {[65,72,79,86,93,100,107].map((y) => (
        <rect key={y} x="22" y={y} width={50 + Math.sin(y) * 30} height="2.5" rx="1" fill="#2E2520" />
      ))}
      {/* Center - ATS score */}
      <text x="169" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">ATS Score</text>
      <circle cx="169" cy="58" r="28" fill="none" stroke="#2E2520" strokeWidth="5" />
      <circle cx="169" cy="58" r="28" fill="none" stroke="#5DB88A" strokeWidth="5"
        strokeDasharray="131" strokeDashoffset="28" strokeLinecap="round"
        transform="rotate(-90 169 58)" />
      <text x="169" y="63" fill="#5DB88A" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">78%</text>
      {/* Tags */}
      {[["Resume", "#E8963C"], ["Cover Letter", "#3EC9B8"], ["Interview", "#5DB88A"]].map(([label, color], i) => (
        <g key={i}>
          <rect x="140" y={96 + i * 16} width={60} height="12" rx="3"
            fill={`${color}18`} stroke={`${color}55`} strokeWidth="1" />
          <text x="170" y={105 + i * 16} fill={color} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}
      {/* Right panel - AI */}
      <rect x="248" y="14" width="58" height="112" rx="4" fill="#141210" stroke="#2E2520" strokeWidth="1" />
      <text x="277" y="28" fill="#3EC9B8" fontSize="8" fontFamily="monospace" textAnchor="middle">AI Tools</text>
      {["Job Fit", "Tailor", "Gaps"].map((label, i) => (
        <g key={i}>
          <rect x="254" y={36 + i * 22} width="46" height="16" rx="3"
            fill="rgba(62,201,184,0.08)" stroke="rgba(62,201,184,0.25)" strokeWidth="1" />
          <text x="277" y={47 + i * 22} fill="#3EC9B8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}
      <text x="14" y="136" fill="#94a3b8" fontSize="8" fontFamily="monospace">jobbird · ai career assistant</text>
    </svg>
  );
}

function ChessTutorPreview() {
  const boardSize = 8;
  const sqSize = 14;
  const startX = 14;
  const startY = 10;
  // Simplified board position (opening)
  const pieces: Record<string, string> = {
    "0,0":"♜","1,0":"♞","2,0":"♝","3,0":"♛","4,0":"♚","5,0":"♝","6,0":"♞","7,0":"♜",
    "0,1":"♟","1,1":"♟","2,1":"♟","3,1":"♟","4,1":"♟","5,1":"♟","6,1":"♟","7,1":"♟",
    "4,4":"♙","3,6":"♙",
    "0,7":"♖","1,7":"♘","2,7":"♗","3,7":"♕","4,7":"♔","5,7":"♗","6,7":"♘","7,7":"♖",
    "0,6":"♙","1,6":"♙","2,6":"♙","5,6":"♙","6,6":"♙","7,6":"♙",
  };
  const highlighted = new Set(["4,4","3,6","4,5","3,5"]);
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0D0B09" />
      {/* Chessboard */}
      {Array.from({ length: boardSize }, (_, row) =>
        Array.from({ length: boardSize }, (_, col) => {
          const isLight = (row + col) % 2 === 0;
          const key = `${col},${row}`;
          const isHl = highlighted.has(key);
          return (
            <rect key={key}
              x={startX + col * sqSize} y={startY + row * sqSize}
              width={sqSize} height={sqSize}
              fill={isHl ? "rgba(232,150,60,0.45)" : isLight ? "#2A1E14" : "#160D08"}
            />
          );
        })
      )}
      {/* Pieces */}
      {Object.entries(pieces).map(([pos, piece]) => {
        const [col, row] = pos.split(",").map(Number);
        return (
          <text key={pos}
            x={startX + col * sqSize + sqSize / 2}
            y={startY + row * sqSize + sqSize - 2}
            fontSize="10" textAnchor="middle" fill={piece === piece.toUpperCase() ? "#F0E6D3" : "#888"}
          >
            {piece}
          </text>
        );
      })}
      {/* Right panel */}
      <rect x="132" y="10" width="174" height="120" rx="4" fill="#141210" stroke="#2E2520" strokeWidth="1" />
      <text x="142" y="25" fill="#E8963C" fontSize="9" fontFamily="monospace">Sicilian Defense</text>
      <text x="142" y="37" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">Najdorf Variation · e5 trap</text>
      <line x1="142" y1="43" x2="298" y2="43" stroke="#2E2520" strokeWidth="0.5" />
      {[["Openings", "12 lessons"], ["Middlegame", "8 lessons"], ["Endgames", "10 lessons"], ["Puzzles", "50+ daily"]].map(([label, sub], i) => (
        <g key={i}>
          <rect x="142" y={50 + i * 18} width="120" height="14" rx="3"
            fill={i === 0 ? "rgba(232,150,60,0.12)" : "rgba(46,37,32,0.3)"}
            stroke={i === 0 ? "rgba(232,150,60,0.35)" : "#2E2520"} strokeWidth="1" />
          <text x="150" y={60 + i * 18} fill={i === 0 ? "#E8963C" : "#94a3b8"} fontSize="8" fontFamily="monospace">{label}</text>
          <text x="258" y={60 + i * 18} fill="#4a5568" fontSize="7.5" fontFamily="monospace" textAnchor="end">{sub}</text>
        </g>
      ))}
      <text x="142" y="125" fill="#3EC9B8" fontSize="8" fontFamily="monospace">Next: Nd5 fork — find the move</text>
    </svg>
  );
}

const projects = [
  {
    title: "Subscriber Analytics for Maine Trust for Local News",
    org: "Northeastern University",
    period: "Oct 2025 – Dec 2025",
    description:
      "Performed EDA to help Maine Trust for Local News understand subscriber behavior, segment users, and evaluate predictive churn models. Implemented baseline churn prediction models (Random Forest, Logistic Regression) and demonstrated model underperformance due to limited client labels & structural data gaps.",
    tags: ["Python", "Pandas", "NumPy", "scikit-learn", "Tableau"],
    highlights: ["EDA & user segmentation", "Churn prediction modeling", "Tableau visualizations"],
    link: "#",
    github: "https://github.com/Collins-Kibet-2024/METLN-Final-Project---DS5110",
    type: "academic",
    Preview: SubscriberAnalyticsPreview,
  },
  {
    title: "Modular ML Trading Research System",
    org: "Offline Quant Research",
    period: "Mar 2023 – Jan 2024",
    description:
      "Built a modular offline research framework for systematic trading on historical OHLCV data using Marimo notebooks, including reproducible data prep and rolling statistical/technical feature engineering. Implemented a trade labeling engine with stop-loss/take-profit + fixed holding horizons.",
    tags: ["Python", "Marimo", "Pandas", "NumPy", "scikit-learn", "yfinance", "Matplotlib"],
    highlights: ["Trade labeling engine", "Probabilistic classifiers", "Equity curve analytics"],
    link: "#",
    github: "https://github.com/yididiya1/ml-trading-system-backtesting",
    type: "personal",
    Preview: TradingPreview,
  },
  {
    title: "Age & Gender Estimation from Face Images",
    org: "Deep Learning Project",
    period: "Mar 2023 – Jan 2024",
    description:
      "Built an age (regression) + gender (binary classification) prediction pipeline from face images using a shared EfficientNet backbone (timm/PyTorch) trained on UTKFace with a multi-task loss setup. Shipped an interactive Streamlit demo with real-time face detection via MediaPipe.",
    tags: ["Python", "PyTorch", "timm", "EfficientNet", "MediaPipe", "OpenCV", "Streamlit"],
    highlights: ["Multi-task learning", "EfficientNet backbone", "Live Streamlit demo"],
    link: "#",
    github: "https://github.com/yididiya1/Age_Gender_detection",
    type: "ml",
    Preview: FaceMLPreview,
  },
  {
    title: "Habit & Focus Tracker",
    org: "Personal Project",
    period: "2024",
    description:
      "A full-stack productivity app for building daily habits and deep-work sessions. Features Google OAuth, daily habit check-ins, a Pomodoro-style focus timer, streak tracking, and an analytics dashboard showing completion trends over time.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Google OAuth", "Tailwind CSS"],
    highlights: ["Daily habit check-ins & streaks", "Pomodoro focus timer", "Analytics dashboard"],
    link: "#",
    github: "https://github.com/yididiya1/Habit-Tracker",
    type: "fullstack",
    Preview: HabitTrackerPreview,
  },
  {
    title: "Jobbird — AI Career Tools",
    org: "Personal Project",
    period: "2024",
    description:
      "An AI-powered career assistant that helps job seekers at every stage. Includes an ATS-optimized resume builder, resume–job-description fit scoring, resume tailoring, gap analysis, one-click cover letter generation, and structured interview prep.",
    tags: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "FastAPI"],
    highlights: ["ATS resume builder", "Job-fit scoring & gap analysis", "Cover letter & interview prep"],
    link: "#",
    github: "https://github.com/yididiya1/Resume_Manager",
    type: "ai",
    Preview: JobbirdPreview,
  },
  {
    title: "Chess Tutor",
    org: "Personal Project",
    period: "2024",
    description:
      "An interactive chess learning platform covering openings, common traps, middlegame strategy, endgame technique, and daily puzzles. Lessons are structured by difficulty and include annotated lines so players can study key ideas at their own pace.",
    tags: ["Next.js", "TypeScript", "chess.js", "Tailwind CSS"],
    highlights: ["Opening & trap lessons", "Middlegame & endgame modules", "Daily tactical puzzles"],
    link: "#",
    github: "https://github.com/yididiya1/chess-tutor",
    type: "personal",
    Preview: ChessTutorPreview,
  },
];

const typeColors: Record<string, string> = {
  academic: "rgba(93,184,138,0.12)",
  personal: "rgba(232,150,60,0.12)",
  ml: "rgba(62,201,184,0.12)",
  fullstack: "rgba(232,150,60,0.12)",
  ai: "rgba(62,201,184,0.12)",
};
const typeBorders: Record<string, string> = {
  academic: "rgba(93,184,138,0.35)",
  personal: "rgba(232,150,60,0.35)",
  ml: "rgba(62,201,184,0.35)",
  fullstack: "rgba(232,150,60,0.35)",
  ai: "rgba(62,201,184,0.35)",
};
const typeText: Record<string, string> = {
  academic: "#5DB88A",
  personal: "var(--accent)",
  ml: "#3EC9B8",
  fullstack: "var(--accent)",
  ai: "#3EC9B8",
};
const typeLabels: Record<string, string> = {
  academic: "Academic",
  personal: "Personal",
  ml: "ML / AI",
  fullstack: "Full-Stack",
  ai: "AI / Tools",
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border))" }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-2">§ 03 — selected work</p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Selected{" "}
            <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="card flex flex-col overflow-hidden"
            >
              {/* ── Placeholder image banner ── */}
              <div
                className="relative overflow-hidden"
                style={{ height: "140px", background: "var(--preview-bg)", borderBottom: "1px solid var(--border)" }}
              >
                <proj.Preview />
                {/* Overlay shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/60 to-transparent pointer-events-none" />
              </div>

              {/* ── Card body ── */}
              <div className="p-5 flex flex-col flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      background: typeColors[proj.type],
                      border: `1px solid ${typeBorders[proj.type]}`,
                      color: typeText[proj.type],
                    }}
                  >
                    {typeLabels[proj.type]}
                  </span>
                  <div />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold leading-snug mb-1" style={{ color: "var(--text-primary)" }}>
                  {proj.title}
                </h3>
                <p className="text-xs font-mono mb-3" style={{ color: "var(--accent)" }}>
                  {proj.org} · {proj.period}
                </p>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
                  {proj.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-4">
                  {proj.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t) => (
                    <span key={t} className="tag" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                {(proj.github !== "#" || proj.link !== "#") && (
                  <div className="flex gap-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    {proj.github !== "#" && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-mono font-medium transition-all duration-200"
                        style={{
                          background: "rgba(232,150,60,0.08)",
                          border: "1px solid rgba(232,150,60,0.3)",
                          color: "var(--accent)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "rgba(232,150,60,0.16)";
                          el.style.borderColor = "rgba(232,150,60,0.55)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "rgba(232,150,60,0.08)";
                          el.style.borderColor = "rgba(232,150,60,0.3)";
                        }}
                      >
                        <SiGithub size={12} />
                        View on GitHub
                      </a>
                    )}
                    {proj.link !== "#" && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-mono font-medium transition-all duration-200"
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.borderColor = "rgba(232,150,60,0.4)";
                          el.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.borderColor = "var(--border)";
                          el.style.color = "var(--text-secondary)";
                        }}
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
