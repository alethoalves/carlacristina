"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { useCV } from "@/content/CVContext";
import type { ResolvedExperience as Exp } from "@/content/cv";
import { FadeUp, WordsReveal, ease } from "@/components/motion/Reveal";

export function Experience() {
  const { experiences, others, project: fp } = useCV();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="trajetoria" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[78rem] gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <FadeUp>
              <p className="label text-muted">(03) Trajetória</p>
            </FadeUp>
            <h2 className="mt-6 text-[2.6rem] font-medium leading-[0.95] tracking-[-0.05em] md:text-[4.2rem]">
              <WordsReveal text="20 anos" /> <WordsReveal text="fazendo" className="serif italic text-accent" delay={0.15} />{" "}
              <WordsReveal text="negócios girarem" delay={0.25} />
            </h2>
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
                Da venda consultiva à gerência de unidade — em saúde, tecnologia, varejo e serviços.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="md:col-span-8">
          <ol ref={listRef} className="relative">
            {/* trilho + preenchimento */}
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[7px]" aria-hidden />
            <motion.div
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent md:left-[7px]"
              style={{ scaleY: fill }}
              aria-hidden
            />
            {experiences.map((e, i) => (
              <Item key={e.company + e.start} e={e} index={i} />
            ))}
          </ol>

          {/* Projeto especial — discreto (só nas versões em que é relevante) */}
          {fp.main && (
          <FadeUp className="mt-16 rounded-2xl border border-line p-6 md:mt-20 md:p-8">
            <p className="label text-muted">
              Projeto especial{fp.period ? ` · ${fp.period}` : ""}
            </p>
            <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.03em] md:text-[1.75rem]">
              {fp.company} <span className="serif italic text-accent">— {fp.role}</span>
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              Gestão do {fp.event}, com mais de {fp.participants.toLocaleString("pt-BR")} participantes: contratação do
              espaço, inscrições e coordenação da equipe de hosts. {fp.context}
            </p>
            <Link
              href="/carta-wissentec"
              className="label mt-5 inline-flex items-center gap-2 text-ink underline-offset-4 hover:underline"
            >
              Ler carta de referência →
            </Link>
          </FadeUp>
          )}

          {/* Outras experiências — uma linha cada */}
          {(others.length > 0 || !fp.main) && (
            <FadeUp className="mt-16 md:mt-20">
              <p className="label mb-4 text-muted">Outras experiências</p>
              <ul className="border-t border-line">
                {[
                  ...others.map((o) => ({ key: o.company, name: o.company, role: o.role, period: o.period })),
                  ...(!fp.main ? [{ key: fp.company, name: fp.company, role: `${fp.role} · ${fp.product}`, period: fp.period || "Projeto" }] : []),
                ].map((o) => (
                  <li
                    key={o.key}
                    className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-lg font-medium tracking-[-0.02em]">
                      {o.name} <span className="serif italic text-accent">— {o.role}</span>
                    </span>
                    <span className="label shrink-0 text-muted">{o.period}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}

function Item({ e, index }: { e: Exp; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [open, setOpen] = useState(index < 2);

  return (
    <li ref={ref} className="relative pb-14 pl-9 last:pb-0 md:pb-16 md:pl-14">
      <motion.span
        aria-hidden
        className="absolute left-0 top-1.5 block size-[11px] rounded-full border md:size-[15px]"
        animate={{
          backgroundColor: active || seen ? "#c4532b" : "#f2eee7",
          borderColor: active || seen ? "#c4532b" : "rgba(22,17,14,.3)",
          scale: active ? 1.35 : 1,
        }}
        transition={{ duration: 0.5, ease }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={seen ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease }}
      >
        <div className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span className="text-ink">{e.period}</span>
          <span>·</span>
          <span>{e.sector}</span>
          {e.highlight && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-paper">Mais recente</span>
          )}
        </div>
        <h3 className="mt-3 text-[2rem] font-medium leading-none tracking-[-0.04em] md:text-[2.75rem]">
          {e.company}
        </h3>
        <p className="mt-2 text-lg text-ink-2 md:text-xl">
          <span className="serif italic text-accent">{e.role}</span>
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]">{e.summary}</p>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="label mt-5 inline-flex items-center gap-2 text-ink underline-offset-4 hover:underline"
        >
          {open ? "Ocultar detalhes" : "Ver detalhes"}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease }} aria-hidden>
            ↓
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-2xl overflow-hidden"
            >
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-3 border-b border-line py-3 text-[0.95rem] leading-relaxed first:mt-4">
                  <span className="mt-[0.6em] block size-1 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </li>
  );
}
