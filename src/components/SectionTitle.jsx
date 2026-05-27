import Reveal from "./Reveal";
import { COLORS, fonts } from "../theme";

export default function SectionTitle({ number, label, title, light = false }) {
  return (
    <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
      <span style={{
        fontFamily: fonts.mono, fontSize: 13,
        color: light ? "rgba(255,255,255,0.4)" : COLORS.accent,
        letterSpacing: 3,
      }}>
        {number} — {label}
      </span>
      <h2 style={{
        fontFamily: fonts.display,
        fontSize: "clamp(30px, 5vw, 52px)",
        fontWeight: 700,
        color: light ? "#fff" : COLORS.ink,
        margin: "12px 0 0",
        lineHeight: 1.1,
      }}>
        {title}
      </h2>
    </Reveal>
  );
}
