// lib/pageStyles.ts
// Shared CSS used across all page components.
// Import and inject via <style>{pageStyles}</style> at the top of each page.
// All values reference CSS custom properties defined in globals.css.

export const pageStyles = `
  /* ── SHARED ANIMATIONS ── */
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slowFloat {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(18px, -18px); }
  }

  @keyframes gentlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  /* ── HERO BASE ── */
  .page-hero {
    position: relative;
    min-height: 55vh;
    display: flex;
    align-items: flex-end;
    padding: 0 2rem 4rem;
    overflow: hidden;
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: slowFloat 20s ease-in-out infinite;
  }

  .hero-orb-reverse { animation-direction: reverse; }

  .hero-eyebrow {
    font-size: 9px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--amber-mid);
    font-weight: 600;
    font-family: var(--font-body);
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.8s var(--ease-out-expo) 0.2s forwards;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 700;
    line-height: 0.95;
    color: var(--text-primary);
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.9s var(--ease-out-expo) 0.4s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--amber-pure);
  }

  .hero-sub {
    margin-top: 1.25rem;
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--text-muted);
    max-width: 520px;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.8s var(--ease-out-expo) 0.6s forwards;
  }

  /* ── SECTION LAYOUT ── */
  .section-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }

  .section-eyebrow {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--purple-mid);
    font-weight: 600;
    margin-bottom: 1rem;
    font-family: var(--font-body);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    line-height: 1.1;
  }

  .section-title em {
    font-style: italic;
    color: var(--amber-pure);
  }

  .section-body {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.8;
    font-weight: 300;
    max-width: 560px;
    margin-bottom: 3rem;
    font-family: var(--font-display);
    font-style: italic;
  }

  /* ── DIVIDER ── */
  .page-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
    margin: 0 2rem;
  }

  /* ── FADE IN ── */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.05s; }
  .d2 { transition-delay: 0.12s; }
  .d3 { transition-delay: 0.2s; }
  .d4 { transition-delay: 0.28s; }
  .d5 { transition-delay: 0.35s; }
  .d6 { transition-delay: 0.42s; }

  /* ── GLASS CARD ── */
  .glass-card {
    background: rgba(10, 5, 24, 0.6);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: border-color var(--t-mid) var(--ease-in-out),
                transform var(--t-mid) var(--ease-in-out),
                box-shadow var(--t-mid) var(--ease-in-out);
  }

  .glass-card:hover {
    border-color: var(--border-soft);
    transform: translateY(-3px);
    box-shadow: var(--glow-purple);
  }

  .glass-card-warm:hover {
    border-color: var(--border-warm);
    box-shadow: var(--glow-amber);
  }

  /* ── BTN HERO PRIMARY (amber) ── */
  .btn-hero-primary {
    font-family: var(--font-body);
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 600;
    background: linear-gradient(135deg, rgba(215, 135, 25, 0.92), rgba(255, 195, 80, 0.88));
    color: #0a0515;
    border: none; padding: 0.8rem 1.8rem; border-radius: 100px;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all var(--t-mid) var(--ease-out-expo);
    box-shadow: 0 4px 24px rgba(200, 130, 20, 0.28);
  }

  .btn-hero-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-amber-lg);
    color: #0a0515;
  }

  /* ── BTN HERO GHOST (purple outline) ── */
  .btn-hero-ghost {
    font-family: var(--font-body);
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 500; color: var(--text-secondary);
    border: 1px solid var(--border-soft);
    padding: 0.8rem 1.8rem; border-radius: 100px;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all var(--t-mid); background: transparent;
  }

  .btn-hero-ghost:hover {
    background: var(--purple-dim);
    border-color: var(--purple-mid);
    color: var(--text-primary);
    box-shadow: var(--glow-purple);
  }
`