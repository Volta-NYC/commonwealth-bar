// lib/pageStyles.ts
// Shared CSS used across inner pages. Vintage-poster palette.
// Import via <style>{pageStyles}</style> at the top of each page.

export const pageStyles = `
  /* ── ANIMATIONS ── */
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes slowFloat { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -8px); } }
  @keyframes gentlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.7); } }

  /* ── HERO BASE ── */
  .page-hero {
    position: relative;
    min-height: 50vh;
    display: flex;
    align-items: flex-end;
    padding: calc(64px + 2rem) 2rem 3rem;
    overflow: hidden;
    background: var(--paper-base);
    border-bottom: 1px solid var(--ink-deep);
  }

  /* glow blobs are no-ops in the print aesthetic */
  .hero-orb { display: none; }
  .hero-orb-reverse { display: none; }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--red-deep);
    font-weight: 400;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeUp 0.8s var(--ease-out-expo) 0.2s forwards;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 8vw, 6.5rem);
    font-weight: 400;
    line-height: 0.98;
    color: var(--ink-deep);
    letter-spacing: -0.005em;
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 0.9s var(--ease-out-expo) 0.4s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--red-deep);
  }

  .hero-sub {
    margin-top: 1.2rem;
    font-family: var(--font-body);
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--ink-mid);
    max-width: 56ch;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeUp 0.8s var(--ease-out-expo) 0.6s forwards;
  }

  /* ── SECTION LAYOUT ── */
  .section-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 2.5rem);
  }

  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--ink-soft);
    font-weight: 400;
    margin-bottom: 0.8rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    color: var(--ink-deep);
    margin-bottom: 0.75rem;
    line-height: 1.05;
    letter-spacing: -0.005em;
  }

  .section-title em {
    font-style: italic;
    color: var(--red-deep);
  }

  .section-body {
    font-family: var(--font-body);
    font-size: 1.05rem;
    color: var(--ink-mid);
    line-height: 1.78;
    font-weight: 400;
    max-width: 60ch;
    margin-bottom: 2.5rem;
  }

  /* ── DIVIDER ── */
  .page-divider {
    height: 1px;
    background: var(--ink-deep);
    opacity: 0.45;
    margin: 0 clamp(1.25rem, 5vw, 2.5rem);
  }

  /* ── FADE IN ── */
  .fade-in {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s var(--ease-out-expo),
                transform 0.7s var(--ease-out-expo);
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.05s; }
  .d2 { transition-delay: 0.12s; }
  .d3 { transition-delay: 0.20s; }
  .d4 { transition-delay: 0.28s; }
  .d5 { transition-delay: 0.35s; }
  .d6 { transition-delay: 0.42s; }

  /* ── CARD (poster panel) ── */
  .glass-card {
    background: var(--paper-warm);
    border: 1px solid var(--ink-deep);
    border-radius: 0;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition: background var(--t-mid) var(--ease-in-out),
                transform var(--t-mid) var(--ease-in-out);
  }
  .glass-card:hover {
    background: var(--paper-bright);
    transform: translateY(-2px);
    box-shadow: none;
  }
  .glass-card-warm:hover {
    background: var(--paper-bright);
  }

  /* ── BTN HERO PRIMARY ── */
  .btn-hero-primary {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 400;
    background: var(--red-deep);
    color: var(--paper-bright);
    border: 1px solid var(--red-deep);
    padding: 0.85rem 1.6rem;
    border-radius: 0;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: background var(--t-fast) var(--ease-in-out),
                color var(--t-fast) var(--ease-in-out);
  }
  .btn-hero-primary:hover {
    background: var(--red-blood);
    color: var(--cream-pure);
    border-color: var(--red-blood);
  }

  /* ── BTN HERO GHOST ── */
  .btn-hero-ghost {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 400;
    color: var(--ink-deep);
    background: transparent;
    border: 1px solid var(--ink-deep);
    padding: 0.85rem 1.6rem;
    border-radius: 0;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: background var(--t-fast),
                color var(--t-fast);
  }
  .btn-hero-ghost:hover {
    background: var(--ink-deep);
    color: var(--paper-bright);
  }
`
