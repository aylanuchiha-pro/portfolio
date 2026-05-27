import { useState, useEffect, useRef, useCallback } from "react";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

const projects = [
  {
    name: "TixyCars", desc: "Site automobile avec design immersif et animations fluides.",
    tech: ["HTML", "CSS", "JavaScript"], url: "https://tixycars.fr", color: "#E8572A",
  },
  {
    name: "Portfolio Créatif", desc: "Portfolio personnel avec effets visuels et transitions avancées.",
    tech: ["HTML", "CSS", "JS"], url: "https://moonlit-brioche-a46b5e.netlify.app", color: "#7A9E7E",
  },
  {
    name: "Vacance", desc: "Site thématique voyage avec galerie photo et interface élégante.",
    tech: ["HTML", "CSS", "GitHub Pages"], url: "https://aylanuchiha-pro.github.io/vacance", color: "#4A7FD4",
  },
  {
    name: "Che", desc: "Projet web créatif avec mise en page originale et animations.",
    tech: ["HTML", "CSS", "GitHub Pages"], url: "https://aylanuchiha-pro.github.io/che", color: "#C4956A",
  },
  {
    name: "Eel", desc: "Application web moderne déployée sur Vercel avec interface soignée.",
    tech: ["React", "Vercel", "CSS"], url: "https://eel-dusky.vercel.app", color: "#8A6FD4",
  },
];

function ProjectSlide({ project, index, isActive }) {
  return (
    <div style={{
      height: "100vh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "60px 40px",
      scrollSnapAlign: "start",
      position: "relative",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.3fr",
        gap: "clamp(30px, 5vw, 80px)", alignItems: "center",
        maxWidth: 1200, width: "100%",
        opacity: isActive ? 1 : 0.3,
        transform: isActive ? "scale(1)" : "scale(0.92)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }} className="project-slide-grid">
        {/* Text side */}
        <div style={{
          transform: isActive ? "translateX(0)" : "translateX(-30px)",
          opacity: isActive ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          <span style={{
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: 3,
            textTransform: "uppercase", color: project.color,
            display: "block", marginBottom: 14,
          }}>
            Projet 0{index + 1} / 0{projects.length}
          </span>
          <h3 style={{
            fontFamily: fonts.display, fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, fontStyle: "italic", color: "#fff",
            margin: "0 0 16px", lineHeight: 1.1,
          }}>{project.name}</h3>
          <p style={{
            fontFamily: fonts.body, fontSize: 17, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7, marginBottom: 24, maxWidth: 380,
          }}>{project.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily: fonts.mono, fontSize: 11, padding: "5px 14px",
                borderRadius: 100, background: `${project.color}15`,
                color: project.color, border: `1px solid ${project.color}30`,
              }}>{t}</span>
            ))}
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: fonts.body, fontWeight: 600, fontSize: 14,
            color: "#0C0C0C", background: project.color,
            padding: "12px 32px", borderRadius: 100,
            display: "inline-flex", alignItems: "center", gap: 10,
            transition: "all 0.3s", boxShadow: `0 4px 20px ${project.color}40`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${project.color}60`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 20px ${project.color}40`; }}
          >
            Visiter le site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>

        {/* Browser mockup with iframe */}
        <div style={{
          transform: isActive ? "rotateY(-3deg) rotateX(1deg)" : "rotateY(-15deg) scale(0.9)",
          opacity: isActive ? 1 : 0.2,
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
          transformStyle: "preserve-3d", perspective: 1200,
        }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            boxShadow: isActive
              ? `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${project.color}15`
              : "0 20px 60px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.08)", background: "#1a1a1a",
            transition: "box-shadow 0.6s ease",
          }}>
            {/* Chrome bar */}
            <div style={{
              padding: "10px 14px", display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6,
                padding: "5px 10px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden",
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <span style={{
                  fontFamily: fonts.mono, fontSize: 10, color: "rgba(255,255,255,0.3)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{project.url}</span>
              </div>
            </div>
            {/* iframe */}
            <div style={{ position: "relative", height: "clamp(280px, 40vh, 440px)", overflow: "hidden", background: "#111" }}>
              <iframe
                src={project.url} title={project.name}
                style={{
                  width: "200%", height: "200%",
                  transform: "scale(0.5)", transformOrigin: "top left",
                  border: "none", pointerEvents: "none",
                }}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
                background: "linear-gradient(transparent, #1a1a1a)", pointerEvents: "none",
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Detect which slide is in view using IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const slides = container.querySelectorAll("[data-slide-idx]");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveIdx(parseInt(entry.target.dataset.slideIdx));
        }
      });
    }, { root: container, threshold: 0.5 });

    slides.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-slide-idx="${idx}"]`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Gradient transition from light to dark */}
      <div style={{
        height: 200,
        background: `linear-gradient(to bottom, ${COLORS.bg}, #0C0C0C)`,
        position: "relative", zIndex: 1,
      }} />

      <section id="projects" style={{
        background: "#0C0C0C", position: "relative",
      }}>
        {/* Title */}
        <div style={{ padding: "60px 40px 20px", maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle number="02" label="réalisations" title="Projets" light />
        </div>

        {/* Scroll-snap container */}
        <div ref={scrollRef} style={{
          height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          position: "relative",
        }}>
          {projects.map((p, i) => (
            <div key={i} data-slide-idx={i} style={{ scrollSnapAlign: "start" }}>
              <ProjectSlide project={p} index={i} isActive={activeIdx === i} />
            </div>
          ))}
        </div>

        {/* Side dot navigation */}
        <div style={{
          position: "sticky", bottom: "50%", marginLeft: "auto", width: 40,
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 12, zIndex: 20, transform: "translateY(50%)",
          pointerEvents: "auto",
          position: "fixed", right: 28, top: "50%",
        }}>
          {projects.map((p, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: activeIdx === i ? 10 : 8,
              height: activeIdx === i ? 32 : 8,
              borderRadius: 100,
              background: activeIdx === i ? p.color : "rgba(255,255,255,0.2)",
              border: "none", cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", padding: 0,
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, height: 3, zIndex: 20,
          width: `${((activeIdx + 1) / projects.length) * 100}%`,
          background: `linear-gradient(90deg, ${projects[activeIdx]?.color || COLORS.accent}, ${projects[Math.min(activeIdx + 1, projects.length - 1)]?.color || COLORS.accent})`,
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          borderRadius: "0 2px 2px 0",
        }} />

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 24, left: "50%",
          transform: "translateX(-50%)", fontFamily: fonts.mono,
          fontSize: 11, color: "rgba(255,255,255,0.2)",
          letterSpacing: 2, display: "flex", alignItems: "center", gap: 10, zIndex: 20,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "scrollBounce 2s ease infinite" }}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          SCROLL
        </div>
      </section>

      {/* Gradient transition from dark back to light */}
      <div style={{
        height: 200,
        background: `linear-gradient(to bottom, #0C0C0C, ${COLORS.bg})`,
        position: "relative", zIndex: 1,
      }} />

      <style>{`
        @media(max-width:768px){
          .project-slide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
