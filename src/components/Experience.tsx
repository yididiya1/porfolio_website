"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Hydrus.ai",
    location: "Remote (San Francisco, CA)",
    period: "Jan 2025 – Jul 2025",
    link: "#",
    tags: ["React.js", "TypeScript", "Redux", "Shadcn/ui", "AWS"],
    bullets: [
      "Built a real-time carbon-emissions analytics and reporting platform using React.js (TypeScript) + Redux + Shadcn/ui, delivering live dashboards and automated compliance-ready reporting from large-scale environmental datasets.",
      "Improved ESG reporting workflows by reducing latency and boosting throughput by 30% through algorithm and data-processing optimizations, enabling faster risk assessment for sustainability stakeholders.",
      "Supported cloud-based workflows on AWS including data access, app integrations, and production environment collaboration.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Africa to Silicon Valley",
    location: "Palo Alto, CA",
    period: "Feb 2023 – Dec 2024",
    link: "#",
    tags: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "LangChain", "RAG", "C++"],
    bullets: [
      "AI Learning Platform: Built an AI-powered learning product with personalized paths, adaptive quizzes, and an AI exam assistant using React, Python/FastAPI, PostgreSQL, and Redis; onboarded 2,000 students in 8 weeks and increased engagement by 50%.",
      "Professional AI Tools Platform: Developed a web platform integrating AI models/agents into 50+ customizable tools for professionals; improved responsiveness and throughput via C++ backend optimizations and Python scripting.",
      "Built a RAG pipeline to generate learning content from high-school textbooks using LangChain, Pinecone (vector retrieval), OpenAI GPT, and OpenAI text-embedding — including ingestion, chunking, embedding-based retrieval, and grounded response templates.",
      "Scaled systems through rapid growth while maintaining 99.9% uptime and improving performance by 36% through architecture upgrades and cross-functional collaboration with product/ML teams.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 relative" style={{ background: "var(--surface)" }}>
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
          <p className="section-label mb-2">// 02. work history</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-7 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center z-10"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      border: "1px solid rgba(0,212,255,0.3)",
                    }}
                  >
                    <Briefcase size={18} style={{ color: "var(--accent)" }} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-xl p-6"
                  style={{ background: "var(--background)", border: "1px solid var(--border)" }}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "var(--accent)" }}
                        >
                          {exp.company}
                        </span>
                        {exp.link !== "#" && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={13} style={{ color: "var(--text-muted)" }} />
                          </a>
                        )}
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          · {exp.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(0,212,255,0.07)",
                        border: "1px solid rgba(0,212,255,0.2)",
                        color: "var(--accent)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
