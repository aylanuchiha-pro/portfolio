import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

/* ─── données ─────────────────────────────────────────────────────────── */
const experiences = [
  {
    date: "Oct. 2025",
    name: "Cyber Humanum Est",
    sub: "Exercice de cyberguerre · COMCYBER × Lorraine INP",
    tags: ["LIO", "LID", "Forensics", "OSINT"],
    color: COLORS.accent,
    badge: "🏆 RANG #1 · Cryptanga",
    desc: "Simulation de cyberguerre réelle organisée par le Ministère des Armées. 100+ étudiants répartis en équipes nationales fictives, 72 h sans interruption.",
    bullets: [
      "Analyse & exploitation de CVE en environnement simulé",
      "Intrusion d'une ambassade virtuelle (Forensics, Crypto)",
      "Déploiement de malware offensif — Lutte Informatique Offensive",
      "Neutralisation d'intrusions ennemies — Lutte Informatique Défensive",
      "Cartographie des flux réseau critiques",
    ],
  },
  {
    date: "2025",
    name: "TRACS CTF",
    sub: "Compétition nationale",
    tags: ["OSINT", "Pwn", "Network", "Stéganographie"],
    color: "#4A7FD4",
    badge: null,
    desc: "CTF national multi-catégories. Coordination d'équipe, gestion du temps sous pression.",
    bullets: null,
  },
  {
    date: "Déc. 2024",
    name: "Rhintech CTF",
    sub: "CTF local · Polytech Nancy",
    tags: ["Web", "Crypto", "Forensics", "Reverse"],
    color: COLORS.warm,
    badge: null,
    desc: "CTF multi-catégories organisé localement. Challenges techniques en conditions réelles.",
    bullets: null,
  },
];

