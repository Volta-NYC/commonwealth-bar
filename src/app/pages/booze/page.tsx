"use client"

import { useState, useEffect, useRef } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const categories = [
  { id: "drafts",    label: "On Tap",         marker: "I" },
  { id: "bottles",   label: "Bottles & Cans", marker: "II" },
  { id: "bourbon",   label: "Bourbon",        marker: "III" },
  { id: "cocktails", label: "Cocktails",      marker: "IV" },
  { id: "wine",      label: "Wine",           marker: "V" },
]

const drafts = [
  { name: "Guinness", style: "Irish Stout", desc: "Roasted barley, coffee, and a silky nitrogen pour. The classic.", abv: "4.2%", origin: "Dublin, Ireland", img: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#c8832a" },
  { name: "Brooklyn Lager", style: "American Amber Lager", desc: "Hoppy, malt-forward, and proudly local. Brooklyn in a glass.", abv: "5.2%", origin: "Brooklyn, NY", img: "https://images.pexels.com/photos/1534353/pexels-photo-1534353.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#e8a030" },
  { name: "Yuengling Lager", style: "American Amber Lager", desc: "America's oldest brewery. Amber, smooth, dependable.", abv: "4.4%", origin: "Pottsville, PA", img: "https://images.pexels.com/photos/5530007/pexels-photo-5530007.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#d4902a" },
  { name: "Sixpoint Bengali IPA", style: "India Pale Ale", desc: "Aggressive citrus hops, dry finish. Red Hook's finest.", abv: "6.7%", origin: "Red Hook, Brooklyn", img: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#f0b840" },
  { name: "Gaffel Kölsch", style: "Kölsch", desc: "Light, crisp, and clean. Cologne's most-poured export.", abv: "4.8%", origin: "Cologne, Germany", img: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#f5d060" },
  { name: "Anchor Steam", style: "California Common", desc: "A San Francisco icon. Toasty malt, gentle hops, totally unique.", abv: "4.9%", origin: "San Francisco, CA", img: "https://images.pexels.com/photos/5530007/pexels-photo-5530007.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#dc9030" },
  { name: "Paulaner Weiss", style: "Hefeweizen", desc: "Banana and clove. The quintessential Bavarian wheat beer.", abv: "5.5%", origin: "Munich, Germany", img: "https://images.pexels.com/photos/1534353/pexels-photo-1534353.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#f0c840" },
  { name: "Jever Pilsner", style: "German Pilsner", desc: "Intensely bitter, very dry. The sharpest pils you'll ever love.", abv: "4.9%", origin: "Jever, Germany", img: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=600", accent: "#e8d050" },
]

const bottles = [
  { name: "Budweiser", style: "American Lager", desc: "The king. No explanation needed.", abv: "5.0%" },
  { name: "Rolling Rock", style: "Extra Pale Lager", desc: "Cold, light, ice-green bottle.", abv: "4.4%" },
  { name: "Corona", style: "Mexican Lager", desc: "Lime optional. Always refreshing.", abv: "4.6%" },
  { name: "Red Stripe", style: "Jamaican Lager", desc: "Hooray Beer. That says it all.", abv: "4.7%" },
  { name: "Miller High Life", style: "American Lager", desc: "The champagne of beers. We mean it.", abv: "4.6%" },
  { name: "Dale's Pale Ale", style: "American Pale Ale", desc: "First canned craft beer. Hoppy and bright.", abv: "6.5%" },
  { name: "Hitachino White Ale", style: "Belgian Witbier", desc: "Japanese craft. Spiced orange peel and coriander.", abv: "5.5%" },
  { name: "Heineken", style: "Dutch Lager", desc: "Iconic green bottle. Crisp and clean.", abv: "5.0%" },
  { name: "Brooklyn Brown", style: "American Brown Ale", desc: "Roasted, nutty, local. A Brooklyn staple.", abv: "5.6%" },
  { name: "Kopparberg Pear Cider", style: "Swedish Cider", desc: "Sweet, fruity, refreshing. Perfect for the patio.", abv: "4.5%" },
  { name: "Original Sin Cider", style: "Hard Cider", desc: "Hudson Valley apples. Crisp and dry.", abv: "5.0%" },
  { name: "Blue Point Toasted Lager", style: "American Amber Lager", desc: "Long Island brewed. Warm and malty.", abv: "5.5%" },
]

const bourbons = [
  { name: "Maker's Mark", style: "Wheated Bourbon", desc: "Soft red winter wheat instead of rye. Smooth, caramel, and approachable.", region: "Loretto, KY", proof: "90", img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Wild Turkey 101", style: "Kentucky Straight Bourbon", desc: "High rye, high proof, bold character. The bartender's choice.", region: "Lawrenceburg, KY", proof: "101", img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Jim Beam", style: "Kentucky Straight Bourbon", desc: "The world's best-selling bourbon. Clean, sweet corn, easy.", region: "Clermont, KY", proof: "80", img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Knob Creek", style: "Small Batch Bourbon", desc: "Full-bodied, aged 9 years. Oak, vanilla, and a long finish.", region: "Clermont, KY", proof: "100", img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Buffalo Trace", style: "Kentucky Straight Bourbon", desc: "Toffee, vanilla, and a hint of spice. One of America's most respected distilleries.", region: "Frankfort, KY", proof: "90", img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Bulleit Bourbon", style: "High Rye Bourbon", desc: "Spicy rye forward, oaky, and dry. The frontier whiskey.", region: "Lawrenceburg, KY", proof: "90", img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600" },
]

const cocktails = [
  { name: "Dark & Stormy", desc: "Gosling's Black Seal rum, Fever-Tree ginger beer, fresh lime. A perfect storm.", color: "#c8832a" },
  { name: "Moscow Mule", desc: "Vodka, ginger beer, fresh lime juice. Served in a copper mug the old-fashioned way.", color: "#88b840" },
  { name: "Coffee Boy", desc: "House special. Espresso vodka, Kahlúa, and something secret. Ask the bartender.", color: "#6040a0" },
  { name: "Anti-Oxidant Martini", desc: "Blueberry vodka, pomegranate juice, a dash of elderflower. Good for your soul.", color: "#8030c0" },
  { name: "The Germain Threat", desc: "St. Germain elderflower liqueur, prosecco, soda. Floral and dangerously easy.", color: "#d0b030" },
  { name: "Arnold Palmer", desc: "Half iced tea, half lemonade — with vodka if you want to make Arnold proud.", color: "#d08820" },
]

const wines = [
  { name: "Cadonini Pinot Grigio", style: "White", region: "Veneto, Italy", desc: "Light, crisp, and dry. Pear, green apple, hint of almond." },
  { name: "Carta Vieja Sauvignon Blanc", style: "White", region: "Valle Central, Chile", desc: "Grassy, citrusy, and refreshing. A crowd-pleaser." },
  { name: "Red Bicyclette Chardonnay", style: "White", region: "Languedoc, France", desc: "Unoaked, clean, and bright with stone fruit notes." },
  { name: "Massoferrato Rosato", style: "Rosé", region: "Veneto, Italy", desc: "Dry rosé, strawberry and rose petal. Perfect for the patio." },
  { name: "Pepperwood Grove Pinot Noir", style: "Red", region: "California", desc: "Silky, light-bodied. Cherry, raspberry, earthy finish." },
  { name: "Cudgee Creek Shiraz", style: "Red", region: "South Australia", desc: "Bold, peppery, and rich. Dark fruit and a long finish." },
  { name: "Grayson Cellars Cabernet Sauvignon", style: "Red", region: "California", desc: "Full-bodied, blackcurrant and cedar. Classic Cab." },
]

export default function BoozePage() {
  const [activeCategory, setActiveCategory] = useState("drafts")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((p) => new Set([...p, e.target.id]))
          }
        })
      },
      { threshold: 0.08 }
    )
    // Observe whatever sections currently exist (changes when activeCategory flips)
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory])

  const reg = (id: string) => (el: HTMLElement | null) => { if (el) sectionRefs.current.set(id, el) }
  const vis = (id: string) => visibleSections.has(id)

  return (
    <>
      <style>{`
        ${pageStyles}

        /* ── CATEGORY NAV ── */
        .cat-nav-wrap {
          position: sticky; top: 64px; z-index: 50;
          background: var(--paper-bright);
          border-bottom: 1px solid var(--ink-deep);
        }
        .cat-nav-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
          display: flex; gap: 0;
          overflow-x: auto; scrollbar-width: none;
          justify-content: center;
        }
        .cat-nav-inner::-webkit-scrollbar { display: none; }
        .cat-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: baseline; gap: 0.55rem;
          padding: 1rem 1.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 400;
          color: var(--ink-soft);
          background: none;
          border: none;
          border-bottom: 1px solid transparent;
          cursor: pointer;
          transition: color var(--t-fast), border-color var(--t-fast);
          white-space: nowrap;
        }
        .cat-btn .marker {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1rem;
          letter-spacing: 0;
          color: var(--red-deep);
          line-height: 1;
        }
        .cat-btn:hover { color: var(--ink-deep); }
        .cat-btn:hover .marker { color: var(--red-blood); }
        .cat-btn.active {
          color: var(--ink-deep);
          border-bottom-color: var(--red-deep);
        }
        .cat-btn.active .marker { color: var(--red-deep); }

        /* ── MENU LIST (shared by drafts / bottles / bourbon / cocktails / wine) ── */
        .menu-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 3rem;
          border-top: 1px solid var(--ink-deep);
        }
        @media (max-width: 760px) { .menu-list { grid-template-columns: 1fr; gap: 0; } }

        .menu-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.75rem;
          align-items: baseline;
          padding: 1.4rem 1.25rem;
          margin: 0 -1.25rem;
          border-bottom: 1px dashed var(--rule-soft);
          transition: background var(--t-fast);
        }
        .menu-row:hover { background: var(--paper-bright); }

        .menu-name {
          font-family: var(--font-display);
          font-size: 1.35rem;
          line-height: 1.1;
          color: var(--ink-deep);
          letter-spacing: -0.005em;
        }
        .menu-name em { font-style: italic; color: var(--red-deep); }

        .menu-leader {
          height: 1px;
          align-self: end;
          margin-bottom: 0.5rem;
          background-image: radial-gradient(circle, var(--ink-soft) 1px, transparent 1.4px);
          background-size: 6px 2px;
          background-repeat: repeat-x;
          opacity: 0.55;
        }

        .menu-meta {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--red-deep);
          white-space: nowrap;
        }

        .menu-sub {
          grid-column: 1 / -1;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: -0.4rem;
          margin-bottom: 0.5rem;
        }
        .menu-desc {
          grid-column: 1 / -1;
          font-family: var(--font-body);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--ink-mid);
          line-height: 1.6;
          margin-top: 0.25rem;
        }

        /* ── KY CALLOUT ── */
        .ky-callout {
          display: flex; align-items: center; gap: 1.5rem;
          background: var(--paper-bright);
          border: 1px solid var(--ink-deep);
          padding: 1.4rem 1.8rem;
          margin-bottom: 2.5rem;
          position: relative;
        }
        .ky-callout::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid var(--ink-deep);
          opacity: 0.32;
          pointer-events: none;
        }
        .ky-callout-mark {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 2.4rem;
          color: var(--red-deep);
          line-height: 1;
          flex-shrink: 0;
        }
        .ky-callout-text {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 1rem;
          color: var(--ink-mid);
          line-height: 1.55;
        }
        .ky-callout-text strong {
          font-family: var(--font-display);
          font-style: normal;
          font-weight: 400;
          color: var(--red-deep);
        }

        /* ── WINE TYPE DOT ── */
        .wine-dot {
          display: inline-block;
          width: 8px; height: 8px;
          margin-right: 0.5rem;
          vertical-align: 1px;
          border: 1px solid var(--ink-deep);
        }
        .wine-dot.white { background: var(--paper-bright); }
        .wine-dot.red   { background: var(--red-deep); }
        .wine-dot.rose  { background: #d98a92; }
      `}</style>

      {/* HERO */}
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 80% 20%, rgba(180, 80, 10, 0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(80, 30, 200, 0.18) 0%, transparent 60%), var(--bg-deep)" }} />
        <div className="hero-orb" style={{ top: -80, right: "10%", width: 400, height: 400, background: "rgba(180, 90, 15, 0.1)" }} />
        <div className="hero-orb hero-orb-reverse" style={{ bottom: -60, left: "5%", width: 300, height: 300, background: "rgba(100, 40, 220, 0.1)", animationDelay: "-8s" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <p className="hero-eyebrow">The Full Pour</p>
          <h1 className="hero-title">What We<br /><em>Drink Here</em></h1>
          <p className="hero-sub">Dozens of beers, a serious bourbon program, house cocktails, and wine for the civilized. Kentucky is a Commonwealth — get it?</p>
        </div>
      </section>

      {/* CATEGORY NAV */}
      <div className="cat-nav-wrap">
        <div className="cat-nav-inner">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="marker">{cat.marker}.</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* DRAFTS */}
      {activeCategory === "drafts" && (
        <section id="drafts" ref={reg("drafts")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("drafts") ? "visible" : ""}`}>12 Lines Running</p>
            <h2 className={`section-title fade-in d1 ${vis("drafts") ? "visible" : ""}`}>On <em>Tap</em> Tonight</h2>
            <p className={`section-body fade-in d2 ${vis("drafts") ? "visible" : ""}`}>Twelve handles of the good stuff, rotating seasonally. Hover to learn more about each pour.</p>
            <div className={`menu-list fade-in d3 ${vis("drafts") ? "visible" : ""}`}>
              {drafts.map((d) => (
                <div key={d.name} className="menu-row">
                  <span className="menu-name">{d.name}</span>
                  <span className="menu-leader" />
                  <span className="menu-meta">{d.abv}</span>
                  <span className="menu-sub">{d.style} &nbsp;·&nbsp; {d.origin}</span>
                  <p className="menu-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTLES */}
      {activeCategory === "bottles" && (
        <section id="bottles" ref={reg("bottles")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("bottles") ? "visible" : ""}`}>Cold & Ready</p>
            <h2 className={`section-title fade-in d1 ${vis("bottles") ? "visible" : ""}`}>Bottles <em>&</em> Cans</h2>
            <p className={`section-body fade-in d2 ${vis("bottles") ? "visible" : ""}`}>From the classics to a few surprises. Always cold, always rotating.</p>
            <div className={`menu-list fade-in d3 ${vis("bottles") ? "visible" : ""}`}>
              {bottles.map((b) => (
                <div key={b.name} className="menu-row">
                  <span className="menu-name">{b.name}</span>
                  <span className="menu-leader" />
                  <span className="menu-meta">{b.abv}</span>
                  <span className="menu-sub">{b.style}</span>
                  <p className="menu-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOURBON */}
      {activeCategory === "bourbon" && (
        <section id="bourbon" ref={reg("bourbon")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("bourbon") ? "visible" : ""}`}>The Good Stuff</p>
            <h2 className={`section-title fade-in d1 ${vis("bourbon") ? "visible" : ""}`}>Kentucky <em>Bourbon</em></h2>
            <div className={`ky-callout fade-in d2 ${vis("bourbon") ? "visible" : ""}`}>
              <span className="ky-callout-mark">§</span>
              <p className="ky-callout-text">
                <strong>Kentucky is a Commonwealth.</strong> &nbsp;And so are we. That's not a
                coincidence — it's a philosophy. We take our bourbon seriously, and so should you.
              </p>
            </div>
            <div className={`menu-list fade-in d3 ${vis("bourbon") ? "visible" : ""}`}>
              {bourbons.map((b) => (
                <div key={b.name} className="menu-row">
                  <span className="menu-name">{b.name}</span>
                  <span className="menu-leader" />
                  <span className="menu-meta">{b.proof} proof</span>
                  <span className="menu-sub">{b.style} &nbsp;·&nbsp; {b.region}</span>
                  <p className="menu-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COCKTAILS */}
      {activeCategory === "cocktails" && (
        <section id="cocktails" ref={reg("cocktails")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("cocktails") ? "visible" : ""}`}>House Made</p>
            <h2 className={`section-title fade-in d1 ${vis("cocktails") ? "visible" : ""}`}>Special <em>Cocktails</em></h2>
            <p className={`section-body fade-in d2 ${vis("cocktails") ? "visible" : ""}`}>Each one built by hand. Some have stories. Ask the bartender.</p>
            <div className={`menu-list fade-in d3 ${vis("cocktails") ? "visible" : ""}`}>
              {cocktails.map((c) => (
                <div key={c.name} className="menu-row">
                  <span className="menu-name">{c.name}</span>
                  <span className="menu-leader" />
                  <span className="menu-meta">house</span>
                  <p className="menu-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WINE */}
      {activeCategory === "wine" && (
        <section id="wine" ref={reg("wine")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("wine") ? "visible" : ""}`}>For the Civilized</p>
            <h2 className={`section-title fade-in d1 ${vis("wine") ? "visible" : ""}`}>Wine <em>Selection</em></h2>
            <p className={`section-body fade-in d2 ${vis("wine") ? "visible" : ""}`}>We're a bar, not a wine bar. But we do it right.</p>
            <div className={`menu-list fade-in d3 ${vis("wine") ? "visible" : ""}`}>
              {wines.map((w) => (
                <div key={w.name} className="menu-row">
                  <span className="menu-name">
                    <span className={`wine-dot ${w.style === "White" ? "white" : w.style === "Rosé" ? "rose" : "red"}`} />
                    {w.name}
                  </span>
                  <span className="menu-leader" />
                  <span className="menu-meta">{w.style}</span>
                  <span className="menu-sub">{w.region}</span>
                  <p className="menu-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}