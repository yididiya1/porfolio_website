"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

// ── Inline SVG placeholder illustrations ─────────────────────────────────────
function SubscriberAnalyticsPreview() {
  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="140" fill="#0a0e17" />
      {/* Grid lines */}
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="32" y1={y} x2="300" y2={y} stroke="#1e2d45" strokeWidth="0.5" />
      ))}
      {/* Bars */}
      {[
        { x: 45,  h: 70, color: "#00d4ff" },
        { x: 80,  h: 45, color: "#00d4ff" },
        { x: 115, h: 90, color: "#10b981" },
        { x: 150, h: 55, color: "#00d4ff" },
        { x: 185, h: 100, color: "#10b981" },
        { x: 220, h: 40, color: "#00d4ff" },
        { x: 255, h: 75, color: "#7c3aed" },
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
      <rect width="320" height="140" fill="#0a0e17" />
      {[40, 70, 100, 130].map((y) => (
        <line key={y} x1="24" y1={y} x2="300" y2={y} stroke="#1e2d45" strokeWidth="0.5" />
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
        stroke="#00d4ff"
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
      <rect width="320" height="140" fill="#0a0e17" />
      {/* Neural net dots background */}
      {[...Array(20)].map((_, i) => (
        <circle key={i} cx={18 + (i % 5) * 70} cy={20 + Math.floor(i / 5) * 22} r="1.5" fill="#1e2d45" />
      ))}
      {faces.map((f, i) => (
        <g key={i}>
          {/* Detection box */}
          <rect x={f.cx - f.r - 2} y={f.cy - f.r - 2} width={(f.r + 2) * 2} height={(f.r + 2) * 2}
            rx="3" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4 2" fill="transparent" opacity="0.7" />
          {/* Face circle */}
          <circle cx={f.cx} cy={f.cy} r={f.r} fill="#151d2e" stroke="#1e2d45" strokeWidth="1" />
          {/* Eyes */}
          <circle cx={f.cx - 9} cy={f.cy - 6} r="3.5" fill="#00d4ff" opacity="0.5" />
          <circle cx={f.cx + 9} cy={f.cy - 6} r="3.5" fill="#00d4ff" opacity="0.5" />
          {/* Smile */}
          <path d={`M${f.cx - 9} ${f.cy + 8} Q${f.cx} ${f.cy + 16} ${f.cx + 9} ${f.cy + 8}`}
            stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Label */}
          <rect x={f.cx - f.r - 2} y={f.cy + f.r} width={(f.r + 2) * 2} height="16"
            rx="2" fill="#00d4ff" opacity="0.85" />
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
    type: "ml",
    Preview: FaceMLPreview,
  },
];

const typeColors: Record<string, string> = {
  academic: "rgba(16,185,129,0.12)",
  personal: "rgba(0,212,255,0.12)",
  ml: "rgba(124,58,237,0.12)",
};
const typeBorders: Record<string, string> = {
  academic: "rgba(16,185,129,0.3)",
  personal: "rgba(0,212,255,0.3)",
  ml: "rgba(124,58,237,0.3)",
};
const typeText: Record<string, string> = {
  academic: "#10b981",
  personal: "var(--accent)",
  ml: "#a78bfa",
};
const typeLabels: Record<string, string> = {
  academic: "Academic",
  personal: "Personal",
  ml: "ML / AI",
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
          <p className="section-label mb-2">// 03. selected work</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Academic{" "}
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
                style={{ height: "140px", background: "#080c14", borderBottom: "1px solid var(--border)" }}
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
                  <div className="flex gap-2">
                    {proj.link !== "#" && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
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
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <span key={t} className="tag" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
