"use client"

import { useEffect, useRef, useState } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const weekdayHours = [
  { day: "Monday",    open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Tuesday",   open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Wednesday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Thursday",  open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Friday",    open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Saturday",  open: "2:00 PM", close: "4:00 AM", isWeekend: true },
  { day: "Sunday",    open: "2:00 PM", close: "4:00 AM", isWeekend: true },
]

const patioHours = [
  { days: "Mon – Thu", close: "11:00 PM" },
  { days: "Fri – Sat", close: "Midnight" },
  { days: "Sunday",    close: "11:00 PM" },
]

const contactItems = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: "Address", value: "497 Fifth Avenue (at 12th St.)", sub: "Park Slope, Brooklyn NY 11215",
    href: "https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215", cta: "Get Directions",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    label: "Phone", value: "(718) 768-0009", href: "tel:7187680009", cta: "Call Us",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    label: "Email", value: "commonwealthliveson@gmail.com", href: "mailto:commonwealthliveson@gmail.com", cta: "Send Email",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    label: "Twitter / X", value: "@commonwealthbar", href: "https://twitter.com/commonwealthbar", cta: "Follow Us",
  },
]

function LiveClock() {
  const [time, setTime] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const tick = () => {
      const nyTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
      const h = nyTime.getHours(), m = nyTime.getMinutes().toString().padStart(2, "0")
      setTime(`${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`)
      const day = nyTime.getDay(), isWeekend = day === 0 || day === 6
      const openHour = isWeekend ? 14 : 15
      const adj = h < 4 ? h + 24 : h
      setIsOpen(adj >= openHour && adj < 28)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="live-clock-wrap">
      <div className="live-clock-time">{time || "—"}</div>
      <div className={`live-clock-status ${isOpen ? "open" : "closed"}`}>
        <span className="status-dot" />
        {isOpen ? "Open Now" : "Currently Closed"}
        <span className="status-tz">NYC Time</span>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id])) }) },
      { threshold: 0.1 }
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => { if (el) sectionRefs.current.set(id, el) }
  const vis = (id: string) => visibleSections.has(id)
  const today = new Date().toLocaleString("en-US", { timeZone: "America/New_York", weekday: "long" })

  return (
    <>
      <style>{`
        ${pageStyles}

        /* ── LIVE CLOCK ── */
        .live-clock-wrap { opacity: 0; transform: translateY(12px); animation: fadeUp 0.9s var(--ease-out-expo) 0.7s forwards; text-align: right; flex-shrink: 0; }
        .live-clock-time { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 700; color: var(--amber-bright); line-height: 1; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        .live-clock-status { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; padding: 0.4rem 0.9rem; border-radius: 100px; border: 1px solid; }
        .live-clock-status.open   { color: rgba(100,230,140,0.85); border-color: rgba(100,230,140,0.2); background: rgba(100,230,140,0.06); }
        .live-clock-status.closed { color: var(--purple-bright); border-color: var(--border-soft); background: var(--purple-dim); }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .live-clock-status.open .status-dot { background: rgba(100,230,140,0.9); box-shadow: 0 0 6px rgba(100,230,140,0.6); animation: pulseDot 2s ease-in-out infinite; }
        .live-clock-status.closed .status-dot { background: var(--purple-mid); }
        .status-tz { font-size: 8px; letter-spacing: 0.15em; opacity: 0.5; margin-left: 2px; }

        /* ── HERO LAYOUT ── */
        .hero-contact-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: flex; justify-content: space-between; align-items: flex-end; gap: 3rem; flex-wrap: wrap;
        }

        /* ── HOURS ── */
        .hours-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem; align-items: start; margin-top: 3rem; }
        @media (max-width: 750px) { .hours-layout { grid-template-columns: 1fr; } }

        .hours-table { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 14px; overflow: hidden; }
        .hours-row { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.5rem; border-bottom: 1px solid rgba(120,70,220,0.06); transition: background var(--t-fast); gap: 1rem; }
        .hours-row:last-child { border-bottom: none; }
        .hours-row:hover { background: rgba(120,60,220,0.05); }
        .hours-row.today { background: var(--amber-ember); border-left: 2px solid var(--border-warm); }
        .hours-day { font-size: 13px; font-weight: 500; color: var(--text-secondary); min-width: 100px; }
        .hours-row.today .hours-day { color: var(--amber-bright); font-weight: 600; }
        .hours-today-badge { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber-mid); border: 1px solid var(--border-warm); border-radius: 100px; padding: 2px 8px; font-weight: 600; }
        .hours-time { font-family: var(--font-display); font-size: 0.95rem; color: var(--text-muted); text-align: right; }
        .hours-row.today .hours-time { color: var(--amber-bright); }
        .hours-section-label { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--purple-mid); font-weight: 600; padding: 0.5rem 1.5rem; background: var(--purple-dim); border-bottom: 1px solid var(--border-subtle); }

        .hours-side { display: flex; flex-direction: column; gap: 1.25rem; }
        .side-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 1.75rem; transition: border-color var(--t-mid); }
        .side-card:hover { border-color: var(--border-soft); }
        .side-card-eyebrow { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-bottom: 6px; font-family: var(--font-body); }
        .side-card-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
        .side-card-body { font-size: 13px; color: var(--text-muted); line-height: 1.7; font-weight: 300; }

        .hh-deals { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
        .hh-deal-chip { display: flex; flex-direction: column; background: var(--amber-ember); border: 1px solid var(--border-warm); border-radius: 10px; padding: 0.75rem 1rem; flex: 1; min-width: 80px; }
        .hh-deal-price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--amber-pure); line-height: 1; }
        .hh-deal-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-top: 4px; font-weight: 500; }

        .patio-rows { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.75rem; }
        .patio-row { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; padding: 0.4rem 0; border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); }
        .patio-row:last-child { border-bottom: none; }
        .patio-close { font-family: var(--font-display); color: var(--text-secondary); font-size: 0.9rem; }

        /* ── CONTACT CARDS ── */
        .contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-top: 3rem; }
        @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }
        .contact-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 14px;
          padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem;
          transition: all var(--t-mid) var(--ease-out-expo);
          text-decoration: none; color: inherit; position: relative; overflow: hidden;
        }
        .contact-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 150px; height: 150px; background: radial-gradient(circle, var(--purple-dim) 0%, transparent 70%); pointer-events: none; opacity: 0; transition: opacity var(--t-slow); }
        .contact-card:hover { border-color: var(--border-soft); transform: translateY(-3px); box-shadow: var(--glow-purple); }
        .contact-card:hover::before { opacity: 1; }
        .contact-icon-wrap { width: 44px; height: 44px; border-radius: 10px; background: var(--purple-dim); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--purple-bright); transition: all var(--t-mid); flex-shrink: 0; }
        .contact-card:hover .contact-icon-wrap { background: var(--purple-soft); color: var(--text-primary); }
        .contact-label { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; font-family: var(--font-body); }
        .contact-value { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
        .contact-sub { font-size: 12px; color: var(--text-muted); font-weight: 300; }
        .contact-cta { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--purple-bright); font-weight: 600; margin-top: auto; transition: color var(--t-mid); }
        .contact-card:hover .contact-cta { color: var(--text-primary); }

        /* ── MAP ── */
        .map-wrap { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-subtle); height: 420px; background: var(--bg-surface); }
        .map-wrap iframe { width: 100%; height: 100%; border: none; filter: invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85); opacity: 0.75; }
        .map-overlay-card { position: absolute; bottom: 1.5rem; left: 1.5rem; background: rgba(8,4,22,0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--border-soft); border-radius: 12px; padding: 1.25rem 1.5rem; z-index: 1; max-width: 240px; }
        .map-overlay-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .map-overlay-address { font-size: 11.5px; color: var(--text-muted); line-height: 1.55; font-weight: 300; }
        .map-overlay-link { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-top: 0.75rem; text-decoration: none; transition: color var(--t-mid); }
        .map-overlay-link:hover { color: var(--amber-bright); }

        /* ── TRANSIT ── */
        .transit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 3rem; }
        @media (max-width: 700px) { .transit-grid { grid-template-columns: 1fr; } }
        .transit-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; transition: border-color var(--t-mid); }
        .transit-card:hover { border-color: var(--border-soft); }
        .transit-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .transit-type { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--purple-mid); font-weight: 600; margin-bottom: 5px; font-family: var(--font-body); }
        .transit-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .transit-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; font-weight: 300; }
      `}</style>

      {/* HERO */}
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 70% 10%, rgba(100, 40, 220, 0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 20% 90%, rgba(200, 100, 20, 0.14) 0%, transparent 60%), var(--bg-deep)" }} />
        <div className="hero-orb" style={{ top: -80, right: "10%", width: 380, height: 380, background: "rgba(100, 40, 220, 0.09)" }} />
        <div className="hero-orb hero-orb-reverse" style={{ bottom: -50, left: "5%", width: 300, height: 300, background: "rgba(200, 100, 15, 0.08)", animationDelay: "-6s" }} />
        <div className="hero-contact-inner">
          <div>
            <p className="hero-eyebrow">Park Slope, Brooklyn</p>
            <h1 className="hero-title">Find Us.<br /><em>Stay A While.</em></h1>
          </div>
          <LiveClock />
        </div>
      </section>

      {/* HOURS */}
      <section id="hours" ref={reg("hours")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("hours") ? "visible" : ""}`}>We're Here</p>
          <h2 className={`section-title fade-in d1 ${vis("hours") ? "visible" : ""}`}>Hours of <em>Operation</em></h2>
          <div className="hours-layout">
            <div className={`hours-table fade-in d2 ${vis("hours") ? "visible" : ""}`}>
              <div className="hours-section-label">Weekdays</div>
              {weekdayHours.filter(d => !d.isWeekend).map((d) => (
                <div key={d.day} className={`hours-row ${d.day === today ? "today" : ""}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="hours-day">{d.day}</span>
                    {d.day === today && <span className="hours-today-badge">Today</span>}
                  </div>
                  <span className="hours-time">{d.open} – {d.close}</span>
                </div>
              ))}
              <div className="hours-section-label">Weekend</div>
              {weekdayHours.filter(d => d.isWeekend).map((d) => (
                <div key={d.day} className={`hours-row ${d.day === today ? "today" : ""}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="hours-day">{d.day}</span>
                    {d.day === today && <span className="hours-today-badge">Today</span>}
                  </div>
                  <span className="hours-time">{d.open} – {d.close}</span>
                </div>
              ))}
            </div>
            <div className="hours-side">
              <div className={`side-card fade-in d3 ${vis("hours") ? "visible" : ""}`}>
                <div className="side-card-eyebrow">Every Weekday</div>
                <div className="side-card-title">Happy Hour — 3 to 7 PM</div>
                <p className="side-card-body">Monday through Friday. Draft beers at reduced prices, $1 off everything else. No catch.</p>
                <div className="hh-deals">
                  <div className="hh-deal-chip"><span className="hh-deal-price">$4</span><span className="hh-deal-label">Draft Beers</span></div>
                  <div className="hh-deal-chip"><span className="hh-deal-price">$1</span><span className="hh-deal-label">Off Everything</span></div>
                </div>
              </div>
              <div className={`side-card fade-in d4 ${vis("hours") ? "visible" : ""}`}>
                <div className="side-card-eyebrow">Weather Permitting</div>
                <div className="side-card-title">🌿 The Patio</div>
                <p className="side-card-body">Our backyard oasis. Park benches, open sky, and a cold one in hand.</p>
                <div className="patio-rows">
                  {patioHours.map((p) => (
                    <div key={p.days} className="patio-row">
                      <span>{p.days}</span>
                      <span className="patio-close">Until {p.close}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* CONTACT */}
      <section id="contact" ref={reg("contact")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("contact") ? "visible" : ""}`}>Get In Touch</p>
          <h2 className={`section-title fade-in d1 ${vis("contact") ? "visible" : ""}`}>Say <em>Hello</em></h2>
          <div className="contact-grid">
            {contactItems.map((item, i) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className={`contact-card fade-in d${i + 1} ${vis("contact") ? "visible" : ""}`}>
                <div className="contact-icon-wrap">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                  {item.sub && <div className="contact-sub">{item.sub}</div>}
                </div>
                <div className="contact-cta">{item.cta} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* MAP */}
      <section id="map" ref={reg("map")}>
        <div className="section-wrap" style={{ paddingBottom: "2rem" }}>
          <p className={`section-eyebrow fade-in ${vis("map") ? "visible" : ""}`}>Corner of 5th & 12th</p>
          <h2 className={`section-title fade-in d1 ${vis("map") ? "visible" : ""}`}>Find <em>Us</em></h2>
        </div>
        <div className={`fade-in d2 ${vis("map") ? "visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 5rem" }}>
          <div className="map-wrap">
            <iframe src="https://maps.google.com/maps?q=497+5th+Avenue,+Brooklyn,+New+York,+NY&z=15&output=embed" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Commonwealth Bar location" />
            <div className="map-overlay-card">
              <div className="map-overlay-name">Commonwealth Bar</div>
              <div className="map-overlay-address">497 Fifth Avenue<br />at 12th Street<br />Park Slope, Brooklyn NY</div>
              <a href="https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215" target="_blank" rel="noreferrer" className="map-overlay-link">Open in Maps →</a>
            </div>
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* TRANSIT */}
      <section id="transit" ref={reg("transit")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("transit") ? "visible" : ""}`}>Getting Here</p>
          <h2 className={`section-title fade-in d1 ${vis("transit") ? "visible" : ""}`}>How to <em>Arrive</em></h2>
          <div className="transit-grid">
            {[
              { icon: "🚇", type: "Subway", name: "F / G Train", desc: "Take the F or G to 4th Ave – 9th Street. Walk 5 minutes up 5th Avenue to 12th Street." },
              { icon: "🚌", type: "Bus", name: "B63 / B69", desc: "The B63 runs along 5th Avenue and stops at 12th Street — drops you right at the door." },
              { icon: "🚗", type: "Car / Rideshare", name: "Corner of 5th & 12th", desc: "Street parking available on 12th Street and surrounding blocks. Rideshare drop-off directly in front." },
            ].map((t, i) => (
              <div key={t.name} className={`transit-card fade-in d${i + 1} ${vis("transit") ? "visible" : ""}`}>
                <div className="transit-icon">{t.icon}</div>
                <div className="transit-type">{t.type}</div>
                <div className="transit-name">{t.name}</div>
                <p className="transit-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}