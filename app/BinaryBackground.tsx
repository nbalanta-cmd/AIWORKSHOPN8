"use client";

import { useEffect, useRef } from "react";

type Column = { y: number; speed: number; cells: string[] };

const GLYPHS = ["0", "1"];
const randomGlyph = () => GLYPHS[Math.random() < 0.5 ? 0 : 1];

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--color-accent").trim();
    const font = css.getPropertyValue("--font-mono").trim();
    const cell = parseFloat(css.getPropertyValue("--binary-cell")) * 16;
    const baseAlpha = parseFloat(css.getPropertyValue("--binary-alpha"));
    const peakAlpha = parseFloat(css.getPropertyValue("--binary-alpha-peak"));
    const radius = parseFloat(css.getPropertyValue("--binary-radius")) * 16;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let columns: Column[] = [];
    let width = 0;
    let height = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rows = Math.ceil(height / cell) + 1;
      const count = Math.ceil(width / cell);
      columns = Array.from({ length: count }, () => ({
        y: Math.random() * rows,
        speed: 0.4 + Math.random() * 1.1,
        cells: Array.from({ length: rows }, randomGlyph),
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${cell * 0.8}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = accent;
      const live = !motion.matches;
      columns.forEach((col, i) => {
        const x = i * cell + cell / 2;
        for (let r = 0; r < rows; r++) {
          const y = r * cell + cell / 2;
          // Brightest at the head of the column, fading out behind it.
          const behind = (col.y - r + rows) % rows;
          const trail = Math.max(0, 1 - behind / (rows * 0.45));
          let alpha = baseAlpha * (0.25 + 0.75 * trail);
          if (live) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < radius) {
              const near = 1 - dist / radius;
              alpha = Math.max(alpha, baseAlpha + (peakAlpha - baseAlpha) * near);
              if (Math.random() < 0.08 * near) col.cells[r] = randomGlyph();
            }
          }
          ctx.globalAlpha = alpha;
          ctx.fillText(col.cells[r], x, y);
        }
      });
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      columns.forEach((col) => {
        col.y = (col.y + col.speed * dt * 3) % rows;
        if (Math.random() < 0.02) {
          col.cells[Math.floor(Math.random() * rows)] = randomGlyph();
        }
      });
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (motion.matches || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    const onMotionChange = () => {
      onLeave();
      draw();
      start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("pointercancel", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="binary-bg" aria-hidden="true" />;
}
