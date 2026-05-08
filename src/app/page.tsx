"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const HERO_IMG = "https://commonwealthbar.com/wp-content/uploads/2011/02/commonwealthbanner.jpg"

const houseRules = [
  { n: "I",   t: "Be kind to the bartenders", d: "They remember everything. The good things and otherwise." },
  { n: "II",  t: "Don't ask for top-40",      d: "The jukebox has been curated. Wire, Dinosaur Jr., the Dead Boys. Trust it." },
  { n: "III", t: "Free popcorn is a right",   d: "Take some. Eat some. Take some more." },
  { n: "IV",  t: "Patio = quiet hours",       d: "It's a backyard, not a beer garden. Speak as if you live next door." },
]

const pours = [
  { kind: "Beer",    head: "Twenty-plus", body: "Drafts on rotation, with hometown nods to the Bluegrass State and the boroughs." },
  { kind: "Bourbon", head: "Kentucky-leaning", body: "A deep bench. Buffalo Trace to Pappy. Ask Ray for the off-menu pours." },
  { kind: "Wells",   head: "Pours we'd drink", body: "House liquors we picked because they actually taste good. Cocktails on request." },
  { kind: "Pies",    head: "Dub Pies",      body: "Hot, savory, baked-in-Brooklyn. Shepherd's, chicken & veg, southwest, curry." },
]

const press = [
  { quote: "Best bar in South Slope.",        cite: "Marc L.,  Facebook" },
  { quote: "Quaint little bar with KENTUCKY flair.", cite: "Jamie S.,  Facebook" },
  { quote: "Treated as if you were family.",  cite: "Kay S.,   Brooklyn" },
  { quote: "I wish we had a bar like this where I live.", cite: "Trip Advisor" },
]

