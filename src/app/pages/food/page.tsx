"use client"

import { useEffect, useRef, useState } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const pies = [
  { name: "Shepherd's Pie", desc: "Slow-braised lamb mince, carrots, peas, and onion under a blanket of buttery mashed potato. The one that started it all.", tag: "Meat", color: "#c87830", icon: "🥩" },
  { name: "Chicken & Vegetable", desc: "Free-range chicken, seasonal vegetables, and a rich gravy in a golden shortcrust pastry. Comfort in every bite.", tag: "Meat", color: "#d4a030", icon: "🍗" },
  { name: "Southwestern Vegetable", desc: "Black beans, roasted corn, peppers, and spiced tomato. Bold, smoky, and completely satisfying.", tag: "Vegetarian", color: "#b85020", icon: "🌶️" },
  { name: "Veggie Curry", desc: "Chickpeas, sweet potato, and spinach in a fragrant yellow curry. Warm spice, rich depth, zero regret.", tag: "Vegan", color: "#d09020", icon: "🍛" },
]

const deliveryNeighborhoods = [
  { name: "Park Slope", desc: "Dozens of options within a 5-minute walk" },
  { name: "South Slope", desc: "Pizza, Thai, Japanese, Mexican — all of it" },
  { name: "Gowanus", desc: "The neighborhood's best hidden spots" },
  { name: "Windsor Terrace", desc: "Cozy spots that deliver late" },
]

