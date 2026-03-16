"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Swords, Trophy, Clock, Brain } from "lucide-react";

// A sequence of "moves" we'll animate through
const DEMO_MOVES: [number, number][] = [
  [4, 6], // e2
  [4, 4], // e4
  [4, 1], // e7
  [4, 3], // e5
  [5, 7], // f1 (bishop)
  [2, 4], // c4
  [6, 7], // g1 (knight)
  [5, 5], // f3
];

type PieceType = "♙" | "♟" | "♖" | "♜" | "♘" | "♞" | "♗" | "♝" | "♕" | "♛" | "♔" | "♚" | null;

function buildInitialBoard(): PieceType[][] {
  const b: PieceType[][] = Array.from({ length: 8 }, () => Array(8).fill(null));
  // White pieces (row 7 = rank 1)
  const backRow: PieceType[] = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
  backRow.forEach((p, c) => { b[7][c] = p; });
  for (let c = 0; c < 8; c++) b[6][c] = "♙";
  // Black pieces (row 0 = rank 8)
  const blackRow: PieceType[] = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
  blackRow.forEach((p, c) => { b[0][c] = p; });
  for (let c = 0; c < 8; c++) b[1][c] = "♟";
  return b;
}

function MiniBoard() {
  const [board, setBoard] = useState<PieceType[][]>(buildInitialBoard());
  const [highlighted, setHighlighted] = useState<[number, number] | null>(null);
  const [moveIdx, setMoveIdx] = useState(0);

  useEffect(() => {
    if (moveIdx + 1 >= DEMO_MOVES.length) return;
    const id = setTimeout(() => {
      const [fromC, fromR] = DEMO_MOVES[moveIdx];
      const [toC, toR] = DEMO_MOVES[moveIdx + 1];
      setBoard((prev) => {
        const next = prev.map((row) => [...row]) as PieceType[][];
        next[toR][toC] = next[fromR][fromC];
        next[fromR][fromC] = null;
        return next;
      });
      setHighlighted([toR, toC]);
      setMoveIdx((m) => m + 2);
    }, 1200);
    return () => clearTimeout(id);
  }, [moveIdx]);

  return (
    <div className="select-none" style={{ width: "100%", maxWidth: "260px" }}>
      {/* Board */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          border: "2px solid rgba(0,212,255,0.25)",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 0 40px rgba(0,212,255,0.08)",
        }}
      >
        {board.map((row, r) =>
          row.map((piece, c) => {
            const isLight = (r + c) % 2 === 0;
            const isHl = highlighted && highlighted[0] === r && highlighted[1] === c;
            return (
              <div
                key={`${r}-${c}`}
                className="flex items-center justify-center"
                style={{
                  aspectRatio: "1",
                  background: isHl
                    ? "rgba(0,212,255,0.22)"
                    : isLight
                    ? "#1a2535"
                    : "#0d1520",
                  transition: "background 0.3s",
                  fontSize: "clamp(10px, 2.5vw, 18px)",
                }}
              >
                {piece && (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    {piece}
                  </motion.span>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Rank labels */}
      <div className="flex justify-between mt-1 px-0.5">
        {"abcdefgh".split("").map((l) => (
          <span key={l} className="text-[9px] font-mono text-center flex-1" style={{ color: "var(--text-muted)" }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

const stats = [
  { icon: Trophy, label: "Favorite opening", value: "Sicilian Defense" },
  { icon: Clock,  label: "Preferred time control", value: "10+0 Rapid" },
  { icon: Brain,  label: "Style", value: "Positional / Tactical" },
];

export default function Chess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="chess"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* BG decoration */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border))" }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
            >
              <p className="section-label mb-3">// 05. beyond the code</p>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Want to play{" "}
                <span className="gradient-text">chess</span> with me?
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                When I&apos;m not building software or training models, I&apos;m playing chess. I find it
                sharpens the same muscles I use as an engineer — pattern recognition, long-term
                planning, and staying calm under pressure. Challenge me any time!
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3 mb-8"
            >
              {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.18 + i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "var(--background)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
                  >
                    <Icon size={15} style={{ color: "#a78bfa" }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://lichess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "#a78bfa",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.15)";
                }}
              >
                <Swords size={15} />
                Challenge on Lichess
                <ExternalLink size={12} />
              </a>
              <a
                href="https://chess.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,255,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                }}
              >
                Play on Chess.com
                <ExternalLink size={12} />
              </a>
            </motion.div>
          </div>

          {/* Right: animated mini chess board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Terminal bar */}
            <div
              className="w-full rounded-t-xl px-4 py-2 flex items-center gap-2"
              style={{ background: "#080c14", border: "1px solid var(--border)" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                live_game.pgn — auto-play
              </span>
            </div>
            <div
              className="w-full flex flex-col items-center p-6 rounded-b-xl"
              style={{ background: "#080c14", border: "1px solid var(--border)", borderTop: "none" }}
            >
              <MiniBoard />
              <p className="mt-4 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                watching live demo · moves auto-playing ♟
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
