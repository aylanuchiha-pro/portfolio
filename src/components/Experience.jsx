import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

const experiences = [
  { date: "2024 — Présent", title: "Développeur Fullstack & Cyber", company: "Freelance", desc: "Création de sites web sur mesure. Audits de sécurité et tests d'intrusion. Participation à des compétitions CTF." },
  { date: "2023 — 2024", title: "Développeur Web Junior", company: "Startup / Agence", desc: "Développement d'applications web React/Node.js. Mise en place de bonnes pratiques de sécurité." },
  { date: "2021 — 2023", title: "Formation & Auto-didacte", company: "Études & Projets persos", desc: "Formation intensive en développement web et cybersécurité. Contributions open source et certifications." },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 40px", background: COLORS.cream }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <SectionTitle number="04" label="parcours" title="Expérience" />
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{
            position: "absolute", left: 7, top: 8, bottom: 8, width: 2,
            background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.warm}, ${COLORS.sage})`,
            borderRadius: 2,
          }} />
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.15} direction="left">
              <div style={{ marginBottom: 48, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -29, top: 6, width: 14, height: 14,
                  borderRadius: "50%", border: `2px solid ${[COLORS.accent, COLORS.warm, COLORS.sage][i]}`,
                  background: COLORS.cream,
                }} />
                <span style={{
                  fontFamily: fonts.mono, fontSize: 12,
                  color: [COLORS.accent, COLORS.warm, COLORS.sage][i], letterSpacing: 1,
                }}>{exp.date}</span>
                <h3 style={{
                  fontFamily: fonts.display, fontSize: 20, fontWeight: 600,
                  color: COLORS.ink, margin: "6px 0 4px",
                }}>{exp.title}</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 14, color: COLORS.inkMuted, marginBottom: 8 }}>{exp.company}</p>
                <p style={{ fontFamily: fonts.body, fontSize: 15, color: COLORS.inkSoft, lineHeight: 1.7 }}>{exp.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
