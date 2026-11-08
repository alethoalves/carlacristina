"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useCV } from "@/content/CVContext";
import { ArrowIcon, DownloadIcon, RollButton } from "@/components/motion/RollButton";
import { WordsReveal } from "@/components/motion/Reveal";

/** CTA final: retrato desfocado como atmosfera, com leve parallax. */
export function Contact() {
  const { profile } = useCV();
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: box, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1.1]);

  return (
    <section id="contato" className="bg-paper-2 p-3 md:p-5">
      <div
        ref={box}
        className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-night text-white md:rounded-[2rem]"
      >
        <motion.div className="absolute inset-0 -z-10" style={{ scale: reduce ? 1.1 : bgScale }} aria-hidden>
          <Image
            src="/img/carla-portrait.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_25%] [filter:blur(110px)_brightness(0.62)_saturate(1.35)]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-night via-night/50 to-transparent" />

        <div className="p-6 pb-8 md:p-12 md:pb-14">
          <p className="label mb-6 text-accent-2">(05) Contato</p>
          <h2 className="max-w-[16ch] text-[2.75rem] font-medium leading-[0.95] tracking-[-0.05em] md:text-[6rem]">
            <WordsReveal text="Vamos fazer o seu" />{" "}
            <WordsReveal text="negócio girar?" className="serif italic text-accent-2" delay={0.25} />
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <RollButton href={profile.whatsappHref} external variant="accent" icon={<ArrowIcon />}>
              WhatsApp
            </RollButton>
            <RollButton href={`mailto:${profile.email}`} variant="light" icon={<ArrowIcon />}>
              Enviar e-mail
            </RollButton>
            <RollButton href={profile.pdf} download variant="ghost-light" icon={<DownloadIcon />}>
              Currículo PDF
            </RollButton>
          </div>
          <div className="label mt-12 grid gap-4 border-t border-white/15 pt-6 text-white/60 sm:grid-cols-3">
            <a href={profile.phoneHref} className="hover:text-white">{profile.phone}</a>
            <a href={`mailto:${profile.email}`} className="break-all normal-case tracking-normal hover:text-white">
              {profile.email}
            </a>
            <span>
              {profile.location} · {profile.availability}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