/* ─── coupe qui tourne ────────────────────────────────────────────────── */
function SpinningTrophy() {
  return (
    <>
      <style>{`
        @keyframes cup-spin   { to { transform: rotateY(360deg); } }
        @keyframes cup-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes cup-shadow { 0%,100%{opacity:.38;transform:translateX(-50%) scaleX(1)} 50%{opacity:.14;transform:translateX(-50%) scaleX(.5)} }
        @keyframes cup-halo   { 0%,100%{opacity:.55} 50%{opacity:1} }
      `}</style>
      <div style={{ position:"relative", display:"flex", justifyContent:"center", paddingBottom:32 }}>
        {/* ombre au sol */}
        <div style={{
          position:"absolute", bottom:6, left:"50%",
          width:130, height:28, borderRadius:"50%",
          background:`radial-gradient(ellipse, ${COLORS.accent}38, transparent 70%)`,
          animation:"cup-shadow 3.5s ease-in-out infinite",
        }} />
        {/* flottement */}
        <div style={{ animation:"cup-float 3.5s ease-in-out infinite" }}>
          {/* perspective pour la 3D */}
          <div style={{ perspective:480 }}>
            {/* rotation Y */}
            <div style={{ animation:"cup-spin 7s linear infinite", willChange:"transform" }}>
              {/* halo coloré */}
              <div style={{
                animation:"cup-halo 2.5s ease-in-out infinite",
                filter:`drop-shadow(0 0 26px rgba(220,130,0,.7)) drop-shadow(0 10px 28px rgba(0,0,0,.14))`,
              }}>
                <span style={{ fontSize:96, lineHeight:1, display:"block", userSelect:"none" }}>🏆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── podium isométrique ──────────────────────────────────────────────── */
function Podium() {
  const blocks = [
    { label:"Rhintech CTF", emoji:"🥈", h:78,  front:"#B2B2B2", top:"#CDCDCD", side:"#888" },
    { label:"CHE · Cryptanga", emoji:"🏆", h:118, front:COLORS.accent, top:"#F07040", side:"#B04020" },
    { label:"TRACS CTF",    emoji:"🥉", h:62,  front:"#CD7F32", top:"#E09040", side:"#8B5520" },
  ];
  const W=88, DX=12, DY=9;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:6 }}>
      {blocks.map(({ label, emoji, h, front, top, side }) => (
        <div key={label} style={{ position:"relative", width:W, flexShrink:0 }}>
          {/* face du dessus */}
          <div style={{
            position:"absolute", top:-DY, left:0, width:W, height:DY+1,
            background:top,
            clipPath:`polygon(0 100%, ${DX}px 0, ${W+DX}px 0, ${W}px 100%)`,
            zIndex:2,
          }} />
          {/* face de droite */}
          <div style={{
            position:"absolute", top:-DY, right:-DX, width:DX+1, height:h+DY,
            background:side,
            clipPath:`polygon(0 ${DY}px, ${DX}px 0, ${DX}px ${h}px, 0 ${h+DY}px)`,
            zIndex:1,
          }} />
          {/* face avant */}
          <div style={{
            width:W, height:h, position:"relative", zIndex:3,
            background:`linear-gradient(180deg, ${front}f0, ${front}99)`,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5,
          }}>
            <span style={{ fontSize: h > 100 ? 22 : 15, lineHeight:1 }}>{emoji}</span>
            <span style={{ fontFamily:fonts.mono, fontSize:8, letterSpacing:1, color:"rgba(255,255,255,.92)", textTransform:"uppercase", textAlign:"center", lineHeight:1.5, padding:"0 4px" }}>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── compteur animé ──────────────────────────────────────────────────── */
function Counter({ target, suffix="", label }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const steps=50, dur=1500;
        let i=0;
        const t = setInterval(() => {
          i++;
          setVal(Math.round(target*(1-Math.pow(1-i/steps,3))));
          if (i>=steps) clearInterval(t);
        }, dur/steps);
      }
    }, { threshold:.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div style={{ fontFamily:fonts.display, fontSize:"clamp(22px,3vw,40px)", fontWeight:700, color:COLORS.accent, lineHeight:1 }}>{val}{suffix}</div>
      <div style={{ fontFamily:fonts.mono, fontSize:9, letterSpacing:2, textTransform:"uppercase", color:COLORS.inkMuted, marginTop:5 }}>{label}</div>
    </div>
  );
}

/* ─── photo CHE avec tilt 3D au survol ───────────────────────────────── */
function CHEPhoto({ src, alt, rotate=0, delay=0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal direction="up" delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius:12, overflow:"hidden", height:"100%",
          transform: hov
            ? `perspective(700px) rotateY(${rotate>0?-5:5}deg) rotateX(-3deg) rotate(${rotate*.15}deg) scale(1.04) translateY(-5px)`
            : `perspective(700px) rotate(${rotate}deg)`,
          transition:"transform .5s cubic-bezier(.16,1,.3,1), box-shadow .4s",
          boxShadow: hov ? "0 20px 50px rgba(0,0,0,.14)" : "0 5px 20px rgba(0,0,0,.07)",
        }}
      >
        <img src={src} alt={alt} style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          filter: hov ? "brightness(1.04)" : "brightness(.97)",
          transition:"filter .4s, transform .5s",
          transform: hov ? "scale(1.06)" : "scale(1)",
        }} />
      </div>
    </Reveal>
  );
}

