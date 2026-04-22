import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/projekty")({
  head: () => ({
    meta: [
      { title: "Projekty — BlobyCZ" },
      { name: "description", content: "Vybrané open-source projekty od BlobyCZ." },
    ],
  }),
  component: Projects,
});

type Project = {
  repo: string;
  title: string;
  stack: string;
  description: string;
};

const projects: Project[] = [
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

type RepoMeta = { stargazers_count: number; forks_count: number };

function Projects() {
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
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Projekty
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Vybraná práce.
        </motion.h1>

        <div className="mt-10 grid gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.repo}
              href={`https://github.com/Bloby22/${p.repo}`}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
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
            </motion.a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
