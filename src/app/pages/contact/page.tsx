"use client"

import { useEffect, useRef, useState } from "react"

const weekdayHours = [
  { day: "Monday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Tuesday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Wednesday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Thursday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Friday", open: "3:00 PM", close: "4:00 AM", isWeekend: false },
  { day: "Saturday", open: "2:00 PM", close: "4:00 AM", isWeekend: true },
  { day: "Sunday", open: "2:00 PM", close: "4:00 AM", isWeekend: true },
]

const patioHours = [
  { days: "Mon – Thu", close: "11:00 PM" },
  { days: "Fri – Sat", close: "Midnight" },
  { days: "Sunday", close: "11:00 PM" },
]

const contactItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Address",
    value: "497 Fifth Avenue (at 12th St.)",
    sub: "Park Slope, Brooklyn NY 11215",
    href: "https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215",
    cta: "Get Directions",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Phone",
    value: "(718) 768-0009",
    href: "tel:7187680009",
    cta: "Call Us",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: "Email",
    value: "commonwealthliveson@gmail.com",
    href: "mailto:commonwealthliveson@gmail.com",
    cta: "Send Email",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    label: "Twitter / X",
    value: "@commonwealthbar",
    href: "https://twitter.com/commonwealthbar",
    cta: "Follow Us",
  },
]