/* ─── composant principal ─────────────────────────────────────────────── */
export default function Cyber() {
  return (
    <section id="cyber" style={{ background:COLORS.bg, padding:"100px 40px 100px", position:"relative", overflow:"hidden" }}>

      {/* ambiance warm subtile */}
      <div style={{ position:"absolute", top:"-8%", right:"-4%", width:"42%", height:"65%", background:`radial-gradient(ellipse at top right, ${COLORS.warmLight}50, transparent 65%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-4%", left:"4%", width:"28%", height:"38%", background:`radial-gradient(ellipse at bottom left, ${COLORS.bgDark}70, transparent 65%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>

        {/* titre de section */}
        <SectionTitle number="06" label="cybersécurité" title="Cybersécurité" />

        {/* accroche */}
        <Reveal>
          <p style={{ fontFamily:fonts.body, fontSize:16, color:COLORS.inkSoft, lineHeight:1.9, maxWidth:500, marginBottom:64 }}>
            La cybersécurité, c'est penser comme un attaquant pour défendre mieux.
            CTF, exercices de cyberguerre, veille permanente — chaque challenge est une
            opportunité d'aller plus loin dans la compréhension des systèmes.
          </p>
        </Reveal>

        {/* grille principale */}
        <div className="cyber-grid" style={{ display:"grid", gridTemplateColumns:"55% 1fr", gap:"clamp(40px,5vw,80px)", alignItems:"start", marginBottom:60 }}>

          {/* ── colonne gauche : timeline ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:40 }}>
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} direction="left" delay={i*.09}>
                <div style={{
                  borderLeft:`2px solid ${exp.color}45`,
                  paddingLeft:26, position:"relative",
                }}>
                  {/* point */}
                  <div style={{
                    position:"absolute", left:-7, top:4,
                    width:12, height:12, borderRadius:"50%",
                    background:exp.color, border:`2.5px solid ${COLORS.bg}`,
                    boxShadow:`0 0 0 1px ${exp.color}50`,
                  }} />

                  {/* date */}
                  <div style={{ fontFamily:fonts.mono, fontSize:9, letterSpacing:2, textTransform:"uppercase", color:COLORS.inkMuted, marginBottom:8 }}>
                    {exp.date}
                  </div>

                  {/* badge RANG #1 */}
                  {exp.badge && (
                    <div style={{ display:"inline-flex", alignItems:"center", marginBottom:10, background:`${COLORS.accent}10`, border:`1px solid ${COLORS.accent}28`, borderRadius:100, padding:"4px 14px" }}>
                      <span style={{ fontFamily:fonts.mono, fontSize:9, letterSpacing:1, color:COLORS.accent }}>{exp.badge}</span>
                    </div>
                  )}

                  {/* titre */}
                  <h3 style={{ fontFamily:fonts.display, fontSize:"clamp(18px,2vw,24px)", fontWeight:700, fontStyle:"italic", color:COLORS.ink, margin:"0 0 3px" }}>
                    {exp.name}
                  </h3>
                  <div style={{ fontFamily:fonts.body, fontSize:12, color:COLORS.inkMuted, marginBottom:12 }}>{exp.sub}</div>

                  {/* tags */}
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
                    {exp.tags.map(t => (
                      <span key={t} style={{ fontFamily:fonts.mono, fontSize:8, letterSpacing:1.5, textTransform:"uppercase", color:exp.color, background:`${exp.color}10`, border:`1px solid ${exp.color}28`, borderRadius:100, padding:"3px 10px" }}>{t}</span>
                    ))}
                  </div>

                  <p style={{ fontFamily:fonts.body, fontSize:14, color:COLORS.inkSoft, lineHeight:1.8, margin:0 }}>{exp.desc}</p>

                  {/* bullets missions CHE */}
                  {exp.bullets && (
                    <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:6 }}>
                      {exp.bullets.map((b, j) => (
                        <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                          <span style={{ color:COLORS.accent, fontSize:10, marginTop:3, flexShrink:0 }}>▸</span>
                          <span style={{ fontFamily:fonts.body, fontSize:13, color:COLORS.inkSoft, lineHeight:1.6 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── colonne droite : visuals ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:36 }}>

            {/* Trophée 3D rotatif */}
            <Reveal direction="right">
              <SpinningTrophy />
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:fonts.display, fontSize:"clamp(20px,2.2vw,30px)", fontWeight:700, fontStyle:"italic", color:COLORS.accent }}>RANG #1</div>
                <div style={{ fontFamily:fonts.mono, fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:COLORS.inkMuted, marginTop:5 }}>Victoire · Cryptanga</div>
              </div>
            </Reveal>

            {/* Podium */}
            <Reveal direction="right" delay={.06}>
              <Podium />
            </Reveal>

            {/* Stats */}
            <Reveal direction="right" delay={.1}>
              <div style={{ display:"flex", justifyContent:"space-around", padding:"22px 0", borderTop:`1px solid ${COLORS.warmLight}`, borderBottom:`1px solid ${COLORS.warmLight}` }}>
                <Counter target={72}  suffix="h"  label="CHE durée" />
                <Counter target={100} suffix="+"  label="Étudiants" />
                <Counter target={50}  suffix="+"  label="Challenges" />
              </div>
            </Reveal>

          </div>
        </div>

        {/* ── photos CHE pleine largeur ── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:14, height:230 }}>
          <CHEPhoto src="/cyber/drapeau.jpeg"    alt="Drapeau Cryptanga" rotate={-1.5} delay={0} />
          <CHEPhoto src="/cyber/tente.jpeg"      alt="Tente opérations"  rotate={-2.5} delay={.07} />
          <CHEPhoto src="/cyber/photomaton.jpeg" alt="L'équipe"          rotate={2}    delay={.13} />
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #cyber { padding: 64px 20px !important; }
          .cyber-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
