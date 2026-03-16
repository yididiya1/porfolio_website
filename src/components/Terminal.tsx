"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
type Segment = { text: string; color?: string; bold?: boolean };
type Line = { segments: Segment[]; isCommand?: boolean; prompt?: string };

// ── Resume data baked in ────────────────────────────────────────────────────
const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { segments: [{ text: "Available commands:", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  whoami       ", color: "#10b981" }, { text: "→ About me" }] },
    { segments: [{ text: "  skills       ", color: "#10b981" }, { text: "→ Technical skills" }] },
    { segments: [{ text: "  experience   ", color: "#10b981" }, { text: "→ Work history" }] },
    { segments: [{ text: "  projects     ", color: "#10b981" }, { text: "→ Academic & personal projects" }] },
    { segments: [{ text: "  education    ", color: "#10b981" }, { text: "→ Education background" }] },
    { segments: [{ text: "  contact      ", color: "#10b981" }, { text: "→ Get in touch" }] },
    { segments: [{ text: "  chess        ", color: "#10b981" }, { text: "→ Challenge me to a game ♟" }] },
    { segments: [{ text: "  hire [co]    ", color: "#10b981" }, { text: "→ Send a hire request" }] },
    { segments: [{ text: "  clear        ", color: "#10b981" }, { text: "→ Clear terminal" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  Tip: ", color: "#f59e0b" }, { text: "press ↑/↓ to navigate history" }] },
  ],

  whoami: () => [
    { segments: [{ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: "#2E2520" }] },
    { segments: [{ text: "  Yididiya Kebede Aga", color: "#E8963C", bold: true }] },
    { segments: [{ text: "  MS Data Science — Northeastern University (GPA: 4.0)", color: "#94a3b8" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  Role:     ", color: "#3EC9B8" }, { text: "Full-Stack Developer · ML Engineer · Data Scientist" }] },
    { segments: [{ text: "  Location: ", color: "#3EC9B8" }, { text: "Portland, ME (willing to relocate)" }] },
    { segments: [{ text: "  Status:   ", color: "#3EC9B8" }, { text: "✅ Available for opportunities", color: "#10b981" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  I build intelligent, scalable systems — from real-time analytics", color: "#94a3b8" }] },
    { segments: [{ text: "  platforms to AI-powered learning tools. I love turning messy", color: "#94a3b8" }] },
    { segments: [{ text: "  data into things that actually matter.", color: "#94a3b8" }] },
    { segments: [{ text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: "#2E2520" }] },
  ],

  skills: () => [
    { segments: [{ text: "Technical Skills", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  Languages   ", color: "#f59e0b", bold: true }, { text: "Python  TypeScript  JavaScript  SQL  Java  Dart", color: "#94a3b8" }] },
    { segments: [{ text: "  Frontend    ", color: "#f59e0b", bold: true }, { text: "React.js  Next.js  Redux  HTML5  CSS3", color: "#94a3b8" }] },
    { segments: [{ text: "  Backend     ", color: "#f59e0b", bold: true }, { text: "FastAPI  Node.js  REST  GraphQL  PostgreSQL  Redis  MongoDB", color: "#94a3b8" }] },
    { segments: [{ text: "  Cloud       ", color: "#f59e0b", bold: true }, { text: "AWS  GCP  Docker", color: "#94a3b8" }] },
    { segments: [{ text: "  AI / ML     ", color: "#f59e0b", bold: true }, { text: "PyTorch  TensorFlow  HuggingFace  scikit-learn  LangChain", color: "#94a3b8" }] },
    { segments: [{ text: "  Big Data    ", color: "#f59e0b", bold: true }, { text: "Hadoop  Hive  Spark  Real-time Processing", color: "#94a3b8" }] },
  ],

  experience: () => [
    { segments: [{ text: "Work Experience", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  [1] Full-Stack Developer @ Hydrus.ai", color: "#10b981", bold: true }] },
    { segments: [{ text: "      Jan 2025 – Jul 2025 · Remote (San Francisco, CA)", color: "#4a5568" }] },
    { segments: [{ text: "      • Real-time carbon-emissions analytics platform (React + Redux)", color: "#94a3b8" }] },
    { segments: [{ text: "      • 30% latency reduction on ESG reporting workflows", color: "#94a3b8" }] },
    { segments: [{ text: "      • AWS cloud infrastructure & production collaboration", color: "#94a3b8" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  [2] Software Engineer @ Africa to Silicon Valley", color: "#10b981", bold: true }] },
    { segments: [{ text: "      Feb 2023 – Dec 2024 · Palo Alto, CA", color: "#4a5568" }] },
    { segments: [{ text: "      • AI learning platform → 2,000 students in 8 weeks, +50% engagement", color: "#94a3b8" }] },
    { segments: [{ text: "      • RAG pipeline: LangChain + Pinecone + OpenAI on textbooks", color: "#94a3b8" }] },
    { segments: [{ text: "      • 50+ AI professional tools, 99.9% uptime, +36% perf gains", color: "#94a3b8" }] },
  ],

  projects: () => [
    { segments: [{ text: "Projects", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  [1] Subscriber Analytics · Maine Trust for Local News", color: "#3EC9B8", bold: true }] },
    { segments: [{ text: "      Python · Pandas · scikit-learn · Tableau", color: "#4a5568" }] },
    { segments: [{ text: "      EDA, churn prediction (Random Forest, Logistic Regression)", color: "#94a3b8" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  [2] Modular ML Trading Research System", color: "#3EC9B8", bold: true }] },
    { segments: [{ text: "      Python · Marimo · scikit-learn · yfinance · Matplotlib", color: "#4a5568" }] },
    { segments: [{ text: "      Trade labeling engine, equity curves, backtesting framework", color: "#94a3b8" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  [3] Age & Gender Estimation from Face Images", color: "#3EC9B8", bold: true }] },
    { segments: [{ text: "      PyTorch · EfficientNet · MediaPipe · Streamlit", color: "#4a5568" }] },
    { segments: [{ text: "      Multi-task learning on UTKFace, live Streamlit demo", color: "#94a3b8" }] },
  ],

  education: () => [
    { segments: [{ text: "Education", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  🎓 Northeastern University", color: "#10b981", bold: true }] },
    { segments: [{ text: "     MS Data Science · Khoury College of Computer Sciences", color: "#94a3b8" }] },
    { segments: [{ text: "     Sep 2025 – Jun 2027 · GPA: 4.0 / 4.0 ⭐", color: "#f59e0b" }] },
    { segments: [{ text: "     Algorithms, ML, Unsupervised ML, Essentials of Data Science", color: "#4a5568" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  🎓 Addis Ababa University", color: "#10b981", bold: true }] },
    { segments: [{ text: "     BS Software Engineering", color: "#94a3b8" }] },
    { segments: [{ text: "     Sep 2017 – Jun 2022", color: "#f59e0b" }] },
    { segments: [{ text: "     OOP, Web Programming, Mobile Programming, Probability & Stats", color: "#4a5568" }] },
  ],

  contact: () => [
    { segments: [{ text: "Contact", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  📧 Email    ", color: "#3EC9B8" }, { text: "yididiyakebede@gmail.com" }] },
    { segments: [{ text: "  📱 Phone    ", color: "#3EC9B8" }, { text: "+1-207-408-2261" }] },
    { segments: [{ text: "  🔗 LinkedIn ", color: "#3EC9B8" }, { text: "linkedin.com/in/yididiya-kebede" }] },
    { segments: [{ text: "  🐙 GitHub   ", color: "#3EC9B8" }, { text: "github.com/yididiya1" }] },
    { segments: [{ text: "  ♟  LeetCode ", color: "#3EC9B8" }, { text: "leetcode.com/u/yididiyakebede" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  Response time: ~24h ⚡", color: "#10b981" }] },
  ],

  chess: () => [
    { segments: [{ text: "Chess Challenge 🎯", color: "#E8963C", bold: true }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  I'm always up for a game." }] },
    { segments: [{ text: "  Favorite opening : Sicilian Defense", color: "#94a3b8" }] },
    { segments: [{ text: "  Time control     : 10+0 Rapid", color: "#94a3b8" }] },
    { segments: [{ text: "  Style            : Positional / Tactical", color: "#94a3b8" }] },
    { segments: [{ text: "" }] },
    { segments: [{ text: "  → Challenge on Lichess: ", color: "#3EC9B8" }, { text: "https://lichess.org" }] },
    { segments: [{ text: "  → Challenge on Chess.com: ", color: "#3EC9B8" }, { text: "https://chess.com" }] },
  ],
};

// Easter-egg commands
const EASTER_EGGS: Record<string, Line[]> = {
  "sudo hire yididiya": [
    { segments: [{ text: "[sudo] password for recruiter: ", color: "#f59e0b" }] },
    { segments: [{ text: "Authenticating..." }] },
    { segments: [{ text: "✅ Access granted. Excellent choice.", color: "#10b981", bold: true }] },
    { segments: [{ text: "📨 Forwarding resume to your hiring pipeline...", color: "#E8963C" }] },
    { segments: [{ text: "🚀 Yididiya will report on Monday.", color: "#10b981", bold: true }] },
  ],
  "rm -rf /": [
    { segments: [{ text: "Nice try 😄", color: "#ef4444", bold: true }] },
    { segments: [{ text: "This terminal is sandboxed. No nukes here.", color: "#94a3b8" }] },
  ],
  "ls": [
    { segments: [{ text: "brain.py  coffee.sh  side_projects/  leetcode/  chess_games/ ", color: "#10b981" }] },
    { segments: [{ text: "resume.pdf  offer_letters/  big_dreams.md", color: "#10b981" }] },
  ],
  "pwd": [
    { segments: [{ text: "/home/yididiya/building-cool-things", color: "#10b981" }] },
  ],
  "cat resume.pdf": [
    { segments: [{ text: "You're already reading it — this whole site is my resume 😉", color: "#f59e0b" }] },
  ],
  "git log --oneline": [
    { segments: [{ text: "a1b2c3d  feat: ship portfolio website", color: "#10b981" }] },
    { segments: [{ text: "b2c3d4e  feat: add RAG pipeline to learning platform", color: "#94a3b8" }] },
    { segments: [{ text: "c3d4e5f  perf: reduce latency by 30% on ESG dashboards", color: "#94a3b8" }] },
    { segments: [{ text: "d4e5f6a  feat: onboard 2000 students to AI learning platform", color: "#94a3b8" }] },
    { segments: [{ text: "e5f6a7b  chore: fuel up on coffee ☕", color: "#4a5568" }] },
  ],
};

function processHire(args: string): Line[] {
  const company = args.trim() || "your company";
  return [
    { segments: [{ text: `📨 Hire request sent to ${company}...`, color: "#E8963C" }] },
    { segments: [{ text: "✅ Done! Yididiya has been notified.", color: "#10b981", bold: true }] },
    { segments: [{ text: "📧 Reach out at yididiyakebede@gmail.com", color: "#94a3b8" }] },
  ];
}

const WELCOME: Line[] = [
  { segments: [{ text: "╔═══════════════════════════════════════════╗", color: "#2E2520" }] },
  { segments: [{ text: "║   Welcome to Yididiya's interactive CLI   ║", color: "#E8963C" }] },
  { segments: [{ text: "╚═══════════════════════════════════════════╝", color: "#2E2520" }] },
  { segments: [{ text: "" }] },
  { segments: [{ text: "  Type ", color: "#94a3b8" }, { text: "help", color: "#10b981", bold: true }, { text: " to see available commands.", color: "#94a3b8" }] },
  { segments: [{ text: "  There may be some ", color: "#94a3b8" }, { text: "easter eggs", color: "#f59e0b" }, { text: " hidden around... 👀", color: "#94a3b8" }] },
  { segments: [{ text: "" }] },
];

// ── Render a single line ─────────────────────────────────────────────────────
function RenderLine({ line }: { line: Line }) {
  if (line.isCommand) {
    return (
      <div className="flex items-start gap-1">
        <span style={{ color: "#10b981", fontWeight: 600, flexShrink: 0 }}>
          {line.prompt ?? "visitor@yididiya.dev:~$"}
        </span>
        <span style={{ color: "#e2e8f0" }}>&nbsp;{line.segments[0]?.text}</span>
      </div>
    );
  }
  return (
    <div>
      {line.segments.map((seg, i) => (
        <span
          key={i}
          style={{
            color: seg.color ?? "#94a3b8",
            fontWeight: seg.bold ? 700 : 400,
          }}
        >
          {seg.text}
        </span>
      ))}
    </div>
  );
}

// ── Main Terminal component ─────────────────────────────────────────────────
export default function TerminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [expanded, setExpanded] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    const commandLine: Line = {
      segments: [{ text: raw }],
      isCommand: true,
    };

    if (trimmed === "clear") {
      setLines(WELCOME);
      return;
    }

    // Check easter eggs first
    if (EASTER_EGGS[trimmed]) {
      setLines((prev) => [...prev, commandLine, ...EASTER_EGGS[trimmed]!, { segments: [{ text: "" }] }]);
      return;
    }

    // Named commands
    const [cmd, ...rest] = trimmed.split(" ");
    if (cmd === "hire") {
      const result = processHire(rest.join(" "));
      setLines((prev) => [...prev, commandLine, ...result, { segments: [{ text: "" }] }]);
      return;
    }

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]!();
      setLines((prev) => [...prev, commandLine, ...result, { segments: [{ text: "" }] }]);
      return;
    }

    // Unknown command
    setLines((prev) => [
      ...prev,
      commandLine,
      {
        segments: [
          { text: `bash: ${cmd}: command not found. `, color: "#ef4444" },
          { text: "Type ", color: "#94a3b8" },
          { text: "help", color: "#10b981" },
          { text: " for available commands.", color: "#94a3b8" },
        ],
      },
      { segments: [{ text: "" }] },
    ]);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (!input.trim()) return;
        runCommand(input);
        setHistory((prev) => [input, ...prev].slice(0, 50));
        setHistoryIdx(-1);
        setInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIdx((idx) => {
          const next = Math.min(idx + 1, history.length - 1);
          setInput(history[next] ?? "");
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIdx((idx) => {
          const next = Math.max(idx - 1, -1);
          setInput(next === -1 ? "" : (history[next] ?? ""));
          return next;
        });
      } else if (e.key === "Tab") {
        e.preventDefault();
        const cmds = [...Object.keys(COMMANDS), "clear", "hire", "sudo hire yididiya"];
        const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    },
    [input, history, runCommand]
  );

  const terminalHeight = expanded ? "520px" : "340px";

  return (
    <section id="terminal" className="py-24 relative" style={{ background: "var(--surface)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border))" }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="section-label mb-2">§ try me out</p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Interactive{" "}
            <span className="gradient-text">Terminal</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            A fully interactive CLI — type <code className="font-mono" style={{ color: "#10b981" }}>help</code> to get started. There&apos;s also a few hidden easter eggs 🥚
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)", boxShadow: "0 0 60px rgba(232,150,60,0.05)" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "var(--terminal-bar)", borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <div className="flex items-center gap-1.5 ml-3">
                <TerminalIcon size={13} style={{ color: "#10b981" }} />
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  visitor@yididiya.dev — bash
                </span>
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 rounded transition-colors"
              style={{ color: "var(--text-muted)" }}
              title={expanded ? "Minimize" : "Maximize"}
            >
              {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>

          {/* Output area */}
          <div
            ref={outputRef}
            className="overflow-y-auto px-5 pt-4 pb-2 font-mono text-sm leading-6 transition-all duration-300"
            style={{
              background: "var(--terminal-bg)",
              height: terminalHeight,
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) transparent",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <RenderLine key={i} line={line} />
            ))}
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-3 px-5 py-3 font-mono text-sm"
            style={{ background: "var(--terminal-bg)", borderTop: "1px solid var(--border)" }}
          >
            <span style={{ color: "#10b981", fontWeight: 600, whiteSpace: "nowrap", fontSize: "0.8rem" }}>
              visitor@yididiya.dev:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="type a command..."
              className="flex-1 bg-transparent outline-none text-sm font-mono"
              style={{
                color: "#e2e8f0",
                caretColor: "#E8963C",
              }}
            />
            <span className="cursor-blink text-base" style={{ color: "var(--accent)" }}>▌</span>
          </div>
        </motion.div>

        {/* Hint pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {["help", "whoami", "skills", "projects", "sudo hire yididiya"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                setTimeout(() => {
                  runCommand(cmd);
                  setHistory((prev) => [cmd, ...prev].slice(0, 50));
                  setInput("");
                }, 80);
              }}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-all duration-150"
              style={{
                background: "rgba(232,150,60,0.06)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,150,60,0.35)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
