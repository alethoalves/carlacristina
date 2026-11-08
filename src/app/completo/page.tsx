import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Carla Felipe — Currículo completo",
};

export default function Completo() {
  return <HomeView />;
}
