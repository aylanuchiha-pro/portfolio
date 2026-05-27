import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 40px", maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
      <SectionTitle number="07" label="contact" title="Parlons ensemble" />
      <Reveal>
        <p style={{ fontFamily: fonts.body, fontSize: 17, color: COLORS.inkSoft, lineHeight: 1.8, marginBottom: 40 }}>
          Un projet web en tête ? Besoin d'un audit de sécurité ?<br />
          N'hésitez pas à me contacter.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
          {[
            ["Email", "mailto:votre@email.com"],
            ["GitHub", "https://github.com/aylanuchiha-pro"],
            ["LinkedIn", "https://linkedin.com/"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: fonts.body, fontWeight: 500, fontSize: 14,
              padding: "12px 28px", borderRadius: 100,
              border: `1px solid ${COLORS.warmLight}`, background: COLORS.cream,
              color: COLORS.inkSoft, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.accent; e.target.style.color = COLORS.accent; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.warmLight; e.target.style.color = COLORS.inkSoft; e.target.style.transform = "none"; }}
            >{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { type: "text", placeholder: "Votre nom" },
            { type: "email", placeholder: "Votre email" },
          ].map(({ type, placeholder }) => (
            <input key={placeholder} type={type} placeholder={placeholder} style={{
              fontFamily: fonts.body, fontSize: 15, padding: "14px 20px",
              borderRadius: 12, border: `1px solid ${COLORS.warmLight}`,
              background: COLORS.cream, color: COLORS.ink, outline: "none",
            }} />
          ))}
          <textarea placeholder="Votre message..." rows={5} style={{
            fontFamily: fonts.body, fontSize: 15, padding: "14px 20px",
            borderRadius: 12, border: `1px solid ${COLORS.warmLight}`,
            background: COLORS.cream, color: COLORS.ink, outline: "none", resize: "vertical",
          }} />
          <button style={{
            fontFamily: fonts.body, fontWeight: 600, fontSize: 15,
            padding: "14px 36px", borderRadius: 100, border: "none",
            background: COLORS.ink, color: COLORS.bg, cursor: "pointer",
            alignSelf: "center", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.accent; e.target.style.boxShadow = "0 8px 30px rgba(232,87,42,0.3)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.ink; e.target.style.boxShadow = "none"; }}
          >Envoyer le message</button>
        </div>
      </Reveal>
    </section>
  );
}
