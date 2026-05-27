import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

const items = [
  {
    type: "edu",
    date: "2021 — 2023",
    title: "Licence Informatique",
    org: "Sorbonne Université, Paris",
    desc: "Formation fondamentale en algorithmique, systèmes d'exploitation, réseaux et développement logiciel. Solides bases théoriques et pratiques en informatique.",
    color: COLORS.accent,
  },
  {
    type: "work",
    date: "2021 — 2025",
    title: "Jobs Étudiants",
    org: "Divers secteurs",
    desc: "Nombreuses expériences professionnelles en parallèle des études. Développement de la rigueur, du sens des responsabilités et de l'adaptabilité en milieu professionnel.",
    color: COLORS.warm,
  },
  {
    type: "edu",
    date: "2023 — 2026",
    title: "Ingénieur Systèmes d'Info. & Réseaux",
    org: "Polytech Nancy",
    desc: "Formation d'ingénieur spécialisée en systèmes d'information, architecture réseaux et sécurité. Projets d'envergure, administration système, et travaux en équipe.",
    color: "#4A7FD4",
  },
  {
    type: "work",
    date: "Avr. — Août 2025",
    title: "Stagiaire Développeur",
    org: "Adorpowertron — Inde 🇮🇳",
    desc: "Stage international de 4 mois au sein d'une entreprise technologique indienne. Développement de solutions numériques et expérience de collaboration interculturelle.",
    color: "#7A9E7E",
  },
  {
    type: "edu",
    date: "2025 — 2026",
    title: "Double Diplôme Cybersécurité",
    org: "FST Nancy",
    desc: "Spécialisation avancée en cybersécurité en double diplôme avec Polytech Nancy. Cryptographie, sécurité offensive et défensive, OWASP Top 10, CTF avancés.",
    color: "#8A6FD4",
  },
  {
    type: "work",
    date: "2025 — Présent",
    title: "Stagiaire Cybersécurité",
    org: "Post Luxembourg 🇱🇺",
    desc: "Stage de 6 mois chez l'opérateur national luxembourgeois. Tests d'intrusion, analyse et gestion des vulnérabilités, sécurisation des systèmes et infrastructures.",
    color: COLORS.accent,
    current: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 40px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        <SectionTitle number="04" label="parcours" title="Expériences & Formation" />

        {/* LinkedIn CTA */}
        <Reveal direction="up" style={{ textAlign: "center", marginBottom: 72, marginTop: -28 }}>
          <a
            href="https://www.linkedin.com/in/aylan-lounici"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: fonts.body, fontWeight: 600, fontSize: 14,
              color: "#0077B5", padding: "10px 26px",
              border: "1.5px solid #0077B530",
              borderRadius: 100,
              background: "#0077B508",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#0077B518";
              e.currentTarget.style.borderColor = "#0077B5";
              e.currentTarget.style.boxShadow = "0 4px 20px #0077B520";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0077B508";
              e.currentTarget.style.borderColor = "#0077B530";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Voir mon profil LinkedIn
          </a>
        </Reveal>

        {/* ── Zigzag Timeline ─────────────────────────────────── */}
        <div className="exp-timeline" style={{ position: "relative" }}>

          {/* Vertical center line */}
          <div style={{
            position: "absolute",
            left: "50%", top: 18, bottom: 18,
            width: 2,
            transform: "translateX(-50%)",
            background: `linear-gradient(to bottom,
              ${COLORS.accent}70,
              ${COLORS.warm}70,
              #4A7FD470,
              #7A9E7E70,
              #8A6FD470,
              ${COLORS.accent}70)`,
            borderRadius: 2,
          }} />

          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  marginBottom: i === items.length - 1 ? 0 : 44,
                  position: "relative",
                }}
              >
                {/* ── Card ── */}
                <Reveal
                  direction={isLeft ? "left" : "right"}
                  delay={i * 0.08}
                  style={{ width: "44%" }}
                >
                  <div style={{
                    background: COLORS.bg,
                    borderRadius: 20,
                    padding: "22px 26px",
                    border: `1px solid ${COLORS.warmLight}`,
                    boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}>

                    {/* Arrow tip pointing toward center */}
                    <div style={{
                      position: "absolute",
                      top: 22,
                      [isLeft ? "right" : "left"]: -8,
                      width: 15, height: 15,
                      background: COLORS.bg,
                      borderTop: isLeft
                        ? `1px solid ${COLORS.warmLight}`
                        : "none",
                      borderRight: isLeft
                        ? `1px solid ${COLORS.warmLight}`
                        : "none",
                      borderBottom: isLeft
                        ? "none"
                        : `1px solid ${COLORS.warmLight}`,
                      borderLeft: isLeft
                        ? "none"
                        : `1px solid ${COLORS.warmLight}`,
                      transform: "rotate(45deg)",
                    }} />

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: fonts.mono, fontSize: 10,
                        color: item.color,
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                        borderRadius: 100, padding: "3px 12px",
                        letterSpacing: 2, textTransform: "uppercase",
                      }}>
                        {item.type === "edu" ? "Formation" : "Expérience"}
                      </span>
                      {item.current && (
                        <span style={{
                          fontFamily: fonts.mono, fontSize: 10,
                          color: "#22c55e",
                          background: "#22c55e15",
                          border: "1px solid #22c55e30",
                          borderRadius: 100, padding: "3px 12px",
                          letterSpacing: 2, textTransform: "uppercase",
                        }}>● Actuel</span>
                      )}
                    </div>

                    <h3 style={{
                      fontFamily: fonts.display, fontSize: 17, fontWeight: 700,
                      color: COLORS.ink, margin: "0 0 4px", lineHeight: 1.3,
                    }}>{item.title}</h3>
                    <p style={{
                      fontFamily: fonts.body, fontSize: 13, fontWeight: 600,
                      color: item.color, marginBottom: 8,
                    }}>{item.org}</p>
                    <p style={{
                      fontFamily: fonts.body, fontSize: 14,
                      color: COLORS.inkSoft, lineHeight: 1.7, margin: 0,
                    }}>{item.desc}</p>
                  </div>
                </Reveal>

                {/* ── Center dot + date ── */}
                <div style={{
                  position: "absolute",
                  left: "50%", top: 20,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 2,
                }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: item.color,
                    border: `3px solid ${COLORS.cream}`,
                    boxShadow: `0 0 0 2px ${item.color}50`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: fonts.mono, fontSize: 10,
                    color: COLORS.inkMuted, letterSpacing: 0.5,
                    background: COLORS.cream,
                    padding: "2px 10px", borderRadius: 100,
                    border: `1px solid ${COLORS.warmLight}`,
                    whiteSpace: "nowrap",
                  }}>{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-timeline > div {
            justify-content: flex-end !important;
          }
          .exp-timeline > div > div:first-child {
            width: 80% !important;
          }
          .exp-timeline > div > div:last-child {
            left: 10% !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
