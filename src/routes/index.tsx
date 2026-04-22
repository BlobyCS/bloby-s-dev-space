import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, GitFork } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SiTypescript, SiJavascript, SiPhp, SiLinux, SiGithub, SiDiscord, SiInstagram } from "react-icons/si";
import { TbBrandCSharp, TbBrandWindows } from "react-icons/tb";

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

const projects = [
  {
    repo: "InsaneKick",
    title: "InsaneKick",
    stack: "Java · SpigotAPI · Bukkit",
    description:
      "Jednoduchý Minecraft plugin, který hráče po každé smrti automaticky vyhodí ze serveru. Hlavně určen na eventy.",
  },
  {
    repo: "MessageBot",
    title: "MessageBot",
    stack: "TypeScript · Discord.js",
    description:
      "Discord bot v TypeScriptu s dynamickým načítáním příkazů a eventů — help, stats, send, senddm a info, plná podpora interakcí.",
  },
  {
    repo: "pckgi",
    title: "pckgi",
    stack: "JavaScript · NPM",
    description: "Moderní CLI nástroj pro správu balíčků NPM.",
  },
];

const contacts = [
  { name: "GitHub", handle: "Bloby22", href: "https://github.com/Bloby22", Icon: SiGithub },
  { name: "Discord", handle: "blobycz", href: "https://discord.com/users/1178258199590228078", Icon: SiDiscord },
  { name: "Instagram", handle: "blobyc", href: "https://instagram.com/blobyc", Icon: SiInstagram },
];

type RepoMeta = { stargazers_count: number; forks_count: number };

function Home() {
  const [meta, setMeta] = useState<Record<string, RepoMeta>>({});

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

  return (
    <main className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section id="domu" className="relative flex min-h-screen flex-col items-center justify-center text-center">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          k dispozici pro spolupráci
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          Stavím to,<br />co nikdo nevidí.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mx-auto mt-6 max-w-lg text-balance text-base text-muted-foreground md:text-lg"
        >
          „Dobrý kód je tichý. Jen funguje.“
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <a
            href="#projekty"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Projekty
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface-2"
          >
            Kontakt
          </a>
        </motion.div>
      </section>

      {/* About */}
      <Section id="o-mne" eyebrow="O mě" title="Ahoj, jsem BlobyCZ.">
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Jsem z Brna a pracuji převážně na backendu. Baví mě stavět spolehlivé
          služby, čistá API a nástroje, které ostatním zjednoduší práci.
        </p>

        <SubSection title="Jazyky">
          {langs.map((l) => (
            <Chip key={l.name} name={l.name}>
              <l.Icon size={18} color={l.color} />
            </Chip>
          ))}
        </SubSection>

        <SubSection title="Systémy">
          {os.map((o) => (
            <Chip key={o.name} name={o.name}>
              <o.Icon size={18} color={o.color} />
            </Chip>
          ))}
        </SubSection>
      </Section>

      {/* Projects */}
      <Section id="projekty" eyebrow="Projekty" title="Vybraná práce.">
        <div className="mt-10 grid gap-4">
          {projects.map((p, i) => (
            <FadeIn key={p.repo} delay={i * 0.06}>
              <a
                href={`https://github.com/Bloby22/${p.repo}`}
                target="_blank"
                rel="noreferrer noopener"
                className="card-hover group block rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{p.stack}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                {meta[p.repo] && (
                  <div className="mt-5 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" /> {meta[p.repo].stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5" /> {meta[p.repo].forks_count}
                    </span>
                  </div>
                )}
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="kontakt" eyebrow="Kontakt" title="Pojďme zůstat ve spojení.">
        <p className="mt-4 max-w-xl text-muted-foreground">
          Otevřený nápadům, projektům i kávě v Brně.
        </p>
        <div className="mt-10 grid gap-3">
          {contacts.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.06}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card-hover group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <c.Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{c.name}</p>
                    <p className="font-mono text-base text-foreground">{c.handle}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      <footer className="border-t border-border py-10 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} BlobyCZ
      </footer>
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
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      </FadeIn>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <FadeIn>
      <div className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">{children}</div>
      </div>
    </FadeIn>
  );
}

function Chip({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
      {children}
      <span>{name}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
