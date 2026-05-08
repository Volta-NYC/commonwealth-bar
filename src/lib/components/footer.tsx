import Link from "next/link"

const navLinks = [
  { label: "Booze", href: "/pages/booze" },
  { label: "Food",  href: "/pages/food" },
  { label: "Jukebox", href: "/pages/jukebox" },
  { label: "About", href: "/pages/about" },
  { label: "Visit", href: "/pages/contact" },
]

const socials = [
  { label: "Twitter", href: "https://twitter.com/commonwealthbar", handle: "@commonwealthbar" },
  { label: "Email",   href: "mailto:commonwealthliveson@gmail.com", handle: "commonwealthliveson@gmail.com" },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          font-family: var(--font-mono);
          background: var(--paper-warm);
          border-top: 1px solid var(--ink-deep);
          color: var(--ink-deep);
          position: relative;
        }
        .ft-root::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 4px;
          height: 1px;
          background: var(--ink-deep);
          opacity: 0.55;
        }

        .ft-poster {
          max-width: 920px;
          margin: 0 auto;
          padding: 4.5rem clamp(1.25rem, 5vw, 2.5rem) 2.5rem;
          text-align: center;
        }

        .ft-stars {
          color: var(--red-deep);
          letter-spacing: 0.45em;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .ft-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.6rem);
          color: var(--ink-deep);
          line-height: 0.95;
          letter-spacing: 0.005em;
          margin-bottom: 0.4rem;
        }
        .ft-title em {
          font-style: italic;
          color: var(--red-deep);
        }

        .ft-rule {
          width: 280px;
          max-width: 80%;
          height: 6px;
          margin: 1.25rem auto 1rem;
          border-top: 1px solid var(--ink-deep);
          border-bottom: 1px solid var(--ink-deep);
        }

        .ft-script {
          font-family: var(--font-script);
          font-size: 1.6rem;
          color: var(--red-deep);
          margin-bottom: 1.5rem;
        }

        .ft-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 2.75rem;
        }
        .ft-tag .dot { color: var(--red-deep); margin: 0 0.5rem; }

        .ft-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          text-align: left;
          padding-top: 2rem;
          padding-bottom: 2rem;
          border-top: 1px dashed var(--rule-strong);
          border-bottom: 1px dashed var(--rule-strong);
        }
        @media (max-width: 700px) {
          .ft-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
        }

        .ft-col-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red-deep);
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .ft-col-body {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--ink-mid);
          line-height: 1.7;
        }
        .ft-col-body a {
          color: var(--ink-deep);
          text-decoration: none;
          border-bottom: 1px solid var(--rule-soft);
          transition: color var(--t-fast),
                      border-color var(--t-fast);
        }
        .ft-col-body a:hover {
          color: var(--red-deep);
          border-color: var(--red-deep);
        }

        .ft-list { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
        .ft-list a {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mid);
          text-decoration: none;
          border-bottom: none;
          transition: color var(--t-fast);
        }
        .ft-list a::before { content: '— '; color: var(--ink-faint); }
        .ft-list a:hover { color: var(--red-deep); }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1.5rem clamp(1.25rem, 5vw, 2.5rem);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-soft);
          max-width: 1240px;
          margin: 0 auto;
        }
        .ft-bottom a {
          color: var(--ink-soft);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color var(--t-fast), border-color var(--t-fast);
        }
        .ft-bottom a:hover {
          color: var(--red-deep);
          border-color: var(--red-deep);
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-poster">
          <div className="ft-stars">★ ★ ★</div>
          <h2 className="ft-title">
            Commonwealth <em>Bar</em>
          </h2>
          <div className="ft-rule" />
          <div className="ft-script">~ a pretty decent bar ~</div>
          <div className="ft-tag">
            Bourbon <span className="dot">·</span> Beer <span className="dot">·</span> Pies
            <span className="dot">·</span> Open till four every night
          </div>

          <div className="ft-grid">
            <div>
              <div className="ft-col-label">Find Us</div>
              <p className="ft-col-body">
                497 5th Avenue<br />
                Park Slope, Brooklyn<br />
                New York 11215<br />
                <a href="tel:7187680009">(718) 768-0009</a>
              </p>
            </div>
            <div>
              <div className="ft-col-label">Hours</div>
              <p className="ft-col-body">
                Mon – Fri: 3 PM – 4 AM<br />
                Sat – Sun: 2 PM – 4 AM<br />
                Open every night, no exceptions
              </p>
            </div>
            <div>
              <div className="ft-col-label">Pages</div>
              <ul className="ft-list">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Commonwealth Bar — All rights reserved</span>
          <span>
            {socials.map((s, i) => (
              <span key={s.href}>
                {i > 0 && <span style={{ margin: "0 0.6rem", color: "var(--ink-faint)" }}>·</span>}
                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              </span>
            ))}
          </span>
        </div>
      </footer>
    </>
  )
}
