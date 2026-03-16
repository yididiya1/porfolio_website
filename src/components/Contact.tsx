"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Code2, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "yididiyakebede@gmail.com",
    href: "mailto:yididiyakebede@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1-207-408-2261",
    href: "tel:+12074082261",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Portland, ME (willing to relocate)",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/yididiya1",
    href: "https://github.com/yididiya1",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/yididiya-kebede",
    href: "https://linkedin.com/in/yididiya-kebede",
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "leetcode.com/u/yididiyakebede",
    href: "https://leetcode.com/u/yididiyakebede/",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 relative">
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
          <p className="section-label mb-2">// 06. get in touch</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p
            className="mt-4 max-w-xl text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m actively looking for new opportunities. Whether it&apos;s a job, collaboration, or
            just a chat about tech — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-3"
          >
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
                    >
                      <Icon size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
                    >
                      <Icon size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal-style message box */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                ~/contact — bash
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="p-6 font-mono text-sm"
              style={{ background: "#080c14", minHeight: "260px" }}
            >
              <p style={{ color: "#10b981" }}>
                $ <span style={{ color: "var(--text-secondary)" }}>whoami</span>
              </p>
              <p className="mt-1" style={{ color: "var(--text-primary)" }}>Yididiya Kebede Aga</p>

              <p className="mt-4" style={{ color: "#10b981" }}>
                $ <span style={{ color: "var(--text-secondary)" }}>cat ./status.txt</span>
              </p>
              <p className="mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Open to full-time roles in{" "}
                <span style={{ color: "var(--accent)" }}>software engineering</span>,{" "}
                <span style={{ color: "var(--accent)" }}>ML engineering</span>, and{" "}
                <span style={{ color: "var(--accent)" }}>data science</span>.
              </p>

              <p className="mt-4" style={{ color: "#10b981" }}>
                $ <span style={{ color: "var(--text-secondary)" }}>echo $PREFERRED_STACK</span>
              </p>
              <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
                Python · TypeScript · React · FastAPI · PyTorch
              </p>

              <p className="mt-4" style={{ color: "#10b981" }}>
                $ <span style={{ color: "var(--text-secondary)" }}>ping yididiyakebede@gmail.com</span>
              </p>
              <p className="mt-1 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                Reply time: ~24h
                <span className="cursor-blink" style={{ color: "var(--accent)" }}>▌</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
