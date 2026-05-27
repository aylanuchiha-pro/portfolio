import { useState, useEffect } from "react";
import { COLORS, fonts } from "../theme";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    ["À propos", "#about"],
    ["Projets", "#projects"],
    ["Skills", "#skills"],
    ["Parcours", "#experience"],
    ["Voyages", "#travels"],
    ["Contact", "#contact"],
  ];

  const navBg = menuOpen
    ? "transparent"
    : scrolled
      ? "rgba(250,247,242,0.92)"
      : "transparent";

  const navColor = COLORS.ink;
  const linkColor = COLORS.inkSoft;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "12px 40px" : "20px 40px",
      background: navBg,
      backdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
      borderBottom: scrolled && !menuOpen ? `1px solid ${COLORS.warmLight}` : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#hero" style={{
        fontFamily: fonts.display, fontSize: 22, fontWeight: 700,
        fontStyle: "italic", color: navColor, letterSpacing: "-0.5px",
        position: "relative", zIndex: 1010,
      }}>
        portfolio<span style={{ color: COLORS.accent }}>.</span>
      </a>

      {/* Desktop links */}
      <div className="nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map(([label, href]) => (
          <a key={href} href={href} style={{
            fontFamily: fonts.body, fontSize: 14, fontWeight: 500,
            color: linkColor, letterSpacing: "0.5px",
            transition: "color 0.3s", position: "relative",
          }}
            onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
            onMouseLeave={(e) => (e.target.style.color = linkColor)}
          >{label}</a>
        ))}
      </div>

      {/* Mobile hamburger — always above overlay */}
      <button
        className="nav-mobile-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", padding: 8, position: "relative", zIndex: 1010,
          alignItems: "center", justifyContent: "center",
        }}
        aria-label="Menu"
      >
        <div style={{ width: 24, height: 18, position: "relative" }}>
          {[0, 7, 14].map((top, i) => (
            <span key={i} style={{
              position: "absolute", left: 0, width: 24, height: 2,
              background: menuOpen ? COLORS.ink : navColor,
              borderRadius: 2, transition: "all 0.3s ease",
              top: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? 7 : top,
              transform: menuOpen && i === 0 ? "rotate(45deg)" : menuOpen && i === 2 ? "rotate(-45deg)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </div>
      </button>

      {/* Mobile fullscreen menu overlay */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(250,247,242,0.98)",
        zIndex: 1005,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 36,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        {links.map(([label, href]) => (
          <a key={href} href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: fonts.display, fontSize: 28,
              color: COLORS.ink,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: "all 0.4s ease",
            }}
          >{label}</a>
        ))}
      </div>
    </nav>
  );
}
