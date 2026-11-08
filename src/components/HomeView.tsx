import { CVProvider } from "@/content/CVContext";
import { resolveCV, type Track } from "@/content/cv";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Competencies } from "@/components/sections/Competencies";
import { Experience } from "@/components/sections/Experience";
import { Toolkit } from "@/components/sections/Toolkit";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function HomeView({ track = null }: { track?: Track | null }) {
  return (
    <CVProvider value={resolveCV(track)}>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Competencies />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </CVProvider>
  );
}
