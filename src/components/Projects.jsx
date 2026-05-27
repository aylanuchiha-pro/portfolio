import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { COLORS, fonts } from "../theme";

const projects = [
  { name: "TixyCars",          desc: "Site automobile avec design immersif et animations fluides.",                   tech: ["HTML","CSS","JavaScript"],    url: "https://tixycars.fr",                             color: "#E8572A" },
  { name: "Portfolio Créatif", desc: "Portfolio personnel avec effets visuels et transitions avancées.",            tech: ["HTML","CSS","JS"],             url: "https://moonlit-brioche-a46b5e.netlify.app",      color: "#7A9E7E" },
  { name: "Vacance",           desc: "Site thématique voyage avec galerie photo et interface élégante.",            tech: ["HTML","CSS","GitHub Pages"],   url: "https://aylanuchiha-pro.github.io/vacance",       color: "#4A7FD4" },
  { name: "Che",               desc: "Projet web créatif avec mise en page originale et animations.",              tech: ["HTML","CSS","GitHub Pages"],   url: "https://aylanuchiha-pro.github.io/che",           color: "#C4956A" },
  { name: "Eel",               desc: "Application web moderne déployée sur Vercel avec interface soignée.",       tech: ["React","Vercel","CSS"],        url: "https://eel-dusky.vercel.app",                    color: "#8A6FD4" },
];

// ─── Browser mockup with iframe preview ──────────────────────────────────────
function BrowserMockup({ project, active }) {
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc?.body?.innerHTML) setIframeLoaded(true);
    } catch {
      // Blocked by X-Frame-Options — CSS fallback stays
    }
  };

  return (
    <div style={{
      borderRadius: 16, overflow: "hidden",
      border: `1px solid ${COLORS.warmLight}`,
      background: COLORS.bgDark,
      boxShadow: `0 24px 60px rgba(196,149,106,0.15), 0 4px 20px rgba(0,0,0,0.06)`,
    }}>
      {/* Chrome bar */}
      <div style={{
        padding: "9px 14px", display: "flex", alignItems: "center", gap: 10,
        background: COLORS.bgDark, borderBottom: `1px solid ${COLORS.warmLight}`,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: .85 }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: COLORS.cream, borderRadius: 5,
          border: `1px solid ${COLORS.warmLight}`,
          padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden",
        }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={COLORS.inkMuted} strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: COLORS.inkMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {project.url}
          </span>
        </div>
      </div>

      {/* Preview area */}
      <div style={{ height: "clamp(220px, 32vh, 360px)", overflow: "hidden", position: "relative", background: COLORS.bgDark }}>
        {/* CSS gradient placeholder */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: iframeLoaded ? 0 : 1, transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: fonts.display, fontSize: 42, fontStyle: "italic",
            color: project.color, opacity: 0.25,
          }}>{project.name}</span>
        </div>

        {/* Real iframe (loaded only when card is active/nearby) */}
        {active && (
          <iframe
            ref={iframeRef}
            src={project.url}
            onLoad={handleIframeLoad}
            title={project.name}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "250%", height: "250%",
              border: "none",
              transform: "scale(0.4)",
              transformOrigin: "0 0",
              pointerEvents: "none",
              opacity: iframeLoaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIdx(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const p = projects[selectedIdx];

  return (
    <section id="projects" style={{ padding: "120px 0 100px", background: COLORS.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontFamily: fonts.mono, fontSize: 13,
            color: COLORS.accent, letterSpacing: 3, textTransform: "uppercase",
          }}>02 — réalisations</span>
          <h2 style={{
            fontFamily: fonts.display, fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700, color: COLORS.ink, margin: "12px 0 0", lineHeight: 1.1,
          }}>Projets</h2>
        </div>

        {/* Carousel viewport */}
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 24 }}>
            {projects.map((project, i) => {
              const isActive = i === selectedIdx;
              return (
                <div
                  key={project.name}
                  style={{
                    flex: "0 0 min(88vw, 800px)",
                    minWidth: 0,
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                    transform: isActive ? "scale(1)" : "scale(0.93)",
                    opacity: isActive ? 1 : 0.55,
                    cursor: isActive ? "default" : "pointer",
                  }}
                  onClick={() => !isActive && emblaApi?.scrollTo(i)}
                >
                  {/* Browser mockup */}
                  <BrowserMockup project={project} active={Math.abs(i - selectedIdx) <= 1} />

                  {/* Card info */}
                  <div style={{
                    marginTop: 24, padding: "0 4px",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(8px)",
                    transition: "all 0.4s ease",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                      <div>
                        <div style={{
                          fontFamily: fonts.mono, fontSize: 11, letterSpacing: 3,
                          textTransform: "uppercase", color: project.color, marginBottom: 6,
                        }}>
                          Projet 0{i + 1} / 0{projects.length}
                        </div>
                        <h3 style={{
                          fontFamily: fonts.display, fontSize: "clamp(22px, 3vw, 32px)",
                          fontWeight: 700, fontStyle: "italic", color: COLORS.ink,
                          margin: "0 0 10px", lineHeight: 1.2,
                        }}>{project.name}</h3>
                        <p style={{
                          fontFamily: fonts.body, fontSize: 15, color: COLORS.inkSoft,
                          lineHeight: 1.7, maxWidth: 460, margin: "0 0 16px",
                        }}>{project.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {project.tech.map(t => (
                            <span key={t} style={{
                              fontFamily: fonts.mono, fontSize: 11,
                              padding: "4px 14px", borderRadius: 100,
                              background: `${project.color}12`,
                              color: project.color,
                              border: `1px solid ${project.color}30`,
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 10,
                          fontFamily: fonts.body, fontWeight: 600, fontSize: 14,
                          color: "#fff", background: project.color,
                          padding: "12px 28px", borderRadius: 100,
                          boxShadow: `0 4px 20px ${project.color}40`,
                          transition: "all 0.3s", flexShrink: 0,
                          textDecoration: "none",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = `0 8px 30px ${project.color}60`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = `0 4px 20px ${project.color}40`;
                        }}
                      >
                        Visiter
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 24, marginTop: 40,
        }}>
          {/* Prev */}
          <button
            onClick={scrollPrev}
            disabled={!canPrev}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1.5px solid ${canPrev ? COLORS.ink : COLORS.warmLight}`,
              background: "transparent",
              color: canPrev ? COLORS.ink : COLORS.warmLight,
              cursor: canPrev ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { if (canPrev) { e.currentTarget.style.background = COLORS.ink; e.currentTarget.style.color = COLORS.bg; } }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = canPrev ? COLORS.ink : COLORS.warmLight; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {projects.map((proj, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                style={{
                  width: selectedIdx === i ? 28 : 8,
                  height: 8, borderRadius: 100,
                  background: selectedIdx === i ? p.color : COLORS.warmLight,
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={scrollNext}
            disabled={!canNext}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1.5px solid ${canNext ? COLORS.ink : COLORS.warmLight}`,
              background: "transparent",
              color: canNext ? COLORS.ink : COLORS.warmLight,
              cursor: canNext ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { if (canNext) { e.currentTarget.style.background = COLORS.ink; e.currentTarget.style.color = COLORS.bg; } }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = canNext ? COLORS.ink : COLORS.warmLight; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects > div > div:nth-child(2) > div > div {
            flex: 0 0 90vw !important;
          }
        }
      `}</style>
    </section>
  );
}
