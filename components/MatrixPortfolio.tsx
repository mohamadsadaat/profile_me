"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONTENT, FLY_WORDS, Lang, TERM_LINES } from "@/content/translations";

const MONO_FONT = "'JetBrains Mono', monospace";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Fades a section in (opacity + rise) the first time it enters the viewport. */
function useReveal(reduced: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return ref;
}

/** Lights up all .mx-glow-line text elements, staggered, the first time each enters the viewport. */
function useGlowReveal(reduced: boolean) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".mx-glow-line"));
    if (!els.length) return;
    if (reduced) {
      els.forEach((el) => el.classList.add("is-glow"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = Number(el.dataset.glowIndex || 0) * 0.12;
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("is-glow");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -22% 0px" }
    );
    els.forEach((el, i) => {
      el.dataset.glowIndex = String(i % 8);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [reduced]);
}

interface WordPhase {
  phase: number;
  x: number;
  y: number;
}

function flyWordStyle(phases: WordPhase[], index: number, progress: number) {
  const ph = phases[index];
  const local = (((progress * 1.6 - ph.phase * 0.9 + 1) % 1) + 1) % 1;
  const z = -1400 + local * 1700;
  let opacity = 1;
  if (local < 0.12) opacity = local / 0.12;
  if (local > 0.82) opacity = Math.max(0, (1 - local) / 0.18);
  if (z > 240) opacity = 0;
  return {
    transform: `translate3d(${ph.x}vw, ${ph.y}vh, ${z}px) translate(-50%, -50%)`,
    opacity,
    color: index % 4 === 0 ? "#4dd8ff" : "#39ff88",
  };
}

export default function MatrixPortfolio() {
  const reduced = useReducedMotion();
  useGlowReveal(reduced);
  const [lang, setLang] = useState<Lang>("ar");
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [termIdx, setTermIdx] = useState(0);
  const t = CONTENT[lang];
  const ar = lang === "ar";
  const dir = ar ? "rtl" : "ltr";
  const displayFont = ar ? "'Rakkas', serif" : MONO_FONT;
  const bodyFont = ar ? "'IBM Plex Sans Arabic', sans-serif" : "'IBM Plex Sans', sans-serif";

  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const flickerRef = useRef<HTMLCanvasElement | null>(null);
  const flyRef = useRef<HTMLDivElement | null>(null);
  const flyWordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordPhasesRef = useRef<WordPhase[] | null>(null);

  const getWordPhases = useCallback(() => {
    if (!wordPhasesRef.current) {
      wordPhasesRef.current = FLY_WORDS.map((_, i) => ({
        phase: i / FLY_WORDS.length,
        x: (Math.random() - 0.5) * 70,
        y: (Math.random() - 0.5) * 60,
      }));
    }
    return wordPhasesRef.current;
  }, []);

  const paintFlyingWords = useCallback(
    (progressVal: number) => {
      const phases = getWordPhases();
      FLY_WORDS.forEach((_, i) => {
        const el = flyWordRefs.current[i];
        if (!el) return;
        const s = flyWordStyle(phases, i, progressVal);
        el.style.transform = s.transform;
        el.style.opacity = String(s.opacity);
        el.style.color = s.color;
      });
    },
    [getWordPhases]
  );

  /* ---------- terminal loading sequence: time-driven, never rAF-gated ---------- */
  useEffect(() => {
    const dur = reduced ? 500 : 2600;
    const t0 = performance.now();
    const interval = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / dur);
      const pct = Math.round(p * 100);
      const idx = Math.min(TERM_LINES.length, Math.floor(p * (TERM_LINES.length + 1)));
      setProgress((prev) => (pct !== prev ? pct : prev));
      setTermIdx((prev) => (idx !== prev ? idx : prev));
      if (p >= 1) clearInterval(interval);
    }, 50);
    const timer = setTimeout(() => {
      setProgress(100);
      setTermIdx(TERM_LINES.length);
      setFading(true);
      setTimeout(() => setLoading(false), 900);
    }, dur + 100);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- ambient matrix rain, canvas 2D, bounded interval (not rAF) ---------- */
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const chars = "0123456789+-*/<>{}[]#$%&=";
    let cols = 0;
    let drops: number[] = [];
    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / 16);
      drops = new Array(cols).fill(0).map(() => (Math.random() * -canvas.height) / 16);
    };
    setup();
    window.addEventListener("resize", setup);
    if (reduced) {
      return () => window.removeEventListener("resize", setup);
    }
    const draw = () => {
      ctx.fillStyle = "rgba(5,8,7,0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;
        ctx.fillStyle = Math.random() < 0.06 ? "rgba(77,216,255,0.85)" : "rgba(57,255,136,0.65)";
        ctx.fillText(ch, x, y);
        drops[i] += 1;
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      }
    };
    const rainInterval = setInterval(draw, 90);
    return () => {
      window.removeEventListener("resize", setup);
      clearInterval(rainInterval);
    };
  }, [reduced]);

  /* ---------- flickering grid cells: random squares glow on/off ---------- */
  useEffect(() => {
    const canvas = flickerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cell = 64;
    let cols = 0;
    let rows = 0;
    let cells: { on: boolean; alpha: number; target: number }[] = [];
    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / cell);
      rows = Math.ceil(canvas.height / cell);
      cells = new Array(cols * rows).fill(0).map(() => ({ on: false, alpha: 0, target: 0 }));
    };
    setup();
    window.addEventListener("resize", setup);
    if (reduced) {
      return () => window.removeEventListener("resize", setup);
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (!c.on && Math.random() < 0.0025) {
          c.on = true;
          c.target = 0.16 + Math.random() * 0.18;
        } else if (c.on && c.alpha >= c.target && Math.random() < 0.02) {
          c.target = 0;
        }
        c.alpha += (c.target - c.alpha) * 0.08;
        if (c.on && c.target === 0 && c.alpha < 0.005) {
          c.on = false;
          c.alpha = 0;
        }
        if (c.alpha > 0.003) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          ctx.fillStyle = `rgba(57,255,136,${c.alpha})`;
          ctx.fillRect(col * cell + 1, row * cell + 1, cell - 2, cell - 2);
        }
      }
    };
    const flickerInterval = setInterval(draw, 60);
    return () => {
      window.removeEventListener("resize", setup);
      clearInterval(flickerInterval);
    };
  }, [reduced]);

  /* ---------- grid parallax: direct DOM write on pointermove, no rAF loop ---------- */
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = (e.clientY / window.innerHeight) * 2 - 1;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${mx * 14}px, ${my * 14}px)`;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  /* ---------- scroll-driven flying skill words, rAF-coalesced to one update per frame ---------- */
  useEffect(() => {
    paintFlyingWords(0);
    let scheduled = false;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const el = flyRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        let p = total > 0 ? -rect.top / total : 0;
        p = Math.max(0, Math.min(1, p));
        paintFlyingWords(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [paintFlyingWords]);

  const aboutRef = useReveal(reduced);
  const skillsTopRef = useReveal(reduced);
  const skillsBottomRef = useReveal(reduced);
  const experienceRef = useReveal(reduced);
  const projectsRef = useReveal(reduced);
  const contactRef = useReveal(reduced);

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <div
      dir={dir}
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: bodyFont,
        background: "#050807",
      }}
    >
      <canvas
        ref={bgRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: 0,
          opacity: 0.5,
        }}
      />
      <div
        ref={gridRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.18,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(57,255,136,0.5) 0px, rgba(57,255,136,0.5) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(57,255,136,0.5) 0px, rgba(57,255,136,0.5) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <canvas
        ref={flickerRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 30%, rgba(5,8,7,0) 0%, rgba(5,8,7,0.5) 60%, #05080766 100%)",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "clamp(12px, 2.5vw, 24px)",
          insetInline: 0,
          zIndex: 40,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <nav
          className="mx-nav-anim"
          style={{
            animationPlayState: loading ? "paused" : "running",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            width: "min(94vw, 980px)",
            padding: "10px 14px 10px 14px",
            background: "#050807d9",
            border: "1px solid rgba(57,255,136,0.18)",
            borderRadius: 999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, color: "#d9f5e6" }}>
            <span
              className="mx-logo-fly-wrap"
              style={{
                display: "inline-flex",
                ["--fly-from" as string]: ar ? "-60vw" : "60vw",
                animationDelay: "0.3s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              <span
                className="mx-logo-badge mx-logo-spin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(57,255,136,0.12)",
                  border: "1px solid rgba(57,255,136,0.4)",
                  boxShadow: "0 0 16px rgba(57,255,136,0.35)",
                  fontFamily: MONO_FONT,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#39ff88",
                  flexShrink: 0,
                }}
              >
                &gt;_
              </span>
            </span>
            <span
              className="mx-nav-item"
              style={{
                fontFamily: MONO_FONT,
                fontSize: 16,
                letterSpacing: ".04em",
                animationDelay: "1.6s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              {t.brand}
            </span>
          </a>
          <div
            className="mx-nav-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(10px, 2vw, 28px)",
              animationDelay: "1.9s",
              animationPlayState: loading ? "paused" : "running",
            }}
          >
            {t.nav.map((item) => (
              <a key={item.href} href={item.href} className="mx-nav-link" style={{ fontFamily: MONO_FONT }}>
                {item.label}
              </a>
            ))}
            <button onClick={toggleLang} className="mx-lang-toggle" style={{ fontFamily: MONO_FONT }}>
              {t.langToggle}
            </button>
          </div>
        </nav>
      </div>

      <main id="top" style={{ position: "relative", zIndex: 10 }}>
        <section
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "140px clamp(20px, 6vw, 80px) 100px",
            textAlign: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-6% -14%",
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(5,8,7,0.85) 0%, rgba(5,8,7,0.6) 55%, rgba(5,8,7,0) 100%)",
              }}
            />
            <div
              className="mx-hero-item"
              style={{
                position: "relative",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 30px",
                animationDelay: "0s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              <div style={{ position: "relative", width: 128, height: 128 }}>
                <div
                  style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    border: "1px solid rgba(57,255,136,0.45)",
                    boxShadow: "0 0 30px rgba(57,255,136,0.25)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: "50%",
                    border: "1px solid rgba(77,216,255,0.5)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 6,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#071009",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.heroName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      fontFamily: MONO_FONT,
                      fontSize: 10,
                      letterSpacing: ".12em",
                      color: "rgba(217,245,230,0.35)",
                      textAlign: "center",
                      padding: "0 16px",
                      lineHeight: 1.7,
                    }}
                  >
                    {t.photoHint}
                  </span>
                </div>
              </div>
            </div>
            <p
              className="mx-hero-item"
              style={{
                position: "relative",
                margin: "0 0 20px",
                fontFamily: MONO_FONT,
                fontSize: 13,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "rgba(77,216,255,0.85)",
                animationDelay: "0.15s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              {t.heroKicker}
            </p>
            <h1
              className="mx-hero-item"
              style={{
                position: "relative",
                margin: 0,
                fontFamily: displayFont,
                fontWeight: 400,
                fontSize: "clamp(40px, 7.5vw, 96px)",
                lineHeight: 1.1,
                color: "#eafcf1",
                textShadow: "0 0 40px rgba(57,255,136,0.28)",
                animationDelay: "0.3s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              {t.heroName}
            </h1>
            <p
              className="mx-hero-item"
              style={{
                position: "relative",
                margin: "22px auto 0",
                maxWidth: 600,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.85,
                color: "rgba(217,245,230,0.7)",
                animationDelay: "0.45s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              {t.heroTagline}
            </p>
            <div
              className="mx-hero-item"
              style={{
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginTop: 30,
                animationDelay: "0.6s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              {t.heroStack.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: MONO_FONT,
                    fontSize: 12,
                    letterSpacing: ".05em",
                    padding: "8px 16px",
                    borderRadius: 4,
                    color: "#39ff88",
                    border: "1px solid rgba(57,255,136,0.3)",
                    background: "rgba(11,20,15,0.6)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div
              className="mx-hero-item"
              style={{
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                marginTop: 40,
                animationDelay: "0.75s",
                animationPlayState: loading ? "paused" : "running",
              }}
            >
              <a href="#projects" className="mx-btn-primary" style={{ fontFamily: MONO_FONT }}>
                {t.ctaWork}
              </a>
              <a href="#contact" className="mx-btn-outline" style={{ fontFamily: MONO_FONT }}>
                {t.ctaContact}
              </a>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              insetBlockEnd: 34,
              insetInlineStart: "50%",
              transform: "translateX(-50%)",
              fontFamily: MONO_FONT,
              fontSize: 11,
              letterSpacing: ".25em",
              color: "rgba(217,245,230,0.4)",
              animation: "mx-pulse 3s ease-in-out infinite",
            }}
          >
            {t.scroll}
          </div>
        </section>

        <section
          id="about"
          ref={aboutRef as React.RefObject<HTMLElement>}
          className="mx-reveal"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "90px clamp(20px, 6vw, 60px)" }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: MONO_FONT,
              fontSize: 12,
              letterSpacing: ".3em",
              color: "rgba(77,216,255,0.8)",
            }}
          >
            01 / {t.aboutTag}
          </p>
          <h2
            style={{
              margin: "0 0 40px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#eafcf1",
            }}
          >
            {t.aboutTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(24px, 4vw, 60px)",
            }}
          >
            <div>
              {t.aboutBody.map((para, i) => (
                <p
                  key={i}
                  className="mx-glow-line"
                  style={{
                    margin: "0 0 20px",
                    fontSize: "clamp(15px, 1.3vw, 17px)",
                    lineHeight: 1.95,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              {t.aboutFacts.map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    padding: "18px 20px",
                    borderRadius: 6,
                    border: "1px solid rgba(57,255,136,0.2)",
                    background: "rgba(9,16,12,0.6)",
                    borderInlineStart: "2px solid rgba(57,255,136,0.55)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: MONO_FONT,
                      fontSize: 11,
                      letterSpacing: ".18em",
                      color: "rgba(57,255,136,0.85)",
                      marginBottom: 8,
                    }}
                  >
                    {fact.label}
                  </div>
                  <div className="mx-glow-line" style={{ fontSize: 15, lineHeight: 1.7 }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" style={{ position: "relative" }}>
          <div
            ref={skillsTopRef as React.RefObject<HTMLDivElement>}
            className="mx-reveal"
            style={{ maxWidth: 1100, margin: "0 auto", padding: "90px clamp(20px, 6vw, 60px) 20px" }}
          >
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: MONO_FONT,
                fontSize: 12,
                letterSpacing: ".3em",
                color: "rgba(77,216,255,0.8)",
              }}
            >
              02 / {t.skillsTag}
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: displayFont,
                fontWeight: 400,
                fontSize: "clamp(32px, 4.6vw, 54px)",
                color: "#eafcf1",
              }}
            >
              {t.skillsTitle}
            </h2>
          </div>

          <div ref={flyRef} style={{ position: "relative", height: "260vh" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                overflow: "hidden",
                perspective: 600,
                perspectiveOrigin: "50% 50%",
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                {FLY_WORDS.map((word, i) => (
                  <div
                    key={word}
                    ref={(el) => {
                      flyWordRefs.current[i] = el;
                    }}
                    className="mx-fly-word"
                    style={{ fontFamily: MONO_FONT }}
                  >
                    {word}
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "radial-gradient(circle at 50% 50%, rgba(5,8,7,0) 30%, rgba(5,8,7,0.9) 92%)",
                }}
              />
            </div>
          </div>

          <div
            ref={skillsBottomRef as React.RefObject<HTMLDivElement>}
            className="mx-reveal"
            style={{ maxWidth: 1100, margin: "0 auto", padding: "20px clamp(20px, 6vw, 60px) 90px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              {t.skillGroups.map((group) => (
                <div key={group.title} className="mx-skill-card">
                  <div style={{ fontFamily: MONO_FONT, fontSize: 16, color: "#4dd8ff", marginBottom: 16 }}>
                    {group.title}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="mx-glow-line"
                        style={{
                          fontSize: 12,
                          padding: "6px 12px",
                          borderRadius: 4,
                          background: "rgba(57,255,136,0.08)",
                          border: "1px solid rgba(57,255,136,0.16)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={experienceRef as React.RefObject<HTMLElement>}
          className="mx-reveal"
          style={{ maxWidth: 980, margin: "0 auto", padding: "90px clamp(20px, 6vw, 60px)" }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: MONO_FONT,
              fontSize: 12,
              letterSpacing: ".3em",
              color: "rgba(77,216,255,0.8)",
            }}
          >
            03 / {t.expTag}
          </p>
          <h2
            style={{
              margin: "0 0 46px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#eafcf1",
            }}
          >
            {t.expTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gap: 4,
              borderInlineStart: "1px solid rgba(57,255,136,0.28)",
              paddingInlineStart: "clamp(22px, 4vw, 42px)",
            }}
          >
            {t.experience.map((job, i) => (
              <div key={i} style={{ position: "relative", padding: "24px 0" }}>
                <span
                  style={{
                    position: "absolute",
                    insetInlineStart: "calc(clamp(22px, 4vw, 42px) * -1 - 5px)",
                    top: 34,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#39ff88",
                    boxShadow: "0 0 14px rgba(57,255,136,0.9)",
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", alignItems: "baseline" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(18px, 1.9vw, 23px)",
                      fontWeight: 500,
                      color: "#eafcf1",
                      fontFamily: MONO_FONT,
                    }}
                  >
                    {job.role}
                  </h3>
                  <span
                    style={{
                      fontSize: 13,
                      letterSpacing: ".05em",
                      color: "rgba(77,216,255,0.85)",
                      fontFamily: MONO_FONT,
                    }}
                  >
                    {job.period}
                  </span>
                </div>
                <p className="mx-glow-line" style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.85 }}>
                  {job.org}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          ref={projectsRef as React.RefObject<HTMLElement>}
          className="mx-reveal"
          style={{ maxWidth: 1120, margin: "0 auto", padding: "90px clamp(20px, 6vw, 60px)" }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: MONO_FONT,
              fontSize: 12,
              letterSpacing: ".3em",
              color: "rgba(77,216,255,0.8)",
            }}
          >
            04 / {t.projTag}
          </p>
          <h2
            style={{
              margin: "0 0 44px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#eafcf1",
            }}
          >
            {t.projTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 22,
            }}
          >
            {t.projects.map((p) => (
              <article key={p.name} className="mx-project-card">
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#071009" }}>
                  {p.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "saturate(0.9) contrast(1.05)",
                      }}
                    />
                  ) : null}
                  {p.noImg ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        background:
                          "repeating-linear-gradient(45deg, rgba(57,255,136,0.05) 0 10px, transparent 10px 20px)",
                      }}
                    >
                      <span style={{ fontFamily: MONO_FONT, fontSize: 13, letterSpacing: ".1em", color: "rgba(57,255,136,0.5)" }}>
                        {p.buildLabel}
                      </span>
                    </div>
                  ) : null}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(5,8,7,0.85), transparent 50%)",
                    }}
                  />
                </div>
                <div style={{ padding: "26px 26px 30px" }}>
                  <div
                    style={{
                      fontFamily: MONO_FONT,
                      fontSize: 11,
                      letterSpacing: ".18em",
                      color: "rgba(57,255,136,0.85)",
                      marginBottom: 12,
                    }}
                  >
                    {p.status}
                  </div>
                  <h3 style={{ margin: "0 0 12px", fontFamily: displayFont, fontWeight: 400, fontSize: 25, color: "#eafcf1" }}>
                    {p.name}
                  </h3>
                  <p className="mx-glow-line" style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.9 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mx-glow-line"
                        style={{
                          fontSize: 11,
                          padding: "6px 11px",
                          borderRadius: 4,
                          border: "1px solid rgba(77,216,255,0.25)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-visit-btn"
                      style={{ fontFamily: MONO_FONT }}
                    >
                      {p.linkLabel} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          ref={contactRef as React.RefObject<HTMLElement>}
          className="mx-reveal"
          style={{
            maxWidth: 880,
            margin: "0 auto",
            padding: "100px clamp(20px, 6vw, 60px) 140px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: MONO_FONT,
              fontSize: 12,
              letterSpacing: ".3em",
              color: "rgba(77,216,255,0.8)",
            }}
          >
            05 / {t.contactTag}
          </p>
          <h2
            style={{
              margin: "0 0 18px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#eafcf1",
            }}
          >
            {t.contactTitle}
          </h2>
          <p className="mx-glow-line" style={{ margin: "0 auto 42px", maxWidth: 500, fontSize: 15, lineHeight: 1.95 }}>
            {t.contactLead}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              textAlign: "start",
            }}
          >
            {t.contacts.map((c) => (
              <a key={c.label} href={c.href} className="mx-contact-card">
                <div
                  style={{
                    fontFamily: MONO_FONT,
                    fontSize: 11,
                    letterSpacing: ".16em",
                    color: "rgba(57,255,136,0.85)",
                    marginBottom: 9,
                  }}
                >
                  {c.label}
                </div>
                <div
                  className="mx-glow-line"
                  style={{ fontSize: 14, direction: "ltr", textAlign: "start", fontFamily: MONO_FONT }}
                >
                  {c.value}
                </div>
              </a>
            ))}
          </div>
          <p style={{ margin: "64px 0 0", fontFamily: MONO_FONT, fontSize: 12, letterSpacing: ".1em", color: "rgba(217,245,230,0.35)" }}>
            {t.footer}
          </p>
        </section>
      </main>

      {loading ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "#050807",
            display: "grid",
            placeItems: "center",
            opacity: fading ? 0 : 1,
            transition: "opacity 1s ease",
          }}
        >
          <div style={{ width: "min(560px, 88vw)", fontFamily: MONO_FONT }}>
            {TERM_LINES.slice(0, termIdx).map((line, i) => (
              <div key={i} style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(57,255,136,0.85)", whiteSpace: "pre-wrap" }}>
                {line}
              </div>
            ))}
            <div style={{ marginTop: 18, height: 3, background: "rgba(57,255,136,0.12)", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #39ff88, #4dd8ff)",
                  transition: "width .1s linear",
                }}
              />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(77,216,255,0.85)" }}>
              <span>{t.loadingLabel}</span>
              <span>
                {progress}%<span style={{ animation: "mx-blink 1s step-end infinite" }}>_</span>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
