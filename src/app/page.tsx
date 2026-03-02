"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
      </svg>
    ),
    label: "Spacious Patio",
    desc: "Park benches, open sky, and a cold one. Our backyard is Park Slope's best-kept secret.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
      </svg>
    ),
    label: "Legendary Jukebox",
    desc: "Ranked among NYC's best. Wire, Dinosaur Jr., the Dead Boys — Ray curated it personally.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    label: "World of Whiskeys",
    desc: "20+ beers on tap. A deep bourbon program. Kentucky flair in the heart of Brooklyn.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4"/><path d="M8 13h.01M12 13h.01M16 13h.01"/>
      </svg>
    ),
    label: "Pinball Machines",
    desc: "Two legendary machines. No quarters needed — just the right energy.",
  },
]

const reviews = [
  { name: "Kay S.", location: "Brooklyn, NY", year: "2023", text: "Always a great experience. Treated as if you were family. Easy as a solo to feel welcomed. Great music and always an interesting crowd.", highlight: "Ask for Ray." },
  { name: "Marc L.", location: "Facebook", year: "2022", text: "Best bar in south slope! Say hi to Ray!", highlight: "Best bar in South Slope." },
  { name: "Jamie S.", location: "Facebook", year: "2021", text: "Quaint little bar with KENTUCKY flair. Fun atmosphere, hip atmosphere, local hangout.", highlight: "Kentucky flair." },
  { name: "traveljunkie1978", location: "Longwood, FL", year: "2014", text: "The drinks were good and the bartenders were attentive and friendly. A very cool neighborhood bar. Will definitely be going back.", highlight: "I wish we had a bar like this where I live." },
]

const menuHighlights = [
  { name: "Kentucky Beer Cheese", note: "housemade, with crackers", tag: "house special" },
  { name: "Shepherd's Pie", note: "hot Dub Pie from The Pie Shop", tag: "food" },
  { name: "Chicken & Vegetable Pie", note: "hot Dub Pie, available nightly", tag: "food" },
  { name: "Bourbon Selection", note: "emphasis on Kentucky bourbon", tag: "spirits" },
  { name: "Draft Beers", note: "20+ varieties on tap", tag: "beer" },
  { name: "Happy Hour Drafts", note: "$4 drafts, Mon–Fri 3–7pm", tag: "deal" },
]

