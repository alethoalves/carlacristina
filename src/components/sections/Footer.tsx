"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCV } from "@/content/CVContext";
import { TRACKS, trackConfig } from "@/content/cv";
import { ease } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";

export function Footer() {
  const { profile, track } = useCV();
  return (
    <footer className="overflow-hidden bg-paper-2 px-5 pb-6 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto grid max-w-[78rem] gap-10 text-sm md:grid-cols-12">
        <p className="max-w-xs text-muted md:col-span-5">
          Vendas consultivas, operações organizadas e clientes bem atendidos — com foco em resultado.
        </p>
        <ul className="space-y-2 md:col-span-3">
          {[
            ["#sobre", "Sobre"],
            ["#competencias", "Competências"],
            ["#trajetoria", "Trajetória"],
          ].map(([h, l]) => (
            <li key={h}>
              <a href={h} className="hover:text-accent">{l}</a>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 md:col-span-4">
          <li><a href={profile.pdf} download className="hover:text-accent">Currículo em PDF</a></li>
          <li><a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">WhatsApp</a></li>
          <li className="pt-3 text-muted">Outras versões:</li>
          {TRACKS.filter((t) => t !== track).map((t) => (
            <li key={t}>
              <Link href={`/${t}`} className="hover:text-accent">Currículo — {trackConfig[t].label}</Link>
            </li>
          ))}
          {track && (
            <li><Link href="/completo" className="hover:text-accent">Currículo completo</Link></li>
          )}
        </ul>
      </div>

      <div className="-mx-5 mt-16 overflow-hidden md:-mx-10 md:mt-24" aria-hidden>
        <motion.div
          initial={{ y: "60%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        >
          <Marquee baseVelocity={-0.35}>
            <span className="flex items-center gap-[4vw] pr-[4vw] text-[19.5vw] font-semibold uppercase leading-[0.78] tracking-[-0.07em]">
              {profile.firstName} {profile.lastName}
              <span className="serif text-[12vw] font-normal normal-case text-accent">✳</span>
            </span>
          </Marquee>
        </motion.div>
      </div>
      <div className="label mt-6 flex justify-between text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#topo" className="hover:text-ink">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
