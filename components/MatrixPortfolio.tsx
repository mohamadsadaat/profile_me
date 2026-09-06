"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CONTENT, JourneyMilestone, Lang, TERM_LINES } from "@/content/translations";

const MONO_FONT = "var(--font-mono), 'JetBrains Mono', monospace";

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

/** Toggles `is-visible` every time the element enters or leaves the viewport, so the animation replays both ways. */
function useRepeatReveal(reduced: boolean) {
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
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
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

const JOURNEY_TYPE_LABEL: Record<JourneyMilestone["type"], { ar: string; en: string }> = {
  education: { ar: "تعليم", en: "Education" },
  skills: { ar: "مهارات", en: "Skills" },
  job: { ar: "عمل", en: "Job" },
  project: { ar: "مشروع", en: "Project" },
};

/** The year heading of a timeline group: scales and glows into view every time it's scrolled to. */
function JourneyYear({ year, reduced }: { year: string; reduced: boolean }) {
  const ref = useRepeatReveal(reduced);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-journey-year">
      {year}
    </div>
  );
}

/** One timeline entry: slides in and lights up its rail dot every time it's scrolled into view. */
function JourneyCard({ milestone, ar, reduced }: { milestone: JourneyMilestone; ar: boolean; reduced: boolean }) {
  const ref = useRepeatReveal(reduced);
  const badgeColor = milestone.type === "skills" || milestone.type === "job" ? "#C8963E" : "#E67E22";

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-journey-card">
      <span className="mx-journey-dot" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "baseline", marginBottom: 10 }}>
        <span
          className="mx-journey-badge"
          style={{ color: badgeColor, border: `1px solid ${badgeColor}66`, background: `${badgeColor}14` }}
        >
          {JOURNEY_TYPE_LABEL[milestone.type][ar ? "ar" : "en"]}
        </span>
        <span style={{ fontFamily: MONO_FONT, fontSize: 12, color: "rgba(248,249,250,0.5)" }}>{milestone.date}</span>
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: "clamp(18px, 1.9vw, 23px)", fontWeight: 500, color: "#F8F9FA" }}>
        {milestone.title}
      </h3>
      {milestone.org ? (
        <div className="mx-glow-line" style={{ fontSize: 14, marginBottom: 8 }}>
          {milestone.org}
        </div>
      ) : null}
      {milestone.desc ? (
        <p className="mx-glow-line" style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.85, maxWidth: 640 }}>
          {milestone.desc}
        </p>
      ) : null}
      {milestone.img ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 420,
            aspectRatio: "16/10",
            overflow: "hidden",
            borderRadius: 8,
            marginBottom: 14,
            border: "1px solid rgba(200,150,62,0.2)",
            background: "#06101c",
          }}
        >
          <Image
            src={milestone.img}
            alt={milestone.title}
            fill
            sizes="(max-width: 900px) 90vw, 420px"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
      {milestone.items ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: milestone.link ? 14 : 0 }}>
          {milestone.items.map((item) => (
            <span
              key={item}
              className="mx-glow-line"
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 4,
                background: "rgba(200,150,62,0.08)",
                border: "1px solid rgba(200,150,62,0.16)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
      {milestone.link ? (
        <a href={milestone.link} target="_blank" rel="noopener noreferrer" className="mx-visit-btn" style={{ fontFamily: MONO_FONT }}>
          {milestone.linkLabel} ↗
        </a>
      ) : null}
    </div>
  );
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
  const displayFont = ar ? "var(--font-display), 'Rakkas', serif" : MONO_FONT;
  const bodyFont = ar
    ? "var(--font-sans-ar), 'IBM Plex Sans Arabic', sans-serif"
    : "var(--font-sans-en), 'IBM Plex Sans', sans-serif";

  const journeyGroups = t.journey.reduce<{ year: string; items: JourneyMilestone[] }[]>((acc, m) => {
    const last = acc[acc.length - 1];
    if (last && last.year === m.year) last.items.push(m);
    else acc.push({ year: m.year, items: [m] });
    return acc;
  }, []);

  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const journeyTrackRef = useRef<HTMLDivElement | null>(null);
  const journeyFillRef = useRef<HTMLDivElement | null>(null);
  const journeyDotRef = useRef<HTMLDivElement | null>(null);
  const journeyGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeYear, setActiveYear] = useState("");
  const activeYearRef = useRef("");
  const journeyYearsRef = useRef<string[]>([]);
  journeyYearsRef.current = journeyGroups.map((g) => g.year);

  useEffect(() => {
    const first = t.journey[0]?.year ?? "";
    activeYearRef.current = first;
    setActiveYear(first);
  }, [t]);

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
      ctx.fillStyle = "rgba(4,13,24,0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;
        ctx.fillStyle = Math.random() < 0.06 ? "rgba(200,150,62,0.85)" : "rgba(57,255,20,0.65)";
        ctx.fillText(ch, x, y);
        drops[i] += 1;
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      }
    };
    let rainInterval = setInterval(draw, 90);
    const onVisibility = () => {
      clearInterval(rainInterval);
      if (!document.hidden) rainInterval = setInterval(draw, 90);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(rainInterval);
    };
  }, [reduced]);

  /* ---------- mouse parallax: background layers drift opposite the cursor for a 3D-depth feel ---------- */
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = (e.clientY / window.innerHeight) * 2 - 1;
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate(${-mx * 18}px, ${-my * 18}px)`;
      }
      if (heroGlowRef.current) {
        heroGlowRef.current.style.transform = `translate(${-mx * 26}px, ${-my * 26}px)`;
      }
      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `translate(${mx * 10}px, ${my * 10}px) scale(1.06)`;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  /* ---------- journey timeline progress: the dot eases toward the scroll position instead of snapping to it ---------- */
  useEffect(() => {
    let raf = 0;
    let running = false;
    let target = 0;
    let current = 0;
    let trackHeight = 0;

    const paint = () => {
      if (journeyFillRef.current) journeyFillRef.current.style.transform = `scaleY(${current})`;
      if (journeyDotRef.current) journeyDotRef.current.style.transform = `translateY(${current * trackHeight}px)`;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      paint();
      if (current !== target) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const measure = () => {
      const el = journeyTrackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      trackHeight = rect.height;
      const viewportAnchor = window.innerHeight * 0.35;
      const p = trackHeight > 0 ? (viewportAnchor - rect.top) / trackHeight : 0;
      target = Math.max(0, Math.min(1, p));

      const years = journeyYearsRef.current;
      let active = years[0] ?? "";
      journeyGroupRefs.current.forEach((group, i) => {
        if (group && group.getBoundingClientRect().top <= viewportAnchor) active = years[i] ?? active;
      });
      if (active && active !== activeYearRef.current) {
        activeYearRef.current = active;
        setActiveYear(active);
      }

      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    current = 0;
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const projectsRef = useReveal(reduced);
  const contactRef = useReveal(reduced);

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <div
      dir={dir}
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: bodyFont,
        background: "#040D18",
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
        ref={ambientGlowRef}
        style={{
          position: "fixed",
          inset: "-30px",
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(20,36,58,0.55) 0%, rgba(4,13,24,0) 55%), linear-gradient(180deg, #040D18 0%, #06101f 45%, #040D18 100%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 30%, rgba(4,13,24,0) 0%, rgba(4,13,24,0.5) 60%, #040D1866 100%)",
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
            background: "#040D18d9",
            border: "1px solid rgba(200,150,62,0.18)",
            borderRadius: 999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, color: "#F8F9FA" }}>
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
                  background: "rgba(200,150,62,0.12)",
                  border: "1px solid rgba(200,150,62,0.4)",
                  boxShadow: "0 0 16px rgba(200,150,62,0.35)",
                  fontFamily: MONO_FONT,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#C8963E",
                  flexShrink: 0,
                }}
              >
                &gt;_
              </span>
            </span>
            <span
              className="mx-nav-item mx-nav-brand"
              style={{
                fontFamily: MONO_FONT,
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
            position: "relative",
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "140px clamp(20px, 6vw, 80px) 100px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              transform: "scale(1.06)",
              transition: "transform 0.2s ease-out",
            }}
          >
            <source
              src="/hero-bg.mp4"
              type="video/mp4"
            />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              background: "rgba(4,13,24,0.32)",
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              ref={heroGlowRef}
              style={{
                position: "absolute",
                inset: "-6% -14%",
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(4,13,24,0.5) 0%, rgba(4,13,24,0.3) 55%, rgba(4,13,24,0) 100%)",
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
                    border: "1px solid rgba(200,150,62,0.45)",
                    boxShadow: "0 0 30px rgba(200,150,62,0.25)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: "50%",
                    border: "1px solid rgba(230,126,34,0.5)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 6,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#06101c",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Image
                    src={t.photo}
                    alt={t.heroName}
                    fill
                    sizes="128px"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      fontFamily: MONO_FONT,
                      fontSize: 10,
                      letterSpacing: ".12em",
                      color: "rgba(248,249,250,0.35)",
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
                color: "rgba(230,126,34,0.85)",
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
                color: "#F8F9FA",
                textShadow: "0 0 40px rgba(200,150,62,0.28)",
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
                color: "rgba(248,249,250,0.7)",
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
                    color: "#C8963E",
                    border: "1px solid rgba(200,150,62,0.3)",
                    background: "rgba(10,22,36,0.6)",
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
              color: "rgba(248,249,250,0.4)",
              animation: "mx-pulse 3s ease-in-out infinite",
            }}
          >
            {t.scroll}
          </div>
        </section>

        <section
          id="journey"
          style={{
            position: "relative",
            ["--mx-slide-from" as string]: ar ? "48px" : "-48px",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              marginBottom: "-100vh",
              zIndex: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/journey-poster.jpg"
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/journey-bg.mp4" type="video/mp4" />
            </video>
            <div style={{ position: "absolute", inset: 0, background: "rgba(4,13,24,0.72)" }} />
          </div>

          <div className="mx-journey-layout">
            <div className="mx-journey-intro">
              <p
                style={{
                  margin: "0 0 14px",
                  fontFamily: MONO_FONT,
                  fontSize: 12,
                  letterSpacing: ".3em",
                  color: "rgba(230,126,34,0.8)",
                }}
              >
                01 / {t.journeyTag}
              </p>
              <h2
                style={{
                  margin: "0 0 24px",
                  fontFamily: displayFont,
                  fontWeight: 400,
                  fontSize: "clamp(32px, 4.6vw, 54px)",
                  color: "#F8F9FA",
                }}
              >
                {t.journeyTitle}
              </h2>
              <div style={{ display: "grid", gap: 14 }}>
                {t.journeyLead.map((para, i) => (
                  <p key={i} className="mx-glow-line" style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="mx-journey-active-year">
                <span className="mx-journey-active-year-label">{ar ? "المحطة" : "NOW AT"}</span>
                <span className="mx-journey-active-year-value">{activeYear}</span>
              </div>
            </div>

            <div
              ref={journeyTrackRef}
              className="mx-journey-track"
              style={{
                ["--mx-rail-x" as string]: "clamp(14px, 3vw, 20px)",
                ["--mx-card-pad" as string]: "clamp(40px, 6vw, 58px)",
              }}
            >
              <div className="mx-journey-rail" />
              <div ref={journeyFillRef} className="mx-journey-rail-fill" />
              <div ref={journeyDotRef} className="mx-journey-rail-dot" />
              {journeyGroups.map((group, gi) => (
                <div
                  key={group.year}
                  ref={(el) => {
                    journeyGroupRefs.current[gi] = el;
                  }}
                  style={{ position: "relative" }}
                >
                  <JourneyYear year={group.year} reduced={reduced} />
                  <div className="mx-journey-group-cards">
                    {group.items.map((m, i) => (
                      <JourneyCard key={i} milestone={m} ar={ar} reduced={reduced} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
              color: "rgba(230,126,34,0.8)",
            }}
          >
            02 / {t.projTag}
          </p>
          <h2
            style={{
              margin: "0 0 44px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#F8F9FA",
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
            {[...t.projects].sort((a, b) => Number(!!b.img) - Number(!!a.img)).map((p) => (
              <article key={p.name} className="mx-project-card">
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#06101c" }}>
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1120px) 46vw, 360px"
                      style={{ objectFit: "cover", filter: "saturate(0.9) contrast(1.05)" }}
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
                          "repeating-linear-gradient(45deg, rgba(200,150,62,0.05) 0 10px, transparent 10px 20px)",
                      }}
                    >
                      <span style={{ fontFamily: MONO_FONT, fontSize: 13, letterSpacing: ".1em", color: "rgba(200,150,62,0.5)" }}>
                        {p.buildLabel}
                      </span>
                    </div>
                  ) : null}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(4,13,24,0.85), transparent 50%)",
                    }}
                  />
                </div>
                <div style={{ padding: "26px 26px 30px" }}>
                  <div
                    style={{
                      fontFamily: MONO_FONT,
                      fontSize: 11,
                      letterSpacing: ".18em",
                      color: "rgba(200,150,62,0.85)",
                      marginBottom: 12,
                    }}
                  >
                    {p.status}
                  </div>
                  <h3 style={{ margin: "0 0 12px", fontFamily: displayFont, fontWeight: 400, fontSize: 25, color: "#F8F9FA" }}>
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
                          border: "1px solid rgba(230,126,34,0.25)",
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
              color: "rgba(230,126,34,0.8)",
            }}
          >
            03 / {t.contactTag}
          </p>
          <h2
            style={{
              margin: "0 0 18px",
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: "clamp(32px, 4.6vw, 54px)",
              color: "#F8F9FA",
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
                    color: "rgba(200,150,62,0.85)",
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
          <p style={{ margin: "64px 0 0", fontFamily: MONO_FONT, fontSize: 12, letterSpacing: ".1em", color: "rgba(248,249,250,0.35)" }}>
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
            background: "#040D18",
            display: "grid",
            placeItems: "center",
            opacity: fading ? 0 : 1,
            transition: "opacity 1s ease",
          }}
        >
          <div style={{ width: "min(560px, 88vw)", fontFamily: MONO_FONT }}>
            {TERM_LINES.slice(0, termIdx).map((line, i) => (
              <div key={i} style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(200,150,62,0.85)", whiteSpace: "pre-wrap" }}>
                {line}
              </div>
            ))}
            <div style={{ marginTop: 18, height: 3, background: "rgba(200,150,62,0.12)", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #C8963E, #E67E22)",
                  transition: "width .1s linear",
                }}
              />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(230,126,34,0.85)" }}>
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
