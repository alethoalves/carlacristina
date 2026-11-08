import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { TRACKS, trackConfig, type Track } from "@/content/cv";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((perfil) => ({ perfil }));
}

export async function generateMetadata({ params }: { params: Promise<{ perfil: Track }> }): Promise<Metadata> {
  const { perfil } = await params;
  const p = trackConfig[perfil].profile;
  return {
    title: `Carla Felipe — ${p.headline}`,
    description: p.summary,
  };
}

export default async function TrackPage({ params }: { params: Promise<{ perfil: Track }> }) {
  const { perfil } = await params;
  return <HomeView track={perfil} />;
}