export default function HomePage() {
  const [seen, setSeen] = useState<Set<string>>(new Set())
  const refs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen((p) => new Set([...p, e.target.id]))
        })
      },
      { threshold: 0.12 }
    )
    refs.current.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => { if (el) refs.current.set(id, el) }
  const vis = (id: string) => seen.has(id)

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────────
           SHARED
        ───────────────────────────────────────────── */
        @keyframes fadeUp { to { opacity: 1; transform: none; } }

        .fade-in {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s var(--ease-out-expo),
                      transform 0.7s var(--ease-out-expo);
        }
        .fade-in.on { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }
        .d4 { transition-delay: 0.35s; }

        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem);
        }

        .stars {
          color: var(--red-deep);
          letter-spacing: 0.45em;
          font-size: 0.85rem;
        }

        .stamp {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        .double-rule {
          height: 6px;
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          width: 100%;
        }

        .ornate {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--red-deep);
          font-family: var(--font-display);
          font-size: 1rem;
        }
        .ornate::before, .ornate::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--ink-deep);
          opacity: 0.55;
          max-width: 240px;
        }

        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .section-eyebrow b { color: var(--red-deep); font-weight: 400; }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5.4vw, 4.6rem);
          line-height: 1;
          color: var(--ink-deep);
          letter-spacing: -0.005em;
          margin-top: 0.6rem;
        }
        .section-title em {
          font-style: italic;
          color: var(--red-deep);
        }

        .section-deck {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--ink-mid);
          line-height: 1.75;
          max-width: 60ch;
          margin-top: 1.4rem;
        }

        /* ─────────────────────────────────────────────
           HERO POSTER
        ───────────────────────────────────────────── */
        .hero {
          padding: calc(64px + 2.5rem) 1.5rem 3rem;
          background: var(--paper-base);
          position: relative;
        }

        .hero-poster {
          max-width: 920px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-marquee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 1.6rem;
          opacity: 0;
          animation: fadeUp 0.7s var(--ease-out-expo) 0.1s forwards;
        }
        .hero-marquee .star { color: var(--red-deep); }
        .hero-marquee::before, .hero-marquee::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--ink-deep);
          opacity: 0.45;
          max-width: 90px;
        }

        .hero-est {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--red-deep);
          margin-bottom: 0.4rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.2s forwards;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(3.6rem, 13vw, 9rem);
          line-height: 0.92;
          color: var(--ink-deep);
          letter-spacing: -0.005em;
          opacity: 0;
          animation: fadeUp 1s var(--ease-out-expo) 0.4s forwards;
        }
        .hero-name em {
          font-style: italic;
          color: var(--red-deep);
          display: block;
          margin-top: 0.1em;
        }

        .hero-rule {
          width: 320px;
          max-width: 60%;
          height: 6px;
          margin: 1.5rem auto 1.1rem;
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.6s forwards;
        }

        .hero-script {
          font-family: var(--font-script);
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          color: var(--red-deep);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.7s forwards;
        }

        .hero-tag {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mid);
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.8s forwards;
        }
        .hero-tag .dot { color: var(--red-deep); margin: 0 0.5rem; }

        .hero-line {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--ink-mid);
          max-width: 46ch;
          margin: 0 auto 2.4rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.9s forwards;
        }

        .hero-actions {
          display: inline-flex;
          gap: 0.9rem;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 1s forwards;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 0.85rem 1.6rem;
          text-decoration: none;
          border: 1px solid var(--ink-deep);
          transition: background var(--t-fast), color var(--t-fast);
        }
        .hero-btn.primary {
          background: var(--red-deep);
          color: var(--paper-bright);
          border-color: var(--red-deep);
        }
        .hero-btn.primary:hover {
          background: var(--red-blood);
          border-color: var(--red-blood);
        }
        .hero-btn.ghost {
          background: transparent;
          color: var(--ink-deep);
        }
        .hero-btn.ghost:hover {
          background: var(--ink-deep);
          color: var(--paper-bright);
        }

        /* ─────────────────────────────────────────────
           PHOTO PLATE — single duotone hero photograph
           with keyline, plate caption underneath
        ───────────────────────────────────────────── */
        .plate-section {
          padding: 1rem clamp(1.25rem, 5vw, 2.5rem) 4rem;
          max-width: 1180px;
          margin: 0 auto;
        }

        .plate-frame {
          background: var(--paper-bright);
          padding: 12px;
          border: 1px solid var(--ink-deep);
          box-shadow: 0 8px 28px rgba(40, 22, 8, 0.18);
        }

        .plate-photo {
          width: 100%;
          aspect-ratio: 16 / 7;
          object-fit: cover;
          object-position: center 40%;
          filter: sepia(0.55) saturate(0.95) contrast(1.06) brightness(0.94);
          display: block;
        }

        .plate-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 0.8rem 0.6rem 0.2rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .plate-caption .title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-style: italic;
          letter-spacing: 0;
          text-transform: none;
          color: var(--ink-deep);
        }

        /* ─────────────────────────────────────────────
           ABOUT — editorial drop cap + side panel
        ───────────────────────────────────────────── */
        .about {
          padding: 4rem clamp(1.25rem, 5vw, 2.5rem) 5rem;
          background: var(--paper-base);
        }

        .about-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 3.5rem;
          align-items: start;
        }
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        .about-prose {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--ink-mid);
          line-height: 1.78;
        }
        .about-prose p { margin-bottom: 1.2rem; max-width: 58ch; }
        .about-prose p:first-of-type::first-letter {
          font-family: var(--font-display);
          font-size: 4.2em;
          line-height: 0.78;
          float: left;
          margin: 0.06em 0.16em 0 0;
          color: var(--red-deep);
        }

        .stats-card {
          background: var(--paper-warm);
          border: 1px solid var(--ink-deep);
          padding: 1.6rem 1.6rem 1.4rem;
          position: relative;
        }
        .stats-card::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid var(--ink-deep);
          opacity: 0.35;
          pointer-events: none;
        }
        .stats-card-head {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red-deep);
          text-align: center;
          margin-bottom: 1.2rem;
          padding-bottom: 1rem;
          border-bottom: 1px dashed var(--rule-strong);
        }
        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .stat-cell {
          text-align: center;
          padding: 0.5rem 0;
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--ink-deep);
          line-height: 1;
        }
        .stat-num em { font-style: italic; color: var(--red-deep); }
        .stat-lbl {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 6px;
        }
        .stats-foot {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--rule-strong);
          text-align: center;
          font-family: var(--font-script);
          font-size: 1.4rem;
          color: var(--red-deep);
          line-height: 1.1;
        }

        /* ─────────────────────────────────────────────
           NOTICE — the happy hour as a nailed-up notice
        ───────────────────────────────────────────── */
        .notice-section {
          padding: 3rem clamp(1.25rem, 5vw, 2.5rem) 4rem;
        }

        .notice {
          max-width: 760px;
          margin: 0 auto;
          background: var(--paper-bright);
          padding: 2.5rem 2rem 2.2rem;
          border: 1px solid var(--ink-deep);
          box-shadow: 0 0 0 5px var(--paper-base), 0 0 0 6px var(--ink-deep);
          position: relative;
          text-align: center;
        }
        .notice::before {
          content: '';
          position: absolute;
          top: 14px; left: 14px; right: 14px; bottom: 14px;
          border: 1px solid var(--ink-deep);
          opacity: 0.40;
          pointer-events: none;
        }
        .notice .heading {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--red-deep);
          margin-bottom: 0.6rem;
        }
        .notice h2 {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6vw, 4.4rem);
          color: var(--ink-deep);
          line-height: 1;
        }
        .notice h2 em { font-style: italic; color: var(--red-deep); }
        .notice .when {
          font-family: var(--font-script);
          font-size: 1.6rem;
          color: var(--red-deep);
          margin: 1rem 0 1.5rem;
        }
        .deals {
          display: flex;
          justify-content: center;
          gap: 0;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-deep);
          flex-wrap: wrap;
        }
        .deal {
          padding: 0.6rem 1.4rem;
          border-right: 1px solid var(--rule-strong);
        }
        .deal:last-child { border-right: none; }
        .deal .price {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--red-deep);
          letter-spacing: 0;
          line-height: 1;
          display: block;
          margin-bottom: 0.2rem;
        }
        .notice .foot {
          margin-top: 1.6rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--rule-strong);
          font-family: var(--font-body);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--ink-soft);
        }

        /* ─────────────────────────────────────────────
           HOUSE RULES — numbered roman
        ───────────────────────────────────────────── */
        .rules {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
          max-width: 1100px;
          margin: 0 auto;
        }
        .rules-head {
          text-align: center;
          margin-bottom: 3rem;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border-top: 1px solid var(--ink-deep);
          border-left: 1px solid var(--ink-deep);
        }
        @media (max-width: 700px) {
          .rules-grid { grid-template-columns: 1fr; }
        }

        .rule {
          padding: 2rem 1.8rem;
          border-right: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          background: var(--paper-warm);
          position: relative;
          transition: background var(--t-mid);
        }
        .rule:hover { background: var(--paper-bright); }

        .rule-roman {
          font-family: var(--font-display);
          font-size: 2.4rem;
          font-style: italic;
          color: var(--red-deep);
          line-height: 0.9;
          margin-bottom: 0.6rem;
        }
        .rule-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: var(--ink-deep);
          margin-bottom: 0.5rem;
        }
        .rule-body {
          font-family: var(--font-body);
          font-size: 0.98rem;
          color: var(--ink-soft);
          line-height: 1.65;
        }

        /* ─────────────────────────────────────────────
           POURS — ledger / menu list
        ───────────────────────────────────────────── */
        .pours {
          background: var(--paper-warm);
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
        }
        .pours-inner { max-width: 920px; margin: 0 auto; }
        .pours-head { text-align: center; margin-bottom: 2.5rem; }

        .ledger {
          display: flex;
          flex-direction: column;
        }
        .ledger-row {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 2rem;
          align-items: baseline;
          padding: 1.4rem 0;
          border-top: 1px dashed var(--rule-strong);
        }
        .ledger-row:last-child { border-bottom: 1px dashed var(--rule-strong); }
        @media (max-width: 600px) {
          .ledger-row { grid-template-columns: 1fr; gap: 0.4rem; }
        }

        .ledger-kind {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red-deep);
        }
        .ledger-body { display: flex; flex-direction: column; gap: 0.25rem; }
        .ledger-head {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--ink-deep);
          font-style: italic;
        }
        .ledger-text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ink-mid);
          line-height: 1.65;
        }

        .pours-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2.5rem;
        }

        /* ─────────────────────────────────────────────
           PRESS — pull quotes
        ───────────────────────────────────────────── */
        .press {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
          max-width: 1100px;
          margin: 0 auto;
        }
        .press-head { text-align: center; margin-bottom: 3rem; }

        .press-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem 4rem;
        }
        @media (max-width: 700px) {
          .press-grid { grid-template-columns: 1fr; gap: 2.2rem; }
        }

        .press-quote {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--ink-deep);
          line-height: 1.3;
          letter-spacing: -0.005em;
          position: relative;
          padding-left: 1.6rem;
          border-left: 2px solid var(--red-deep);
        }
        .press-quote::before {
          content: '"';
          position: absolute;
          left: -0.3rem;
          top: -1.5rem;
          font-family: var(--font-display);
          font-size: 4rem;
          color: var(--red-deep);
          line-height: 1;
        }
        .press-cite {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 0.9rem;
          padding-left: 1.6rem;
        }

        /* ─────────────────────────────────────────────
           VISIT — printed business card
        ───────────────────────────────────────────── */
        .visit {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem) 6rem;
          background: var(--paper-base);
        }
        .visit-head { text-align: center; margin-bottom: 3rem; max-width: 720px; margin-left: auto; margin-right: auto; }

        .visit-card {
          max-width: 760px;
          margin: 0 auto;
          background: var(--paper-bright);
          border: 1px solid var(--ink-deep);
          padding: 2.4rem;
          position: relative;
          box-shadow: 0 10px 32px rgba(40, 22, 8, 0.16);
        }
        .visit-card::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid var(--ink-deep);
          opacity: 0.35;
          pointer-events: none;
        }

        .visit-card-top {
          text-align: center;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px dashed var(--rule-strong);
        }
        .visit-card-top .stars { display: block; margin-bottom: 0.6rem; }
        .visit-card-top .name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 2.8rem);
          line-height: 1;
          color: var(--ink-deep);
        }
        .visit-card-top .name em {
          font-style: italic;
          color: var(--red-deep);
        }
        .visit-card-top .sub {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 0.6rem;
        }

        .visit-rows {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 3rem;
        }
        @media (max-width: 600px) { .visit-rows { grid-template-columns: 1fr; gap: 1.5rem; } }

        .visit-row .lbl {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red-deep);
          margin-bottom: 0.35rem;
        }
        .visit-row .val {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ink-deep);
          line-height: 1.55;
          white-space: pre-line;
        }
        .visit-row .val a {
          color: var(--ink-deep);
          border-bottom: 1px solid var(--rule-strong);
          text-decoration: none;
        }
        .visit-row .val a:hover {
          color: var(--red-deep);
          border-color: var(--red-deep);
        }

        .visit-foot {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px dashed var(--rule-strong);
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      `}</style>

      {/* ════════════════ HERO ════════════════ */}
      <section className="hero">
        <div className="hero-poster">
          <div className="hero-marquee">
            <span className="star">★</span>
            <span>Park Slope, Brooklyn — 5th &amp; 12th</span>
            <span className="star">★</span>
          </div>

          <div className="hero-est">Est. — A Pretty Decent Bar</div>

          <h1 className="hero-name">
            Commonwealth
            <em>Bar</em>
          </h1>

          <div className="hero-rule" />

          <div className="hero-script">~ open till four ~</div>

          <div className="hero-tag">
            Bourbon <span className="dot">·</span> Beer
            <span className="dot">·</span> Pinball
            <span className="dot">·</span> Pies
          </div>

          <p className="hero-line">
            Twenty-something drafts, the best jukebox in NYC,
            and a backyard for the warm months. We open at three.
          </p>

          <div className="hero-actions">
            <Link href="/pages/contact" className="hero-btn primary">Find Us →</Link>
            <Link href="/pages/booze" className="hero-btn ghost">What we pour</Link>
          </div>
        </div>
      </section>

      {/* ════════════════ PHOTO PLATE ════════════════ */}
      <section className="plate-section">
        <div className="plate-frame">
          <img className="plate-photo" src={HERO_IMG} alt="Inside Commonwealth Bar" />
          <div className="plate-caption">
            <span className="title">Inside the bar, on a Tuesday.</span>
            <span>Plate I &nbsp;·&nbsp; 497 5th Ave</span>
          </div>
        </div>
      </section>

      <div className="ornate" style={{ maxWidth: 920, margin: "1rem auto 0", padding: "0 1.5rem" }}>★</div>

      {/* ════════════════ ABOUT ════════════════ */}
      <section id="about" ref={reg("about")} className="about">
        <div className="about-grid">
          <div className={`fade-in ${vis("about") ? "on" : ""}`}>
            <span className="section-eyebrow"><b>§ I</b> &nbsp;— &nbsp; The Story</span>
            <h2 className="section-title">
              Brooklyn's <em>living room</em>,<br />
              for the late shift.
            </h2>
            <div className="about-prose" style={{ marginTop: "1.6rem" }}>
              <p>
                We opened on the corner of 5th and 12th because we
                wanted somewhere to drink a bourbon and hear a
                Wire record without a $19 cocktail menu in our
                faces. That was the entire pitch. It still is.
              </p>
              <p>
                What we built — almost by accident — is a bar that
                knows your face by the second visit and your drink
                by the third. The jukebox is real. The popcorn is
                free. The bourbon list runs deep, with a Kentucky
                lean that's slightly embarrassing on paper and
                entirely the point in practice.
              </p>
            </div>
          </div>

          <aside className={`fade-in d2 ${vis("about") ? "on" : ""}`}>
            <div className="stats-card">
              <div className="stats-card-head">★ &nbsp; House Numbers &nbsp; ★</div>
              <div className="stats-row">
                <div className="stat-cell">
                  <div className="stat-num">4 <em>AM</em></div>
                  <div className="stat-lbl">Last Call</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">20<em>+</em></div>
                  <div className="stat-lbl">Beers on Tap</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">№<em>1</em></div>
                  <div className="stat-lbl">Jukebox in NYC</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">2 <em>PM</em></div>
                  <div className="stat-lbl">Weekends Open</div>
                </div>
              </div>
              <div className="stats-foot">free popcorn, always</div>
            </div>
          </aside>
        </div>
      </section>

      {/* ════════════════ HAPPY HOUR NOTICE ════════════════ */}
      <section className="notice-section">
        <div className="notice">
          <div className="heading">★ Posted Notice ★</div>
          <h2>Happy <em>Hour</em></h2>
          <div className="when">~ every day, all year ~</div>

          <div className="deals">
            <div className="deal">
              <span className="price">$5</span>
              Drafts
            </div>
            <div className="deal">
              <span className="price">$4</span>
              Wells
            </div>
            <div className="deal">
              <span className="price">−$1</span>
              Off Anything
            </div>
          </div>

          <div className="foot">
            Mon – Fri &nbsp;·&nbsp; 3 to 7 &nbsp;·&nbsp; Weekends 2 to 7
          </div>
        </div>
      </section>

      {/* ════════════════ HOUSE RULES ════════════════ */}
      <section id="rules" ref={reg("rules")} className="rules">
        <div className={`rules-head fade-in ${vis("rules") ? "on" : ""}`}>
          <span className="section-eyebrow"><b>§ II</b> &nbsp;— &nbsp; The House Rules</span>
          <h2 className="section-title">Four things we <em>actually</em> mean.</h2>
        </div>

        <div className="rules-grid">
          {houseRules.map((r, i) => (
            <div
              key={r.n}
              className={`rule fade-in d${(i % 4) + 1} ${vis("rules") ? "on" : ""}`}
            >
              <div className="rule-roman">{r.n}.</div>
              <div className="rule-title">{r.t}</div>
              <p className="rule-body">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ POURS ════════════════ */}
      <section id="pours" ref={reg("pours")} className="pours">
        <div className="pours-inner">
          <div className={`pours-head fade-in ${vis("pours") ? "on" : ""}`}>
            <span className="section-eyebrow"><b>§ III</b> &nbsp;— &nbsp; The Pours</span>
            <h2 className="section-title">Eat well. Drink <em>better.</em></h2>
            <p className="section-deck" style={{ margin: "1.2rem auto 0" }}>
              A small ledger of what's on. The full menu lives a click away —
              and so does the bartender, if you have questions.
            </p>
          </div>

          <div className="ledger">
            {pours.map((p, i) => (
              <div
                key={p.kind}
                className={`ledger-row fade-in d${(i % 4) + 1} ${vis("pours") ? "on" : ""}`}
              >
                <div className="ledger-kind">{p.kind}</div>
                <div className="ledger-body">
                  <div className="ledger-head">{p.head}</div>
                  <div className="ledger-text">{p.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pours-actions">
            <Link href="/pages/booze" className="hero-btn primary">The Booze</Link>
            <Link href="/pages/food" className="hero-btn ghost">The Food</Link>
          </div>
        </div>
      </section>

      {/* ════════════════ PRESS / WORD OF MOUTH ════════════════ */}
      <section id="press" ref={reg("press")} className="press">
        <div className={`press-head fade-in ${vis("press") ? "on" : ""}`}>
          <span className="section-eyebrow"><b>§ IV</b> &nbsp;— &nbsp; Word on the Block</span>
          <h2 className="section-title">Don't take our <em>word for it.</em></h2>
        </div>

        <div className="press-grid">
          {press.map((q, i) => (
            <div key={q.cite} className={`fade-in d${(i % 4) + 1} ${vis("press") ? "on" : ""}`}>
              <p className="press-quote">{q.quote}</p>
              <div className="press-cite">— {q.cite}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ VISIT — business card ════════════════ */}
      <section id="visit" ref={reg("visit")} className="visit">
        <div className={`visit-head fade-in ${vis("visit") ? "on" : ""}`}>
          <span className="section-eyebrow"><b>§ V</b> &nbsp;— &nbsp; Find the Door</span>
          <h2 className="section-title">We'll leave the <em>light on.</em></h2>
        </div>

        <div className={`visit-card fade-in d2 ${vis("visit") ? "on" : ""}`}>
          <div className="visit-card-top">
            <div className="stars">★ ★ ★</div>
            <div className="name">Commonwealth <em>Bar</em></div>
            <div className="sub">Park Slope, Brooklyn — Est. 5th &amp; 12th</div>
          </div>

          <div className="visit-rows">
            <div className="visit-row">
              <div className="lbl">Address</div>
              <div className="val">
                497 5th Avenue{"\n"}
                Park Slope, Brooklyn, NY 11215
              </div>
            </div>
            <div className="visit-row">
              <div className="lbl">Hours</div>
              <div className="val">
                Mon – Fri: 3 PM – 4 AM{"\n"}
                Sat – Sun: 2 PM – 4 AM
              </div>
            </div>
            <div className="visit-row">
              <div className="lbl">Telephone</div>
              <div className="val">
                <a href="tel:7187680009">(718) 768-0009</a>
              </div>
            </div>
            <div className="visit-row">
              <div className="lbl">Correspondence</div>
              <div className="val">
                <a href="mailto:commonwealthliveson@gmail.com">commonwealthliveson@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="visit-foot">
            <a
              className="hero-btn primary"
              href="https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215"
              target="_blank" rel="noreferrer"
            >
              Open in Maps →
            </a>
            <Link href="/pages/contact" className="hero-btn ghost">Full Visit Page</Link>
          </div>
        </div>
      </section>
    </>
  )
}
