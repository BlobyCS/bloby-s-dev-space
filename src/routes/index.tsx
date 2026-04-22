import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, GitFork, Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SiTypescript, SiJavascript, SiPhp, SiLinux, SiGithub, SiDiscord, SiInstagram } from "react-icons/si";
import { TbBrandCSharp, TbBrandWindows } from "react-icons/tb";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlobyCZ — Backend Developer" },
      { name: "description", content: "Portfolio BlobyCZ — backend developer z Brna. TypeScript, JavaScript, PHP, C#." },
    ],
  }),
  component: Home,
});

const langs = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "C#", Icon: TbBrandCSharp, color: "#9B4F96" },
];

const os = [
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "Windows", Icon: TbBrandWindows, color: "#0078D6" },
];

type Project = {
  repo: string;
  title: string;
  stack: string[];
  description: string;
  long: string;
};

const projects: Project[] = [
  {
    repo: "InsaneKick",
    title: "InsaneKick",
    stack: ["Java", "SpigotAPI", "Bukkit"],
    description:
      "Jednoduchý Minecraft plugin, který hráče po každé smrti automaticky vyhodí ze serveru.",
    long: "Lehký Minecraft plugin postavený na SpigotAPI a Bukkit. Naslouchá PlayerDeathEvent a hráče okamžitě po smrti odpojí ze serveru. Hlavně určen na eventy typu hardcore / last man standing, kde každá chyba znamená konec.",
  },
  {
    repo: "MessageBot",
    title: "MessageBot",
    stack: ["TypeScript", "Discord.js"],
    description:
      "Discord bot v TypeScriptu s dynamickým načítáním příkazů a eventů.",
    long: "Modulární Discord bot napsaný v TypeScriptu nad Discord.js. Dynamicky načítá příkazy i eventy ze složek, takže přidat nový command znamená jen vytvořit soubor. Obsahuje příkazy help, stats, send, senddm a info, plnou podporu slash interakcí i klasických zpráv.",
  },
  {
    repo: "pckgi",
    title: "pckgi",
    stack: ["JavaScript", "NPM"],
    description: "Moderní CLI nástroj pro správu balíčků NPM.",
    long: "pckgi je moderní CLI alternativa pro práci s NPM balíčky. Navržený s důrazem na rychlost, čistý výstup a příjemné UX v terminálu. Vhodné pro každodenní work s npm projekty.",
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.stack)));

const contacts = [
  { name: "GitHub", handle: "Bloby22", href: "https://github.com/Bloby22", Icon: SiGithub },
  { name: "Discord", handle: "blobycz", href: "https://discord.com/users/1178258199590228078", Icon: SiDiscord },
  { name: "Instagram", handle: "blobycz", href: "https://instagram.com/blobycz", Icon: SiInstagram },
];

type RepoMeta = { stargazers_count: number; forks_count: number };

