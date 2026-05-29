import { useRef, useEffect } from "react";

function drawPlane(ctx, size) {
  // Fuselage
  const bodyG = ctx.createLinearGradient(0, -size * 0.22, 0, size * 0.38);
  bodyG.addColorStop(0,   "rgba(235, 218, 198, 0.95)");
  bodyG.addColorStop(0.4, "rgba(196, 149, 106, 0.9)");
  bodyG.addColorStop(1,   "rgba(145, 98,  62,  0.75)");
  ctx.fillStyle = bodyG;

  ctx.beginPath();
  ctx.moveTo(size, size * 0.07);
  ctx.bezierCurveTo(size * 0.55, -size * 0.19, -size * 0.25, -size * 0.15, -size * 0.78, -size * 0.1);
  ctx.lineTo(-size, 0);
  ctx.bezierCurveTo(-size * 0.78, size * 0.18, size * 0.05, size * 0.22, size * 0.48, size * 0.14);
  ctx.bezierCurveTo(size * 0.72, size * 0.1, size, size * 0.07, size, size * 0.07);
  ctx.closePath();
  ctx.fill();

  // Wing
  const wingG = ctx.createLinearGradient(-size * 0.38, 0, -size * 0.22, size * 0.55);
  wingG.addColorStop(0, "rgba(196, 149, 106, 0.88)");
  wingG.addColorStop(1, "rgba(145, 98,  62,  0.6)");
  ctx.fillStyle = wingG;
  ctx.beginPath();
  ctx.moveTo(size * 0.12, size * 0.08);
  ctx.lineTo(-size * 0.22, size * 0.54);
  ctx.lineTo(-size * 0.48, size * 0.5);
  ctx.lineTo(-size * 0.36, size * 0.06);
  ctx.closePath();
  ctx.fill();

  // Vertical tail fin
  ctx.fillStyle = "rgba(196, 149, 106, 0.88)";
  ctx.beginPath();
  ctx.moveTo(-size * 0.6, -size * 0.1);
  ctx.lineTo(-size * 0.5, -size * 0.44);
  ctx.lineTo(-size * 0.72, -size * 0.38);
  ctx.lineTo(-size * 0.84, -size * 0.1);
  ctx.closePath();
  ctx.fill();

  // Horizontal tail
  ctx.beginPath();
  ctx.moveTo(-size * 0.63, size * 0.06);
  ctx.lineTo(-size * 0.7, size * 0.27);
  ctx.lineTo(-size * 0.87, size * 0.23);
  ctx.lineTo(-size * 0.8, size * 0.07);
  ctx.closePath();
  ctx.fill();

  // Cockpit glint
  ctx.fillStyle = "rgba(255, 245, 230, 0.55)";
  ctx.beginPath();
  ctx.ellipse(size * 0.52, -size * 0.04, size * 0.09, size * 0.045, -0.25, 0, Math.PI * 2);
  ctx.fill();
}

const PLANES_DATA = [
  { x: 0.08, y: 0.13, z: 0.12, sp: 0.000060, dir:  1, ph: 0.0 },
  { x: 0.82, y: 0.36, z: 0.52, sp: 0.000034, dir: -1, ph: 1.8 },
  { x: 0.45, y: 0.62, z: 0.06, sp: 0.000078, dir:  1, ph: 0.9 },
  { x: 0.18, y: 0.80, z: 0.72, sp: 0.000022, dir: -1, ph: 2.7 },
  { x: 0.65, y: 0.24, z: 0.32, sp: 0.000046, dir:  1, ph: 1.3 },
];

export default function PlanesBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    const isMobile = window.innerWidth < 768;
    const planes = (isMobile ? PLANES_DATA.slice(0, 3) : PLANES_DATA).map(p => ({ ...p }));
    const trails = planes.map(() => []);
    const MAX_TRAIL = isMobile ? 22 : 38;
    const DPR = window.devicePixelRatio || 1;

    function resize() {
      W = canvas.width  = canvas.offsetWidth  * DPR;
      H = canvas.height = canvas.offsetHeight * DPR;
    }
    resize();

    let last = performance.now();

    function frame(now) {
      const dt = Math.min(now - last, 48);
      last = now;
      ctx.clearRect(0, 0, W, H);

      [...planes]
        .map((p, i) => ({ p, i }))
        .sort((a, b) => b.p.z - a.p.z)
        .forEach(({ p, i }) => {
          p.x += p.dir * p.sp * dt;
          p.phase = (p.ph += 0.00044 * dt);
          if (p.dir > 0 && p.x > 1.2)  { p.x = -0.2; trails[i] = []; }
          if (p.dir < 0 && p.x < -0.2) { p.x =  1.2; trails[i] = []; }

          const depth = 1 - p.z * 0.66;
          const sx = p.x * W;
          const sy = (p.y + Math.sin(p.ph) * 0.036) * H;
          const size = 26 * depth * DPR;
          const alpha = 0.1 + depth * 0.3;
          const bank = Math.cos(p.ph) * 0.11 * p.dir;

          trails[i].push({ x: sx, y: sy });
          if (trails[i].length > MAX_TRAIL) trails[i].shift();

          // Contrail
          const trail = trails[i];
          if (trail.length > 3) {
            for (let j = 1; j < trail.length; j++) {
              const t = j / trail.length;
              ctx.beginPath();
              ctx.moveTo(trail[j - 1].x, trail[j - 1].y);
              ctx.lineTo(trail[j].x,     trail[j].y);
              ctx.strokeStyle = `rgba(232, 215, 190, ${t * alpha * 0.45})`;
              ctx.lineWidth   = t * 2.2 * depth * DPR;
              ctx.lineCap     = "round";
              ctx.stroke();
            }
          }

          // Plane
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(bank);
          if (p.dir < 0) ctx.scale(-1, 1);
          ctx.globalAlpha = alpha;
          drawPlane(ctx, size);
          ctx.restore();
        });

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 1,
      }}
    />
  );
}
