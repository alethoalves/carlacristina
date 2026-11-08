"use client";

import { motion } from "motion/react";
import { useCV } from "@/content/CVContext";
import { FadeUp, WordsReveal, ease } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";

export function Toolkit() {
  const { courses, education, skills, tools } = useCV();
  return (
    <section id="ferramentas" className="overflow-hidden bg-paper-2 py-24 md:py-36">
      <div className="mx-auto max-w-[83rem] px-5 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <FadeUp className="md:col-span-3">
            <p className="label text-muted">(04) Ferramentas & formação</p>
          </FadeUp>
          <h2 className="text-[2.6rem] font-medium leading-[0.95] tracking-[-0.05em] md:col-span-9 md:text-[4.2rem]">
            <WordsReveal text="Do CRM à planilha," />{" "}
            <WordsReveal text="sem perder o cliente de vista" className="serif italic text-accent" delay={0.2} />
          </h2>
        </div>
      </div>

      <Marquee className="mt-14 md:mt-20" baseVelocity={-0.55}>
        {tools.map((t, i) => (
          <span
            key={t}
            className={`flex items-center gap-6 pr-6 text-[3.25rem] font-medium leading-none tracking-[-0.05em] md:gap-10 md:pr-10 md:text-[6rem] ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--ink)]" : "text-ink"
            }`}
          >
            {t}
            <span className="serif text-accent">✳</span>
          </span>
        ))}
      </Marquee>

      <div className="mx-auto mt-16 grid max-w-[83rem] gap-12 px-5 md:mt-24 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-6">
          <p className="label mb-5 text-muted">Habilidades-chave</p>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-[0.95rem]"
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-6">
          {education.map((ed) => (
            <FadeUp key={ed.title} className="rounded-2xl bg-ink p-6 text-paper">
              <p className="label text-accent-2">{ed.kind}</p>
              <p className="mt-6 text-2xl font-medium leading-tight tracking-[-0.03em]">{ed.title}</p>
              <p className="label mt-3 text-paper/60">
                {ed.institution} · {ed.period}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={0.1} className="rounded-2xl border border-ink/15 bg-paper p-6">
            <p className="label text-accent">Cursos complementares</p>
            <ul className="mt-6 space-y-3">
              {courses.map((c) => (
                <li key={c} className="text-lg leading-tight tracking-[-0.02em]">
                  {c}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
