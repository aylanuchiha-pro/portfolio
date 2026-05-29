import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GitHub from "./components/GitHub";
import Experience from "./components/Experience";
import Travel from "./components/Travel";
import Cyber from "./components/Cyber";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { COLORS } from "./theme";

export default function App() {
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Cyber />
      <GitHub />
      <Travel />
      <Contact />
      <Footer />
    </div>
  );
}
