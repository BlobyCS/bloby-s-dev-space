import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { id: "domu", label: "Domů" },
  { id: "o-mne", label: "O mě" },
  { id: "projekty", label: "Projekty" },
  { id: "kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const [active, setActive] = useState<string>("domu");

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-border bg-surface/70 px-4 py-2 backdrop-blur-xl">
        <a href="#domu" className="flex items-center gap-2 px-2 font-mono text-sm font-semibold tracking-tight">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
          BlobyCZ
        </a>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active === l.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
