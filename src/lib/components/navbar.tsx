"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Booze", href: "/pages/booze" },
  { label: "Food", href: "/pages/food" },
  { label: "Hours & Contact", href: "/pages/contact" },
  { label: "Jukebox", href: "/pages/jukebox" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("/")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .navbar-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          font-family: var(--font-body);
          transition: all var(--t-slow) var(--ease-in-out);
        }

        .navbar-root.scrolled {
          background: rgba(8, 4, 18, 0.88);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 1px 0 var(--border-subtle), 0 8px 32px rgba(0,0,0,0.5);
        }

        .navbar-root.top {
          background: linear-gradient(to bottom, rgba(8, 4, 18, 0.72) 0%, rgba(8, 4, 18, 0) 100%);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .navbar-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--purple-mid) 30%, var(--amber-mid) 60%, transparent 100%);
          opacity: 0;
          transition: opacity var(--t-slow);
        }

        .navbar-root.scrolled::before { opacity: 1; }

        /* Logo */
        .logo-wrap {
          display: flex; flex-direction: column;
          line-height: 1; text-decoration: none; gap: 1px;
        }

        .logo-eyebrow {
          font-family: var(--font-body);
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--purple-mid); font-weight: 400;
        }

        .logo-main {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.03em; white-space: nowrap;
          position: relative; transition: color var(--t-mid);
        }

        .logo-main::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, var(--purple-mid), var(--amber-mid));
          transition: width var(--t-slow) var(--ease-in-out);
        }

        .logo-wrap:hover .logo-main::after { width: 100%; }
        .logo-wrap:hover .logo-main { color: #fff; }

        /* Nav links */
        .nav-links {
          display: flex; align-items: center; gap: 0.25rem;
          list-style: none; margin: 0; padding: 0;
        }

        .nav-link-item a {
          position: relative; display: inline-block;
          padding: 0.45rem 0.9rem;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          font-weight: 500; color: var(--text-secondary);
          text-decoration: none; transition: color var(--t-mid);
          border-radius: 4px;
        }

        .nav-link-item a::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 4px;
          background: var(--purple-dim);
          opacity: 0; transition: opacity var(--t-mid);
        }

        .nav-link-item a:hover { color: #fff; }
        .nav-link-item a:hover::before { opacity: 1; }

        .nav-link-item a.active { color: var(--amber-bright); }

        .nav-link-item a.active::after {
          content: '';
          position: absolute; bottom: 0px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 1px;
          background: var(--amber-mid);
          box-shadow: 0 0 6px var(--amber-soft);
        }

        /* CTA */
        .nav-cta {
          font-family: var(--font-body);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 600; color: var(--amber-bright);
          border: 1px solid var(--border-warm);
          padding: 0.45rem 1rem; border-radius: 100px;
          text-decoration: none;
          transition: all var(--t-mid);
          background: var(--amber-ember);
          white-space: nowrap; margin-left: 0.5rem;
        }

        .nav-cta:hover {
          background: rgba(255, 180, 50, 0.12);
          border-color: var(--amber-mid);
          color: #fff;
          box-shadow: var(--glow-amber);
        }

        /* Hamburger */
        .hamburger {
          display: none; flex-direction: column;
          justify-content: center; gap: 5px;
          width: 38px; height: 38px;
          background: none; border: none; cursor: pointer;
          padding: 6px; border-radius: 6px;
          transition: background var(--t-fast);
        }

        .hamburger:hover { background: var(--purple-dim); }

        .hamburger span {
          display: block; height: 1.5px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: all var(--t-mid) var(--ease-in-out);
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile overlay */
        .mobile-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(4, 2, 12, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 99; opacity: 0;
          transition: opacity var(--t-slow);
          pointer-events: none;
        }

        /* Mobile drawer */
        .mobile-drawer {
          display: none; position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(320px, 90vw);
          background: rgba(10, 5, 24, 0.97);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          z-index: 101;
          padding: 88px 2rem 2rem;
          transform: translateX(100%);
          transition: transform var(--t-slow) var(--ease-in-out);
          border-left: 1px solid var(--border-subtle);
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
          flex-direction: column;
        }

        .mobile-drawer::before {
          content: '';
          position: absolute; top: 60px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--purple-dim) 0%, transparent 70%);
          pointer-events: none;
        }

        .mobile-drawer::after {
          content: '';
          position: absolute; bottom: 100px; left: -20px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, var(--amber-ember) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-overlay { display: block; }
          .mobile-drawer { display: flex; }
        }

        .mobile-overlay.open { opacity: 1; pointer-events: all; }
        .mobile-drawer.open { transform: translateX(0); }

        .mobile-nav-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.25rem;
        }

        .mobile-nav-links li a {
          display: block; padding: 0.85rem 1rem;
          font-family: var(--font-body);
          font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 500; color: var(--text-secondary);
          text-decoration: none; border-radius: 6px;
          transition: all var(--t-fast);
          position: relative;
        }

        .mobile-nav-links li a:hover,
        .mobile-nav-links li a.active {
          color: #fff;
          background: var(--purple-dim);
          padding-left: 1.5rem;
        }

        .mobile-nav-links li a.active {
          color: var(--amber-bright);
          background: var(--amber-ember);
        }

        .mobile-nav-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 1.5rem 0;
        }

        .mobile-cta {
          font-family: var(--font-body);
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 600; color: var(--amber-bright);
          border: 1px solid var(--border-warm);
          padding: 0.75rem 1.5rem; border-radius: 8px;
          text-decoration: none; display: block; text-align: center;
          transition: all var(--t-mid);
          background: var(--amber-ember);
        }

        .mobile-cta:hover {
          background: rgba(255, 180, 50, 0.12);
          border-color: var(--amber-mid);
        }

        .mobile-bar-info { margin-top: auto; padding-top: 2rem; }

        .mobile-bar-address {
          font-size: 11px; color: var(--text-ghost);
          letter-spacing: 0.08em; line-height: 1.6;
        }

        .mobile-nav-links li {
          opacity: 0; transform: translateX(20px);
          transition: opacity var(--t-mid), transform var(--t-mid);
        }

        .mobile-drawer.open .mobile-nav-links li:nth-child(1) { opacity: 1; transform: none; transition-delay: 0.1s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.15s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.2s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(4) { opacity: 1; transform: none; transition-delay: 0.25s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(5) { opacity: 1; transform: none; transition-delay: 0.3s; }
      `}</style>

      <nav className={`navbar-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="navbar-inner">
          <Link href="/" className="logo-wrap">
            <span className="logo-eyebrow">Est. Park Slope</span>
            <span className="logo-main">Commonwealth</span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-link-item">
                <Link
                  href={link.href}
                  className={activeLink === link.href ? "active" : ""}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/pages/contact" className="nav-cta">Visit Us</Link>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={activeLink === link.href ? "active" : ""}
                onClick={() => { setActiveLink(link.href); setMenuOpen(false) }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-divider" />
        <Link href="/pages/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Visit Us Tonight
        </Link>
        <div className="mobile-bar-info">
          <p className="mobile-bar-address">
            497 5th Avenue<br />
            Park Slope, Brooklyn<br />
            Open daily until 4 AM
          </p>
        </div>
      </div>
    </>
  )
}