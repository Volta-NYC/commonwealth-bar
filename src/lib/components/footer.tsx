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
        .footer-root {
          font-family: var(--font-body);
          position: relative;
          overflow: hidden;
          background: var(--bg-void);
        }

        .footer-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--purple-mid) 30%, var(--amber-mid) 60%, transparent 100%);
        }

        .footer-glow-left {
          position: absolute; top: 0; left: -100px;
          width: 400px; height: 300px;
          background: radial-gradient(ellipse, var(--purple-dim) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-glow-right {
          position: absolute; bottom: 0; right: -80px;
          width: 350px; height: 280px;
          background: radial-gradient(ellipse, var(--amber-ember) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 0; z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 3rem; padding-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        .footer-brand-eyebrow {
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--purple-mid); margin-bottom: 6px; font-weight: 400;
        }

        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 28px; font-weight: 700;
          color: var(--text-primary); line-height: 1.1;
          letter-spacing: 0.02em; margin-bottom: 1rem;
        }

        .footer-brand-tagline {
          font-size: 13px; font-weight: 400;
          color: var(--text-muted); line-height: 1.7;
          max-width: 240px; letter-spacing: 0.03em;
          font-style: italic; font-family: var(--font-display);
        }

        .footer-address-block {
          margin-top: 1.75rem; display: flex; flex-direction: column; gap: 4px;
        }

        .footer-address-line {
          font-size: 12px; color: var(--text-muted);
          letter-spacing: 0.06em; line-height: 1.6;
        }

        .footer-address-highlight {
          font-size: 12px; color: var(--amber-mid);
          letter-spacing: 0.1em; font-weight: 500; margin-top: 6px;
        }

        .footer-col-label {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--purple-mid); font-weight: 600; margin-bottom: 1.25rem;
        }

        .footer-nav-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.1rem;
        }

        .footer-nav-list li a {
          display: inline-block;
          font-size: 13px; letter-spacing: 0.06em;
          color: var(--text-secondary); text-decoration: none;
          padding: 0.4rem 0;
          transition: all var(--t-mid); position: relative;
        }

        .footer-nav-list li a::after {
          content: '';
          position: absolute; bottom: 6px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, var(--purple-mid), var(--amber-mid));
          transition: width var(--t-mid) var(--ease-in-out);
        }

        .footer-nav-list li a:hover { color: var(--text-primary); }
        .footer-nav-list li a:hover::after { width: 100%; }

        .footer-social-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.75rem;
        }

        .footer-social-list li a {
          display: flex; align-items: center; gap: 0.6rem;
          text-decoration: none; transition: all var(--t-mid);
        }

        .social-icon-wrap {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: var(--purple-dim);
          display: flex; align-items: center; justify-content: center;
          color: var(--purple-bright); transition: all var(--t-mid); flex-shrink: 0;
        }

        .footer-social-list li a:hover .social-icon-wrap {
          border-color: var(--border-soft);
          background: var(--purple-soft);
          color: var(--text-primary);
          box-shadow: var(--glow-purple);
        }

        .social-label {
          font-size: 11.5px; color: var(--text-muted);
          letter-spacing: 0.04em; transition: color var(--t-mid); line-height: 1.2;
        }

        .footer-social-list li a:hover .social-label { color: var(--text-primary); }

        .footer-phone {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 13px; color: var(--text-secondary);
          text-decoration: none; letter-spacing: 0.06em;
          transition: color var(--t-mid); margin-top: 0.5rem;
        }

        .footer-phone:hover { color: var(--text-primary); }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--border-subtle) 20%, var(--border-subtle) 80%, transparent 100%);
          margin: 0 2rem; position: relative; z-index: 1;
        }

        .footer-bottom {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 1.25rem 2rem 1.5rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem; flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 11px; color: var(--text-ghost); letter-spacing: 0.08em;
        }

        .footer-volta-link {
          font-size: 11px; color: var(--text-ghost);
          text-decoration: none; letter-spacing: 0.08em;
          transition: color var(--t-mid);
          display: flex; align-items: center; gap: 0.35rem;
        }

        .footer-volta-link::before {
          content: '';
          display: inline-block; width: 4px; height: 4px;
          border-radius: 50%; background: var(--purple-mid);
        }

        .footer-volta-link:hover { color: var(--purple-bright); }
      `}</style>

      <footer className="footer-root">
        <div className="footer-glow-left" />
        <div className="footer-glow-right" />

        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <p className="footer-brand-eyebrow">Brooklyn, New York</p>
              <h2 className="footer-brand-name">Commonwealth</h2>
              <p className="footer-brand-tagline">
                A pretty decent bar at the corner of 5th &amp; 12th. Open every night until 4 a.m.
              </p>
              <div className="footer-address-block">
                <span className="footer-address-line">497 5th Avenue</span>
                <span className="footer-address-line">Park Slope, Brooklyn NY 11215</span>
                <a href="tel:7187680009" className="footer-phone">(718) 768-0009</a>
                <span className="footer-address-highlight">Open Daily — Until 4 AM</span>
              </div>
            </div>

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

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Commonwealth Bar. All rights reserved.
          </span>
          <a href="https://nyc.voltanpo.org" target="_blank" rel="noreferrer" className="footer-volta-link">
            Made by @VoltaNYC
          </a>
        </div>
      </footer>
    </>
  )
}