import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { id: "domu", label: "Domů" },
  { id: "o-mne", label: "O mě" },
  { id: "projekty", label: "Projekty" },
  { id: "kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const [active, setActive] = useState<string>("domu");
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          <a
            href="#domu"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 font-mono text-[13px] font-medium tracking-tight"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            BlobyCZ
          </a>

          {/* Desktop */}
          <ul className="relative hidden items-center gap-0.5 text-[13px] sm:flex">
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

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground sm:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-3 max-w-2xl overflow-hidden rounded-3xl border border-border bg-background/85 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:hidden"
            >
              <ul className="flex flex-col">
                {links.map((l, i) => {
                  const isActive = active === l.id;
                  return (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <a
                        href={`#${l.id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors ${
                          isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
