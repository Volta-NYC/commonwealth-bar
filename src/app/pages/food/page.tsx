"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const pies = [
  {
    name: "Shepherd's Pie",
    desc: "Slow-braised lamb mince, carrots, peas, and onion under a blanket of buttery mashed potato. The one that started it all.",
    tag: "Meat",
    color: "#c87830",
    icon: "🥩",
  },
  {
    name: "Chicken & Vegetable",
    desc: "Free-range chicken, seasonal vegetables, and a rich gravy in a golden shortcrust pastry. Comfort in every bite.",
    tag: "Meat",
    color: "#d4a030",
    icon: "🍗",
  },
  {
    name: "Southwestern Vegetable",
    desc: "Black beans, roasted corn, peppers, and spiced tomato. Bold, smoky, and completely satisfying.",
    tag: "Vegetarian",
    color: "#b85020",
    icon: "🌶️",
  },
  {
    name: "Veggie Curry",
    desc: "Chickpeas, sweet potato, and spinach in a fragrant yellow curry. Warm spice, rich depth, zero regret.",
    tag: "Vegan",
    color: "#d09020",
    icon: "🍛",
  },
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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id]))
        })
      },
      { threshold: 0.1 }
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
  }
  const vis = (id: string) => visibleSections.has(id)

  return (
    <>
      
      `}</style>

      {/* ── HERO ── */}
      <section className="food-hero">
        <div className="food-hero-bg" />
        <div className="food-hero-orb-1" />
        <div className="food-hero-orb-2" />
        <div className="food-hero-content">
          <p className="hero-eyebrow">Available Until 4 AM</p>
          <h1 className="hero-title">
            Eat Well.<br />
            <em>Stay Late.</em>
          </h1>
          <p className="hero-sub">
            No kitchen, no problem. We've partnered with the best pie shop in Brooklyn, make our own famous beer cheese, and keep delivery menus from the whole neighborhood on hand.
          </p>
        </div>
      </section>

      {/* ── DUB PIES ── */}
      <section id="pies" ref={reg("pies")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("pies") ? "visible" : ""}`}>Hot & Savory</p>
          <h2 className={`section-title fade-in d1 ${vis("pies") ? "visible" : ""}`}>
            Dub Pies from <em>The Pie Shop</em>
          </h2>
          <p className={`section-body fade-in d2 ${vis("pies") ? "visible" : ""}`}>
            Our friends at Down Under Bakery in Brooklyn have been making these since before it was cool. Hand-crimped, hot out of the oven, and available every single night.
          </p>

          <div className={`partner-callout fade-in d2 ${vis("pies") ? "visible" : ""}`}>
            <span className="partner-callout-icon">🥧</span>
            <div className="partner-callout-content">
              <div className="partner-callout-label">Our Partner</div>
              <div className="partner-callout-title">The Pie Shop / Down Under Bakery — Brooklyn, NY</div>
              <p className="partner-callout-desc">
                An authentic Australian bakery bringing proper hand-held pies to Park Slope. Every pie is made fresh, delivered hot, and dangerously good after a few rounds.
              </p>
            </div>
          </div>

          <div className="pie-grid">
            {pies.map((pie, i) => (
              <div
                key={pie.name}
                className={`pie-card fade-in d${i + 2} ${vis("pies") ? "visible" : ""}`}
              >
                <div className="pie-top">
                  <span className="pie-icon">{pie.icon}</span>
                  <span className={`pie-tag ${pie.tag.toLowerCase()}`}>{pie.tag}</span>
                </div>
                <div className="pie-name">{pie.name}</div>
                <p className="pie-desc">{pie.desc}</p>
                <div
                  className="pie-accent-line"
                  style={{ background: `linear-gradient(90deg, ${pie.color}, ${pie.color}44)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── BEER CHEESE ── */}
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

            <div className={`cheese-content fade-in d2 ${vis("cheese") ? "visible" : ""}`}>
              <p className="section-eyebrow">The House Special</p>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                Famous <em>Beer Cheese</em>
              </h2>
              <p className="cheese-quote">
                The only thing better than beer is beer in cheese form.
              </p>
              <p className="cheese-body">
                Our Kentucky Beer Cheese is made in-house from a recipe that's been refined over years of very dedicated research. Sharp cheddar, a splash of our finest draft, garlic, and a few secrets we're not sharing. Served with crackers and absolutely no apology for how addictive it is.
              </p>
              <div className="cheese-detail-list">
                {[
                  "Made fresh daily in-house",
                  "Sharp cheddar base, Kentucky style",
                  "Served with house crackers",
                  "Available every night until 4 AM",
                  "Pairs beautifully with basically everything on tap",
                ].map((d) => (
                  <div key={d} className="cheese-detail">
                    <span className="cheese-detail-dot" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── DELIVERY ── */}
      <section id="delivery" ref={reg("delivery")}>
        <div className="section-wrap">
          <p className={`section-eyebrow fade-in ${vis("delivery") ? "visible" : ""}`}>The Neighborhood</p>
          <h2 className={`section-title fade-in d1 ${vis("delivery") ? "visible" : ""}`}>
            Full Delivery <em>Menus</em>
          </h2>
          <p className={`section-body fade-in d2 ${vis("delivery") ? "visible" : ""}`}>
            We keep delivery menus from every neighboring restaurant on hand. Pizza, Thai, sushi, tacos — if it exists within a mile, you can order it here. Just ask your bartender.
          </p>

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
            <p className="popcorn-text">
              And yes — <strong>free popcorn</strong> is always out. No strings attached.
            </p>
            <span className="popcorn-emoji">🍿</span>
          </div>
        </div>
      </section>

      {/* ── LATE NIGHT BAND ── */}
      <section id="latenight" ref={reg("latenight")} className="late-night-band">
        <div className={`late-night-inner fade-in ${vis("latenight") ? "visible" : ""}`}>
          <div className="late-night-time">4 AM</div>
          <p className="late-night-sub">Last Food Order — Every Single Night</p>
          <p className="late-night-body">
            When everywhere else has closed their kitchens and sent their cooks home, we're still here. Pies still hot. Beer cheese still cold. Popcorn always free.
          </p>
        </div>
      </section>
    </>
  )
}