"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const HERO_IMG = "https://commonwealthbar.com/wp-content/uploads/2011/02/commonwealthbanner.jpg"

const tenets = [
  { n: "I",   label: "The regulars",  body: "We've been here long enough to know your drink, but not so long we'll bore you with the story behind it. Probably." },
  { n: "II",  label: "The pour",      body: "Twenty-plus drafts, a serious bourbon program, and a Kentucky lean we don't apologize for. Wells we'd actually drink." },
  { n: "III", label: "The jukebox",   body: "Curated by hand. Wire, Dinosaur Jr., the Dead Boys, and a few hundred records you didn't know you missed." },
  { n: "IV",  label: "The patio",     body: "A real backyard with park benches, string lights, and enough sky to forget you're in Brooklyn for a minute." },
]

const milestones = [
  { tag: "Then",        body: "Opened on the corner of 5th & 12th in Park Slope. The bar had a different name; the spirit was the same." },
  { tag: "Soon after",  body: "Ray took over the jukebox. NYC magazines started calling it one of the best in the city. It still is." },
  { tag: "Now",         body: "Open every night until 4 a.m. Free popcorn. A patio. A pinball machine. Same bartenders you saw last week." },
]

export default function AboutPage() {
  const [seen, setSeen] = useState<Set<string>>(new Set())
  const refs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setSeen((p) => new Set([...p, e.target.id]))
      }),
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

        /* ── HERO ── */
        .ab-hero {
          padding: calc(64px + 3.5rem) 1.5rem 3.5rem;
          background: var(--paper-base);
          text-align: center;
        }
        .ab-hero-stars {
          display: inline-flex;
          gap: 0.4rem;
          color: var(--red-deep);
          letter-spacing: 0.45em;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeUp 0.7s var(--ease-out-expo) 0.1s forwards;
        }
        .ab-hero-est {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--red-deep);
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.2s forwards;
        }
        .ab-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(3rem, 9vw, 7rem);
          line-height: 0.95;
          color: var(--ink-deep);
          opacity: 0;
          animation: fadeUp 1s var(--ease-out-expo) 0.4s forwards;
        }
        .ab-hero h1 em {
          font-style: italic;
          color: var(--red-deep);
        }
        .ab-hero-rule {
          width: 280px;
          max-width: 60%;
          height: 6px;
          margin: 1.4rem auto 1rem;
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.6s forwards;
        }
        .ab-hero-script {
          font-family: var(--font-script);
          font-size: 1.5rem;
          color: var(--red-deep);
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.7s forwards;
        }
        .ab-hero-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 1rem;
          opacity: 0;
          animation: fadeUp 0.8s var(--ease-out-expo) 0.85s forwards;
        }
        .ab-hero-tag .dot { color: var(--red-deep); margin: 0 0.5rem; }

        /* ── PHOTO PLATE ── */
        .ab-plate-wrap {
          padding: 1rem clamp(1.25rem, 5vw, 2.5rem) 0;
          max-width: 1100px;
          margin: 0 auto;
        }
        .ab-plate {
          background: var(--paper-bright);
          padding: 12px;
          border: 1px solid var(--ink-deep);
          box-shadow: 0 8px 28px rgba(40, 22, 8, 0.16);
        }
        .ab-plate img {
          width: 100%;
          aspect-ratio: 16 / 7;
          object-fit: cover;
          object-position: 55% 35%;
          filter: sepia(0.55) saturate(0.95) contrast(1.06) brightness(0.94);
        }
        .ab-plate-cap {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.8rem 0.6rem 0.2rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .ab-plate-cap .t {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-style: italic;
          letter-spacing: 0;
          text-transform: none;
          color: var(--ink-deep);
        }

        /* ── STORY ── */
        .ab-story {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
          max-width: 1100px;
          margin: 0 auto;
        }
        .ab-story-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.85fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 800px) {
          .ab-story-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        .ab-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .ab-eyebrow b { color: var(--red-deep); font-weight: 400; }

        .ab-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.8vw, 3.6rem);
          line-height: 1.05;
          color: var(--ink-deep);
          margin-top: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .ab-title em {
          font-style: italic;
          color: var(--red-deep);
        }

        .ab-prose {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--ink-mid);
          line-height: 1.78;
        }
        .ab-prose p { margin-bottom: 1.2rem; max-width: 60ch; }
        .ab-prose p:first-of-type::first-letter {
          font-family: var(--font-display);
          font-size: 4.2em;
          line-height: 0.78;
          float: left;
          margin: 0.06em 0.16em 0 0;
          color: var(--red-deep);
        }

        .ab-pull {
          margin-top: 2rem;
          padding: 1.5rem 1.6rem;
          border: 1px solid var(--ink-deep);
          background: var(--paper-warm);
          position: relative;
        }
        .ab-pull::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid var(--ink-deep);
          opacity: 0.35;
          pointer-events: none;
        }
        .ab-pull-quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--ink-deep);
          line-height: 1.5;
        }
        .ab-pull-cite {
          margin-top: 0.8rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        /* ── TENETS / NUMBERED ── */
        .ab-tenets {
          background: var(--paper-warm);
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
        }
        .ab-tenets-inner { max-width: 1100px; margin: 0 auto; }
        .ab-tenets-head { text-align: center; margin-bottom: 3rem; }

        .ab-tenets-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--ink-deep);
          border-left: 1px solid var(--ink-deep);
        }
        @media (max-width: 700px) { .ab-tenets-grid { grid-template-columns: 1fr; } }

        .tenet {
          padding: 2rem 1.8rem;
          border-right: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          background: var(--paper-bright);
          transition: background var(--t-mid);
        }
        .tenet:hover { background: var(--paper-base); }
        .tenet-roman {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-style: italic;
          color: var(--red-deep);
          line-height: 0.9;
          margin-bottom: 0.6rem;
        }
        .tenet-label {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--ink-deep);
          margin-bottom: 0.5rem;
        }
        .tenet-body {
          font-family: var(--font-body);
          font-size: 0.98rem;
          color: var(--ink-soft);
          line-height: 1.65;
        }

        /* ── RAY ── */
        .ab-ray {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }
        .ab-ray-stars {
          color: var(--red-deep);
          letter-spacing: 0.45em;
          font-size: 0.85rem;
        }
        .ab-ray h2 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          color: var(--ink-deep);
          line-height: 1;
          margin-top: 0.5rem;
        }
        .ab-ray h2 em { font-style: italic; color: var(--red-deep); }
        .ab-ray-role {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin: 0.8rem 0 1.6rem;
        }
        .ab-ray-quote {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--ink-deep);
          line-height: 1.45;
          max-width: 38ch;
          margin: 0 auto 1.2rem;
        }
        .ab-ray-quote::before {
          content: '"';
          color: var(--red-deep);
          margin-right: 0.15rem;
        }
        .ab-ray-cite {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        /* ── TIMELINE ── */
        .ab-time {
          background: var(--paper-warm);
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem);
        }
        .ab-time-inner { max-width: 880px; margin: 0 auto; }
        .ab-time-head { text-align: center; margin-bottom: 3rem; }

        .tl {
          display: flex;
          flex-direction: column;
        }
        .tl-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 2rem;
          align-items: baseline;
          padding: 1.4rem 0;
          border-top: 1px dashed var(--rule-strong);
        }
        .tl-row:last-child { border-bottom: 1px dashed var(--rule-strong); }
        @media (max-width: 600px) {
          .tl-row { grid-template-columns: 1fr; gap: 0.4rem; }
        }
        .tl-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red-deep);
        }
        .tl-body {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--ink-mid);
          line-height: 1.7;
          max-width: 56ch;
        }

        /* ── CTA ── */
        .ab-cta {
          padding: 5rem clamp(1.25rem, 5vw, 2.5rem) 6rem;
          text-align: center;
        }
        .ab-cta h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          color: var(--ink-deep);
          line-height: 1.05;
        }
        .ab-cta h2 em { font-style: italic; color: var(--red-deep); }
        .ab-cta p {
          font-family: var(--font-body);
          color: var(--ink-soft);
          margin: 1rem auto 2rem;
          max-width: 50ch;
        }
        .ab-cta-row {
          display: inline-flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pbtn {
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
        .pbtn.primary {
          background: var(--red-deep);
          color: var(--paper-bright);
          border-color: var(--red-deep);
        }
        .pbtn.primary:hover {
          background: var(--red-blood);
          border-color: var(--red-blood);
        }
        .pbtn.ghost {
          background: transparent;
          color: var(--ink-deep);
        }
        .pbtn.ghost:hover {
          background: var(--ink-deep);
          color: var(--paper-bright);
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="ab-hero">
        <div className="ab-hero-stars">★ ★ ★</div>
        <div className="ab-hero-est">About — Commonwealth Bar</div>
        <h1>
          A bar in the<br /><em>old sense</em> of the word.
        </h1>
        <div className="ab-hero-rule" />
        <div className="ab-hero-script">~ Park Slope's living room ~</div>
        <div className="ab-hero-tag">
          Open Late <span className="dot">·</span> Lit Warm <span className="dot">·</span> Poured Honest
        </div>
      </section>

      {/* ─── PHOTO PLATE ─── */}
      <div className="ab-plate-wrap">
        <div className="ab-plate">
          <img src={HERO_IMG} alt="Commonwealth Bar interior" />
          <div className="ab-plate-cap">
            <span className="t">Inside the bar, late.</span>
            <span>Plate I &nbsp;·&nbsp; 5th &amp; 12th</span>
          </div>
        </div>
      </div>

      {/* ─── STORY ─── */}
      <section id="story" ref={reg("story")} className="ab-story">
        <div className="ab-story-grid">
          <div className={`fade-in ${vis("story") ? "on" : ""}`}>
            <span className="ab-eyebrow"><b>§ I</b> &nbsp;— &nbsp; The story, briefly</span>
            <h2 className="ab-title">
              We didn't <em>plan</em> on a neighborhood bar.<br />
              We just kept showing up.
            </h2>
            <div className="ab-prose">
              <p>
                Commonwealth opened on the corner of 5th &amp; 12th
                because we wanted somewhere to drink a bourbon and
                hear a Wire record without a $19 cocktail menu in
                our faces. That was the entire pitch. It still is.
              </p>
              <p>
                What we built — almost by accident — is what every
                block used to have: a bar that knows your face by
                the second visit and your drink by the third. The
                jukebox is real. The popcorn is free. The bourbon
                list runs deep, with a Kentucky lean that's slightly
                embarrassing on paper and entirely the point in
                practice.
              </p>
              <p>
                We open at three on weekdays, two on weekends, and
                we lock up at four every night of the year. The
                patio is open whenever the weather lets us get away
                with it. The pinball machines never take a quarter.
              </p>
              <p>That's it. That's the bar.</p>
            </div>
          </div>

          <aside className={`fade-in d2 ${vis("story") ? "on" : ""}`}>
            <div className="ab-pull">
              <div className="ab-pull-quote">
                "Our regulars don't suck. The jukebox is unbeatable.
                Bourbon is good for you."
              </div>
              <div className="ab-pull-cite">— House rules, more or less</div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── TENETS ─── */}
      <section id="tenets" ref={reg("tenets")} className="ab-tenets">
        <div className="ab-tenets-inner">
          <div className={`ab-tenets-head fade-in ${vis("tenets") ? "on" : ""}`}>
            <span className="ab-eyebrow"><b>§ II</b> &nbsp;— &nbsp; What you'll find inside</span>
            <h2 className="ab-title" style={{ marginTop: "0.6rem", marginBottom: 0 }}>
              Four things we <em>actually</em> care about.
            </h2>
          </div>

          <div className="ab-tenets-grid">
            {tenets.map((t, i) => (
              <div
                key={t.n}
                className={`tenet fade-in d${(i % 4) + 1} ${vis("tenets") ? "on" : ""}`}
              >
                <div className="tenet-roman">{t.n}.</div>
                <div className="tenet-label">{t.label}</div>
                <p className="tenet-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RAY ─── */}
      <section id="ray" ref={reg("ray")} className="ab-ray">
        <div className={`fade-in ${vis("ray") ? "on" : ""}`}>
          <div className="ab-ray-stars">★ ★ ★</div>
          <h2>Meet <em>Ray</em></h2>
          <div className="ab-ray-role">Jukebox curator · resident bartender</div>
          <p className="ab-ray-quote">
            The records on the jukebox are the records I want to
            hear when I'm at work. If you don't like them, the
            good news is we close eventually.
          </p>
          <div className="ab-ray-cite">— Ray, behind the bar</div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section id="time" ref={reg("time")} className="ab-time">
        <div className="ab-time-inner">
          <div className={`ab-time-head fade-in ${vis("time") ? "on" : ""}`}>
            <span className="ab-eyebrow"><b>§ III</b> &nbsp;— &nbsp; Then &amp; now</span>
            <h2 className="ab-title" style={{ marginBottom: 0 }}>
              A little <em>history.</em>
            </h2>
          </div>

          <div className="tl">
            {milestones.map((m, i) => (
              <div
                key={m.tag}
                className={`tl-row fade-in d${(i % 3) + 1} ${vis("time") ? "on" : ""}`}
              >
                <div className="tl-tag">{m.tag}</div>
                <div className="tl-body">{m.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="ab-cta">
        <h2>Pull up a <em>stool.</em></h2>
        <p>
          Open every night until 4 a.m. Free popcorn, twenty-something drafts,
          a backyard, and the best jukebox in NYC waiting on you.
        </p>
        <div className="ab-cta-row">
          <Link href="/pages/contact" className="pbtn primary">Find Us →</Link>
          <Link href="/pages/booze" className="pbtn ghost">What we pour</Link>
        </div>
      </section>
    </>
  )
}
