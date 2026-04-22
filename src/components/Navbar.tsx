import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Domů" },
  { to: "/o-mne", label: "O mě" },
  { to: "/projekty", label: "Projekty" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-surface/60 px-5 py-3 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow" />
          <span className="text-gradient">BlobyCZ</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className="relative rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary/60" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
