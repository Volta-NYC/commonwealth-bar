"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

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
  {
    name: "Kay S.",
    location: "Brooklyn, NY",
    year: "2023",
    text: "Always a great experience. Treated as if you were family. Easy as a solo to feel welcomed. Great music and always an interesting crowd.",
    highlight: "Ask for Ray.",
  },
  {
    name: "Marc L.",
    location: "Facebook",
    year: "2022",
    text: "Best bar in south slope! Say hi to Ray!",
    highlight: "Best bar in South Slope.",
  },
  {
    name: "Jamie S.",
    location: "Facebook",
    year: "2021",
    text: "Quaint little bar with KENTUCKY flair. Fun atmosphere, hip atmosphere, local hangout.",
    highlight: "Kentucky flair.",
  },
  {
    name: "traveljunkie1978",
    location: "Longwood, FL",
    year: "2014",
    text: "The drinks were good and the bartenders were attentive and friendly. A very cool neighborhood bar. Will definitely be going back.",
    highlight: "I wish we had a bar like this where I live.",
  },
]

const menuHighlights = [
  { name: "Kentucky Beer Cheese", note: "housemade, with crackers", tag: "house special" },
  { name: "Shepherd's Pie", note: "hot Dub Pie from The Pie Shop", tag: "food" },
  { name: "Chicken & Vegetable Pie", note: "hot Dub Pie, available nightly", tag: "food" },
  { name: "Bourbon Selection", note: "emphasis on Kentucky bourbon", tag: "spirits" },
  { name: "Draft Beers", note: "20+ varieties on tap", tag: "beer" },
  { name: "Happy Hour Drafts", note: "$5 drafts, Mon–Fri 3–7pm", tag: "deal" },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.12 }
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
  }

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap');

        /* ── TOKENS ─────────────────────────────── */
        :root {
          --bg-void: #04020e;
          --bg-deep: #07041a;
          --bg-surface: #0d0820;
          --purple-mid: rgba(150, 90, 255, 0.45);
          --purple-bright: rgba(175, 115, 255, 0.85);
          --purple-pure: #a06fff;
          --amber-pure: #ffb84a;
          --amber-bright: rgba(255, 200, 100, 0.88);
          --text-primary: #f0eaff;
          --text-secondary: rgba(210, 185, 255, 0.72);
          --text-muted: rgba(170, 140, 220, 0.48);
          --text-warm: rgba(255, 205, 110, 0.82);
          --border-subtle: rgba(120, 70, 255, 0.1);
          --border-soft: rgba(140, 90, 255, 0.18);
          --border-warm: rgba(255, 180, 70, 0.2);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Raleway', system-ui, sans-serif;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg-deep);
          color: var(--text-primary);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        /* Grain overlay */
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.028;
          pointer-events: none;
          z-index: 999;
        }

        /* ── HERO ───────────────────────────────── */
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
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 20% 10%, rgba(90, 30, 200, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(180, 90, 20, 0.14) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 50% 30%, rgba(60, 15, 160, 0.1) 0%, transparent 70%),
            #07041a;
          z-index: 0;
        }

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          animation: float 18s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: rgba(100, 40, 240, 0.09);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 380px; height: 380px;
          background: rgba(200, 100, 20, 0.08);
          bottom: -60px; right: -80px;
          animation-delay: -7s;
        }
        .orb-3 {
          width: 280px; height: 280px;
          background: rgba(140, 60, 255, 0.07);
          top: 40%; left: 60%;
          animation-delay: -12s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.04); }
          66% { transform: translate(-20px, 18px) scale(0.97); }
        }

        /* Decorative horizontal line */
        .hero-rule {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(160, 90, 255, 0.5), transparent);
          margin: 2rem auto;
        }

        .hero-content { position: relative; z-index: 1; max-width: 800px; }

        .hero-eyebrow {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(180, 130, 255, 0.6);
          font-family: var(--font-body);
          font-weight: 500;
          margin-bottom: 1.25rem;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.9s var(--ease-out) 0.3s forwards;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 1s var(--ease-out) 0.5s forwards;
        }

        .hero-title-italic {
          font-style: italic;
          color: var(--amber-pure);
          display: block;
        }

        .hero-sub {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-style: italic;
          color: rgba(200, 170, 255, 0.55);
          margin-top: 1.5rem;
          margin-bottom: 2.5rem;
          font-weight: 400;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.9s var(--ease-out) 0.75s forwards;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(14px);
          animation: fadeUp 0.9s var(--ease-out) 1s forwards;
        }

        .btn-hero-primary {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          background: linear-gradient(135deg, rgba(215, 135, 25, 0.92), rgba(255, 195, 80, 0.88));
          color: #0a0515;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 100px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 24px rgba(200, 130, 20, 0.28);
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200, 130, 20, 0.4);
        }

        .btn-hero-ghost {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(200, 170, 255, 0.75);
          border: 1px solid rgba(140, 90, 255, 0.22);
          padding: 0.8rem 1.8rem;
          border-radius: 100px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          background: transparent;
        }
        .btn-hero-ghost:hover {
          background: rgba(130, 70, 255, 0.08);
          border-color: rgba(160, 100, 255, 0.4);
          color: var(--text-primary);
        }

        /* Hours pill */
        .hero-hours-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 185, 60, 0.07);
          border: 1px solid rgba(255, 185, 60, 0.18);
          border-radius: 100px;
          padding: 0.5rem 1.1rem;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 200, 95, 0.7);
          font-weight: 500;
          margin-top: 3rem;
          opacity: 0;
          animation: fadeUp 0.9s var(--ease-out) 1.2s forwards;
        }

        .hours-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(100, 240, 140, 0.7);
          box-shadow: 0 0 6px rgba(100, 240, 140, 0.5);
          animation: pulse-dot 2.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: fadeUp 1s var(--ease-out) 1.8s forwards;
          z-index: 1;
        }
        .scroll-indicator span {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(150, 120, 210, 0.4);
          font-family: var(--font-body);
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(150, 90, 255, 0.5), transparent);
          animation: scroll-line 2s ease-in-out infinite;
        }
        @keyframes scroll-line {
          0% { opacity: 0; transform: scaleY(0) translateY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: translateY(15px); }
        }

        /* ── SHARED SECTION STYLES ───────────────── */
        .section-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem;
        }

        .section-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(160, 100, 255, 0.55);
          font-weight: 600;
          font-family: var(--font-body);
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .section-title em {
          font-style: italic;
          color: var(--amber-pure);
        }

        .section-body {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          font-weight: 300;
          max-width: 520px;
        }

        /* ── FADE IN ANIMATION ───────────────────── */
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-in-delay-1 { transition-delay: 0.1s; }
        .fade-in-delay-2 { transition-delay: 0.2s; }
        .fade-in-delay-3 { transition-delay: 0.3s; }
        .fade-in-delay-4 { transition-delay: 0.4s; }
        .fade-in-delay-5 { transition-delay: 0.5s; }
        .fade-in-delay-6 { transition-delay: 0.6s; }

        /* ── DIVIDER LINE ────────────────────────── */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120, 70, 220, 0.14), transparent);
          margin: 0 2rem;
        }

        /* ── ABOUT SECTION ───────────────────────── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        .about-stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 2.5rem;
        }

        .about-stat {
          padding: 1.25rem;
          background: rgba(13, 8, 32, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          transition: border-color 0.3s;
        }
        .about-stat:hover {
          border-color: var(--border-soft);
        }

       
      `}</style>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-content">
          <p className="hero-eyebrow">Park Slope, Brooklyn — Est. Since Always</p>

          <h1 className="hero-title">
            Commonwealth
            <span className="hero-title-italic">Bar</span>
          </h1>

          <p className="hero-sub">
            A pretty decent bar at the corner of 5th & 12th.<br />
            Open every night until 4 a.m.
          </p>

          <div className="hero-cta-row">
            <Link href="/pages/contact" className="btn-hero-primary">
              Find Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/pages/booze" className="btn-hero-ghost">
              What We Pour
            </Link>
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

      {/* ── ABOUT ─────────────────────────────────── */}
      <section id="about" ref={registerSection("about")}>
        <div className="section-wrap">
          <div className="about-grid">
            <div>
              <p className={`section-eyebrow fade-in ${isVisible("about") ? "visible" : ""}`}>Who We Are</p>
              <h2 className={`section-title fade-in fade-in-delay-1 ${isVisible("about") ? "visible" : ""}`}>
                Brooklyn's <em>living room</em> since the beginning
              </h2>
              <p className={`section-body fade-in fade-in-delay-2 ${isVisible("about") ? "visible" : ""}`}>
                A neighborhood bar with some of Brooklyn's friendliest bartenders and smartest patrons (and Ray). We've got lots of booze, a spacious backyard patio, a pinball machine, and a jukebox consistently ranked among the best in all of New York City.
              </p>
              <div className={`about-stat-row fade-in fade-in-delay-3 ${isVisible("about") ? "visible" : ""}`}>
                {[
                  { num: "4 AM", label: "Last Call" },
                  { num: "20+", label: "Beers on Tap" },
                  { num: "#1", label: "Jukebox in NYC" },
                  { num: "2PM", label: "Weekend Open" },
                ].map((s) => (
                  <div key={s.label} className="about-stat">
                    <div className="about-stat-num">{s.num}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`fade-in fade-in-delay-2 ${isVisible("about") ? "visible" : ""}`}>
              <div className="bar-card">
                <p className="bar-card-quote">
                  Our regulars don't suck. The jukebox is unbeatable. Bourbon is good for you — at least if you ask the bartenders.
                </p>
                {[
                  { icon: "📍", text: "Corner of 5th Ave & 12th St, Park Slope" },
                  { icon: "🎵", text: "Indie-rock jukebox with a designated stool" },
                  { icon: "🌿", text: "Spacious patio with park benches" },
                  { icon: "🥃", text: "Kentucky bourbon emphasis, craft beers" },
                  { icon: "🍿", text: "Free popcorn. Always." },
                ].map((d) => (
                  <div key={d.text} className="bar-card-detail">
                    <span className="bar-card-detail-icon">{d.icon}</span>
                    <span>{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FEATURES ──────────────────────────────── */}
      <section id="features" ref={registerSection("features")}>
        <div className="section-wrap" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <p className={`section-eyebrow fade-in ${isVisible("features") ? "visible" : ""}`} style={{ textAlign: "center" }}>
              What Brings You Back
            </p>
            <h2 className={`section-title fade-in fade-in-delay-1 ${isVisible("features") ? "visible" : ""}`} style={{ textAlign: "center" }}>
              The <em>essentials</em>
            </h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={f.label}
                className={`feature-card fade-in fade-in-delay-${i + 1} ${isVisible("features") ? "visible" : ""}`}
              >
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-label">{f.label}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HAPPY HOUR BAND ───────────────────────── */}
      <section id="hh" ref={registerSection("hh")} className="happy-hour-band">
        <div className="happy-hour-inner">
          <div className={`fade-in ${isVisible("hh") ? "visible" : ""}`}>
            <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>Every Day</p>
            <div className="happy-hour-time">Happy Hour</div>
            <p style={{ fontSize: "12px", color: "rgba(200, 170, 255, 0.45)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Mon–Fri 3–7 PM &nbsp;·&nbsp; Weekends 2–7 PM
            </p>
          </div>
          <div className={`happy-hour-deals fade-in fade-in-delay-2 ${isVisible("hh") ? "visible" : ""}`}>
            {[
              { price: "$5", desc: "Draft beers" },
              { price: "$1", desc: "Off everything else" },
              { price: "$4", desc: "Well drinks (select)" },
            ].map((d) => (
              <div key={d.desc} className="hh-deal">
                <span className="hh-deal-price">{d.price}</span>
                <span style={{ color: "rgba(210, 185, 255, 0.65)", fontSize: "14px" }}>{d.desc}</span>
              </div>
            ))}
          </div>
          <div className={`fade-in fade-in-delay-3 ${isVisible("hh") ? "visible" : ""}`}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontStyle: "italic", color: "rgba(200, 160, 255, 0.5)", maxWidth: "200px", lineHeight: 1.6 }}>
              "…especially if you know how to behave appropriately."
            </p>
          </div>
        </div>
      </section>

      {/* ── MENU ──────────────────────────────────── */}
      <section id="menu" ref={registerSection("menu")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${isVisible("menu") ? "visible" : ""}`}>Food & Drink</p>
          <h2 className={`section-title fade-in fade-in-delay-1 ${isVisible("menu") ? "visible" : ""}`}>
            Eat well. Drink <em>better.</em>
          </h2>
          <p className={`section-body fade-in fade-in-delay-2 ${isVisible("menu") ? "visible" : ""}`}>
            We don't have a kitchen, but we have something better: Dub Pies from The Pie Shop, our legendary housemade Kentucky Beer Cheese, free popcorn, and delivery menus from every restaurant in the neighborhood. Food available until 4 AM.
          </p>
          <div className="menu-grid">
            {menuHighlights.map((item, i) => (
              <div
                key={item.name}
                className={`menu-item fade-in fade-in-delay-${(i % 3) + 1} ${isVisible("menu") ? "visible" : ""}`}
              >
                <div className="menu-tag">{item.tag}</div>
                <div className="menu-name">{item.name}</div>
                <div className="menu-note">{item.note}</div>
              </div>
            ))}
          </div>
          <div className={`fade-in fade-in-delay-4 ${isVisible("menu") ? "visible" : ""}`} style={{ marginTop: "2rem" }}>
            <Link href="/pages/food" className="btn-hero-ghost" style={{ display: "inline-flex" }}>
              Full Menu →
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── REVIEWS ───────────────────────────────── */}
      <section id="reviews" ref={registerSection("reviews")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${isVisible("reviews") ? "visible" : ""}`}>Word on the Street</p>
          <h2 className={`section-title fade-in fade-in-delay-1 ${isVisible("reviews") ? "visible" : ""}`}>
            Don't take our <em>word for it</em>
          </h2>
          <div className="reviews-track">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className={`review-card fade-in fade-in-delay-${(i % 2) + 1} ${isVisible("reviews") ? "visible" : ""}`}
              >
                <div className="review-highlight">{r.highlight}</div>
                <p className="review-text">{r.text}</p>
                <div className="review-byline">
                  <div>
                    <div className="review-author">{r.name} · {r.location}</div>
                    <div style={{ fontSize: "10px", color: "rgba(140, 110, 200, 0.35)", marginTop: "2px" }}>{r.year}</div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── VISIT ─────────────────────────────────── */}
      <section id="visit" ref={registerSection("visit")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${isVisible("visit") ? "visible" : ""}`}>Come In</p>
          <h2 className={`section-title fade-in fade-in-delay-1 ${isVisible("visit") ? "visible" : ""}`}>
            We'll leave the <em>light on</em>
          </h2>
          <div className="visit-grid">
            <div className={`info-block fade-in fade-in-delay-1 ${isVisible("visit") ? "visible" : ""}`}>
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: "Address",
                  value: "497 5th Avenue, Park Slope\nBrooklyn, NY 11215",
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  label: "Hours",
                  value: "Mon–Fri: 3 PM – 4 AM\nSat–Sun: 2 PM – 4 AM",
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                  label: "Phone",
                  value: "(718) 768-2040",
                  link: "tel:7187682040",
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                  label: "Email",
                  value: "info@commonwealthbar.com",
                  link: "mailto:info@commonwealthbar.com",
                },
              ].map((row) => (
                <div key={row.label} className="info-row">
                  <div className="info-icon">{row.icon}</div>
                  <div>
                    <div className="info-label">{row.label}</div>
                    <div className="info-value">
                      {row.link ? (
                        <a href={row.link}>{row.value}</a>
                      ) : (
                        <span style={{ whiteSpace: "pre-line" }}>{row.value}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`map-placeholder fade-in fade-in-delay-3 ${isVisible("visit") ? "visible" : ""}`}>
              <div className="map-pin-wrap">
                <div className="map-pin-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="map-address">
                  497 5th Avenue<br />
                  Park Slope, Brooklyn NY 11215<br />
                  Corner of 5th & 12th
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215"
                target="_blank"
                rel="noreferrer"
                className="map-link"
                style={{ marginTop: "1rem" }}
              >
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}