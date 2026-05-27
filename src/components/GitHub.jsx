import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import { COLORS, fonts } from "../theme";

const GITHUB_URL = "https://github.com/aylanuchiha-pro";
const USERNAME = "aylanuchiha-pro";

const COMMITS = [
  '$ git commit -m "feat: nouvelle section portfolio"',
  '$ git push origin main',
  '$ git checkout -b feature/animation',
  '$ git commit -m "fix: responsive layout"',
  '$ git merge feature/animation',
  '$ git tag v2.0.0',
];

// 3 orbital rings, 2 dots each
const ORBITS = [
  { r: 88,  speed: 7,  color1: COLORS.accent,  color2: COLORS.sage,  dir: "normal"  },
  { r: 126, speed: 11, color1: "#4A7FD4",       color2: COLORS.warm,  dir: "reverse" },
  { r: 164, speed: 16, color1: "#8A6FD4",       color2: COLORS.accent, dir: "normal" },
];

const STATS = [
  { value: "25+", label: "Repos" },
  { value: "200+", label: "Commits" },
  { value: "10+", label: "Stars" },
];

export default function GitHub() {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIdx, setCharIdx] = useState(0);
  const [prevLines, setPrevLines] = useState([]);

  // Typing animation
  useEffect(() => {
    const current = COMMITS[lineIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPrevLines(p => [...p.slice(-3), current]);
        const nextIdx = (lineIdx + 1) % COMMITS.length;
        setLineIdx(nextIdx);
        setDisplayed("");
        setCharIdx(0);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  return (
    <section
      id="github"
      style={{
        padding: "120px 40px",
        background: COLORS.bgDark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blur circles */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accent}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.sage}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(40px, 6vw, 100px)",
        alignItems: "center",
      }} className="github-grid">

        {/* ── Left: animated logo ── */}
        <Reveal direction="left">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div className="github-orbital" style={{
              position: "relative",
              width: 360,
              height: 360,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* Orbital rings + dots */}
              {ORBITS.map((o, oi) => (
                <div key={oi} style={{
                  position: "absolute",
                  width: o.r * 2,
                  height: o.r * 2,
                  borderRadius: "50%",
                  border: `1px solid ${o.color1}20`,
                  top: "50%", left: "50%",
                  marginTop: -o.r, marginLeft: -o.r,
                }}>
                  {/* Dot 1 */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    animation: `spin ${o.speed}s linear infinite`,
                    animationDirection: o.dir,
                  }}>
                    <div style={{
                      position: "absolute",
                      top: -5, left: "50%",
                      transform: "translateX(-50%)",
                      width: 10, height: 10,
                      borderRadius: "50%",
                      background: o.color1,
                      boxShadow: `0 0 12px ${o.color1}99, 0 0 4px ${o.color1}`,
                    }} />
                  </div>
                  {/* Dot 2 (180° offset) */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    animation: `spin ${o.speed}s linear infinite`,
                    animationDirection: o.dir,
                    animationDelay: `-${o.speed / 2}s`,
                  }}>
                    <div style={{
                      position: "absolute",
                      top: -4, left: "50%",
                      transform: "translateX(-50%)",
                      width: 7, height: 7,
                      borderRadius: "50%",
                      background: o.color2,
                      boxShadow: `0 0 10px ${o.color2}99`,
                    }} />
                  </div>
                </div>
              ))}

              {/* Pulsing rings */}
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: "absolute",
                  width: 80, height: 80,
                  borderRadius: "50%",
                  border: `2px solid ${COLORS.accent}`,
                  animation: `gh-pulse 3s ease-out ${i * 1}s infinite`,
                }} />
              ))}

              {/* GitHub logo button */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: 80, height: 80,
                  borderRadius: "50%",
                  background: COLORS.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "gh-float 4s ease-in-out infinite",
                  boxShadow: `0 8px 32px rgba(26,26,26,0.25), 0 0 0 6px ${COLORS.warmLight}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.12)";
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(26,26,26,0.35), 0 0 0 8px ${COLORS.warmLight}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = `0 8px 32px rgba(26,26,26,0.25), 0 0 0 6px ${COLORS.warmLight}`;
                }}
              >
                <svg viewBox="0 0 24 24" width="38" height="38" fill={COLORS.bg}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Right: content ── */}
        <Reveal direction="right">
          <div>
            <span style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: 3,
              color: COLORS.accent,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 10,
            }}>
              open source
            </span>

            <h2 style={{
              fontFamily: fonts.display,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: COLORS.ink,
              margin: "0 0 8px",
              lineHeight: 1.1,
            }}>
              Mon GitHub
            </h2>

            <p style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              color: COLORS.accent,
              marginBottom: 28,
            }}>
              @{USERNAME}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
              {STATS.map(({ value, label }) => (
                <div key={label} style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "16px 12px",
                  borderRadius: 14,
                  background: COLORS.cream,
                  border: `1px solid ${COLORS.warmLight}`,
                }}>
                  <div style={{
                    fontFamily: fonts.display,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.accent,
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: fonts.body,
                    fontSize: 12,
                    color: COLORS.inkMuted,
                    marginTop: 4,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div style={{
              background: COLORS.ink,
              borderRadius: 14,
              padding: "18px 22px",
              marginBottom: 32,
              overflow: "hidden",
            }}>
              {/* Window bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
                <span style={{
                  fontFamily: fonts.mono, fontSize: 10,
                  color: "rgba(255,255,255,0.25)",
                  marginLeft: 8, letterSpacing: 1,
                }}>
                  terminal
                </span>
              </div>

              {/* Previous lines (faded) */}
              {prevLines.map((line, i) => (
                <div key={i} style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: `rgba(255,255,255,${0.15 + i * 0.08})`,
                  marginBottom: 4,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}>
                  {line}
                </div>
              ))}

              {/* Current line (typing) */}
              <div style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{ color: COLORS.sage, marginRight: 6 }}>▶</span>
                {displayed}
                <span style={{
                  display: "inline-block",
                  width: 7, height: 14,
                  background: COLORS.accent,
                  marginLeft: 2,
                  animation: "blink 1s step-end infinite",
                  borderRadius: 1,
                }} />
              </div>
            </div>

            {/* CTA */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 15,
                color: COLORS.bg,
                background: COLORS.ink,
                padding: "14px 32px",
                borderRadius: 100,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(26,26,26,0.15)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = COLORS.accent;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 30px ${COLORS.accent}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = COLORS.ink;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,26,26,0.15)";
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Voir mon profil
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes gh-pulse {
          0%   { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes gh-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @media(max-width: 768px) {
          .github-grid { grid-template-columns: 1fr !important; }
          .github-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
