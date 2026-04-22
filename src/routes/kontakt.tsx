import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub, SiDiscord, SiInstagram } from "react-icons/si";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — BlobyCZ" },
      { name: "description", content: "Spojte se s BlobyCZ — GitHub, Discord, Instagram." },
    ],
  }),
  component: Contact,
});

const contacts = [
  { name: "GitHub", handle: "Bloby22", href: "https://github.com/Bloby22", Icon: SiGithub },
  { name: "Discord", handle: "blobycz", href: "https://discord.com/users/1178258199590228078", Icon: SiDiscord },
  { name: "Instagram", handle: "blobyc", href: "https://instagram.com/blobyc", Icon: SiInstagram },
];

function Contact() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Kontakt
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Pojďme zůstat ve spojení.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground"
        >
          Otevřený nápadům, projektům i kávě v Brně.
        </motion.p>

        <div className="mt-10 grid gap-3">
          {contacts.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
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
            </motion.a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
