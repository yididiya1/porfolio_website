"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
          © {year} Yididiya Kebede Aga. Built with{" "}
          <span style={{ color: "var(--accent)" }}>Next.js</span> +{" "}
          <span style={{ color: "#3EC9B8" }}>Tailwind</span>.
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com/yididiya1" },
            { icon: Linkedin, href: "https://linkedin.com/in/yididiya-kebede" },
            { icon: Mail, href: "mailto:yididiyakebede@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--accent)";
                el.style.borderColor = "rgba(232,150,60,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-muted)";
                el.style.borderColor = "var(--border)";
              }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
