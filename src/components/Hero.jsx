import { useState, useEffect, useRef } from "react";
import { COLORS, fonts } from "../theme";

function MagneticBlob() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;

    const blobs = [
      { x: 0, y: 0, vx: 0, vy: 0, r: 180, color: COLORS.accent, opacity: 0.12, bx: 0.3, by: 0.4 },
      { x: 0, y: 0, vx: 0, vy: 0, r: 220, color: COLORS.warm, opacity: 0.1, bx: 0.6, by: 0.3 },
      { x: 0, y: 0, vx: 0, vy: 0, r: 160, color: COLORS.sage, opacity: 0.08, bx: 0.5, by: 0.7 },
      { x: 0, y: 0, vx: 0, vy: 0, r: 140, color: COLORS.accentSoft, opacity: 0.1, bx: 0.7, by: 0.6 },
    ];

    function resize() {
      W = canvas.width = canvas.offsetWidth * 2;
      H = canvas.height = canvas.offsetHeight * 2;
      blobs.forEach(b => { b.x = b.bx * W; b.y = b.by * H; });
    }
    resize();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x * 2;
      const my = mouse.current.y * 2;

      blobs.forEach((b) => {
        const dx = mx - b.x, dy = my - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(0.02, 300 / (dist + 100));
        b.vx += dx * force * 0.003 + (b.bx * W - b.x) * 0.001;
        b.vy += dy * force * 0.003 + (b.by * H - b.y) * 0.001;
        b.vx *= 0.96; b.vy *= 0.96;
        b.x += b.vx; b.y += b.vy;

        const t = Date.now() * 0.001;
        const wobbleR = b.r + Math.sin(t) * 20 + Math.cos(t * 0.7) * 15;

        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const noise = Math.sin(a * 3 + t) * 30 + Math.cos(a * 5 - t * 0.5) * 20;
          const r = wobbleR + noise;
          const px = b.x + Math.cos(a) * r;
          const py = b.y + Math.sin(a) * r;
          a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = b.color + Math.round(b.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const words = ["construis", "sécurise", "développe", "protège"];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setCharIdx(c => c + 1);
        if (charIdx + 1 >= word.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setCharIdx(c => c - 1);
        if (charIdx - 1 <= 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
      }
    }, deleting ? 50 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg,
    }}>
      <MagneticBlob />

      {/* Scattered bg text */}
      {["web", "cyber", "code", "hack", "dev", "react"].map((word, i) => (
        <span key={word} style={{
          position: "absolute", fontFamily: fonts.mono,
          fontSize: 120 + i * 20, fontWeight: 700, color: COLORS.ink,
          opacity: 0.02, transform: `rotate(${-15 + i * 12}deg)`,
          top: `${10 + i * 14}%`, left: `${-5 + i * 16}%`,
          pointerEvents: "none", userSelect: "none",
        }}>{word}</span>
      ))}

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900 }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s", marginBottom: 24,
        }}>
          <span style={{
            fontFamily: fonts.mono, fontSize: 13, color: COLORS.accent,
            letterSpacing: 3, textTransform: "uppercase",
            background: `${COLORS.accent}12`, padding: "6px 16px",
            borderRadius: 100, border: `1px solid ${COLORS.accent}30`,
          }}>
            Développeur Web & Cybersécurité
          </span>
        </div>

        <h1 style={{
          fontFamily: fonts.display, fontSize: "clamp(40px, 8vw, 88px)",
          fontWeight: 700, lineHeight: 1.05, color: COLORS.ink, margin: "0 0 20px",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
          Je{" "}
          <span style={{
            fontStyle: "italic", color: COLORS.accent,
            position: "relative", display: "inline-block",
          }}>
            {words[wordIdx].substring(0, charIdx)}
            <span style={{ borderRight: `2px solid ${COLORS.accent}`, animation: "blink 0.8s step-end infinite", marginLeft: 2 }} />
            <svg viewBox="0 0 200 12" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 12, overflow: "visible" }}>
              <path d="M0 6 Q50 0, 100 6 T200 6" stroke={COLORS.accent} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
            </svg>
          </span>
          <br />le web.
        </h1>

        <p style={{
          fontFamily: fonts.body, fontSize: "clamp(16px, 2.5vw, 20px)",
          color: COLORS.inkMuted, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 40px",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s",
        }}>
          Développeur fullstack passionné de cybersécurité.<br />
          Je crée des expériences web solides et sécurisées.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 1s",
        }}>
          <a href="#projects" style={{
            fontFamily: fonts.body, fontWeight: 600, fontSize: 15,
            padding: "14px 36px", background: COLORS.ink, color: COLORS.bg,
            borderRadius: 100, transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.accent; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(232,87,42,0.3)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.ink; e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
          >Voir mes projets</a>
          <a href="#contact" style={{
            fontFamily: fonts.body, fontWeight: 600, fontSize: 15,
            padding: "14px 36px", border: `1.5px solid ${COLORS.ink}`,
            color: COLORS.ink, borderRadius: 100, background: "transparent", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.ink; e.target.style.color = COLORS.bg; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.ink; }}
          >Me contacter</a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.5s",
      }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: COLORS.inkMuted, letterSpacing: 2 }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${COLORS.inkMuted}, transparent)`, animation: "scrollPulse 2s ease infinite" }} />
      </div>
    </section>
  );
}
