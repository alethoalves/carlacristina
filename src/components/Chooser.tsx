"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Track } from "@/content/cv";
import { WordsReveal } from "@/components/motion/Reveal";

type Option = { track: Track; label: string; headline: string; tagline: string; roles: string[] };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Porta de entrada: o recrutador escolhe a versão do currículo (Vendas ou Gestão).
 * Desktop: tela dividida — o lado em foco acende e a Carla se inclina para ele.
 * Mobile: retrato em cima, duas opções grandes embaixo.
 */
export function Chooser({ options, name }: { options: Option[]; name: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);

  const shift = useSpring(0, { stiffness: 70, damping: 18 });
  useEffect(() => {
    shift.set(hover === null ? 0 : hover === 0 ? -1 : 1);
  }, [hover, shift]);
  // o retrato se inclina levemente para o lado em foco
  const portraitX = useTransform(shift, (v) => `${v * 4}vw`);
  const portraitRotate = useTransform(shift, (v) => v * 1.5);

  useEffect(() => {
    options.forEach((o) => router.prefetch(`/${o.track}`));
  }, [options, router]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // nova aba: comportamento normal
    e.preventDefault();
    if (reduce) return router.push(href);
    setLeaving(href);
  };

  return (
    <main className="grain relative h-svh overflow-hidden bg-night text-white">
      {/* Fundo de estúdio */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 30%, #c45a2b 0%, #9a3a1a 26%, #5a1a0e 55%, #1c0a06 82%, #0f0907 100%)",
        }}
      />
      {/* Luz do lado em foco (desktop) */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 hidden w-1/2 md:block ${i === 0 ? "left-0" : "right-0"}`}
          style={{
            background: `radial-gradient(90% 80% at ${i === 0 ? "0%" : "100%"} 75%, rgba(255,150,90,.38), transparent 70%)`,
          }}
          animate={{ opacity: hover === i ? 1 : 0 }}
          transition={{ duration: 0.6, ease }}
        />
      ))}

      {/* Retrato */}
      <motion.div
        className="pointer-events-none absolute bottom-[31svh] left-1/2 ml-[calc(min(70vw,31svh)/-2)] aspect-[1086/1448] w-[min(70vw,31svh)] md:bottom-0 md:ml-[calc(min(60vw,54svh)/-2)] md:w-[min(60vw,54svh)]"
        style={{ x: portraitX, rotate: portraitRotate }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.06, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Image
            src="/img/carla-cutout.png"
            alt={`Retrato de ${name}`}
            fill
            priority
            sizes="(max-width: 768px) 92vw, 54svh"
            className="object-contain [mask-image:radial-gradient(95%_88%_at_50%_22%,black_55%,transparent_76%)]"
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52svh] bg-linear-to-t from-night via-night/85 to-transparent md:h-[30svh] md:via-night/50" />

      {/* Topo */}
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="absolute inset-x-5 top-5 flex items-center justify-between md:inset-x-10 md:top-8"
      >
        <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">
          {name}
          <span className="text-accent-2">.</span>
        </span>
        <Link href="/completo" className="label text-white/60 transition-colors hover:text-white">
          Currículo completo →
        </Link>
      </motion.header>

      {/* Pergunta */}
      <div className="absolute inset-x-5 top-[11svh] md:inset-x-10 md:top-[12svh] md:text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="label mb-4 text-white/60"
        >
          Escolha a versão do currículo
        </motion.p>
        <h1 className="mx-auto max-w-[18ch] text-[2rem] font-medium leading-[1] tracking-[-0.045em] md:max-w-none md:text-[3.6vw]">
          <WordsReveal text="Para qual vaga você" delay={0.3} />{" "}
          <WordsReveal text="está avaliando a Carla?" className="serif italic text-[#ffd2b6]" delay={0.5} />
        </h1>
      </div>

      {/* Opções */}
      <nav
        aria-label="Versões do currículo"
        className="absolute inset-x-0 bottom-0 flex flex-col px-5 pb-6 md:inset-0 md:grid md:grid-cols-2 md:p-0"
        onMouseLeave={() => setHover(null)}
      >
        {options.map((o, i) => {
          const href = `/${o.track}`;
          const dim = hover !== null && hover !== i;
          return (
            <motion.div
              key={o.track}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: dim ? 0.4 : 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: hover === null ? 0.9 + i * 0.12 : 0 }}
              className="md:relative md:h-full"
            >
              <Link
                href={href}
                onClick={go(href)}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className={`group flex items-center justify-between gap-4 border-t border-white/15 py-5 outline-none md:absolute md:inset-0 md:flex-col md:justify-end md:border-0 md:px-10 md:pb-14 md:pt-0 ${
                  i === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"
                }`}
              >
                <span className="flex flex-col">
                  <span className="label text-white/50">0{i + 1} · Versão</span>
                  <span className="mt-1 text-[2.6rem] font-semibold leading-none tracking-[-0.05em] md:mt-3 md:text-[6.5vw]">
                    {o.label}
                  </span>
                  <span className="serif mt-1 text-lg italic text-[#ffd2b6] md:mt-3 md:text-2xl">{o.headline}</span>
                  <span
                    className={`mt-4 hidden max-w-[22rem] text-base leading-snug text-white/75 md:block ${
                      i === 1 ? "ml-auto" : ""
                    }`}
                  >
                    {o.tagline}
                  </span>
                  <span className={`mt-5 hidden flex-wrap gap-2 md:flex ${i === 1 ? "justify-end" : ""}`}>
                    {o.roles.map((r) => (
                      <span key={r} className="label rounded-full border border-white/20 px-3 py-1.5 text-white/80">
                        {r}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-accent-2 md:mt-8 md:size-14">
                  <svg viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden>
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Cortina de transição */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="fixed inset-0 z-50 bg-night"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => router.push(leaving)}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-accent"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              style={{ originY: 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
