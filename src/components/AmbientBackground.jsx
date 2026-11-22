import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useReveal.js";

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrame;
    let resizeTimeout;
    let isRunning = false;

    // Defer initialization to avoid blocking critical initial render & TBT
    const scheduleInit = () => {
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let particles = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 18 : 42;

      function resizeCanvas() {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(window.innerWidth * ratio);
        canvas.height = Math.floor(window.innerHeight * ratio);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        particles = Array.from({ length: particleCount }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.6,
        }));
      }

      function animateParticles() {
        if (!isRunning) return;
        const isLight = document.documentElement.classList.contains("light-theme") || document.body.classList.contains("light-theme");
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = isLight ? "rgba(17,24,39,.25)" : "rgba(82,244,211,.45)";
        ctx.strokeStyle = isLight ? "rgba(17,24,39,.06)" : "rgba(82,244,211,.12)";

        const len = particles.length;
        const maxDist = isMobile ? 80 : 110;

        for (let i = 0; i < len; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
          if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          // Sparse line connections
          for (let j = i + 1; j < len; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxDist) {
              ctx.globalAlpha = (maxDist - dist) / (maxDist * 4);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        animationFrame = requestAnimationFrame(animateParticles);
      }

      function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 200);
      }

      function handleVisibilityChange() {
        if (document.hidden) {
          isRunning = false;
          cancelAnimationFrame(animationFrame);
        } else {
          isRunning = true;
          animateParticles();
        }
      }

      resizeCanvas();
      isRunning = true;
      animateParticles();

      window.addEventListener("resize", handleResize, { passive: true });
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
        clearTimeout(resizeTimeout);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    };

    let cleanupFn = null;
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(() => {
        cleanupFn = scheduleInit();
      }, { timeout: 1200 });
      return () => {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(handle);
        if (cleanupFn) cleanupFn();
      };
    } else {
      const timer = setTimeout(() => {
        cleanupFn = scheduleInit();
      }, 300);
      return () => {
        clearTimeout(timer);
        if (cleanupFn) cleanupFn();
      };
    }
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="aurora"></div>
      <canvas id="particleCanvas" ref={canvasRef}></canvas>
    </div>
  );
}
