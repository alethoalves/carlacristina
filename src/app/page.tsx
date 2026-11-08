import { Chooser } from "@/components/Chooser";
import { profile, trackConfig, TRACKS } from "@/content/cv";

export default function Home() {
  const options = TRACKS.map((t) => ({
    track: t,
    label: trackConfig[t].label,
    headline: trackConfig[t].profile.headline ?? "",
    tagline: trackConfig[t].profile.tagline ?? "",
    roles: trackConfig[t].profile.roles ?? [],
  }));
  return <Chooser options={options} name={`${profile.firstName} ${profile.lastName}`} />;
}
