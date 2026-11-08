"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "dark" | "light" | "accent" | "ghost-light";

const styles: Record<Variant, string> = {
  dark: "bg-ink text-paper",
  light: "bg-paper text-ink",
  accent: "bg-accent text-paper",
  "ghost-light": "border border-white/25 text-white",
};

/** Botão em pílula: o rótulo "rola" para cima e um gêmeo entra por baixo (efeito do exvia). */
export function RollButton({
  href,
  children,
  icon,
  variant = "dark",
  className = "",
  download,
  external,
}: {
  href: string;
  children: string;
  icon?: ReactNode;
  variant?: Variant;
  className?: string;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full px-5 ${styles[variant]} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <motion.span
          className="label block"
          variants={{ rest: { y: "0%" }, hover: { y: "-120%" } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden
          className="label absolute inset-0 block"
          variants={{ rest: { y: "120%" }, hover: { y: "0%" } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
      </span>
      {icon && (
        <motion.span
          className="relative flex"
          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {icon}
        </motion.span>
      )}
    </motion.a>
  );
}

export const ArrowIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DownloadIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
