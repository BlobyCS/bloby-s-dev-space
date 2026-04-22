import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { id: "domu", label: "Domů" },
  { id: "o-mne", label: "O mě" },
  { id: "projekty", label: "Projekty" },
  { id: "kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const [active, setActive] = useState<string>("domu");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

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
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-foreground/60"
      />
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-5"
      >
        <nav className="mx-auto flex max-w-2xl items-center justify-between rounded-full border border-border bg-background/60 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <a href="#domu" className="flex items-center gap-2 px-3 font-mono text-[13px] font-medium tracking-tight">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            BlobyCZ
          </a>
          <ul className="relative flex items-center gap-0.5 text-[13px]">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    className={`relative z-10 inline-block rounded-full px-3.5 py-1.5 transition-colors duration-300 ${
                      isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.header>
    </>
  );
}
