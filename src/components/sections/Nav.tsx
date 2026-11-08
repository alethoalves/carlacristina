"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useCV } from "@/content/CVContext";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#competencias", label: "Competências" },
  { href: "#trajetoria", label: "Trajetória" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const { profile } = useCV();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: hidden ? 0 : 0.2 }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5"
      >
        <nav className="flex w-full max-w-[44rem] items-center justify-between gap-2 rounded-full border border-white/10 bg-[#1a0f0b]/70 py-1.5 pl-5 pr-1.5 text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,.5)] backdrop-blur-xl md:w-auto md:justify-start">
          <a href="#topo" className="mr-1 whitespace-nowrap text-[0.95rem] font-semibold tracking-[-0.02em]">
            {profile.firstName} {profile.lastName}
            <span className="text-accent-2">.</span>
          </a>
          <span className="mx-2 hidden h-4 w-px bg-white/20 md:block" />
          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="label hidden h-9 items-center rounded-full bg-accent px-4 text-white transition-colors hover:bg-accent-2 md:ml-2 md:flex"
          >
            Vamos conversar
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="label relative flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 md:hidden"
          >
            <span>{open ? "Fechar" : "Menu"}</span>
            <span className="relative block h-2.5 w-3.5">
              <motion.span
                className="absolute left-0 top-0 block h-px w-full bg-white"
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-full bg-white"
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-night px-5 pb-8 pt-28 text-white md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="flex flex-col gap-1">
              {[...links, { href: "#contato", label: "Contato" }].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1 text-[13vw] font-medium leading-none tracking-[-0.05em]"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="label text-accent-2">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="label flex flex-col gap-2 text-white/60"
            >
              <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp · {profile.phone}</a>
              <a href={`mailto:${profile.email}`} className="normal-case tracking-normal">{profile.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
