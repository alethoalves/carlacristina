"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useCV } from "@/content/CVContext";
import { ArrowIcon, RollButton } from "@/components/motion/RollButton";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero: retrato inteiro desde o início, com entrada de "foco de câmera".
 * Ao rolar, o conteúdo seguinte desliza por cima como uma cortina.
 */
export function Hero() {
  const { profile } = useCV();
  const track = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35 });

  // Parallax do ponteiro (desktop)
  const mx = useSpring(0, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => mx.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, reduce]);

  const portraitX = useTransform(mx, (v) => v * -8);
  const portraitScale = useTransform(p, [0, 1], [1, 0.94]);
  const nameX = useTransform(mx, (v) => v * 14);
  const nameY = useTransform(p, [0, 1], ["0svh", "-8svh"]);
  const dim = useTransform(p, [0, 1], [0, 0.6]);
  const uiOpacity = useTransform(p, [0, 0.5], [1, 0]);

  return (
    <section ref={track} id="topo" className="relative h-[160svh] bg-night text-white">
      <div className="grain sticky top-0 h-svh overflow-hidden">
        {/* Fundo de estúdio quente */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 22%, #c45a2b 0%, #9a3a1a 26%, #5a1a0e 55%, #1c0a06 82%, #0f0907 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[6svh] h-[72svh] w-[72svh] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(255,170,110,.5), rgba(255,120,60,.16) 55%, transparent)",
            filter: "blur(10px)",
          }}
        />

        {/* Nome — atrás do retrato */}
        <motion.h1
          aria-label={`${profile.firstName} ${profile.lastName}`}
          style={{ y: nameY, x: nameX }}
          className="pointer-events-none absolute inset-x-0 top-[16svh] select-none text-center font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-[#ffe9da] md:top-[14svh]"
        >
          <span className="flex flex-col items-center md:flex-row md:justify-center md:gap-[3.2vw]">
            {[profile.firstName, profile.lastName].map((word, wi) => (
              <span key={word} aria-hidden className="block overflow-hidden text-[27vw] md:text-[14.2vw]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.4, ease, delay: 0.1 + wi * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Retrato recortado — entrada com "foco de câmera" */}
        <motion.div
          className="absolute bottom-0 left-1/2 ml-[calc(min(124vw,74svh)/-2)] aspect-[1086/1448] w-[min(124vw,74svh)] origin-bottom will-change-transform"
          style={{ x: portraitX, scale: portraitScale }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.06, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <div className="absolute inset-0 scale-[1.025] opacity-40">
              <Image
                src="/img/carla-cutout.png"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 124vw, 74svh"
                className="object-contain [filter:blur(26px)_brightness(1.15)_sepia(1)_saturate(2.6)_hue-rotate(-18deg)]"
              />
            </div>
            <Image
              src="/img/carla-cutout.png"
              alt="Retrato de Carla Felipe"
              fill
              priority
              quality={92}
              sizes="(max-width: 768px) 124vw, 74svh"
              className="object-contain [mask-image:radial-gradient(95%_88%_at_50%_22%,black_55%,transparent_76%)]"
            />
          </motion.div>
        </motion.div>

        {/* Chão escuro + vinheta */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] bg-linear-to-t from-[#0f0907] via-[#0f0907]/60 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(130% 90% at 50% 40%, transparent 55%, rgba(10,5,3,.65) 100%)" }}
        />

        <motion.div style={{ opacity: uiOpacity }} className="absolute inset-0">
          {/* Rótulos superiores (desktop) */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="label absolute inset-x-10 top-[5.25rem] hidden grid-cols-4 gap-6 text-white/70 md:grid [&>*:last-child]:text-right"
          >
            {[...profile.roles, profile.location].map((r) => (
              <span key={r}>{r}</span>
            ))}
          </motion.div>

          {/* Contatos laterais (desktop) */}
          <motion.ul
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4, ease }}
            className="absolute left-10 top-1/2 hidden -translate-y-1/2 flex-col gap-4 text-sm text-white/75 lg:flex"
          >
            <li>
              <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-white">
                E-mail
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="transition-colors hover:text-white">
                {profile.phone}
              </a>
            </li>
          </motion.ul>

          {/* Tagline + ações */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.1 }}
            className="absolute inset-x-5 bottom-8 md:inset-x-auto md:bottom-12 md:left-10 md:max-w-[22rem] lg:max-w-[26rem]"
          >
            <p className="label mb-3 text-accent-2">{profile.headline}</p>
            <p className="text-[1.35rem] leading-[1.2] tracking-[-0.02em] text-white md:text-2xl">{profile.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <RollButton href="#contato" variant="light" icon={<ArrowIcon />}>
                Vamos conversar
              </RollButton>
              <RollButton href={profile.pdf} variant="ghost-light" download>
                Baixar PDF
              </RollButton>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="label absolute bottom-12 right-10 hidden max-w-[16rem] text-right text-white/60 md:block"
          >
            Disponível para
            <br />
            <span className="text-white">{profile.availability}</span>
          </motion.div>
        </motion.div>

        {/* Escurece enquanto o conteúdo desliza por cima */}
        <motion.div className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: dim }} />
      </div>
    </section>
  );
}
