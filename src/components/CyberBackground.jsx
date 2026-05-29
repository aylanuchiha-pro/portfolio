import { useRef, useEffect } from "react";

const CHARS = "01010110100110101001" + "0123456789ABCDEF" + "!@#$%\\/>|{}[]";
const FS = 13;

export default function CyberBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let cols = [];

    function init() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const n = Math.floor(canvas.offsetWidth / FS);
      cols = Array.from({ length: n }, (_, i) => ({
        x:     i * FS,
        y:    -Math.random() * canvas.offsetHeight * 1.5,
        speed: 0.7 + Math.random() * 1.8,
        chars: Array.from({ length: 18 }, () => CHARS[~~(Math.random() * CHARS.length)]),
        tick:  0,
      }));
    }

    function frame() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${FS}px monospace`;

      cols.forEach(col => {
        col.y    += col.speed;
        col.tick ++;
        // Randomly flicker characters in the trail
        if (col.tick % 5 === 0)
          col.chars[~~(Math.random() * col.chars.length)] =
            CHARS[~~(Math.random() * CHARS.length)];

        if (col.y - col.chars.length * FS > H) {
          col.y     = -FS * 4;
          col.speed =  0.7 + Math.random() * 1.8;
        }

        col.chars.forEach((ch, j) => {
          const cy = col.y - j * FS;
          if (cy < -FS || cy > H + FS) return;

          let color;
          if (j === 0) {
            // head: bright accent
            color = "rgba(232, 87, 42, 0.80)";
          } else if (j === 1) {
            color = "rgba(232, 87, 42, 0.45)";
          } else {
            const fade = Math.max(0, 1 - j / col.chars.length);
            const g = ~~(fade * 0.32 * 255);
            color = `rgba(122, 158, 126, ${fade * 0.35})`;
            // Occasional bright green flash
            if (Math.random() < 0.003)
              color = "rgba(122, 158, 126, 0.75)";
          }

          ctx.fillStyle = color;
          ctx.fillText(ch, col.x, cy);
        });
      });

      raf = requestAnimationFrame(frame);
    }

    init();
    raf = requestAnimationFrame(frame);

    const obs = new ResizeObserver(init);
    obs.observe(canvas.parentElement || canvas);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        opacity: 0.45,
        zIndex: 0,
      }}
    />
  );
}
