"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useCV } from "@/content/CVContext";
import { Counter, DrawLine, FadeUp, ScrollWords, ease } from "@/components/motion/Reveal";

export function About() {
  const { profile, stats } = useCV();
  const photo = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 0.5, 1], ["14%", "0%", "-3%"]);

  return (
    <section
      id="sobre"
      className="relative z-10 -mt-[60svh] rounded-t-[1.75rem] bg-paper px-5 pb-24 pt-20 md:rounded-t-[2.5rem] md:px-10 md:pb-36 md:pt-32"
    >
      <div className="mx-auto max-w-[78rem]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <FadeUp className="md:col-span-3">
            <p className="label text-muted">(01) Sobre</p>
          </FadeUp>
          <div className="md:col-span-9">
            <ScrollWords
              text={profile.about}
              className="text-[1.5rem] leading-[1.2] tracking-[-0.03em] md:text-[2.4rem] md:leading-[1.12]"
            />
          </div>
        </div>

        <div className="mt-16 grid items-end gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
          {/* Foto que "sai" do cartão: o cabelo ultrapassa a borda superior */}
          <div ref={photo} className="relative md:col-span-5 lg:col-span-5">
            <div className="relative aspect-square">
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[74%] overflow-hidden rounded-2xl"
                style={{
                  background:
                    "radial-gradient(120% 100% at 50% 0%, #c45a2b 0%, #9a3a1a 40%, #4a150b 100%)",
                }}
                initial={{ clipPath: "inset(100% 0% 0% 0% round 1rem)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, ease }}
              />
              <motion.div
                className="absolute inset-0 [clip-path:inset(-40%_0_0_0_round_0_0_1rem_1rem)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div className="absolute inset-0" style={{ y: imgY }}>
                  <Image
                    src="/img/carla-pose.png"
                    alt="Carla Felipe com a mão no queixo, de blazer verde"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain object-bottom"
                  />
                </motion.div>
              </motion.div>
              <div className="label absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-ink backdrop-blur">
                {profile.location}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 md:col-span-7">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
              {stats.map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.1}>
                  <DrawLine className="mb-5 text-ink/20" delay={i * 0.1} />
                  <div className="flex items-start text-[4.5rem] font-medium leading-none tracking-[-0.06em] md:text-[5rem]">
                    <Counter to={s.value} />
                    <span className="mt-2 text-[2rem] text-accent md:text-[2.4rem]">{s.suffix}</span>
                  </div>
                  <p className="mt-4 text-base font-medium">{s.label}</p>
                  <p className="label mt-1 text-muted">{s.note}</p>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="rounded-2xl bg-ink p-6 text-paper md:p-8">
              <p className="label text-accent-2">Objetivo</p>
              <p className="mt-3 text-xl leading-snug tracking-[-0.02em] md:text-2xl">{profile.objective}</p>
              <div className="label mt-6 flex flex-wrap gap-2 text-paper/70">
                {["Vendas", "Gerência", "Operações", "Remoto", "Híbrido"].map((t) => (
                  <span key={t} className="rounded-full border border-paper/20 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
