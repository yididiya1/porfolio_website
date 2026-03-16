"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Users, BookOpen, Trophy, Code2 } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const GH_USER = "yididiya1";
const LC_PROFILE = "https://leetcode.com/u/yididiyakebede/";
const GH_PROFILE = `https://github.com/${GH_USER}`;

// ─── Types ────────────────────────────────────────────────────────────────────

type GitHubUser = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

type LeetCodeStats = {
  username: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  error?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00add8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatPill({ icon, val, label }: { icon: React.ReactNode; val: number | string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
      style={{ background:"var(--background)", border:"1px solid var(--border)" }}>
      <span style={{ color:"var(--accent)" }}>{icon}</span>
      <span className="font-semibold" style={{ color:"var(--text-primary)" }}>{val}</span>
      <span style={{ color:"var(--text-muted)" }}>{label}</span>
    </div>
  );
}

function DifficultyBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11px]">
        <span style={{ color }}>{label}</span>
        <span style={{ color:"var(--text-muted)" }}>{solved}<span className="opacity-50">/{total}</span></span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"var(--background)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width:0 }}
          whileInView={{ width:`${pct}%` }}
          transition={{ duration:0.8, ease:EASE }}
          viewport={{ once:true }} />
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col gap-1.5 p-2.5 rounded-xl transition-all duration-150"
      style={{ background:"var(--background)", border:"1px solid var(--border)" }}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(232,150,60,0.25)";}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";}}>
      <div className="flex items-start justify-between gap-1">
        <span className="text-[11px] font-semibold font-mono truncate" style={{ color:"var(--accent)" }}>{repo.name}</span>
        <ExternalLink size={10} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:"var(--text-muted)" }} />
      </div>
      {repo.description && (
        <p className="text-[10px] leading-relaxed line-clamp-1" style={{ color:"var(--text-muted)" }}>{repo.description}</p>
      )}
      <div className="flex items-center gap-2 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:LANG_COLORS[repo.language]??"#888" }} />
            <span className="text-[10px]" style={{ color:"var(--text-muted)" }}>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-0.5">
          <Star size={9} style={{ color:"var(--text-muted)" }} />
          <span className="text-[10px]" style={{ color:"var(--text-muted)" }}>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <GitFork size={9} style={{ color:"var(--text-muted)" }} />
          <span className="text-[10px]" style={{ color:"var(--text-muted)" }}>{repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

// ─── GitHub Panel ─────────────────────────────────────────────────────────────

function GitHubPanel() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
        ]);
        const u: GitHubUser = await uRes.json();
        const r: GitHubRepo[] = await rRes.json();
        const stars = Array.isArray(r) ? r.reduce((s, x) => s + (x.stargazers_count || 0), 0) : 0;
        setUser(u); setRepos(Array.isArray(r) ? r.slice(0, 6) : []); setTotalStars(stars);
      } catch { /* silent */ } finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl h-full"
      style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid var(--border)" }}>
            <Github size={16} style={{ color:"var(--text-primary)" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>{GH_USER}</p>
            <p className="text-[10px]" style={{ color:"var(--text-muted)" }}>github.com/{GH_USER}</p>
          </div>
        </div>
        <a href={GH_PROFILE} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid var(--border)", color:"var(--text-secondary)" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(232,150,60,0.3)";
            (e.currentTarget as HTMLElement).style.color="var(--accent)";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";
            (e.currentTarget as HTMLElement).style.color="var(--text-secondary)";}}>
          Profile <ExternalLink size={10} />
        </a>
      </div>
      {loading ? (
        <div className="flex gap-2">{[1,2,3].map(i=><div key={i} className="h-7 w-20 rounded-xl animate-pulse" style={{ background:"var(--background)" }}/>)}</div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon:<BookOpen size={11}/>, val:user?.public_repos??0, label:"repos" },
            { icon:<Users size={11}/>, val:user?.followers??0, label:"followers" },
            { icon:<Star size={11}/>, val:totalStars, label:"stars" },
          ].map(({ icon, val, label }) => (
            <div key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
              style={{ background:"var(--background)", border:"1px solid var(--border)" }}>
              <span style={{ color:"var(--accent)" }}>{icon}</span>
              <span className="font-semibold" style={{ color:"var(--text-primary)" }}>{val}</span>
              <span style={{ color:"var(--text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="rounded-xl overflow-hidden p-3"
        style={{ background:"var(--background)", border:"1px solid var(--border)" }}>
        <p className="text-[10px] font-mono mb-2" style={{ color:"var(--text-muted)" }}>Contribution activity</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://ghchart.rshah.org/E8963C/${GH_USER}`} alt="GitHub contributions"
          className="w-full" style={{ filter:"saturate(1.2) brightness(0.95)" }} />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-[10px] font-mono" style={{ color:"var(--text-muted)" }}>Top repositories</p>
        {loading ? (
          <div className="flex flex-col gap-2">{[1,2,3,4].map(i=><div key={i} className="h-14 rounded-xl animate-pulse" style={{ background:"var(--background)" }}/>)}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{repos.map(r=><RepoCard key={r.name} repo={r} />)}</div>
        )}
      </div>
    </div>
  );
}

// ─── LeetCode Panel ───────────────────────────────────────────────────────────

const SKILL_TAGS = [
  "Arrays","Strings","Dynamic Programming","Trees","Graphs",
  "Binary Search","Hash Map","Sliding Window","Recursion","BFS/DFS",
];

function LeetCodePanel() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const pct = data ? (data.totalSolved / Math.max(data.totalQuestions, 1)) * 100 : 0;
  const R = 40, C = 2 * Math.PI * R;
  const dash = (C * pct) / 100;

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl h-full"
      style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background:"rgba(255,178,0,0.1)", border:"1px solid rgba(255,178,0,0.2)" }}>
            <SiLeetcode size={16} color="#ffb200" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>yididiyakebede</p>
            <p className="text-[10px]" style={{ color:"var(--text-muted)" }}>leetcode.com/u/yididiyakebede</p>
          </div>
        </div>
        <a href={LC_PROFILE} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
          style={{ background:"rgba(255,178,0,0.06)", border:"1px solid rgba(255,178,0,0.15)", color:"var(--text-secondary)" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,178,0,0.4)";
            (e.currentTarget as HTMLElement).style.color="#ffb200";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,178,0,0.15)";
            (e.currentTarget as HTMLElement).style.color="var(--text-secondary)";}}>
          Profile <ExternalLink size={10} />
        </a>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col gap-3">
          {[1,2,3].map(i=><div key={i} className="h-14 rounded-xl animate-pulse" style={{ background:"var(--background)" }}/>)}
        </div>
      ) : data?.error ? (
        <div className="flex-1 flex items-center justify-center rounded-xl text-xs"
          style={{ background:"var(--background)", color:"var(--text-muted)", border:"1px solid var(--border)" }}>
          Could not load LeetCode data
        </div>
      ) : data ? (
        <>
          <div className="flex items-center gap-5 p-4 rounded-xl"
            style={{ background:"var(--background)", border:"1px solid var(--border)" }}>
            <svg width="96" height="96" viewBox="0 0 96 96" className="flex-shrink-0">
              <circle cx="48" cy="48" r={R} fill="none" strokeWidth="8"
                stroke="rgba(255,178,0,0.1)" />
              <motion.circle cx="48" cy="48" r={R} fill="none" strokeWidth="8"
                stroke="#ffb200" strokeLinecap="round"
                strokeDasharray={`${C}`}
                strokeDashoffset={C}
                transform="rotate(-90 48 48)"
                initial={{ strokeDashoffset: C }}
                whileInView={{ strokeDashoffset: C - dash }}
                transition={{ duration: 1, ease: EASE }}
                viewport={{ once: true }} />
              <text x="48" y="44" textAnchor="middle" fontSize="14" fontWeight="700"
                fill="var(--text-primary)" fontFamily="monospace">{data.totalSolved}</text>
              <text x="48" y="58" textAnchor="middle" fontSize="8"
                fill="var(--text-muted)" fontFamily="monospace">solved</text>
            </svg>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-1.5">
                <Trophy size={12} style={{ color:"#ffb200" }} />
                <span className="text-xs font-semibold" style={{ color:"var(--text-primary)" }}>Rank #{(data.ranking || 0).toLocaleString()}</span>
              </div>
              <p className="text-[10px]" style={{ color:"var(--text-muted)" }}>
                <span style={{ color:"#ffb200", fontWeight:600 }}>{pct.toFixed(1)}%</span> of all problems solved
              </p>
              <p className="text-[10px]" style={{ color:"var(--text-muted)" }}>
                {data.totalSolved} / {data.totalQuestions} total
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl"
            style={{ background:"var(--background)", border:"1px solid var(--border)" }}>
            <p className="text-[10px] font-mono" style={{ color:"var(--text-muted)" }}>By difficulty</p>
            <DifficultyBar label="Easy"   solved={data.easySolved}   total={data.totalEasy}   color="#22c55e" />
            <DifficultyBar label="Medium" solved={data.mediumSolved} total={data.totalMedium} color="#f59e0b" />
            <DifficultyBar label="Hard"   solved={data.hardSolved}   total={data.totalHard}   color="#ef4444" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono" style={{ color:"var(--text-muted)" }}>Topic areas</p>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_TAGS.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                  style={{ background:"rgba(255,178,0,0.08)", border:"1px solid rgba(255,178,0,0.2)", color:"#ffb200" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function CodingStats() {
  return (
    <section id="stats" className="py-20 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.5, ease:EASE }} viewport={{ once:true }} className="mb-10">
          <p className="section-label">§ 07 — coding profiles</p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color:"var(--text-primary)" }}>
            GitHub &amp; <span className="gradient-text">LeetCode</span>
          </h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color:"var(--text-muted)" }}>
            Live stats pulled from GitHub &amp; LeetCode APIs &mdash; refreshed hourly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {[GitHubPanel, LeetCodePanel].map((Panel, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.55, ease:EASE, delay: i * 0.1 }}
              viewport={{ once:true }}>
              <Panel />
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-10 flex items-center justify-center gap-2 text-xs"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.4 }} viewport={{ once:true }}
          style={{ color:"var(--text-muted)" }}>
          <Code2 size={13} style={{ color:"var(--accent)" }} />
          consistent contributor &middot; daily problem solver
        </motion.div>
      </div>
    </section>
  );
}
