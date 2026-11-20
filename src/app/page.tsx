import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BentoProjects } from "@/components/BentoProjects";
import { Services } from "@/components/Services";
import { AboutAndStack } from "@/components/AboutAndStack";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Header />
      <main className="flex-1">
        <FadeContent trigger="mount" duration={1.2} blur={true} effect="fade">
          <Hero />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <BentoProjects />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <Services />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <AboutAndStack />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <Testimonials />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <Faq />
        </FadeContent>

        <FadeContent trigger="scroll" duration={1.4} blur={true} threshold={0.08} effect="mist">
          <Contact />
        </FadeContent>
      </main>
      <Footer />
    </div>
  );
}
