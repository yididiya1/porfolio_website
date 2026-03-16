"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Northeastern University",
    location: "Boston, MA",
    degree: "Master of Science in Data Science",
    college: "Khoury College of Computer Sciences",
    period: "Sep. 2025 – Jun. 2027",
    gpa: "4.0 / 4.0",
    courses: [
      "Essentials of Data Science",
      "Algorithms",
      "Unsupervised Machine Learning",
      "Machine Learning",
    ],
    current: true,
  },
  {
    school: "Addis Ababa University",
    location: "Addis Ababa, ET",
    degree: "Bachelor of Science in Software Engineering",
    college: "",
    period: "Sep. 2017 – Jun. 2022",
    gpa: null,
    courses: [
      "OOP I & II",
      "Web Programming",
      "Mobile Programming",
      "Probability & Statistics",
    ],
    current: false,
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-24 relative" style={{ background: "var(--surface)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border))" }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-2">// 04. background</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="rounded-xl p-7 relative overflow-hidden"
              style={{
                background: "var(--background)",
                border: `1px solid ${edu.current ? "rgba(0,212,255,0.3)" : "var(--border)"}`,
              }}
            >
              {edu.current && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-xs font-mono rounded-bl-xl"
                  style={{ background: "rgba(0,212,255,0.12)", color: "var(--accent)" }}
                >
                  Current
                </div>
              )}

              {/* Icon + school */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: edu.current ? "rgba(0,212,255,0.1)" : "rgba(124,58,237,0.1)",
                    border: `1px solid ${edu.current ? "rgba(0,212,255,0.25)" : "rgba(124,58,237,0.25)"}`,
                  }}
                >
                  <GraduationCap
                    size={20}
                    style={{ color: edu.current ? "var(--accent)" : "#a78bfa" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-bold text-base leading-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {edu.school}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {edu.location}
                  </p>
                </div>
              </div>

              {/* Degree */}
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                {edu.degree}
              </p>
              {edu.college && (
                <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                  {edu.college}
                </p>
              )}

              {/* Period + GPA */}
              <div className="flex flex-wrap gap-3 mb-5">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {edu.period}
                </span>
                {edu.gpa && (
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
                    }}
                  >
                    GPA {edu.gpa}
                  </span>
                )}
              </div>

              {/* Courses */}
              <div>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--text-muted)" }}>
                  Related Courses
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-3 py-1 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {c}
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
