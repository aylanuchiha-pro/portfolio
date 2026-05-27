import { useState } from "react";
import {
  ComposableMap, Geographies, Geography, Sphere,
} from "react-simple-maps";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { COLORS, fonts } from "../theme";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VISITED_ISO = new Set([
  "250","442","356","056","276","724","380","826",
  "528","756","620","300","792","504","784","764","392",
]);
const COUNTRY_NAMES = {
  "250":"France 🇫🇷","442":"Luxembourg 🇱🇺","356":"Inde 🇮🇳",
  "056":"Belgique 🇧🇪","276":"Allemagne 🇩🇪","724":"Espagne 🇪🇸",
  "380":"Italie 🇮🇹","826":"Royaume-Uni 🇬🇧","528":"Pays-Bas 🇳🇱",
  "756":"Suisse 🇨🇭","620":"Portugal 🇵🇹","300":"Grèce 🇬🇷",
  "792":"Turquie 🇹🇷","504":"Maroc 🇲🇦","784":"Émirats 🇦🇪",
  "764":"Thaïlande 🇹🇭","392":"Japon 🇯🇵",
};

const stats = [
  { value:"17+", label:"Pays visités"        },
  { value:"4",   label:"Continents"          },
  { value:"3",   label:"Stages à l'étranger" },
  { value:"∞",   label:"Envie d'explorer"    },
];

// ──────────────────────────────────────────────────────────────────────────────
// Colonnes de photos — chaque photo a :
//  • aspect  : "portrait" | "landscape" | "square"
//  • size    : "large" | "medium" | "small"  → contrôle padding polaroïd
//  • colW    : largeur dans la colonne (% ou px)
//  • colAlign: alignement dans la colonne
//  • colMt   : margin-top (peut être négatif = chevauchement)
//  • fix     : "pin" | "tape" | "tack"
// ──────────────────────────────────────────────────────────────────────────────
const leftPhotos = [
  {
    src:"/travels/1.jpg", country:"Inde",    color:COLORS.accent,
    rotate:-11, pin:"#E8572A", fix:"pin",
    aspect:"portrait",  size:"large",
    colW:"86%", colAlign:"flex-end",   colMt:"6%",  colZ:3,
  },
  {
    src:"/travels/3.jpg", country:"Maroc",   color:COLORS.warm,
    rotate: 5,  pin:"#4A7FD4", fix:"tape", tapeRot:2,
    aspect:"square",   size:"small",
    colW:"50%", colAlign:"flex-start", colMt:"-13%", colZ:4,
  },
  {
    src:"/travels/5.jpg", country:"Espagne", color:COLORS.sage,
    rotate:-7,  pin:"#8A6FD4", fix:"pin",
    aspect:"landscape", size:"medium",
    colW:"80%", colAlign:"center",    colMt:"4%",  colZ:2,
  },
];

const rightPhotos = [
  {
    src:"/travels/2.jpg", country:"Japon",      color:"#4A7FD4",
    rotate:12,  pin:"#C4956A", fix:"tape", tapeRot:-4,
    aspect:"landscape", size:"large",
    colW:"90%", colAlign:"flex-start", colMt:"4%",   colZ:3,
  },
  {
    src:"/travels/4.jpg", country:"Thaïlande",  color:"#8A6FD4",
    rotate:-8,  pin:"#7A9E7E", fix:"tack",
    aspect:"square",   size:"small",
    colW:"48%", colAlign:"flex-end",   colMt:"-11%", colZ:4,
  },
  {
    src:"/travels/6.jpg", country:"Luxembourg", color:COLORS.sage,
    rotate:14,  pin:"#E8572A", fix:"pin",
    aspect:"portrait",  size:"medium",
    colW:"74%", colAlign:"center",    colMt:"7%",   colZ:2,
  },
];

// ── Polaroïd spacing par taille ───────────────────────────────────────────────
const pBottom = { large:32, medium:26, small:18 };
const pPad    = { large: 8, medium: 7, small: 4 };
const pCapt   = { large:14, medium:12, small:10 };
const aspectR = { portrait:"3/4", landscape:"4/3", square:"1/1" };

