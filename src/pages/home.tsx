import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { FooterSection } from "@/components/footer-section";

export function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <FooterSection />
    </main>
  )
}