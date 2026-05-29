import { useState, useEffect, useRef, useCallback } from "react";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

const skillCategories = [
  {
    name: "Frontend", icon: "◆", color: "#E8572A",
    items: [
      { name: "HTML5", level: 95 }, { name: "CSS3 / Sass", level: 90 },
      { name: "JavaScript", level: 92 }, { name: "TypeScript", level: 80 },
      { name: "React", level: 88 }, { name: "Next.js", level: 78 },
      { name: "Vue.js", level: 75 }, { name: "Tailwind CSS", level: 90 },
      { name: "Three.js", level: 65 },
    ],
  },
  {
    name: "Backend", icon: "⬡", color: "#7A9E7E",
    items: [
      { name: "Node.js", level: 85 }, { name: "Express", level: 82 },
      { name: "Python", level: 80 }, { name: "Django", level: 70 },
      { name: "PHP", level: 65 }, { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 80 }, { name: "REST API", level: 90 },
      { name: "GraphQL", level: 68 },
    ],
  },
  {
    name: "Cybersécurité", icon: "◈", color: "#4A7FD4",
    items: [
      { name: "Pentesting", level: 85 }, { name: "Burp Suite", level: 80 },
      { name: "Nmap", level: 82 }, { name: "Wireshark", level: 78 },
      { name: "Metasploit", level: 72 }, { name: "OWASP Top 10", level: 90 },
      { name: "CTF", level: 88 }, { name: "Reverse Eng.", level: 65 },
      { name: "Kali Linux", level: 85 },
    ],
  },
  {
    name: "DevOps & Outils", icon: "◇", color: "#C4956A",
    items: [
      { name: "Git / GitHub", level: 92 }, { name: "Docker", level: 78 },
      { name: "CI/CD", level: 70 }, { name: "VS Code", level: 95 },
      { name: "Figma", level: 72 }, { name: "Vercel", level: 85 },
    ],
  },
];

function SkillCard({ cat, index }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const raw = 1 - (rect.top - window.innerHeight * 0.3) / (window.innerHeight * 0.7);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouse = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const eased = 1 - Math.pow(1 - Math.min(1, progress * 1.4), 3);
  const rotateY = (1 - eased) * (index % 2 === 0 ? 30 : -30);
  const translateY = (1 - eased) * 80;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{ perspective: 1200 }}>
      <div style={{
        background: COLORS.cream, borderRadius: 24, padding: "clamp(16px, 3vw, 36px) clamp(14px, 2.5vw, 32px)",
        border: `1px solid ${COLORS.warmLight}`,
        opacity: eased,
        transform: `
          rotateY(${rotateY + mousePos.x * 5}deg)
          rotateX(${mousePos.y * -5}deg)
          translateY(${translateY}px) scale(${0.85 + eased * 0.15})
        `,
        transition: `opacity 0.6s ease, transform ${mousePos.x || mousePos.y ? '0.08s linear' : '0.7s cubic-bezier(0.16,1,0.3,1)'}`,
        transformStyle: "preserve-3d",
        boxShadow: eased > 0.5 ? `0 20px 60px rgba(0,0,0,0.06)` : "none",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: -40, right: -40, width: 160, height: 160,
          borderRadius: "50%", background: cat.color, opacity: 0.04,
          filter: "blur(50px)", pointerEvents: "none",
        }} />

        {/* Header */}
        <div className="skill-header" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div className="skill-icon" style={{
            width: 44, height: 44, borderRadius: 14,
            background: `${cat.color}12`, border: `1px solid ${cat.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, color: cat.color, flexShrink: 0,
          }}>{cat.icon}</div>
          <div style={{ minWidth: 0 }}>
            <h3 className="skill-title" style={{
              fontFamily: fonts.display, fontSize: 22, fontWeight: 600,
              color: COLORS.ink, margin: 0, fontStyle: "italic",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{cat.name}</h3>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: COLORS.inkMuted }}>
              {cat.items.length} compétences
            </span>
          </div>
        </div>

        {/* Skill bars */}
        <div className="skill-bars" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cat.items.map((skill, si) => {
            const barProgress = Math.max(0, Math.min(1, (eased - 0.3) * 1.8));
            const stagger = si * 0.05;
            const barW = Math.max(0, Math.min(skill.level, (barProgress - stagger) * skill.level * 2));

            return (
              <div key={skill.name}
                onMouseEnter={() => setHovered(si)}
                onMouseLeave={() => setHovered(null)}
                style={{ transition: "all 0.3s ease", transform: hovered === si ? "translateX(4px)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{
                    fontFamily: fonts.body, fontSize: 13, fontWeight: 500,
                    color: hovered === si ? cat.color : COLORS.inkSoft, transition: "color 0.3s",
                  }}>{skill.name}</span>
                  <span style={{
                    fontFamily: fonts.mono, fontSize: 11,
                    color: hovered === si ? cat.color : COLORS.inkMuted,
                    opacity: hovered === si ? 1 : 0.6, transition: "all 0.3s",
                  }}>{Math.round(barW)}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: `${cat.color}10`, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3, width: `${barW}%`,
                    background: hovered === si
                      ? `linear-gradient(90deg, ${cat.color}, ${cat.color}cc)`
                      : `linear-gradient(90deg, ${cat.color}80, ${cat.color}40)`,
                    transition: "width 0.8s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                    boxShadow: hovered === si ? `0 0 12px ${cat.color}40` : "none",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto", overflowX: "hidden" }}>
      <SectionTitle number="04" label="compétences" title="Skills" />
      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 28,
        }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.name} cat={cat} index={i} />
        ))}
      </div>
      <style>{`
        @media(max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .skill-header { gap: 8px !important; margin-bottom: 14px !important; }
          .skill-icon { width: 32px !important; height: 32px !important; border-radius: 10px !important; font-size: 14px !important; }
          .skill-title { font-size: 13px !important; }
          .skill-bars { gap: 8px !important; }
        }
        @media(max-width: 400px) {
          .skill-title { font-size: 12px !important; }
          .skill-icon { width: 28px !important; height: 28px !important; }
        }
      `}</style>
    </section>
  );
}