function LiveClock() {
  const [time, setTime] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const nyTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
      const hours = nyTime.getHours()
      const minutes = nyTime.getMinutes().toString().padStart(2, "0")
      const ampm = hours >= 12 ? "PM" : "AM"
      const displayHour = hours % 12 || 12
      setTime(`${displayHour}:${minutes} ${ampm}`)

      const day = nyTime.getDay() // 0 = Sun, 6 = Sat
      const isWeekend = day === 0 || day === 6
      const openHour = isWeekend ? 14 : 15 // 2pm or 3pm
      // "4am" means closes next day at 4am — open from openHour to 28 (next day 4am)
      const h = hours
      // after midnight counts as same "night"
      const adjustedH = h < 4 ? h + 24 : h
      setIsOpen(adjustedH >= openHour && adjustedH < 28)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id]))
        })
      },
      { threshold: 0.1 }
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
  }
  const vis = (id: string) => visibleSections.has(id)

  // Get current NYC day to highlight
  const today = new Date().toLocaleString("en-US", { timeZone: "America/New_York", weekday: "long" })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap');

        :root {
          --bg-deep: #07041a;
          --amber-pure: #ffb84a;
          --text-primary: #f0eaff;
          --text-secondary: rgba(210, 185, 255, 0.72);
          --text-muted: rgba(170, 140, 220, 0.48);
          --border-subtle: rgba(120, 70, 255, 0.1);
          --border-soft: rgba(140, 90, 255, 0.18);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Raleway', system-ui, sans-serif;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg-deep); color: var(--text-primary); font-family: var(--font-body); overflow-x: hidden; }

        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px; opacity: 0.028; pointer-events: none; z-index: 999;
        }

        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes slowFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(16px, -16px); }
        }

        /* ── HERO ── */
        .contact-hero {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: flex-end;
          padding: 0 2rem 4rem;
          overflow: hidden;
        }

        .contact-hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 60% at 70% 10%, rgba(100, 40, 220, 0.16) 0%, transparent 60%),
            radial-gradient(ellipse 50% 55% at 20% 90%, rgba(200, 100, 20, 0.14) 0%, transparent 60%),
            #07041a;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-orb-1 {
          top: -80px; right: 10%;
          width: 380px; height: 380px;
          background: rgba(100, 40, 220, 0.09);
          animation: slowFloat 20s ease-in-out infinite;
        }
        .hero-orb-2 {
          bottom: -50px; left: 5%;
          width: 300px; height: 300px;
          background: rgba(200, 100, 15, 0.08);
          animation: slowFloat 16s ease-in-out infinite reverse;
        }

        .hero-content {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .hero-text {}

        .hero-eyebrow {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255, 185, 60, 0.55); font-weight: 600; font-family: var(--font-body);
          margin-bottom: 1rem;
          opacity: 0; transform: translateY(12px);
          animation: fadeUp 0.8s var(--ease-out) 0.2s forwards;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 700; line-height: 0.95;
          color: var(--text-primary);
          opacity: 0; transform: translateY(16px);
          animation: fadeUp 0.9s var(--ease-out) 0.4s forwards;
        }

        .hero-title em { font-style: italic; color: var(--amber-pure); }

        /* ── LIVE CLOCK ── */
        .live-clock-wrap {
          opacity: 0; transform: translateY(12px);
          animation: fadeUp 0.9s var(--ease-out) 0.7s forwards;
          text-align: right;
          flex-shrink: 0;
        }

        .live-clock-time {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          color: rgba(255, 185, 60, 0.85);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .live-clock-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          border: 1px solid;
        }

        .live-clock-status.open {
          color: rgba(100, 230, 140, 0.85);
          border-color: rgba(100, 230, 140, 0.2);
          background: rgba(100, 230, 140, 0.06);
        }

        .live-clock-status.closed {
          color: rgba(200, 150, 255, 0.6);
          border-color: rgba(200, 150, 255, 0.15);
          background: rgba(150, 80, 255, 0.05);
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .live-clock-status.open .status-dot {
          background: rgba(100, 230, 140, 0.9);
          box-shadow: 0 0 6px rgba(100, 230, 140, 0.6);
          animation: pulseDot 2s ease-in-out infinite;
        }

        .live-clock-status.closed .status-dot {
          background: rgba(180, 130, 255, 0.5);
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .status-tz {
          font-size: 8px;
          letter-spacing: 0.15em;
          opacity: 0.5;
          margin-left: 2px;
        }

        /* ── SHARED ── */
        .section-wrap {
          max-width: 1200px; margin: 0 auto; padding: 5rem 2rem;
        }

        .section-eyebrow {
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(160, 100, 255, 0.55); font-weight: 600; margin-bottom: 1rem;
          font-family: var(--font-body);
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700; color: var(--text-primary);
          margin-bottom: 0.75rem; line-height: 1.1;
        }
        .section-title em { font-style: italic; color: var(--amber-pure); }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120, 70, 220, 0.12), transparent);
          margin: 0 2rem;
        }

        .fade-in {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.12s; }
        .d3 { transition-delay: 0.2s; }
        .d4 { transition-delay: 0.28s; }

        /* ── HOURS + HAPPY HOUR GRID ── */
        .hours-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
          align-items: start;
          margin-top: 3rem;
        }
        @media (max-width: 750px) { .hours-layout { grid-template-columns: 1fr; } }

        /* Hours table */
        .hours-table {
          background: rgba(10, 5, 24, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          overflow: hidden;
        }

        .hours-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.5rem;
          border-bottom: 1px solid rgba(120, 70, 220, 0.06);
          transition: background 0.2s;
          gap: 1rem;
        }

        .hours-row:last-child { border-bottom: none; }
        .hours-row:hover { background: rgba(120, 60, 220, 0.05); }

        .hours-row.today {
          background: rgba(255, 185, 60, 0.05);
          border-left: 2px solid rgba(255, 185, 60, 0.3);
        }

        .hours-day {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          min-width: 100px;
        }

        .hours-row.today .hours-day {
          color: rgba(255, 200, 90, 0.9);
          font-weight: 600;
        }

        .hours-today-badge {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 185, 60, 0.6);
          border: 1px solid rgba(255, 185, 60, 0.2);
          border-radius: 100px;
          padding: 2px 8px;
          font-weight: 600;
        }

        .hours-time {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--text-muted);
          text-align: right;
        }

        .hours-row.today .hours-time {
          color: rgba(255, 200, 90, 0.75);
        }

        .hours-weekend-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(170, 130, 255, 0.4);
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          background: rgba(120, 60, 220, 0.04);
          border-bottom: 1px solid rgba(120, 70, 220, 0.06);
        }

        /* Side cards */
        .hours-side {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .side-card {
          background: rgba(10, 5, 24, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .side-card:hover { border-color: var(--border-soft); }

        .side-card-eyebrow {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255, 185, 60, 0.5); font-weight: 600; margin-bottom: 6px;
          font-family: var(--font-body);
        }

        .side-card-title {
          font-family: var(--font-display);
          font-size: 1.15rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 0.75rem;
        }

        .side-card-body {
          font-size: 13px; color: var(--text-muted);
          line-height: 1.7; font-weight: 300;
        }

        /* Happy hour highlight numbers */
        .hh-deals {
          display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;
        }

        .hh-deal-chip {
          display: flex; flex-direction: column;
          background: rgba(255, 175, 50, 0.06);
          border: 1px solid rgba(255, 175, 50, 0.15);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          flex: 1;
          min-width: 80px;
        }

        .hh-deal-price {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 700;
          color: var(--amber-pure); line-height: 1;
        }

        .hh-deal-label {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(200, 165, 255, 0.45); margin-top: 4px; font-weight: 500;
        }

        /* Patio rows */
        .patio-rows {
          display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.75rem;
        }

        .patio-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(120, 70, 220, 0.06);
          color: var(--text-muted);
        }
        .patio-row:last-child { border-bottom: none; }

        .patio-close {
          font-family: var(--font-display);
          color: rgba(200, 170, 255, 0.6);
          font-size: 0.9rem;
        }

        /* ── CONTACT SECTION ── */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-top: 3rem;
        }
        @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }

        .contact-card {
          background: rgba(10, 5, 24, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.35s var(--ease-out);
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(130, 70, 255, 0.06) 0%, transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s;
          opacity: 0;
        }

        .contact-card:hover {
          border-color: rgba(140, 90, 255, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(80, 30, 200, 0.1);
        }

        .contact-card:hover::before { opacity: 1; }

        .contact-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(110, 50, 220, 0.08);
          border: 1px solid rgba(130, 70, 255, 0.14);
          display: flex; align-items: center; justify-content: center;
          color: rgba(175, 120, 255, 0.7);
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .contact-card:hover .contact-icon-wrap {
          background: rgba(130, 70, 255, 0.14);
          color: rgba(200, 160, 255, 0.9);
        }

        .contact-label {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-muted); font-weight: 600; font-family: var(--font-body);
        }

        .contact-value {
          font-family: var(--font-display);
          font-size: 1.05rem; font-weight: 600;
          color: var(--text-primary); line-height: 1.3;
        }

        .contact-sub {
          font-size: 12px; color: var(--text-muted); font-weight: 300;
        }

        .contact-cta {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(175, 120, 255, 0.6); font-weight: 600;
          margin-top: auto; transition: color 0.25s;
        }

        .contact-card:hover .contact-cta { color: rgba(200, 160, 255, 0.9); }

        /* ── MAP SECTION ── */
        .map-section {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem 5rem;
        }

        .map-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          height: 420px;
          background: rgba(8, 4, 20, 0.8);
        }

        .map-wrap iframe {
          width: 100%; height: 100%; border: none;
          filter: invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85);
          opacity: 0.75;
        }

        .map-overlay-card {
          position: absolute;
          bottom: 1.5rem; left: 1.5rem;
          background: rgba(8, 4, 22, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(130, 70, 255, 0.18);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          z-index: 1;
          max-width: 240px;
        }

        .map-overlay-name {
          font-family: var(--font-display);
          font-size: 1rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px;
        }

        .map-overlay-address {
          font-size: 11.5px; color: var(--text-muted);
          line-height: 1.55; font-weight: 300;
        }

        .map-overlay-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255, 185, 60, 0.65); font-weight: 600;
          margin-top: 0.75rem; text-decoration: none; transition: color 0.25s;
        }

        .map-overlay-link:hover { color: rgba(255, 200, 90, 0.9); }

        /* ── TRANSIT SECTION ── */
        .transit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3rem;
        }
        @media (max-width: 700px) { .transit-grid { grid-template-columns: 1fr; } }

        .transit-card {
          background: rgba(10, 5, 24, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          transition: border-color 0.3s;
        }

        .transit-card:hover { border-color: var(--border-soft); }

        .transit-icon {
          font-size: 1.8rem; margin-bottom: 0.75rem;
        }

        .transit-type {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(160, 100, 255, 0.5); font-weight: 600; margin-bottom: 5px;
          font-family: var(--font-body);
        }

        .transit-name {
          font-family: var(--font-display);
          font-size: 1rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px;
        }

        .transit-desc {
          font-size: 12px; color: var(--text-muted);
          line-height: 1.6; font-weight: 300;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">Park Slope, Brooklyn</p>
            <h1 className="hero-title">
              Find Us.<br />
              <em>Stay A While.</em>
            </h1>
          </div>
          <LiveClock />
        </div>
      </section>

      {/* ── HOURS ── */}
      <section id="hours" ref={reg("hours")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("hours") ? "visible" : ""}`}>We're Here</p>
          <h2 className={`section-title fade-in d1 ${vis("hours") ? "visible" : ""}`}>
            Hours of <em>Operation</em>
          </h2>

          <div className="hours-layout">
            {/* Hours table */}
            <div className={`hours-table fade-in d2 ${vis("hours") ? "visible" : ""}`}>
              <div className="hours-weekend-label">Weekdays</div>
              {weekdayHours.filter(d => !d.isWeekend).map((d) => (
                <div key={d.day} className={`hours-row ${d.day === today ? "today" : ""}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="hours-day">{d.day}</span>
                    {d.day === today && <span className="hours-today-badge">Today</span>}
                  </div>
                  <span className="hours-time">{d.open} – {d.close}</span>
                </div>
              ))}
              <div className="hours-weekend-label">Weekend</div>
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

            {/* Side cards */}
            <div className="hours-side">
              {/* Happy Hour */}
              <div className={`side-card fade-in d3 ${vis("hours") ? "visible" : ""}`}>
                <div className="side-card-eyebrow">Every Weekday</div>
                <div className="side-card-title">Happy Hour — 3 to 7 PM</div>
                <p className="side-card-body">Monday through Friday. Draft beers at reduced prices, $1 off everything else. No catch.</p>
                <div className="hh-deals">
                  <div className="hh-deal-chip">
                    <span className="hh-deal-price">$4</span>
                    <span className="hh-deal-label">Draft Beers</span>
                  </div>
                  <div className="hh-deal-chip">
                    <span className="hh-deal-price">$1</span>
                    <span className="hh-deal-label">Off Everything</span>
                  </div>
                </div>
              </div>

              {/* Patio */}
              <div className={`side-card fade-in d4 ${vis("hours") ? "visible" : ""}`}>
                <div className="side-card-eyebrow">Weather Permitting</div>
                <div className="side-card-title">🌿 The Patio</div>
                <p className="side-card-body">Our backyard oasis. Park benches, open sky, and a cold one in hand. Closes a bit earlier than the bar.</p>
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

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section id="contact" ref={reg("contact")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("contact") ? "visible" : ""}`}>Get In Touch</p>
          <h2 className={`section-title fade-in d1 ${vis("contact") ? "visible" : ""}`}>
            Say <em>Hello</em>
          </h2>

          <div className="contact-grid">
            {contactItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className={`contact-card fade-in d${i + 1} ${vis("contact") ? "visible" : ""}`}
              >
                <div className="contact-icon-wrap">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                  {item.sub && <div className="contact-sub">{item.sub}</div>}
                </div>
                <div className="contact-cta">
                  {item.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MAP ── */}
      <section id="map" ref={reg("map")}>
        <div className="section-wrap" style={{ paddingBottom: "2rem" }}>
          <p className={`section-eyebrow fade-in ${vis("map") ? "visible" : ""}`}>Corner of 5th & 12th</p>
          <h2 className={`section-title fade-in d1 ${vis("map") ? "visible" : ""}`}>
            Find <em>Us</em>
          </h2>
        </div>
        <div className={`map-section fade-in d2 ${vis("map") ? "visible" : ""}`}>
          <div className="map-wrap">
            <iframe
              src="https://maps.google.com/maps?q=497+5th+Avenue,+Brooklyn,+New+York,+NY&z=15&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Commonwealth Bar location"
            />
            <div className="map-overlay-card">
              <div className="map-overlay-name">Commonwealth Bar</div>
              <div className="map-overlay-address">
                497 Fifth Avenue<br />
                at 12th Street<br />
                Park Slope, Brooklyn NY
              </div>
              <a
                href="https://maps.google.com/?q=497+5th+Avenue+Brooklyn+NY+11215"
                target="_blank"
                rel="noreferrer"
                className="map-overlay-link"
              >
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── GETTING HERE ── */}
      <section id="transit" ref={reg("transit")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("transit") ? "visible" : ""}`}>Getting Here</p>
          <h2 className={`section-title fade-in d1 ${vis("transit") ? "visible" : ""}`}>
            How to <em>Arrive</em>
          </h2>
          <div className="transit-grid">
            {[
              {
                icon: "🚇",
                type: "Subway",
                name: "F / G Train",
                desc: "Take the F or G to 4th Ave – 9th Street. Walk 5 minutes up 5th Avenue to 12th Street.",
              },
              {
                icon: "🚌",
                type: "Bus",
                name: "B63 / B69",
                desc: "The B63 runs along 5th Avenue and stops at 12th Street — drops you right at the door.",
              },
              {
                icon: "🚗",
                type: "Car / Rideshare",
                name: "Corner of 5th & 12th",
                desc: "Street parking available on 12th Street and surrounding blocks. Rideshare drop-off directly in front.",
              },
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