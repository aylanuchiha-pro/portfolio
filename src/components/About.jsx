import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle number="01" label="qui suis-je" title="À Propos" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">
        <Reveal direction="left">
          <div style={{
            aspectRatio: "1", maxWidth: 380, borderRadius: 24,
            position: "relative", overflow: "hidden",
          }}>
            <img
              src="/photo.png"
              alt="Aylan Lounici"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: 24,
                display: "block",
              }}
            />
            {/* Subtle accent border overlay */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: 24,
              boxShadow: `inset 0 0 0 2px ${COLORS.warmLight}`,
              pointerEvents: "none",
            }} />
          </div>
        </Reveal>

        <Reveal direction="right">
          <h3 style={{
            fontFamily: fonts.display, fontSize: 26, fontWeight: 600,
            color: COLORS.ink, marginBottom: 16, fontStyle: "italic",
          }}>
            Passionné par le code & la sécurité
          </h3>
          <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.8, color: COLORS.inkSoft, marginBottom: 16 }}>
            Développeur web fullstack et passionné de cybersécurité. Je crée des expériences web modernes
            et performantes tout en explorant les techniques de protection des systèmes.
          </p>
          <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.8, color: COLORS.inkSoft, marginBottom: 32 }}>
            Entre deux lignes de code, je m'entraîne sur des plateformes de CTF, j'explore le pentesting
            et je me forme aux nouvelles menaces et meilleures pratiques de sécurité.
          </p>
          <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
            {[["15+", "Projets"], ["3+", "Ans XP"], ["50+", "CTF résolus"]].map(([num, label]) => (
              <div key={label} style={{
                textAlign: "center", padding: "20px 12px", borderRadius: 16,
                background: COLORS.cream, border: `1px solid ${COLORS.warmLight}`,
              }}>
                <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: COLORS.accent }}>{num}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 13, color: COLORS.inkMuted, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Passions */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { icon: "🏃", label: "Sport" },
              { icon: "🔐", label: "CTF & Hacking" },
              { icon: "✈️", label: "Voyage" },
              { icon: "💻", label: "Open Source" },
              { icon: "🛡️", label: "Cybersécurité" },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 15px", borderRadius: 100,
                background: COLORS.cream,
                border: `1px solid ${COLORS.warmLight}`,
                fontFamily: fonts.body, fontSize: 13,
                color: COLORS.inkSoft,
              }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