export default function FoodPage() {
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

  return (
    <>
      <style>{`
        ${pageStyles}

        /* ── PARTNER CALLOUT ── */
        .partner-callout {
          display: flex; align-items: center; gap: 1.5rem;
          background: var(--bg-surface); border: 1px solid var(--border-warm);
          border-radius: 14px; padding: 1.75rem 2rem; margin-bottom: 3rem;
          position: relative; overflow: hidden;
        }
        .partner-callout::before {
          content: ''; position: absolute; top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--amber-ember) 0%, transparent 70%);
          pointer-events: none;
        }
        .partner-callout-icon { font-size: 3rem; flex-shrink: 0; position: relative; z-index: 1; }
        .partner-callout-content { position: relative; z-index: 1; }
        .partner-callout-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-bottom: 5px; font-family: var(--font-body); }
        .partner-callout-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .partner-callout-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; font-weight: 300; }

        /* ── PIE GRID ── */
        .pie-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        @media (max-width: 600px) { .pie-grid { grid-template-columns: 1fr; } }

        .pie-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: 14px; padding: 2rem;
          transition: all var(--t-mid) var(--ease-out-expo); position: relative; overflow: hidden;
        }
        .pie-card:hover { transform: translateY(-4px); border-color: var(--border-soft); box-shadow: var(--glow-purple); }
        .pie-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
        .pie-icon { font-size: 2.2rem; line-height: 1; }
        .pie-tag { font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; padding: 4px 10px; border-radius: 100px; font-family: var(--font-body); border: 1px solid; }
        .pie-tag.meat        { color: rgba(220,140,60,0.8); border-color: rgba(220,140,60,0.2); background: rgba(220,140,60,0.06); }
        .pie-tag.vegetarian  { color: rgba(100,200,100,0.8); border-color: rgba(100,200,100,0.2); background: rgba(100,200,100,0.06); }
        .pie-tag.vegan       { color: rgba(80,210,160,0.8); border-color: rgba(80,210,160,0.2); background: rgba(80,210,160,0.06); }
        .pie-name { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; line-height: 1.2; }
        .pie-desc { font-size: 13px; color: var(--text-muted); line-height: 1.7; font-weight: 300; }
        .pie-accent-line { height: 2px; border-radius: 2px; margin-top: 1.5rem; width: 32px; transition: width var(--t-slow) var(--ease-out-expo); }
        .pie-card:hover .pie-accent-line { width: 64px; }

        /* ── BEER CHEESE ── */
        .cheese-feature { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 700px) { .cheese-feature { grid-template-columns: 1fr; gap: 2rem; } }

        .cheese-visual {
          position: relative; background: var(--bg-surface); border: 1px solid var(--border-warm);
          border-radius: 16px; padding: 3rem 2.5rem; text-align: center; overflow: hidden;
          min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
        }
        .cheese-visual::before {
          content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 300px; background: radial-gradient(circle, var(--amber-ember) 0%, transparent 70%); pointer-events: none;
        }
        .cheese-emoji { font-size: 4.5rem; position: relative; z-index: 1; animation: gentlePulse 4s ease-in-out infinite; }
        .cheese-visual-label { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--text-primary); position: relative; z-index: 1; }
        .cheese-visual-sub { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; font-family: var(--font-body); position: relative; z-index: 1; }
        .cheese-badge-row { display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; margin-top: 0.5rem; }
        .cheese-badge { font-size: 10px; padding: 5px 12px; border-radius: 100px; border: 1px solid var(--border-warm); background: var(--amber-ember); color: var(--amber-bright); letter-spacing: 0.08em; font-family: var(--font-body); }
        .cheese-quote { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2rem); font-style: italic; color: var(--text-primary); line-height: 1.4; margin-bottom: 1.5rem; position: relative; }
        .cheese-quote::before { content: '"'; font-size: 6rem; font-family: var(--font-display); color: var(--purple-dim); position: absolute; top: -20px; left: -16px; line-height: 1; pointer-events: none; }
        .cheese-body { font-size: 14px; color: var(--text-muted); line-height: 1.8; font-weight: 300; margin-bottom: 1.5rem; }
        .cheese-detail-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .cheese-detail { display: flex; align-items: center; gap: 0.6rem; font-size: 12.5px; color: var(--text-muted); }
        .cheese-detail-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--amber-mid); flex-shrink: 0; }

        /* ── DELIVERY ── */
        .delivery-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border-subtle);
          border: 1px solid var(--border-subtle); border-radius: 14px; overflow: hidden; margin-top: 3rem;
        }
        @media (max-width: 700px) { .delivery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 400px) { .delivery-grid { grid-template-columns: 1fr; } }
        .delivery-item { padding: 1.5rem; background: var(--bg-surface); transition: background var(--t-mid); }
        .delivery-item:hover { background: rgba(120, 60, 220, 0.06); }
        .delivery-neighborhood { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .delivery-desc { font-size: 12px; color: var(--text-muted); line-height: 1.55; font-weight: 300; }

        /* ── POPCORN ── */
        .popcorn-strip {
          display: flex; align-items: center; justify-content: center; gap: 1.5rem;
          padding: 2rem; background: var(--purple-dim); border: 1px solid var(--border-subtle);
          border-radius: 12px; margin-top: 3rem; flex-wrap: wrap; text-align: center;
        }
        .popcorn-emoji { font-size: 2.5rem; animation: gentlePulse 5s ease-in-out infinite; }
        .popcorn-text { font-family: var(--font-display); font-style: italic; font-size: 1.1rem; color: var(--text-muted); }
        .popcorn-text strong { color: var(--text-primary); font-style: normal; }

        /* ── LATE NIGHT BAND ── */
        .late-night-band {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, var(--amber-ember) 0%, var(--purple-dim) 100%);
          border-top: 1px solid var(--border-warm); border-bottom: 1px solid var(--border-warm);
          padding: 5rem 2rem; text-align: center;
        }
        .late-night-band::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 100% at 50% 50%, var(--amber-ember) 0%, transparent 70%);
          pointer-events: none;
        }
        .late-night-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .late-night-time { font-family: var(--font-display); font-size: clamp(4rem, 12vw, 9rem); font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; color: var(--amber-pure); margin-bottom: 1rem; }
        .late-night-sub { font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; font-family: var(--font-body); margin-bottom: 1.5rem; }
        .late-night-body { font-family: var(--font-display); font-style: italic; font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; max-width: 480px; margin: 0 auto; }
      `}</style>

      {/* HERO */}
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 65% at 75% 15%, rgba(200, 100, 20, 0.18) 0%, transparent 60%), radial-gradient(ellipse 45% 55% at 15% 85%, rgba(90, 35, 210, 0.16) 0%, transparent 60%), var(--bg-deep)" }} />
        <div className="hero-orb" style={{ top: -60, right: "15%", width: 420, height: 420, background: "rgba(200, 100, 15, 0.09)" }} />
        <div className="hero-orb hero-orb-reverse" style={{ bottom: -40, left: "8%", width: 280, height: 280, background: "rgba(90, 35, 200, 0.09)", animationDelay: "-5s" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <p className="hero-eyebrow">Available Until 4 AM</p>
          <h1 className="hero-title">Eat Well.<br /><em>Stay Late.</em></h1>
          <p className="hero-sub">No kitchen, no problem. We've partnered with the best pie shop in Brooklyn, make our own famous beer cheese, and keep delivery menus from the whole neighborhood on hand.</p>
        </div>
      </section>

      {/* DUB PIES */}
      <section id="pies" ref={reg("pies")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("pies") ? "visible" : ""}`}>Hot & Savory</p>
          <h2 className={`section-title fade-in d1 ${vis("pies") ? "visible" : ""}`}>Dub Pies from <em>The Pie Shop</em></h2>
          <p className={`section-body fade-in d2 ${vis("pies") ? "visible" : ""}`}>Our friends at Down Under Bakery in Brooklyn have been making these since before it was cool. Hand-crimped, hot out of the oven, and available every single night.</p>
          <div className={`partner-callout fade-in d2 ${vis("pies") ? "visible" : ""}`}>
            <span className="partner-callout-icon">🥧</span>
            <div className="partner-callout-content">
              <div className="partner-callout-label">Our Partner</div>
              <div className="partner-callout-title">The Pie Shop / Down Under Bakery — Brooklyn, NY</div>
              <p className="partner-callout-desc">An authentic Australian bakery bringing proper hand-held pies to Park Slope. Every pie is made fresh, delivered hot, and dangerously good after a few rounds.</p>
            </div>
          </div>
          <div className="pie-grid">
            {pies.map((pie, i) => (
              <div key={pie.name} className={`pie-card fade-in d${i + 2} ${vis("pies") ? "visible" : ""}`}>
                <div className="pie-top">
                  <span className="pie-icon">{pie.icon}</span>
                  <span className={`pie-tag ${pie.tag.toLowerCase()}`}>{pie.tag}</span>
                </div>
                <div className="pie-name">{pie.name}</div>
                <p className="pie-desc">{pie.desc}</p>
                <div className="pie-accent-line" style={{ background: `linear-gradient(90deg, ${pie.color}, ${pie.color}44)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* BEER CHEESE */}
      <section id="cheese" ref={reg("cheese")}>
        <div className="section-wrap">
          <div className="cheese-feature">
            <div className={`cheese-visual fade-in ${vis("cheese") ? "visible" : ""}`}>
              <span className="cheese-emoji">🧀</span>
              <div className="cheese-visual-label">Kentucky Beer Cheese</div>
              <div className="cheese-visual-sub">Housemade — Every Night</div>
              <div className="cheese-badge-row">
                <span className="cheese-badge">Housemade</span>
                <span className="cheese-badge">With Crackers</span>
                <span className="cheese-badge">Kentucky Style</span>
              </div>
            </div>
            <div className={`fade-in d2 ${vis("cheese") ? "visible" : ""}`}>
              <p className="section-eyebrow">The House Special</p>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>Famous <em>Beer Cheese</em></h2>
              <p className="cheese-quote">The only thing better than beer is beer in cheese form.</p>
              <p className="cheese-body">Our Kentucky Beer Cheese is made in-house from a recipe that's been refined over years of very dedicated research. Sharp cheddar, a splash of our finest draft, garlic, and a few secrets we're not sharing. Served with crackers.</p>
              <div className="cheese-detail-list">
                {["Made fresh daily in-house","Sharp cheddar base, Kentucky style","Served with house crackers","Available every night until 4 AM","Pairs beautifully with basically everything on tap"].map((d) => (
                  <div key={d} className="cheese-detail"><span className="cheese-detail-dot" />{d}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-divider" />

      {/* DELIVERY */}
      <section id="delivery" ref={reg("delivery")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("delivery") ? "visible" : ""}`}>The Neighborhood</p>
          <h2 className={`section-title fade-in d1 ${vis("delivery") ? "visible" : ""}`}>Full Delivery <em>Menus</em></h2>
          <p className={`section-body fade-in d2 ${vis("delivery") ? "visible" : ""}`}>We keep delivery menus from every neighboring restaurant on hand. Pizza, Thai, sushi, tacos — if it exists within a mile, you can order it here. Just ask your bartender.</p>
          <div className={`delivery-grid fade-in d3 ${vis("delivery") ? "visible" : ""}`}>
            {deliveryNeighborhoods.map((n) => (
              <div key={n.name} className="delivery-item">
                <div className="delivery-neighborhood">{n.name}</div>
                <p className="delivery-desc">{n.desc}</p>
              </div>
            ))}
          </div>
          <div className={`popcorn-strip fade-in d4 ${vis("delivery") ? "visible" : ""}`}>
            <span className="popcorn-emoji">🍿</span>
            <p className="popcorn-text">And yes — <strong>free popcorn</strong> is always out. No strings attached.</p>
            <span className="popcorn-emoji">🍿</span>
          </div>
        </div>
      </section>

      {/* LATE NIGHT BAND */}
      <section id="latenight" ref={reg("latenight")} className="late-night-band">
        <div className={`late-night-inner fade-in ${vis("latenight") ? "visible" : ""}`}>
          <div className="late-night-time">4 AM</div>
          <p className="late-night-sub">Last Food Order — Every Single Night</p>
          <p className="late-night-body">When everywhere else has closed their kitchens and sent their cooks home, we're still here. Pies still hot. Beer cheese still cold. Popcorn always free.</p>
        </div>
      </section>
    </>
  )
}