// ── Composant photo ───────────────────────────────────────────────────────────
function PinnedPhoto({ photo }) {
  const [loaded, setLoaded] = useState(false);
  const [hov,    setHov]    = useState(false);

  const isPin  = photo.fix === "pin";
  const isTape = photo.fix === "tape";
  const isTack = photo.fix === "tack";
  const ptop   = isPin ? 26 : isTack ? 10 : 6;

  return (
    <div
      style={{
        position:"relative", paddingTop:ptop,
        cursor:"pointer", transformStyle:"preserve-3d",
        transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: hov
          ? `perspective(700px) rotateY(${photo.rotate>0?-5:5}deg) rotateX(-4deg) rotate(${photo.rotate*0.07}deg) scale(1.08) translateY(-10px)`
          : `perspective(700px) rotate(${photo.rotate}deg)`,
        zIndex: hov ? 40 : "auto",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* ── Épingle ronde ── */}
      {isPin && (
        <div style={{
          position:"absolute", top:0, left:"50%",
          transform:"translateX(-50%)", zIndex:10,
          display:"flex", flexDirection:"column", alignItems:"center",
          filter:`drop-shadow(0 3px 7px rgba(0,0,0,0.4))`,
        }}>
          <div style={{
            width:20, height:20, borderRadius:"50%",
            background:`radial-gradient(circle at 33% 28%,rgba(255,255,255,0.9) 0%,${photo.pin} 32%,${photo.pin}BB 60%,${photo.pin}44 100%)`,
            boxShadow:`0 5px 16px rgba(0,0,0,0.45),inset 0 -3px 5px rgba(0,0,0,0.25),inset 3px 3px 5px rgba(255,255,255,0.35)`,
            border:`1px solid rgba(255,255,255,0.2)`,
          }}/>
          <div style={{
            width:2.5, height:12, marginTop:-2, borderRadius:"0 0 2px 2px",
            background:`linear-gradient(to bottom,${photo.pin}99,${photo.pin}11)`,
          }}/>
        </div>
      )}

      {/* ── Deux clous coins ── */}
      {isTack && ["14%","auto"].map((left, i) => (
        <div key={i} style={{
          position:"absolute", top:2,
          left: i===0 ? left : "auto",
          right: i===1 ? "14%" : "auto",
          width:11, height:11, borderRadius:"50%", zIndex:10,
          background:`radial-gradient(circle at 35% 32%,rgba(255,255,255,0.8) 0%,${photo.pin} 40%,${photo.pin}88 100%)`,
          boxShadow:`0 3px 8px rgba(0,0,0,0.4),inset 0 -2px 4px rgba(0,0,0,0.2)`,
        }}/>
      ))}

      {/* ── Scotch ── */}
      {isTape && (
        <div style={{
          position:"absolute", top:-7, left:"50%",
          transform:`translateX(-50%) rotate(${photo.tapeRot??0}deg)`,
          width:"58%", height:16, zIndex:10, borderRadius:1,
          background:"rgba(210,195,165,0.55)",
          boxShadow:"0 1px 4px rgba(0,0,0,0.1)",
          backgroundImage:"repeating-linear-gradient(90deg,rgba(255,255,255,0.07) 0,rgba(255,255,255,0.07) 2px,transparent 2px,transparent 7px)",
        }}/>
      )}

      {/* ── Cadre polaroïd ── */}
      <div style={{
        background:"linear-gradient(148deg,#FFFEFC,#FFF6EC)",
        padding:`${pPad[photo.size]}px ${pPad[photo.size]}px ${pBottom[photo.size]}px`,
        borderTop:"1.5px solid rgba(255,255,255,0.95)",
        borderLeft:"1.5px solid rgba(255,255,255,0.75)",
        borderRight:"1px solid rgba(0,0,0,0.07)",
        borderBottom:"1px solid rgba(0,0,0,0.09)",
        boxShadow: hov
          ? `0 24px 55px rgba(0,0,0,0.26),0 8px 20px rgba(0,0,0,0.12),-3px -3px 10px rgba(255,255,255,0.8)`
          : `0 8px 30px rgba(0,0,0,0.19),0 3px 8px rgba(0,0,0,0.1),-2px -2px 5px rgba(255,255,255,0.7)`,
        transition:"box-shadow 0.4s ease",
      }}>
        <div style={{
          width:"100%", aspectRatio:aspectR[photo.aspect],
          overflow:"hidden", position:"relative",
          background:`linear-gradient(135deg,${photo.color}22,${photo.color}06)`,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <img
            src={photo.src} alt={photo.country}
            onLoad={() => setLoaded(true)}
            style={{
              width:"100%", height:"100%", objectFit:"cover", display:"block",
              opacity: loaded?1:0, transition:"opacity 0.5s,transform 0.5s",
              transform: hov?"scale(1.08)":"scale(1)",
              filter:"saturate(1.06) contrast(1.02)",
            }}
          />
          {!loaded && (
            <span style={{
              position:"absolute", fontFamily:fonts.display,
              fontSize:12, fontStyle:"italic", color:photo.color, opacity:0.4,
            }}>{photo.country}</span>
          )}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 45%)",
            pointerEvents:"none",
          }}/>
        </div>
        <div style={{
          textAlign:"center", paddingTop:pPad[photo.size]+2,
          fontFamily:"'Caveat',cursive,sans-serif",
          fontSize:pCapt[photo.size], color:"#5a5a5a",
        }}>
          📍 {photo.country}
        </div>
      </div>

      {/* Ombre sol */}
      <div style={{
        position:"absolute", bottom:-8, left:"12%", right:"12%",
        height:14, pointerEvents:"none",
        background:"radial-gradient(ellipse,rgba(0,0,0,0.15) 0%,transparent 70%)",
        filter:"blur(5px)",
        transform: hov?"scaleX(1.1) scaleY(0.75)":"scaleX(1) scaleY(1)",
        transition:"transform 0.4s ease",
      }}/>
    </div>
  );
}

