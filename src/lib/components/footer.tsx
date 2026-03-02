import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Booze", href: "/pages/booze" },
  { label: "Food", href: "/pages/food" },
  { label: "Hours & Contact", href: "/pages/contact" },
  { label: "Jukebox", href: "/pages/jukebox" },
]

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/commonwealthbar",
    handle: "@commonwealthbar",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:commonwealthliveson@gmail.com",
    handle: "commonwealthliveson@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap');

        .footer-root {
          font-family: 'Raleway', sans-serif;
          position: relative;
          overflow: hidden;
          background: #04020e;
        }

        /* Top ambient glow */
        .footer-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(160, 90, 255, 0.4) 30%,
            rgba(255, 180, 80, 0.35) 60%,
            transparent 100%
          );
        }

        /* Background atmosphere */
        .footer-glow-left {
          position: absolute;
          top: 0;
          left: -100px;
          width: 400px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(100, 40, 220, 0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-glow-right {
          position: absolute;
          bottom: 0;
          right: -80px;
          width: 350px;
          height: 280px;
          background: radial-gradient(ellipse, rgba(220, 120, 30, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 0;
          z-index: 1;
        }

        /* Main grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Brand column */
        .footer-brand-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(180, 130, 255, 0.6);
          margin-bottom: 6px;
          font-weight: 400;
        }

        .footer-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f2eeff;
          line-height: 1.1;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
        }

        .footer-brand-tagline {
          font-size: 13px;
          font-weight: 300;
          color: rgba(180, 155, 230, 0.55);
          line-height: 1.7;
          max-width: 240px;
          letter-spacing: 0.03em;
          font-style: italic;
          font-family: 'Playfair Display', serif;
        }

        .footer-address-block {
          margin-top: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-address-line {
          font-size: 12px;
          color: rgba(160, 135, 210, 0.55);
          letter-spacing: 0.06em;
          line-height: 1.6;
        }

        .footer-address-highlight {
          font-size: 12px;
          color: rgba(255, 195, 90, 0.65);
          letter-spacing: 0.1em;
          font-weight: 500;
          margin-top: 6px;
        }

        /* Column headers */
        .footer-col-label {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(160, 110, 255, 0.5);
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        /* Nav links */
        .footer-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .footer-nav-list li a {
          display: inline-block;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(200, 175, 255, 0.6);
          text-decoration: none;
          padding: 0.4rem 0;
          transition: all 0.25s;
          position: relative;
        }

        .footer-nav-list li a::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(160, 90, 255, 0.7), rgba(255, 180, 80, 0.5));
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-nav-list li a:hover {
          color: rgba(240, 225, 255, 0.95);
        }

        .footer-nav-list li a:hover::after {
          width: 100%;
        }

        /* Social links */
        .footer-social-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-social-list li a {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          transition: all 0.25s;
          group: true;
        }

        .social-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(130, 70, 255, 0.18);
          background: rgba(100, 50, 200, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(180, 140, 255, 0.65);
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .footer-social-list li a:hover .social-icon-wrap {
          border-color: rgba(160, 100, 255, 0.4);
          background: rgba(130, 70, 255, 0.12);
          color: rgba(220, 190, 255, 0.9);
          box-shadow: 0 0 12px rgba(130, 70, 255, 0.15);
        }

        .social-label {
          font-size: 11.5px;
          color: rgba(185, 160, 240, 0.6);
          letter-spacing: 0.04em;
          transition: color 0.25s;
          line-height: 1.2;
        }

        .footer-social-list li a:hover .social-label {
          color: rgba(225, 210, 255, 0.9);
        }

        /* Phone */
        .footer-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: rgba(200, 175, 255, 0.6);
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: color 0.25s;
          margin-top: 0.5rem;
        }

        .footer-phone:hover {
          color: rgba(240, 220, 255, 0.9);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(120, 70, 220, 0.15) 20%,
            rgba(120, 70, 220, 0.15) 80%,
            transparent 100%
          );
          margin: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* Bottom bar */
        .footer-bottom {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 11px;
          color: rgba(140, 110, 200, 0.4);
          letter-spacing: 0.08em;
        }

        .footer-volta-link {
          font-size: 11px;
          color: rgba(140, 110, 200, 0.4);
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: color 0.25s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .footer-volta-link::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(160, 90, 255, 0.35);
        }

        .footer-volta-link:hover {
          color: rgba(190, 160, 255, 0.7);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-glow-left" />
        <div className="footer-glow-right" />

        <div className="footer-inner">
          <div className="footer-grid">

            {/* Brand Column */}
            <div>
              <p className="footer-brand-eyebrow">Brooklyn, New York</p>
              <h2 className="footer-brand-name">Commonwealth</h2>
              <p className="footer-brand-tagline">
                A pretty decent bar at the corner of 5th &amp; 12th. Open every night until 4 a.m.
              </p>
              <div className="footer-address-block">
                <span className="footer-address-line">497 5th Avenue</span>
                <span className="footer-address-line">Park Slope, Brooklyn NY 11215</span>
                <a href="tel:7187680009" className="footer-phone">
                  (718) 768-0009
                </a>
                <span className="footer-address-highlight">Open Daily — Until 4 AM</span>
              </div>
            </div>

            {/* Nav Column */}
            <div>
              <p className="footer-col-label">Explore</p>
              <ul className="footer-nav-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <p className="footer-col-label">Connect</p>
              <ul className="footer-social-list">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                      <span className="social-icon-wrap">{s.icon}</span>
                      <span className="social-label">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Commonwealth Bar. All rights reserved.
          </span>
          <a
            href="https://nyc.voltanpo.org"
            target="_blank"
            rel="noreferrer"
            className="footer-volta-link"
          >
            Made by @VoltaNYC
          </a>
        </div>
      </footer>
    </>
  )
}