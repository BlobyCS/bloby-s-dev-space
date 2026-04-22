import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiTypescript, SiJavascript, SiPhp, SiLinux } from "react-icons/si";
import { TbBrandCSharp, TbBrandWindows } from "react-icons/tb";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/o-mne")({
  head: () => ({
    meta: [
      { title: "O mě — BlobyCZ" },
      { name: "description", content: "Backend developer z Brna. TypeScript, JavaScript, PHP, C#." },
    ],
  }),
  component: About,
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

function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          O mě
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Ahoj, jsem <span className="text-foreground">BlobyCZ</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg leading-relaxed text-muted-foreground"
        >
          Jsem z Brna a pracuji převážně na backendu. Baví mě stavět spolehlivé
          služby, čistá API a nástroje, které ostatním zjednoduší práci.
        </motion.p>

        <Section title="Jazyky" delay={0.3}>
          {langs.map((l) => (
            <Chip key={l.name} name={l.name}>
              <l.Icon size={18} color={l.color} />
            </Chip>
          ))}
        </Section>

        <Section title="Systémy" delay={0.4}>
          {os.map((o) => (
            <Chip key={o.name} name={o.name}>
              <o.Icon size={18} color={o.color} />
            </Chip>
          ))}
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mt-10"
    >
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </motion.div>
  );
}

function Chip({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
      {children}
      <span>{name}</span>
    </div>
  );
}
