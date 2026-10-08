"use client";

import { useEffect, useRef } from "react";

const GLYPHS = ["0", "1"];
const randomGlyph = () => GLYPHS[Math.random() < 0.5 ? 0 : 1];
const number = (css: CSSStyleDeclaration, name: string) =>
  parseFloat(css.getPropertyValue(name));

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const font = css.getPropertyValue("--font-mono").trim();
    const cell = number(css, "--binary-cell") * 16;
    const baseAlpha = number(css, "--binary-alpha");
    const peakAlpha = number(css, "--binary-alpha-peak");
    const radius = number(css, "--binary-radius") * 16;
    const amplitude = number(css, "--binary-amplitude") * 16;
    const wavelength = number(css, "--binary-wavelength") * 16;
    const speed = number(css, "--binary-speed");
    const hueSpeed = number(css, "--binary-hue-speed");
    const saturation = css.getPropertyValue("--binary-saturation").trim();
    const lightness = css.getPropertyValue("--binary-lightness").trim();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let glyphs: string[][] = [];
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let time = 0;
    let last = 0;
    const pointer = { x: -9999, y: -9999 };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${cell * 0.8}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const live = !motion.matches;
      const k = (Math.PI * 2) / wavelength;

      for (let c = 0; c < cols; c++) {
        const x = c * cell + cell / 2;
        // Rainbow runs across the screen and drifts with time.
        const hue = ((x / width) * 360 + time * hueSpeed) % 360;
        ctx.fillStyle = `hsl(${hue} ${saturation} ${lightness})`;
        for (let r = 0; r < rows; r++) {
          const baseY = r * cell + cell / 2;
          // A travelling sine wave lifts each column; rows trail the crest.
          const phase = x * k - time * speed + r * 0.35;
          const wave = Math.sin(phase);
          let y = baseY + wave * amplitude;
          let alpha = baseAlpha * (0.45 + 0.55 * (wave * 0.5 + 0.5));
          if (live) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < radius) {
              const near = 1 - dist / radius;
              alpha = Math.max(alpha, baseAlpha + (peakAlpha - baseAlpha) * near);
              y += wave * amplitude * near;
              if (Math.random() < 0.08 * near) glyphs[c][r] = randomGlyph();
            }
          }
          ctx.globalAlpha = alpha;
          ctx.fillText(glyphs[c][r], x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell) + 2;
      glyphs = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, randomGlyph),
      );
      draw();
    };

    const tick = (now: number) => {
      time += Math.min((now - last) / 1000, 0.1);
      last = now;
      if (Math.random() < 0.3) {
        glyphs[Math.floor(Math.random() * cols)][
          Math.floor(Math.random() * rows)
        ] = randomGlyph();
      }
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
