import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Chess from "@/components/Chess";
import CodingStats from "@/components/CodingStats";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <>
      <main style={{ background: "var(--background)" }}>
        <Navbar />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Chess />
        <CodingStats />
        <Terminal />
        <Contact />
        <Footer />
      </main>
      <Chat />
    </>
  );
}
