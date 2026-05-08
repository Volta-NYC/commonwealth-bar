"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Booze", href: "/pages/booze" },
  { label: "Food",  href: "/pages/food" },
  { label: "Jukebox", href: "/pages/jukebox" },
  { label: "About", href: "/pages/about" },
  { label: "Visit", href: "/pages/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          font-family: var(--font-mono);
          background: var(--paper-base);
          border-bottom: 1px solid var(--ink-deep);
          transition: box-shadow var(--t-mid) var(--ease-in-out),
                      background var(--t-mid) var(--ease-in-out);
        }
        .nav-root.scrolled {
          background: var(--paper-bright);
          box-shadow: 0 1px 0 var(--ink-deep), 0 6px 24px rgba(40, 22, 8, 0.12);
        }

        /* Thin double-rule line under nav for that posted-notice feel */
        .nav-root::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          bottom: -4px;
          height: 1px;
          background: var(--ink-deep);
          opacity: 0.55;
        }

        .nav-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Logo block ── */
        .logo-link {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--ink-deep);
        }
        .logo-star {
          color: var(--red-deep);
          font-size: 0.9rem;
          letter-spacing: 0.18em;
        }
        .logo-name {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 400;
          color: var(--ink-deep);
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
        }
        .logo-name b {
          font-weight: 400;
          color: var(--red-deep);
          font-style: italic;
        }
        .logo-link:hover .logo-name { color: var(--red-deep); }

        /* ── Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
        }
        .nav-link {
          display: inline-block;
          padding: 0.45rem 0.85rem;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mid);
          text-decoration: none;
          border: 1px solid transparent;
          transition: color var(--t-fast) var(--ease-in-out),
                      border-color var(--t-fast) var(--ease-in-out),
                      background var(--t-fast) var(--ease-in-out);
        }
        .nav-link:hover {
          color: var(--red-deep);
        }
        .nav-link.active {
          color: var(--red-deep);
          border-color: var(--red-deep);
        }
        .nav-link.cta {
          background: var(--red-deep);
          color: var(--paper-bright);
          border-color: var(--red-deep);
          margin-left: 0.5rem;
        }
        .nav-link.cta:hover {
          background: var(--red-blood);
          border-color: var(--red-blood);
          color: var(--cream-pure);
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          width: 36px; height: 36px;
          background: transparent;
          border: 1px solid var(--ink-deep);
          cursor: pointer;
          padding: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
        }
        .hamburger span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: var(--ink-deep);
          transition: transform var(--t-mid) var(--ease-in-out),
                      opacity var(--t-fast);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(26, 17, 10, 0.40);
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--t-mid);
          z-index: 99;
        }
        .nav-overlay.open { opacity: 1; pointer-events: auto; }

        .nav-drawer {
          display: none;
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(320px, 88vw);
          background: var(--paper-bright);
          border-left: 1px solid var(--ink-deep);
          box-shadow: -10px 0 30px rgba(40, 22, 8, 0.18);
          z-index: 101;
          transform: translateX(100%);
          transition: transform var(--t-mid) var(--ease-in-out);
          padding: 88px 1.75rem 2rem;
          flex-direction: column;
          font-family: var(--font-mono);
        }
        .nav-drawer.open { transform: translateX(0); }

        .nav-drawer h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          color: var(--red-deep);
          font-weight: 400;
          margin-bottom: 0.6rem;
          letter-spacing: 0.04em;
        }
        .nav-drawer ul {
          list-style: none;
          display: flex;
          flex-direction: column;
        }
        .nav-drawer li a {
          display: block;
          padding: 0.85rem 0;
          font-size: 0.78rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-deep);
          text-decoration: none;
          border-bottom: 1px solid var(--rule-faint);
          transition: color var(--t-fast),
                      padding-left var(--t-fast);
        }
        .nav-drawer li a:hover {
          color: var(--red-deep);
          padding-left: 0.5rem;
        }
        .nav-drawer li a.active { color: var(--red-deep); }

        .drawer-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px dashed var(--rule-soft);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          line-height: 1.7;
          color: var(--ink-soft);
          text-transform: uppercase;
          text-align: center;
        }
        .drawer-footer .stars {
          color: var(--red-deep);
          letter-spacing: 0.4em;
          margin-bottom: 0.8rem;
        }

        @media (max-width: 820px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .nav-overlay { display: block; }
          .nav-drawer { display: flex; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="logo-link">
            <span className="logo-star">★</span>
            <span className="logo-name">Commonwealth <b>Bar</b></span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((l) => {
              const isActive = pathname === l.href
              const isCTA = l.href === "/pages/contact"
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`nav-link ${isActive ? "active" : ""} ${isCTA ? "cta" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <h3>Menu</h3>
        <ul>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="drawer-footer">
          <div className="stars">★ ★ ★</div>
          497 5th Ave<br />
          Park Slope, BK<br />
          Open till 4 AM
        </div>
      </div>
    </>
  )
}
