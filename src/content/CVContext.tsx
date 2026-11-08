"use client";

import { createContext, useContext, type ReactNode } from "react";
import { resolveCV, type ResolvedCV } from "./cv";

const CVContext = createContext<ResolvedCV>(resolveCV(null));

export function CVProvider({ value, children }: { value: ResolvedCV; children: ReactNode }) {
  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

/** Conteúdo do currículo já filtrado pela versão (geral, vendas ou gestão). */
export function useCV() {
  return useContext(CVContext);
}
