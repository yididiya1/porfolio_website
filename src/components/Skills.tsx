"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiPython, SiTypescript, SiJavascript, SiPostgresql, SiDart,
  SiReact, SiNextdotjs, SiRedux, SiHtml5, SiCss,
  SiFastapi, SiNodedotjs, SiGraphql, SiRedis, SiMongodb,
  SiGooglecloud, SiDocker,
  SiPytorch, SiTensorflow, SiNumpy, SiPandas, SiScikitlearn,
  SiApachehadoop, SiApachespark, SiLangchain,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IconType } from "react-icons";

type TechItem = { icon?: IconType; label: string; color: string };
type SkillGroup = { category: string; prefix: string; items: TechItem[] };

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    prefix: "{ }",
    items: [
      { icon: SiPython,     label: "Python",         color: "#3776AB" },
      { icon: SiTypescript, label: "TypeScript",      color: "#3178C6" },
      { icon: SiJavascript, label: "JavaScript",      color: "#F7DF1E" },
      { icon: SiPostgresql, label: "SQL",             color: "#4169E1" },
      { icon: FaJava,       label: "Java",            color: "#ED8B00" },
      { icon: SiDart,       label: "Dart",            color: "#0175C2" },
    ],
  },
  {
    category: "Frontend",
    prefix: "</>",
    items: [
      { icon: SiReact,      label: "React.js",        color: "#61DAFB" },
      { icon: SiNextdotjs,  label: "Next.js",         color: "#e2e8f0" },
      { icon: SiRedux,      label: "Redux",           color: "#764ABC" },
      { icon: SiHtml5,      label: "HTML5",           color: "#E34F26" },
      { icon: SiCss,        label: "CSS3",            color: "#1572B6" },
    ],
  },
  {
    category: "Backend & Cloud",
    prefix: "//",
    items: [
      { icon: SiFastapi,           label: "FastAPI",     color: "#009688" },
      { icon: SiNodedotjs,         label: "Node.js",     color: "#339933" },
      { icon: SiGraphql,           label: "GraphQL",     color: "#E10098" },
      { icon: SiPostgresql,        label: "PostgreSQL",  color: "#4169E1" },
      { icon: SiRedis,             label: "Redis",       color: "#DC382D" },
      { icon: SiMongodb,           label: "MongoDB",     color: "#47A248" },
      { icon: SiGooglecloud,       label: "GCP",         color: "#4285F4" },
      { icon: SiDocker,            label: "Docker",      color: "#2496ED" },
      { label: "AWS",              color: "#FF9900" },
    ],
  },
  {
    category: "AI / ML",
    prefix: "∂",
    items: [
      { icon: SiPytorch,     label: "PyTorch",        color: "#EE4C2C" },
      { icon: SiTensorflow,  label: "TensorFlow",     color: "#FF6F00" },
      { icon: SiScikitlearn, label: "scikit-learn",   color: "#F7931E" },
      { icon: SiLangchain,   label: "LangChain",      color: "#1C3C3C" },
      { icon: SiNumpy,       label: "NumPy",          color: "#4DABCF" },
      { icon: SiPandas,      label: "Pandas",         color: "#E70488" },
      { label: "Hugging Face", color: "#FFD21E" },
      { label: "Matplotlib",  color: "#11557C" },
    ],
  },
  {
    category: "Big Data",
    prefix: "∑",
    items: [
      { icon: SiApachehadoop, label: "Hadoop", color: "#66CCFF" },
      { icon: SiApachespark,  label: "Spark",  color: "#E25A1C" },
      { label: "Hive",              color: "#FDEE21" },
      { label: "Real-time Processing", color: "#10b981" },
    ],
  },
];

function TechBadge({ item, delay }: { item: TechItem; delay: number }) {
  const IconComp = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2, scale: 1.06 }}
      className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg cursor-default"
      style={{
        background: "var(--surface-2, #151d2e)",
        border: "1px solid var(--border)",
        minWidth: "58px",
        width: "60px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = item.color + "66";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 12px ${item.color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {IconComp ? (
        <IconComp size={20} style={{ color: item.color, flexShrink: 0 }} />
      ) : (
        <span
          className="text-sm font-bold leading-none"
          style={{ color: item.color }}
        >
          {item.label.slice(0, 2)}
        </span>
      )}
      <span
        className="text-[9px] font-mono text-center leading-tight w-full"
        style={{ color: "var(--text-secondary)" }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative">
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
          <p className="section-label mb-2">§ 01 — technical stack</p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Skill groups — 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + gi * 0.07 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                  style={{
                    background: "rgba(232,150,60,0.08)",
                    border: "1px solid rgba(232,150,60,0.22)",
                    color: "var(--accent)",
                  }}
                >
                  {group.prefix}
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {group.category}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <TechBadge
                    key={item.label}
                    item={item}
                    delay={0.05 + gi * 0.06 + ii * 0.035}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
