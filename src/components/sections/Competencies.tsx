"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCV } from "@/content/CVContext";
import { FadeUp, WordsReveal, ease } from "@/components/motion/Reveal";

export function Competencies() {
  const { competencies } = useCV();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="competencias" className="bg-paper px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[78rem]">
        <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:gap-10">
          <FadeUp className="md:col-span-3">
            <p className="label text-muted">(02) Competências</p>
          </FadeUp>
          <h2 className="text-[2.6rem] font-medium leading-[0.95] tracking-[-0.05em] md:col-span-9 md:text-[5.5rem]">
            <WordsReveal text="O que eu entrego" />{" "}
            <WordsReveal text="no dia a dia" className="serif italic text-accent" delay={0.25} />
          </h2>
        </div>

        <ul className="border-b border-line">
          {competencies.map((c, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={c.title}
                className="relative overflow-hidden border-t border-line"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.05 }}
                onMouseEnter={() => window.matchMedia("(pointer: fine)").matches && setOpen(i)}
              >
                {/* preenchimento que sobe */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 origin-bottom bg-ink"
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease }}
                />
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`relative flex w-full items-center gap-4 px-4 py-6 text-left transition-colors duration-500 md:gap-8 md:px-6 md:py-8 ${
                    isOpen ? "text-paper" : "text-ink"
                  }`}
                >
                  <span className={`label w-10 shrink-0 transition-colors duration-500 ${isOpen ? "text-accent-2" : "text-muted"}`}>
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <span className="flex-1 text-[1.75rem] font-medium leading-none tracking-[-0.04em] md:text-[3.25rem]">
                    {c.title}
                  </span>
                  <span className={`label hidden transition-colors duration-500 md:block ${isOpen ? "text-paper/60" : "text-muted"}`}>
                    {c.short}
                  </span>
                  <motion.span
                    className="relative block size-4 shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease }}
                    aria-hidden
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="relative overflow-hidden text-paper"
                    >
                      <div className="grid gap-5 pb-8 pl-[4.5rem] pr-4 md:grid-cols-12 md:gap-8 md:px-6 md:pb-10 md:pl-[6.5rem]">
                        <p className="text-base leading-relaxed text-paper/80 md:col-span-6 md:text-lg">
                          {c.description}
                        </p>
                        <div className="flex flex-wrap content-start gap-2 md:col-span-6 md:justify-end">
                          {c.tags.map((t, ti) => (
                            <motion.span
                              key={t}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + ti * 0.04, duration: 0.4 }}
                              className="label rounded-full border border-paper/20 px-3 py-1.5 text-paper/80"
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
