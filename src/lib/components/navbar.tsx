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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;500&display=swap');

        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          font-family: 'Raleway', sans-serif;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-root.scrolled {
          background: rgba(8, 4, 18, 0.88);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 1px 0 rgba(180, 120, 255, 0.08), 0 8px 32px rgba(0,0,0,0.5);
        }

        .navbar-root.top {
          background: linear-gradient(
            to bottom,
            rgba(8, 4, 18, 0.72) 0%,
            rgba(8, 4, 18, 0) 100%
          );
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

        /* Ambient glow line at top */
        .navbar-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(160, 90, 255, 0.5) 30%,
            rgba(255, 180, 80, 0.4) 60%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s;
        }

        .navbar-root.scrolled::before {
          opacity: 1;
        }

        /* Logo */
        .logo-wrap {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
          gap: 1px;
          position: relative;
        }

        .logo-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(200, 150, 255, 0.7);
          font-weight: 400;
        }

        .logo-main {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f0ff;
          letter-spacing: 0.03em;
          white-space: nowrap;
          position: relative;
          transition: color 0.3s;
        }

        .logo-main::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(160,90,255,0.8), rgba(255,180,80,0.6));
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-wrap:hover .logo-main::after {
          width: 100%;
        }

        .logo-wrap:hover .logo-main {
          color: #fff;
        }

        /* Nav links desktop */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link-item a {
          position: relative;
          display: inline-block;
          padding: 0.45rem 0.9rem;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(220, 200, 255, 0.75);
          text-decoration: none;
          transition: color 0.3s;
          border-radius: 4px;
        }

        .nav-link-item a::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: rgba(130, 70, 255, 0.08);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .nav-link-item a:hover {
          color: #fff;
        }

        .nav-link-item a:hover::before {
          opacity: 1;
        }

        /* Active link */
        .nav-link-item a.active {
          color: rgba(255, 200, 100, 0.9);
        }

        .nav-link-item a.active::after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 1px;
          background: rgba(255, 190, 80, 0.7);
          box-shadow: 0 0 6px rgba(255, 190, 80, 0.5);
        }

        /* CTA pill */
        .nav-cta {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(255, 200, 100, 0.9);
          border: 1px solid rgba(255, 190, 80, 0.3);
          padding: 0.45rem 1rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.35s;
          background: rgba(255, 180, 50, 0.05);
          white-space: nowrap;
          margin-left: 0.5rem;
        }

        .nav-cta:hover {
          background: rgba(255, 180, 50, 0.12);
          border-color: rgba(255, 190, 80, 0.6);
          color: #fff;
          box-shadow: 0 0 16px rgba(255, 180, 50, 0.2);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .hamburger:hover {
          background: rgba(160, 90, 255, 0.1);
        }

        .hamburger span {
          display: block;
          height: 1.5px;
          background: rgba(220, 200, 255, 0.8);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile drawer */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(4, 2, 12, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 99;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .mobile-drawer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 90vw);
          background: rgba(10, 5, 24, 0.97);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          z-index: 101;
          padding: 88px 2rem 2rem;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 1px solid rgba(130, 70, 255, 0.12);
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
          flex-direction: column;
        }

        /* Ambient glow in drawer */
        .mobile-drawer::before {
          content: '';
          position: absolute;
          top: 60px;
          right: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(120, 50, 255, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .mobile-drawer::after {
          content: '';
          position: absolute;
          bottom: 100px;
          left: -20px;
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(255, 150, 50, 0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-overlay { display: block; }
          .mobile-drawer { display: flex; }
        }

        .mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-drawer.open {
          transform: translateX(0);
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .mobile-nav-links li a {
          display: block;
          padding: 0.85rem 1rem;
          font-family: 'Raleway', sans-serif;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(200, 180, 255, 0.75);
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.25s;
          position: relative;
        }

        .mobile-nav-links li a:hover,
        .mobile-nav-links li a.active {
          color: #fff;
          background: rgba(130, 70, 255, 0.08);
          padding-left: 1.5rem;
        }

        .mobile-nav-links li a.active {
          color: rgba(255, 200, 100, 0.9);
          background: rgba(255, 180, 50, 0.06);
        }

        .mobile-nav-divider {
          height: 1px;
          background: rgba(130, 70, 255, 0.1);
          margin: 1.5rem 0;
        }

        .mobile-cta {
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(255, 200, 100, 0.9);
          border: 1px solid rgba(255, 190, 80, 0.3);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          display: block;
          text-align: center;
          transition: all 0.3s;
          background: rgba(255, 180, 50, 0.05);
        }

        .mobile-cta:hover {
          background: rgba(255, 180, 50, 0.12);
          border-color: rgba(255, 190, 80, 0.6);
        }

        .mobile-bar-info {
          margin-top: auto;
          padding-top: 2rem;
          font-family: 'Raleway', sans-serif;
        }

        .mobile-bar-address {
          font-size: 11px;
          color: rgba(160, 130, 200, 0.5);
          letter-spacing: 0.08em;
          line-height: 1.6;
        }

        /* Stagger animation for mobile links */
        .mobile-nav-links li {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.3s, transform 0.3s;
        }

        .mobile-drawer.open .mobile-nav-links li:nth-child(1) { opacity: 1; transform: none; transition-delay: 0.1s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.15s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.2s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(4) { opacity: 1; transform: none; transition-delay: 0.25s; }
        .mobile-drawer.open .mobile-nav-links li:nth-child(5) { opacity: 1; transform: none; transition-delay: 0.3s; }
      `}</style>

      {/* Desktop Navbar */}
      <nav className={`navbar-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="logo-wrap">
            <span className="logo-eyebrow">Est. Park Slope</span>
            <span className="logo-main">Commonwealth</span>
          </Link>

          {/* Desktop Links */}
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

          {/* CTA */}
          <Link href="/pages/contact" className="nav-cta">
            Visit Us
          </Link>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={activeLink === link.href ? "active" : ""}
                onClick={() => {
                  setActiveLink(link.href)
                  setMenuOpen(false)
                }}
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