// ── Colonne de photos ─────────────────────────────────────────────────────────
function PhotoColumn({ photos, paddingTop = "0%" }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column",
      width:"100%", paddingTop, position:"relative", zIndex:20,
    }}>
      {photos.map((p, i) => (
        <div key={i} style={{
          alignSelf: p.colAlign,
          width: p.colW,
          marginTop: p.colMt,
          position:"relative",
          zIndex: p.colZ,
        }}>
          <PinnedPhoto photo={p} />
        </div>
      ))}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function Travel() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <section
      id="travels"
      style={{
        background: COLORS.bgDark,
        padding: "20px 0 0",
        marginBottom: -20,
        overflow: "visible",
        position: "relative",
        zIndex: 2,
        width: "100%",
      }}
    >
      {/* ── Fondu haut ── */}
      <div style={{
        position:"absolute", top:0, left:0, right:0,
        height:100, pointerEvents:"none", zIndex:1,
        background:`linear-gradient(to bottom, ${COLORS.bg}, transparent)`,
      }}/>
      {/* ── Fondu bas ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        height:100, pointerEvents:"none", zIndex:1,
        background:`linear-gradient(to top, ${COLORS.bg}, transparent)`,
      }}/>

      {/* ── Grille plein écran : photos | carte | photos ── */}
      <Reveal direction="up" delay={0.06}>
        <div
          className="travel-wall"
          style={{
            display:"grid",
            gridTemplateColumns:"22vw 1fr 22vw",
            alignItems:"center",
            width:"100%",
            padding:"0 2vw",
            gap:"1vw",
            boxSizing:"border-box",
          }}
        >
          {/* ── Colonne gauche ── */}
          <PhotoColumn photos={leftPhotos} paddingTop="8%" />

          {/* ── Carte (centre) ── */}
          <div style={{ textAlign:"center" }}>
            {/* Stats juste au-dessus du titre */}
            <div style={{
              display:"flex", justifyContent:"center",
              gap:"clamp(20px,4vw,60px)", flexWrap:"wrap",
              marginBottom:16,
            }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{ textAlign:"center" }}>
                  <div style={{
                    fontFamily:fonts.display, fontSize:"clamp(24px,3vw,40px)",
                    fontWeight:700, color:COLORS.accent, lineHeight:1,
                  }}>{value}</div>
                  <div style={{
                    fontFamily:fonts.mono, fontSize:10, color:COLORS.inkMuted,
                    letterSpacing:2, textTransform:"uppercase", marginTop:5,
                  }}>{label}</div>
                </div>
              ))}
            </div>

            <SectionTitle number="05" label="voyages" title="Le Monde & Moi" />
            <p style={{
              fontFamily:fonts.display, fontSize:"clamp(13px,1.4vw,15px)",
              fontStyle:"italic", color:COLORS.inkMuted,
              maxWidth:400, margin:"-6px auto 16px", lineHeight:1.7,
            }}>
              "Le monde est un livre, et ceux qui ne voyagent pas n'en lisent qu'une page."
            </p>

            <div style={{ position:"relative" }}>
              {/* Tooltip */}
              <div style={{
                position:"absolute", top:12, left:"50%",
                transform:"translateX(-50%)",
                zIndex:10, pointerEvents:"none",
                fontFamily:fonts.body, fontWeight:600, fontSize:13,
                color:"#fff", background:COLORS.accent,
                padding:"5px 18px", borderRadius:100,
                boxShadow:`0 4px 16px ${COLORS.accent}60`,
                opacity: tooltip?1:0, transition:"opacity 0.2s ease",
                whiteSpace:"nowrap",
              }}>{tooltip}</div>

              <ComposableMap
                width={960} height={500}
                projectionConfig={{ scale:153, center:[10,5] }}
                style={{ width:"100%", height:"auto", display:"block" }}
              >
                <Sphere id="rsm-sphere" fill="#5B9EC9" stroke="#4A8AB8" strokeWidth={0.5} />
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = String(geo.id);
                      const isVisited = VISITED_ISO.has(id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => isVisited && setTooltip(COUNTRY_NAMES[id])}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default:{
                              fill: isVisited ? COLORS.accent : "#E8E0D5",
                              stroke:"#C8BFB5", strokeWidth:0.5, outline:"none",
                              filter: isVisited ? `drop-shadow(0 0 4px ${COLORS.accent}70)` : "none",
                            },
                            hover:{
                              fill: isVisited ? "#F06A3A" : "#D8D0C5",
                              stroke:"#B8B0A5", strokeWidth:0.5, outline:"none",
                              cursor: isVisited ? "pointer" : "default",
                            },
                            pressed:{ outline:"none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Légende */}
              <div style={{ display:"flex", justifyContent:"center", gap:20, paddingTop:8 }}>
                {[{color:COLORS.accent,label:"Pays visité"},{color:"#E8E0D5",label:"Pas encore…"}].map(({ color, label }) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:10, height:10, borderRadius:2, background:color }}/>
                    <span style={{ fontFamily:fonts.mono, fontSize:10, color:COLORS.inkMuted, letterSpacing:1 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chips */}
            <div style={{
              marginTop:20,
              display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center",
            }}>
              {[
                {flag:"🇫🇷",city:"Paris",     tag:"Home"          },
                {flag:"🇱🇺",city:"Luxembourg",tag:"Stage"         },
                {flag:"🇮🇳",city:"Inde",      tag:"Stage"         },
                {flag:"🇯🇵",city:"Tokyo",     tag:"Coup de cœur" },
                {flag:"🇲🇦",city:"Marrakech", tag:"Culture"       },
                {flag:"🇪🇸",city:"Barcelone", tag:"Incontournable"},
                {flag:"🇮🇹",city:"Rome",      tag:"Histoire"      },
                {flag:"🇹🇭",city:"Bangkok",   tag:"Aventure"      },
                {flag:"🇬🇷",city:"Athènes",   tag:"Îles"          },
                {flag:"🇵🇹",city:"Lisbonne",  tag:"Escapade"      },
              ].map(({ flag, city, tag }) => (
                <div key={city}
                  style={{
                    display:"flex", alignItems:"center", gap:7,
                    padding:"7px 14px", borderRadius:100,
                    background:COLORS.bg, border:`1px solid ${COLORS.warmLight}`,
                    transition:"all 0.25s ease", cursor:"default",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=`${COLORS.accent}12`; e.currentTarget.style.borderColor=`${COLORS.accent}50`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=COLORS.bg; e.currentTarget.style.borderColor=COLORS.warmLight; }}
                >
                  <span style={{fontSize:15}}>{flag}</span>
                  <span style={{fontFamily:fonts.body, fontSize:12, fontWeight:600, color:COLORS.ink}}>{city}</span>
                  <span style={{fontFamily:fonts.mono, fontSize:9, color:COLORS.accent, letterSpacing:1, textTransform:"uppercase"}}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite ── */}
          <PhotoColumn photos={rightPhotos} paddingTop="3%" />
        </div>
      </Reveal>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
        @media (max-width: 960px) {
          .travel-wall {
            grid-template-columns: 1fr !important;
          }
          .travel-wall > div:first-child,
          .travel-wall > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