export default function HomePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id])) }) },
      { threshold: 0.12 }
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => { if (el) sectionRefs.current.set(id, el) }
  const vis = (id: string) => visibleSections.has(id)

  return (
    <>
      <style>{`
        ${pageStyles}

        /* ── HOME-SPECIFIC ── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding: 7rem 1.5rem 5rem;
        }

        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 20% 10%, rgba(90, 30, 200, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(180, 90, 20, 0.14) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 50% 30%, rgba(60, 15, 160, 0.1) 0%, transparent 70%),
            var(--bg-deep);
          z-index: 0;
        }

        .hero-content { position: relative; z-index: 1; max-width: 800px; }

        .hero-title-home {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.01em; color: var(--text-primary);
          margin-bottom: 0.5rem;
          opacity: 0; transform: translateY(20px);
          animation: fadeUp 1s var(--ease-out-expo) 0.5s forwards;
        }

        .hero-title-italic { font-style: italic; color: var(--amber-pure); display: block; }

        .hero-sub-home {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-style: italic; color: var(--text-muted);
          margin-top: 1.5rem; margin-bottom: 2.5rem;
          opacity: 0; transform: translateY(16px);
          animation: fadeUp 0.9s var(--ease-out-expo) 0.75s forwards;
        }

        .hero-cta-row {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(14px);
          animation: fadeUp 0.9s var(--ease-out-expo) 1s forwards;
        }

        .hero-hours-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--amber-ember);
          border: 1px solid var(--border-warm);
          border-radius: 100px; padding: 0.5rem 1.1rem;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--amber-mid); font-weight: 500;
          margin-top: 3rem;
          opacity: 0; animation: fadeUp 0.9s var(--ease-out-expo) 1.2s forwards;
        }

        .hours-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(100, 240, 140, 0.7);
          box-shadow: 0 0 6px rgba(100, 240, 140, 0.5);
          animation: pulseDot 2.5s ease-in-out infinite;
        }

        .scroll-indicator {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0; animation: fadeUp 1s var(--ease-out-expo) 1.8s forwards; z-index: 1;
        }

        .scroll-indicator span {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--text-ghost); font-family: var(--font-body);
        }

        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--purple-mid), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: translateY(15px); }
        }

        /* About */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: center;
        }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }

        .about-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2.5rem; }

        .about-stat {
          padding: 1.25rem;
          background: rgba(13, 8, 32, 0.5);
          border: 1px solid var(--border-subtle); border-radius: 10px;
          transition: border-color var(--t-mid);
        }
        .about-stat:hover { border-color: var(--border-soft); }

        .about-stat-num { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--amber-pure); line-height: 1; }
        .about-stat-label { font-size: 11px; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }

        .bar-card {
          position: relative; background: rgba(10, 6, 24, 0.65);
          border: 1px solid var(--border-subtle); border-radius: 16px;
          padding: 2.5rem; backdrop-filter: blur(16px); overflow: hidden;
        }
        .bar-card::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 240px; height: 240px;
          background: radial-gradient(circle, var(--purple-dim) 0%, transparent 70%);
          pointer-events: none;
        }
        .bar-card-quote {
          font-family: var(--font-display); font-size: 1.3rem; font-style: italic;
          color: var(--text-primary); line-height: 1.55; margin-bottom: 1.5rem; position: relative;
        }
        .bar-card-quote::before {
          content: '"'; font-size: 5rem; font-family: var(--font-display);
          color: var(--purple-dim); position: absolute; top: -20px; left: -12px; line-height: 1; pointer-events: none;
        }
        .bar-card-detail {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 11.5px; color: var(--text-muted); letter-spacing: 0.06em;
          padding: 0.6rem 0; border-top: 1px solid var(--border-subtle);
        }

        /* Features */
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-top: 3.5rem; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .features-grid { grid-template-columns: 1fr; } }

        .feature-card {
          background: rgba(10, 6, 25, 0.55);
          border: 1px solid var(--border-subtle); border-radius: 12px;
          padding: 1.75rem 1.5rem;
          transition: all var(--t-mid) var(--ease-out-expo);
          position: relative; overflow: hidden; cursor: default;
        }
        .feature-card::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 30%, var(--purple-dim) 0%, transparent 70%);
          opacity: 0; transition: opacity var(--t-slow);
        }
        .feature-card:hover { border-color: var(--border-soft); transform: translateY(-4px); box-shadow: var(--glow-purple); }
        .feature-card:hover::after { opacity: 1; }

        .feature-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--purple-dim); border: 1px solid var(--border-subtle);
          display: flex; align-items: center; justify-content: center;
          color: var(--purple-bright); margin-bottom: 1.25rem; transition: all var(--t-mid);
        }
        .feature-card:hover .feature-icon { background: var(--purple-soft); color: var(--text-primary); }
        .feature-label { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; }
        .feature-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.65; font-weight: 300; }

        /* Happy Hour */
        .happy-hour-band {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(180, 90, 15, 0.12) 0%, rgba(100, 40, 220, 0.1) 100%);
          border-top: 1px solid var(--border-warm); border-bottom: 1px solid var(--border-warm);
          padding: 4rem 2rem;
        }
        .happy-hour-band::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 70% 50%, var(--amber-ember) 0%, transparent 70%);
          pointer-events: none;
        }
        .happy-hour-inner {
          position: relative; max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 3rem; flex-wrap: wrap;
        }
        .happy-hour-time { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; color: var(--amber-pure); line-height: 1; letter-spacing: -0.02em; }
        .hh-deals { display: flex; flex-direction: column; gap: 0.6rem; }
        .hh-deal { display: flex; align-items: center; gap: 0.75rem; font-size: 14px; color: var(--text-secondary); }
        .hh-deal-price { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--amber-pure); min-width: 48px; }

        /* Menu */
        .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; }
        @media (max-width: 768px) { .menu-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .menu-grid { grid-template-columns: 1fr; } }

        .menu-item {
          padding: 1.4rem 1.5rem;
          background: rgba(10, 6, 24, 0.5); border: 1px solid var(--border-subtle); border-radius: 10px;
          transition: all var(--t-mid);
        }
        .menu-item:hover { border-color: var(--border-warm); background: var(--amber-ember); }
        .menu-tag { font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-bottom: 6px; }
        .menu-name { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
        .menu-note { font-size: 12px; color: var(--text-muted); font-weight: 300; }

        /* Reviews */
        .reviews-track { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-top: 3rem; }
        @media (max-width: 700px) { .reviews-track { grid-template-columns: 1fr; } }

        .review-card {
          background: rgba(10, 6, 24, 0.5); border: 1px solid var(--border-subtle); border-radius: 12px;
          padding: 1.75rem; transition: all var(--t-mid); position: relative; overflow: hidden;
        }
        .review-card::before {
          content: '"'; position: absolute; top: -10px; right: 16px;
          font-family: var(--font-display); font-size: 6rem; color: var(--purple-dim); line-height: 1; pointer-events: none;
        }
        .review-card:hover { border-color: var(--border-soft); transform: translateY(-3px); box-shadow: var(--glow-purple); }
        .review-highlight { font-family: var(--font-display); font-style: italic; font-size: 1.05rem; color: var(--amber-pure); margin-bottom: 0.75rem; line-height: 1.4; }
        .review-text { font-size: 13px; color: var(--text-muted); line-height: 1.7; font-weight: 300; margin-bottom: 1.25rem; }
        .review-byline { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .review-author { font-size: 11px; letter-spacing: 0.08em; color: var(--purple-bright); font-weight: 500; }
        .review-stars { display: flex; gap: 2px; color: var(--amber-mid); font-size: 10px; }

        /* Visit */
        .visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; }
        @media (max-width: 700px) { .visit-grid { grid-template-columns: 1fr; } }

        .info-block { display: flex; flex-direction: column; gap: 1rem; }
        .info-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border-subtle); }
        .info-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--purple-dim); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--purple-bright); flex-shrink: 0; margin-top: 2px; }
        .info-label { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 4px; }
        .info-value { font-size: 14px; color: var(--text-secondary); font-weight: 400; line-height: 1.5; white-space: pre-line; }
        .info-value a { color: var(--text-secondary); text-decoration: none; transition: color var(--t-mid); }
        .info-value a:hover { color: var(--text-primary); }

        .map-placeholder {
          background: rgba(8, 4, 20, 0.7); border: 1px solid var(--border-subtle); border-radius: 14px;
          overflow: hidden; height: 100%; min-height: 280px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1rem; position: relative;
        }
        .map-placeholder::before {
          content: ''; position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, var(--border-subtle) 0px, var(--border-subtle) 1px, transparent 1px, transparent 40px),
                      repeating-linear-gradient(90deg, var(--border-subtle) 0px, var(--border-subtle) 1px, transparent 1px, transparent 40px);
          border-radius: 14px;
        }
        .map-pin-wrap { position: relative; z-index: 1; text-align: center; }
        .map-pin-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--amber-ember); border: 1px solid var(--border-warm);
          display: flex; align-items: center; justify-content: center;
          color: var(--amber-pure); margin: 0 auto 1rem;
          box-shadow: var(--glow-amber);
        }
        .map-address { font-size: 13px; color: var(--text-muted); text-align: center; line-height: 1.6; position: relative; z-index: 1; }
        .map-link {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--amber-mid); text-decoration: none;
          border: 1px solid var(--border-warm); padding: 0.45rem 1rem; border-radius: 100px;
          transition: all var(--t-mid); position: relative; z-index: 1;
        }
        .map-link:hover { background: var(--amber-ember); color: var(--amber-bright); }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(100, 40, 240, 0.09)", top: -100, left: -100 }} />
        <div className="hero-orb hero-orb-reverse" style={{ width: 380, height: 380, background: "rgba(200, 100, 20, 0.08)", bottom: -60, right: -80, animationDelay: "-7s" }} />
        <div className="hero-orb" style={{ width: 280, height: 280, background: "rgba(140, 60, 255, 0.07)", top: "40%", left: "60%", animationDelay: "-12s" }} />

        <div className="hero-content">
          <p className="hero-eyebrow">Park Slope, Brooklyn — Est. Since Always</p>
          <h1 className="hero-title-home">
            Commonwealth
            <span className="hero-title-italic">Bar</span>
          </h1>
          <p className="hero-sub-home">A pretty decent bar at the corner of 5th &amp; 12th.<br />Open every night until 4 a.m.</p>
          <div className="hero-cta-row">
            <Link href="/pages/contact" className="btn-hero-primary">
              Find Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
            <Link href="/pages/booze" className="btn-hero-ghost">What We Pour</Link>
          </div>
          <div className="hero-hours-pill">
            <span className="hours-dot" />
            Open Now — Daily Until 4 AM
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={reg("about")}>
        <div className="section-wrap">
          <div className="about-grid">
            <div>
              <p className={`section-eyebrow fade-in ${vis("about") ? "visible" : ""}`}>Who We Are</p>
              <h2 className={`section-title fade-in d1 ${vis("about") ? "visible" : ""}`}>Brooklyn's <em>living room</em> since the beginning</h2>
              <p className={`section-body fade-in d2 ${vis("about") ? "visible" : ""}`}>A neighborhood bar with some of Brooklyn's friendliest bartenders and smartest patrons (and Ray). Lots of booze, a spacious backyard patio, a pinball machine, and a jukebox consistently ranked among the best in NYC.</p>
              <div className={`about-stat-row fade-in d3 ${vis("about") ? "visible" : ""}`}>
                {[{ num: "4 AM", label: "Last Call" }, { num: "20+", label: "Beers on Tap" }, { num: "#1", label: "Jukebox in NYC" }, { num: "2PM", label: "Weekend Open" }].map((s) => (
                  <div key={s.label} className="about-stat">
                    <div className="about-stat-num">{s.num}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`fade-in d2 ${vis("about") ? "visible" : ""}`}>
              <div className="bar-card">
                <p className="bar-card-quote">Our regulars don't suck. The jukebox is unbeatable. Bourbon is good for you.</p>
                {[
                  { icon: "📍", text: "Corner of 5th Ave & 12th St, Park Slope" },
                  { icon: "🎵", text: "Indie-rock jukebox with a designated stool" },
                  { icon: "🌿", text: "Spacious patio with park benches" },
                  { icon: "🥃", text: "Kentucky bourbon emphasis, craft beers" },
                  { icon: "🍿", text: "Free popcorn. Always." },
                ].map((d) => (
                  <div key={d.text} className="bar-card-detail">
                    <span style={{ color: "var(--amber-mid)" }}>{d.icon}</span>
                    <span>{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* FEATURES */}
      <section id="features" ref={reg("features")}>
        <div className="section-wrap" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <p className={`section-eyebrow fade-in ${vis("features") ? "visible" : ""}`} style={{ textAlign: "center" }}>What Brings You Back</p>
            <h2 className={`section-title fade-in d1 ${vis("features") ? "visible" : ""}`} style={{ textAlign: "center" }}>The <em>essentials</em></h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.label} className={`feature-card fade-in d${i + 1} ${vis("features") ? "visible" : ""}`}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-label">{f.label}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAPPY HOUR */}
      <section id="hh" ref={reg("hh")} className="happy-hour-band">
        <div className="happy-hour-inner">
          <div className={`fade-in ${vis("hh") ? "visible" : ""}`}>
            <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>Every Day</p>
            <div className="happy-hour-time">Happy Hour</div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Mon–Fri 3–7 PM · Weekends 2–7 PM</p>
          </div>
          <div className={`hh-deals fade-in d2 ${vis("hh") ? "visible" : ""}`}>
            {[{ price: "$5", desc: "Draft beers" }, { price: "$1", desc: "Off everything else" }, { price: "$4", desc: "Well drinks (select)" }].map((d) => (
              <div key={d.desc} className="hh-deal">
                <span className="hh-deal-price">{d.price}</span>
                <span>{d.desc}</span>
              </div>
            ))}
          </div>
          <div className={`fade-in d3 ${vis("hh") ? "visible" : ""}`}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontStyle: "italic", color: "var(--text-muted)", maxWidth: "200px", lineHeight: 1.6 }}>"…especially if you know how to behave appropriately."</p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" ref={reg("menu")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("menu") ? "visible" : ""}`}>Food & Drink</p>
          <h2 className={`section-title fade-in d1 ${vis("menu") ? "visible" : ""}`}>Eat well. Drink <em>better.</em></h2>
          <p className={`section-body fade-in d2 ${vis("menu") ? "visible" : ""}`}>Dub Pies from The Pie Shop, our legendary housemade Kentucky Beer Cheese, free popcorn, and delivery menus from every restaurant in the neighborhood. Food available until 4 AM.</p>
          <div className="menu-grid">
            {menuHighlights.map((item, i) => (
              <div key={item.name} className={`menu-item fade-in d${(i % 3) + 1} ${vis("menu") ? "visible" : ""}`}>
                <div className="menu-tag">{item.tag}</div>
                <div className="menu-name">{item.name}</div>
                <div className="menu-note">{item.note}</div>
              </div>
            ))}
          </div>
          <div className={`fade-in d4 ${vis("menu") ? "visible" : ""}`} style={{ marginTop: "2rem" }}>
            <Link href="/pages/food" className="btn-hero-ghost" style={{ display: "inline-flex" }}>Full Menu →</Link>
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* REVIEWS */}
      <section id="reviews" ref={reg("reviews")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("reviews") ? "visible" : ""}`}>Word on the Street</p>
          <h2 className={`section-title fade-in d1 ${vis("reviews") ? "visible" : ""}`}>Don't take our <em>word for it</em></h2>
          <div className="reviews-track">
            {reviews.map((r, i) => (
              <div key={r.name} className={`review-card fade-in d${(i % 2) + 1} ${vis("reviews") ? "visible" : ""}`}>
                <div className="review-highlight">{r.highlight}</div>
                <p className="review-text">{r.text}</p>
                <div className="review-byline">
                  <div>
                    <div className="review-author">{r.name} · {r.location}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-ghost)", marginTop: "2px" }}>{r.year}</div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* VISIT */}
      <section id="visit" ref={reg("visit")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("visit") ? "visible" : ""}`}>Come In</p>
          <h2 className={`section-title fade-in d1 ${vis("visit") ? "visible" : ""}`}>We'll leave the <em>light on</em></h2>
          <div className="visit-grid">
            <div className={`info-block fade-in d1 ${vis("visit") ? "visible" : ""}`}>
              {[
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Address", value: "497 5th Avenue, Park Slope\nBrooklyn, NY 11215" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Hours", value: "Mon–Fri: 3 PM – 4 AM\nSat–Sun: 2 PM – 4 AM" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Phone", value: "(718) 768-0009", link: "tel:7187680009" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: "Email", value: "commonwealthliveson@gmail.com", link: "mailto:commonwealthliveson@gmail.com" },
              ].map((row) => (
                <div key={row.label} className="info-row">
                  <div className="info-icon">{row.icon}</div>
                  <div>
                    <div className="info-label">{row.label}</div>
                    <div className="info-value">
                      {(row as any).link ? <a href={(row as any).link}>{row.value}</a> : row.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`map-placeholder fade-in d3 ${vis("visit") ? "visible" : ""}`}>
              <div className="map-pin-wrap">
                <div className="map-pin-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="map-address">497 5th Avenue<br />Park Slope, Brooklyn NY 11215<br />Corner of 5th & 12th</p>
              </div>
              <a href="https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215" target="_blank" rel="noreferrer" className="map-link" style={{ marginTop: "1rem" }}>Open in Maps →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}