function Home() {
  const [meta, setMeta] = useState<Record<string, RepoMeta>>({});
  const [filter, setFilter] = useState<string>("Vše");
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      projects.map((p) =>
        fetch(`https://api.github.com/repos/Bloby22/${p.repo}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => [p.repo, d] as const)
          .catch(() => [p.repo, null] as const)
      )
    ).then((entries) => {
      if (cancelled) return;
      const next: Record<string, RepoMeta> = {};
      for (const [repo, data] of entries) {
        if (data) next[repo] = { stargazers_count: data.stargazers_count, forks_count: data.forks_count };
      }
      setMeta(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "Vše" ? projects : projects.filter((p) => p.stack.includes(filter))),
    [filter]
  );

  return (
    <main className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl animate-blob" />
        <div className="absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full bg-foreground/[0.03] blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-foreground/[0.03] blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
        <div className="absolute inset-0 noise mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6">
        {/* Hero */}
        <section id="domu" className="relative flex min-h-screen flex-col items-center justify-center text-center">
          <div className="absolute inset-0 -z-10 grid-bg" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl"
          >
            <Sparkles className="h-3 w-3" />
            backend · z brna
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gradient-light mt-8 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-8xl"
          >
            Stavím to,
            <br />
            <span className="italic font-light">co nikdo nevidí.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mx-auto mt-8 max-w-md text-balance text-base text-muted-foreground md:text-lg"
          >
            „Dobrý kód je tichý. Jen funguje.“
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <a
              href="#projekty"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Projekty
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-xl transition-colors hover:bg-surface-2"
            >
              Kontakt
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-muted-foreground"
              />
            </div>
          </motion.div>
        </section>

        {/* About */}
        <Section id="o-mne" eyebrow="01 — O mě" title="Ahoj, jsem BlobyCZ.">
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Jsem z <span className="text-foreground">Brna</span> a pracuji převážně na backendu.
            Baví mě stavět spolehlivé služby, čistá API a nástroje, které ostatním zjednoduší práci.
          </p>

          <SubSection title="Jazyky">
            {langs.map((l) => (
              <Chip key={l.name} name={l.name}>
                <l.Icon size={16} color={l.color} />
              </Chip>
            ))}
          </SubSection>

          <SubSection title="Systémy">
            {os.map((o) => (
              <Chip key={o.name} name={o.name}>
                <o.Icon size={16} color={o.color} />
              </Chip>
            ))}
          </SubSection>
        </Section>

        {/* Projects */}
        <Section id="projekty" eyebrow="02 — Projekty" title="Vybraná práce.">
          <FadeIn>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Vše", ...allTags].map((t) => {
                const isActive = filter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`relative rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${
                      isActive
                        ? "border-foreground/50 bg-foreground text-background"
                        : "border-border bg-surface/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  key={p.repo}
                  layout
                  type="button"
                  onClick={() => setOpen(p)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="card-hover group relative block overflow-hidden rounded-3xl border border-border bg-surface/60 p-7 text-left backdrop-blur-xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:rotate-45 group-hover:border-foreground/40 group-hover:bg-foreground group-hover:text-background">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="relative mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {p.description}
                  </p>
                  {meta[p.repo] && (
                    <div className="relative mt-6 flex items-center gap-5 font-mono text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5" /> {meta[p.repo].stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5" /> {meta[p.repo].forks_count}
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border bg-surface/40 p-10 text-center font-mono text-sm text-muted-foreground">
                Žádný projekt s tímto filtrem.
              </p>
            )}
          </div>
        </Section>

        {/* Contact */}
        <Section id="kontakt" eyebrow="03 — Kontakt" title="Pojďme zůstat ve spojení.">
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Otevřený nápadům a projektům.
          </p>
          <div className="mt-12 grid gap-3">
            {contacts.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.06}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card-hover group flex items-center justify-between rounded-2xl border border-border bg-surface/60 px-6 py-5 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-foreground group-hover:text-background">
                      <c.Icon size={18} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.name}</p>
                      <p className="mt-0.5 font-mono text-base text-foreground">{c.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </FadeIn>
            ))}
          </div>
        </Section>

        <footer className="mt-20 flex items-center justify-between border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <span>© {new Date().getFullYear()} BlobyCZ</span>
          <span>built with care</span>
        </footer>
      </div>

      {/* Project detail modal */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl overflow-hidden border-border bg-background/95 p-0 backdrop-blur-2xl sm:rounded-3xl">
          {open && (
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent" />
              <div className="relative p-7 md:p-9">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Projekt
                </div>
                <DialogTitle className="text-gradient-light mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                  {open.title}
                </DialogTitle>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {open.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <DialogDescription className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {open.long}
                </DialogDescription>

                {meta[open.repo] && (
                  <div className="mt-6 flex items-center gap-5 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" /> {meta[open.repo].stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5" /> {meta[open.repo].forks_count}
                    </span>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href={`https://github.com/Bloby22/${open.repo}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                  >
                    <SiGithub size={15} />
                    Otevřít na GitHubu
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="inline-flex items-center rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
                  >
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-32">
      <FadeIn>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
        <h2 className="text-gradient-light mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </FadeIn>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <FadeIn>
      <div className="mt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">{children}</div>
      </div>
    </FadeIn>
  );
}

function Chip({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="group flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-surface-2">
      {children}
      <span>{name}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
