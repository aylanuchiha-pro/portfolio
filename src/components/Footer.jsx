import { COLORS, fonts } from "../theme";

export default function Footer() {
  return (
    <footer style={{
      textAlign: "center", padding: "40px 20px",
      borderTop: `1px solid ${COLORS.warmLight}`, background: COLORS.bg,
    }}>
      <p style={{ fontFamily: fonts.body, fontSize: 14, color: COLORS.inkMuted }}>
        Conçu & développé avec <span style={{ color: COLORS.accent }}>♥</span> — 2026
      </p>
    </footer>
  );
}
