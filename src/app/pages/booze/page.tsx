"use client"

import { useState, useEffect, useRef } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const categories = [
  { id: "drafts", label: "On Tap", emoji: "🍺" },
  { id: "bottles", label: "Bottles & Cans", emoji: "🍻" },
  { id: "bourbon", label: "Bourbon", emoji: "🥃" },
  { id: "cocktails", label: "Cocktails", emoji: "🍸" },
  { id: "wine", label: "Wine", emoji: "🍷" },
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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id])) }) },
      { threshold: 0.08 }
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

        /* ── CATEGORY NAV ── */
        .cat-nav-wrap {
          position: sticky; top: 72px; z-index: 50;
          background: rgba(7, 4, 26, 0.85);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .cat-nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
        }
        .cat-nav-inner::-webkit-scrollbar { display: none; }
        .cat-btn {
          flex-shrink: 0; display: flex; align-items: center; gap: 0.5rem;
          padding: 1rem 1.5rem;
          font-family: var(--font-body); font-size: 11px; letter-spacing: 0.14em;
          text-transform: uppercase; font-weight: 600;
          color: var(--text-muted); background: none;
          border: none; border-bottom: 2px solid transparent;
          cursor: pointer; transition: all var(--t-mid); white-space: nowrap;
        }
        .cat-btn:hover { color: var(--text-secondary); }
        .cat-btn.active { color: var(--amber-pure); border-bottom-color: var(--amber-pure); }

        /* ── DRAFT GRID ── */
        .drafts-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border-subtle);
          border: 1px solid var(--border-subtle); border-radius: 16px; overflow: hidden;
        }
        @media (max-width: 900px) { .drafts-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .drafts-grid { grid-template-columns: 1fr; } }

        .draft-card {
          position: relative; background: var(--bg-deep);
          overflow: hidden; transition: all var(--t-slow) var(--ease-out-expo);
          min-height: 240px; display: flex; flex-direction: column; justify-content: flex-end;
        }
        .draft-card-img {
          position: absolute; inset: 0; background-size: cover; background-position: center;
          opacity: 0.18; transition: opacity var(--t-slow), transform 0.6s var(--ease-out-expo);
        }
        .draft-card:hover .draft-card-img { opacity: 0.28; transform: scale(1.04); }
        .draft-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(5, 2, 14, 0.95) 0%, rgba(5, 2, 14, 0.4) 60%, transparent 100%);
        }
        .draft-card-content { position: relative; z-index: 1; padding: 1.5rem; }
        .draft-abv { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-bottom: 4px; }
        .draft-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
        .draft-style { font-size: 10.5px; color: var(--text-muted); letter-spacing: 0.08em; margin-bottom: 0.6rem; text-transform: uppercase; }
        .draft-desc { font-size: 12px; color: var(--text-muted); line-height: 1.55; font-weight: 300; max-height: 0; overflow: hidden; opacity: 0; transition: all var(--t-mid) var(--ease-out-expo); }
        .draft-card:hover .draft-desc { max-height: 60px; opacity: 1; }
        .draft-origin { font-size: 10px; color: var(--amber-soft); margin-top: 0.4rem; }
        .draft-card-accent { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity var(--t-mid); }
        .draft-card:hover .draft-card-accent { opacity: 1; }

        /* ── BOTTLES ── */
        .bottles-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border-subtle);
          border: 1px solid var(--border-subtle); border-radius: 14px; overflow: hidden;
        }
        @media (max-width: 700px) { .bottles-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 400px) { .bottles-grid { grid-template-columns: 1fr; } }
        .bottle-item {
          padding: 1.25rem 1.5rem; background: var(--bg-surface);
          transition: background var(--t-mid); display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;
        }
        .bottle-item:hover { background: rgba(120, 60, 220, 0.07); }
        .bottle-name { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
        .bottle-style { font-size: 10.5px; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; }
        .bottle-desc { font-size: 11.5px; color: var(--text-ghost); line-height: 1.5; margin-top: 4px; font-weight: 300; }
        .bottle-abv { font-size: 10px; color: var(--amber-soft); letter-spacing: 0.1em; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }

        /* ── BOURBON ── */
        .bourbon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 800px) { .bourbon-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .bourbon-grid { grid-template-columns: 1fr; } }
        .bourbon-card {
          background: var(--bg-surface); border: 1px solid var(--border-warm);
          border-radius: 14px; overflow: hidden;
          transition: all var(--t-mid) var(--ease-out-expo); position: relative;
        }
        .bourbon-card:hover { border-color: rgba(255, 160, 40, 0.28); transform: translateY(-4px); box-shadow: var(--glow-amber); }
        .bourbon-img-wrap { height: 160px; overflow: hidden; position: relative; }
        .bourbon-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; transition: opacity var(--t-slow), transform 0.5s var(--ease-out-expo); filter: saturate(0.7) sepia(0.3); }
        .bourbon-card:hover .bourbon-img { opacity: 0.65; transform: scale(1.05); }
        .bourbon-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg-surface) 0%, rgba(10, 5, 24, 0.3) 60%, transparent 100%); }
        .bourbon-proof-badge {
          position: absolute; top: 12px; right: 12px;
          background: var(--amber-ember); border: 1px solid var(--border-warm); border-radius: 100px;
          padding: 3px 10px; font-size: 10px; letter-spacing: 0.12em; color: var(--amber-bright); font-weight: 600;
        }
        .bourbon-body { padding: 1.25rem 1.5rem 1.5rem; }
        .bourbon-region { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber-mid); font-weight: 600; margin-bottom: 5px; }
        .bourbon-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
        .bourbon-style { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.6rem; }
        .bourbon-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.6; font-weight: 300; }

        /* ── KY CALLOUT ── */
        .ky-callout {
          display: flex; align-items: center; gap: 1rem;
          background: linear-gradient(135deg, var(--amber-ember), var(--purple-dim));
          border: 1px solid var(--border-warm); border-radius: 12px;
          padding: 1.5rem 2rem; margin-bottom: 2.5rem; position: relative; overflow: hidden;
        }
        .ky-callout-icon { font-size: 2rem; flex-shrink: 0; }
        .ky-callout-text { font-family: var(--font-display); font-style: italic; font-size: 1rem; color: var(--text-muted); line-height: 1.5; }
        .ky-callout-text strong { color: var(--amber-bright); font-style: normal; }

        /* ── COCKTAILS ── */
        .cocktails-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 800px) { .cocktails-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .cocktails-grid { grid-template-columns: 1fr; } }
        .cocktail-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: 12px; overflow: hidden;
          transition: all var(--t-mid) var(--ease-out-expo);
        }
        .cocktail-card:hover { transform: translateY(-3px); box-shadow: var(--glow-purple); border-color: var(--border-soft); }
        .cocktail-color-bar { height: 3px; transition: height var(--t-mid); }
        .cocktail-card:hover .cocktail-color-bar { height: 4px; }
        .cocktail-body { padding: 1.5rem; }
        .cocktail-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; }
        .cocktail-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.65; font-weight: 300; }

        /* ── WINE ── */
        .wine-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border-subtle);
          border: 1px solid var(--border-subtle); border-radius: 14px; overflow: hidden;
        }
        @media (max-width: 800px) { .wine-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 500px) { .wine-grid { grid-template-columns: 1fr; } }
        .wine-item { padding: 1.5rem; background: var(--bg-surface); transition: background var(--t-mid); }
        .wine-item:hover { background: rgba(100, 40, 200, 0.06); }
        .wine-type-dot { display: inline-flex; align-items: center; gap: 6px; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 6px; }
        .wine-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .wine-dot.white { background: rgba(240, 220, 140, 0.6); }
        .wine-dot.red   { background: rgba(160, 30, 30, 0.8); }
        .wine-dot.rose  { background: rgba(220, 100, 120, 0.7); }
        .wine-name { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
        .wine-region { font-size: 10.5px; color: var(--amber-soft); letter-spacing: 0.08em; margin-bottom: 6px; }
        .wine-desc { font-size: 12px; color: var(--text-ghost); line-height: 1.55; font-weight: 300; }
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
            <button key={cat.id} className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`} onClick={() => setActiveCategory(cat.id)}>
              <span>{cat.emoji}</span>{cat.label}
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
            <div className={`drafts-grid fade-in d3 ${vis("drafts") ? "visible" : ""}`}>
              {drafts.map((d) => (
                <div key={d.name} className="draft-card">
                  <div className="draft-card-img" style={{ backgroundImage: `url(${d.img})` }} />
                  <div className="draft-card-overlay" />
                  <div className="draft-card-content">
                    <div className="draft-abv">ABV {d.abv}</div>
                    <div className="draft-name">{d.name}</div>
                    <div className="draft-style">{d.style}</div>
                    <div className="draft-desc">{d.desc}</div>
                    <div className="draft-origin">{d.origin}</div>
                  </div>
                  <div className="draft-card-accent" style={{ background: `linear-gradient(90deg, ${d.accent}55, ${d.accent}22)` }} />
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
            <div className={`bottles-grid fade-in d3 ${vis("bottles") ? "visible" : ""}`}>
              {bottles.map((b) => (
                <div key={b.name} className="bottle-item">
                  <div>
                    <div className="bottle-name">{b.name}</div>
                    <div className="bottle-style">{b.style}</div>
                    <div className="bottle-desc">{b.desc}</div>
                  </div>
                  <div className="bottle-abv">{b.abv}</div>
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
              <span className="ky-callout-icon">🏛️</span>
              <p className="ky-callout-text"><strong>Kentucky is a Commonwealth.</strong> And so are we. That's not a coincidence — it's a philosophy. We take our bourbon seriously, and so should you.</p>
            </div>
            <div className={`bourbon-grid fade-in d3 ${vis("bourbon") ? "visible" : ""}`}>
              {bourbons.map((b) => (
                <div key={b.name} className="bourbon-card">
                  <div className="bourbon-img-wrap">
                    <img src={b.img} alt={b.name} className="bourbon-img" />
                    <div className="bourbon-img-overlay" />
                    <div className="bourbon-proof-badge">{b.proof} proof</div>
                  </div>
                  <div className="bourbon-body">
                    <div className="bourbon-region">{b.region}</div>
                    <div className="bourbon-name">{b.name}</div>
                    <div className="bourbon-style">{b.style}</div>
                    <p className="bourbon-desc">{b.desc}</p>
                  </div>
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
            <div className={`cocktails-grid fade-in d3 ${vis("cocktails") ? "visible" : ""}`}>
              {cocktails.map((c) => (
                <div key={c.name} className="cocktail-card">
                  <div className="cocktail-color-bar" style={{ background: `linear-gradient(90deg, ${c.color}99, ${c.color}33)` }} />
                  <div className="cocktail-body">
                    <div className="cocktail-name">{c.name}</div>
                    <p className="cocktail-desc">{c.desc}</p>
                  </div>
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
            <div className={`wine-grid fade-in d3 ${vis("wine") ? "visible" : ""}`}>
              {wines.map((w) => (
                <div key={w.name} className="wine-item">
                  <div className="wine-type-dot">
                    <span className={`wine-dot ${w.style === "White" ? "white" : w.style === "Rosé" ? "rose" : "red"}`} />
                    {w.style}
                  </div>
                  <div className="wine-name">{w.name}</div>
                  <div className="wine-region">{w.region}</div>
                  <p className="wine-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}