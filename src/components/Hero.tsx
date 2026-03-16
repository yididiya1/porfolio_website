"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Code2 } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/ThemeProvider";

const roles = ["Full-Stack Developer", "ML Engineer", "Data Scientist", "Backend Engineer"];

const EASE: Easing = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
});

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const [engineReady, setEngineReady] = useState(false);
  const { theme } = useTheme();

  const particlesConfig = useMemo<ISourceOptions>(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.5 } },
        push: { quantity: 3 },
      },
    },
    particles: {
      color: { value: ["#E8963C", "#3EC9B8", "#5DB88A"] },
      links: {
        color: theme === "dark" ? "#2E2520" : "#C8B89A",
        distance: 140,
        enable: true,
        opacity: theme === "dark" ? 0.35 : 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
      number: { value: 70, density: { enable: true } },
      opacity: { value: { min: 0.2, max: 0.7 }, animation: { enable: true, speed: 0.5, sync: false } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [theme]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = roles[roleIdx];
      if (!roleRef.current) return;

      if (!deleting) {
        roleRef.current.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        roleRef.current.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      timeout = setTimeout(type, deleting ? 50 : 80);
    };

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* tsParticles background */}
      {engineReady && (
        <Particles
          key={theme}
          id="hero-particles"
          particlesLoaded={particlesLoaded}
          options={particlesConfig}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Gradient blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.09]"
        style={{ background: "radial-gradient(circle, #E8963C 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #3EC9B8 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Yididiya{" "}
          <span className="gradient-text">Kebede</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex items-center justify-center gap-2 mb-6 text-xl sm:text-2xl font-mono"
          style={{ color: "var(--text-secondary)" }}
        >
          <Code2 size={20} style={{ color: "var(--accent)" }} />
          <span ref={roleRef} style={{ color: "var(--text-primary)", minWidth: "220px", textAlign: "left" }} />
          <span className="cursor-blink text-[var(--accent)]">|</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.4)}
          className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          MS Data Science candidate at{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Northeastern University</span>. I build intelligent, scalable systems — from real-time analytics platforms to
          AI-powered learning tools. Passionate about turning complex data into meaningful products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "#0a0e17",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,150,60,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
            }}
          >
            View Projects
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.6)} className="flex justify-center gap-4 mb-16">
          {[
            { icon: Github, href: "https://github.com/yididiya1", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/yididiya-kebede", label: "LinkedIn" },
            { icon: Mail, href: "mailto:yididiyakebede@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(232,150,60,0.4)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-secondary)";
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

        {/* Quick stat pills */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { label: "Portland, ME", note: "willing to relocate" },
            { label: "4.0 GPA", note: "Northeastern" },
            { label: "2+ Years", note: "professional exp." },
            { label: "5+ Projects", note: "shipped & deployed" },
          ].map((s) => (
            <div
              key={s.label}
              className="px-4 py-2 rounded-lg text-sm"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{s.label}</span>
              <span style={{ color: "var(--text-muted)" }} className="ml-1 text-xs">{s.note}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        scroll
        <ChevronDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
