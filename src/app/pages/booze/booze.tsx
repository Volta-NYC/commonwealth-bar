"use client"

import { useState, useEffect, useRef } from "react"

const categories = [
  { id: "drafts", label: "On Tap", emoji: "🍺" },
  { id: "bottles", label: "Bottles & Cans", emoji: "🍻" },
  { id: "bourbon", label: "Bourbon", emoji: "🥃" },
  { id: "cocktails", label: "Cocktails", emoji: "🍸" },
  { id: "wine", label: "Wine", emoji: "🍷" },
]

const drafts = [
  {
    name: "Guinness",
    style: "Irish Stout",
    desc: "Roasted barley, coffee, and a silky nitrogen pour. The classic.",
    abv: "4.2%",
    origin: "Dublin, Ireland",
    img: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(40, 20, 5, 0.9)",
    accent: "#c8832a",
  },
  {
    name: "Brooklyn Lager",
    style: "American Amber Lager",
    desc: "Hoppy, malt-forward, and proudly local. Brooklyn in a glass.",
    abv: "5.2%",
    origin: "Brooklyn, NY",
    img: "https://images.pexels.com/photos/1534353/pexels-photo-1534353.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(180, 90, 10, 0.85)",
    accent: "#e8a030",
  },
  {
    name: "Yuengling Lager",
    style: "American Amber Lager",
    desc: "America's oldest brewery. Amber, smooth, dependable.",
    abv: "4.4%",
    origin: "Pottsville, PA",
    img: "https://images.pexels.com/photos/5530007/pexels-photo-5530007.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(160, 70, 10, 0.85)",
    accent: "#d4902a",
  },
  {
    name: "Sixpoint Bengali IPA",
    style: "India Pale Ale",
    desc: "Aggressive citrus hops, dry finish. Red Hook's finest.",
    abv: "6.7%",
    origin: "Red Hook, Brooklyn",
    img: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(200, 120, 20, 0.85)",
    accent: "#f0b840",
  },
  {
    name: "Gaffel Kölsch",
    style: "Kölsch",
    desc: "Light, crisp, and clean. Cologne's most-poured export.",
    abv: "4.8%",
    origin: "Cologne, Germany",
    img: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(210, 170, 50, 0.7)",
    accent: "#f5d060",
  },
  {
    name: "Anchor Steam",
    style: "California Common",
    desc: "A San Francisco icon. Toasty malt, gentle hops, totally unique.",
    abv: "4.9%",
    origin: "San Francisco, CA",
    img: "https://images.pexels.com/photos/5530007/pexels-photo-5530007.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(170, 80, 15, 0.85)",
    accent: "#dc9030",
  },
  {
    name: "Paulaner Weiss",
    style: "Hefeweizen",
    desc: "Banana and clove. The quintessential Bavarian wheat beer.",
    abv: "5.5%",
    origin: "Munich, Germany",
    img: "https://images.pexels.com/photos/1534353/pexels-photo-1534353.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(230, 190, 60, 0.75)",
    accent: "#f0c840",
  },
  {
    name: "Jever Pilsner",
    style: "German Pilsner",
    desc: "Intensely bitter, very dry. The sharpest pils you'll ever love.",
    abv: "4.9%",
    origin: "Jever, Germany",
    img: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "rgba(200, 180, 40, 0.7)",
    accent: "#e8d050",
  },
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
  {
    name: "Maker's Mark",
    style: "Wheated Bourbon",
    desc: "Soft red winter wheat instead of rye. Smooth, caramel, and approachable.",
    region: "Loretto, KY",
    proof: "90",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Wild Turkey 101",
    style: "Kentucky Straight Bourbon",
    desc: "High rye, high proof, bold character. The bartender's choice.",
    region: "Lawrenceburg, KY",
    proof: "101",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Jim Beam",
    style: "Kentucky Straight Bourbon",
    desc: "The world's best-selling bourbon. Clean, sweet corn, easy.",
    region: "Clermont, KY",
    proof: "80",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Knob Creek",
    style: "Small Batch Bourbon",
    desc: "Full-bodied, aged 9 years. Oak, vanilla, and a long finish.",
    region: "Clermont, KY",
    proof: "100",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Buffalo Trace",
    style: "Kentucky Straight Bourbon",
    desc: "Toffee, vanilla, and a hint of spice. One of America's most respected distilleries.",
    region: "Frankfort, KY",
    proof: "90",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Bulleit Bourbon",
    style: "High Rye Bourbon",
    desc: "Spicy rye forward, oaky, and dry. The frontier whiskey.",
    region: "Lawrenceburg, KY",
    proof: "90",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

const cocktails = [
  {
    name: "Dark & Stormy",
    desc: "Gosling's Black Seal rum, Fever-Tree ginger beer, fresh lime. A perfect storm.",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#c8832a",
  },
  {
    name: "Moscow Mule",
    desc: "Vodka, ginger beer, fresh lime juice. Served in a copper mug the old-fashioned way.",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#88b840",
  },
  {
    name: "Coffee Boy",
    desc: "House special. Espresso vodka, Kahlúa, and something secret. Ask the bartender.",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#6040a0",
  },
  {
    name: "Anti-Oxidant Martini",
    desc: "Blueberry vodka, pomegranate juice, a dash of elderflower. Good for your soul.",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#8030c0",
  },
  {
    name: "The Germain Threat",
    desc: "St. Germain elderflower liqueur, prosecco, soda. Floral and dangerously easy.",
    img: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#d0b030",
  },
  {
    name: "Arnold Palmer",
    desc: "Half iced tea, half lemonade — with vodka if you want to make Arnold proud.",
    img: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#d08820",
  },
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
  const [hoveredDraft, setHoveredDraft] = useState<number | null>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id]))
        })
      },
      { threshold: 0.08 }
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap');

        :root {
          --bg-deep: #07041a;
          --bg-surface: #0d0820;
          --purple-pure: #a06fff;
          --amber-pure: #ffb84a;
          --text-primary: #f0eaff;
          --text-secondary: rgba(210, 185, 255, 0.72);
          --text-muted: rgba(170, 140, 220, 0.48);
          --border-subtle: rgba(120, 70, 255, 0.1);
          --border-soft: rgba(140, 90, 255, 0.18);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Raleway', system-ui, sans-serif;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg-deep);
          color: var(--text-primary);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        /* Grain */
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.028;
          pointer-events: none;
          z-index: 999;
        }

        /* ── HERO ── */
        .booze-hero {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: flex-end;
          padding: 0 2rem 4rem;
          overflow: hidden;
        }

        .booze-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 80% 20%, rgba(180, 80, 10, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(80, 30, 200, 0.18) 0%, transparent 60%),
            #07041a;
        }

        .booze-hero-orb-1 {
          position: absolute;
          top: -80px; right: 10%;
          width: 400px; height: 400px;
          background: rgba(180, 90, 15, 0.1);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: slowFloat 20s ease-in-out infinite;
        }

        .booze-hero-orb-2 {
          position: absolute;
          bottom: -60px; left: 5%;
          width: 300px; height: 300px;
          background: rgba(100, 40, 220, 0.1);
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          animation: slowFloat 16s ease-in-out infinite reverse;
        }

        @keyframes slowFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        .booze-hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-eyebrow {
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255, 185, 60, 0.55);
          font-weight: 600;
          font-family: var(--font-body);
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.8s var(--ease-out) 0.2s forwards;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 700;
          line-height: 0.95;
          color: var(--text-primary);
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.9s var(--ease-out) 0.4s forwards;
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
          color: rgba(200, 170, 255, 0.5);
          max-width: 550px;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.8s var(--ease-out) 0.6s forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── CATEGORY NAV ── */
        .cat-nav-wrap {
          position: sticky;
          top: 72px;
          z-index: 50;
          background: rgba(7, 4, 26, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(120, 70, 255, 0.1);
        }

        .cat-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .cat-nav-inner::-webkit-scrollbar { display: none; }

        .cat-btn {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(180, 150, 255, 0.5);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
        }

        .cat-btn:hover {
          color: rgba(220, 200, 255, 0.85);
        }

        .cat-btn.active {
          color: var(--amber-pure);
          border-bottom-color: var(--amber-pure);
        }

        .cat-btn-emoji {
          font-size: 14px;
        }

        /* ── SECTION CONTAINER ── */
        .section-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .section-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(160, 100, 255, 0.55);
          font-weight: 600;
          margin-bottom: 1rem;
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
          line-height: 1.75;
          font-weight: 300;
          max-width: 560px;
          margin-bottom: 3rem;
          font-family: var(--font-display);
          font-style: italic;
        }

        /* ── DRAFT CARDS ── */
        .drafts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(120, 70, 255, 0.08);
          border: 1px solid rgba(120, 70, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        @media (max-width: 900px) { .drafts-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .drafts-grid { grid-template-columns: 1fr; } }

        .draft-card {
          position: relative;
          background: rgba(8, 4, 20, 0.8);
          padding: 0;
          cursor: default;
          overflow: hidden;
          transition: all 0.4s var(--ease-out);
          min-height: 240px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .draft-card-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          transition: opacity 0.5s, transform 0.6s var(--ease-out);
        }

        .draft-card:hover .draft-card-img {
          opacity: 0.28;
          transform: scale(1.04);
        }

        .draft-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 2, 14, 0.95) 0%, rgba(5, 2, 14, 0.4) 60%, transparent 100%);
        }

        .draft-card-content {
          position: relative;
          z-index: 1;
          padding: 1.5rem;
        }

        .draft-abv {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 185, 60, 0.5);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .draft-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .draft-style {
          font-size: 10.5px;
          color: rgba(170, 140, 255, 0.55);
          letter-spacing: 0.08em;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
        }

        .draft-desc {
          font-size: 12px;
          color: rgba(190, 165, 255, 0.55);
          line-height: 1.55;
          font-weight: 300;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.35s var(--ease-out);
        }

        .draft-card:hover .draft-desc {
          max-height: 60px;
          opacity: 1;
        }

        .draft-origin {
          font-size: 10px;
          color: rgba(255, 185, 60, 0.35);
          margin-top: 0.4rem;
        }

        /* Accent bar bottom */
        .draft-card-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .draft-card:hover .draft-card-accent {
          opacity: 1;
        }

        /* ── BOTTLE LIST ── */
        .bottles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(120, 70, 255, 0.06);
          border: 1px solid rgba(120, 70, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        @media (max-width: 700px) { .bottles-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 400px) { .bottles-grid { grid-template-columns: 1fr; } }

        .bottle-item {
          padding: 1.25rem 1.5rem;
          background: rgba(8, 4, 20, 0.7);
          transition: background 0.25s;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .bottle-item:hover {
          background: rgba(120, 60, 220, 0.07);
        }

        .bottle-name {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .bottle-style {
          font-size: 10.5px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .bottle-desc {
          font-size: 11.5px;
          color: rgba(160, 135, 210, 0.45);
          line-height: 1.5;
          margin-top: 4px;
          font-weight: 300;
        }

        .bottle-abv {
          font-size: 10px;
          color: rgba(255, 185, 60, 0.4);
          letter-spacing: 0.1em;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── BOURBON CARDS ── */
        .bourbon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) { .bourbon-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .bourbon-grid { grid-template-columns: 1fr; } }

        .bourbon-card {
          background: rgba(10, 5, 24, 0.65);
          border: 1px solid rgba(255, 160, 40, 0.1);
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.35s var(--ease-out);
          position: relative;
        }

        .bourbon-card:hover {
          border-color: rgba(255, 160, 40, 0.22);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(160, 70, 10, 0.15);
        }

        .bourbon-img-wrap {
          height: 160px;
          overflow: hidden;
          position: relative;
        }

        .bourbon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
          transition: opacity 0.4s, transform 0.5s var(--ease-out);
          filter: saturate(0.7) sepia(0.3);
        }

        .bourbon-card:hover .bourbon-img {
          opacity: 0.65;
          transform: scale(1.05);
        }

        .bourbon-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 5, 24, 1) 0%, rgba(10, 5, 24, 0.3) 60%, transparent 100%);
        }

        .bourbon-proof-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 160, 40, 0.12);
          border: 1px solid rgba(255, 160, 40, 0.25);
          border-radius: 100px;
          padding: 3px 10px;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: rgba(255, 190, 70, 0.8);
          font-weight: 600;
        }

        .bourbon-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .bourbon-region {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 185, 60, 0.45);
          font-weight: 600;
          margin-bottom: 5px;
        }

        .bourbon-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .bourbon-style {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.6rem;
        }

        .bourbon-desc {
          font-size: 12.5px;
          color: rgba(185, 160, 240, 0.55);
          line-height: 1.6;
          font-weight: 300;
        }

        /* ── COCKTAIL CARDS ── */
        .cocktails-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) { .cocktails-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .cocktails-grid { grid-template-columns: 1fr; } }

        .cocktail-card {
          background: rgba(10, 5, 24, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.35s var(--ease-out);
          position: relative;
        }

        .cocktail-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(80, 30, 200, 0.12);
        }

        .cocktail-color-bar {
          height: 3px;
          transition: height 0.3s;
        }

        .cocktail-card:hover .cocktail-color-bar {
          height: 4px;
        }

        .cocktail-body {
          padding: 1.5rem;
        }

        .cocktail-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .cocktail-desc {
          font-size: 12.5px;
          color: rgba(185, 160, 240, 0.55);
          line-height: 1.65;
          font-weight: 300;
        }

        /* ── WINE ── */
        .wine-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(120, 70, 255, 0.06);
          border: 1px solid rgba(120, 70, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        @media (max-width: 800px) { .wine-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 500px) { .wine-grid { grid-template-columns: 1fr; } }

        .wine-item {
          padding: 1.5rem;
          background: rgba(8, 4, 20, 0.7);
          transition: background 0.25s;
          position: relative;
        }

        .wine-item:hover { background: rgba(100, 40, 200, 0.06); }

        .wine-type-dot {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 6px;
        }

        .wine-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .wine-dot.white { background: rgba(240, 220, 140, 0.6); }
        .wine-dot.red { background: rgba(160, 30, 30, 0.8); }
        .wine-dot.rose { background: rgba(220, 100, 120, 0.7); }

        .wine-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .wine-region {
          font-size: 10.5px;
          color: rgba(255, 185, 60, 0.38);
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .wine-desc {
          font-size: 12px;
          color: rgba(160, 135, 210, 0.45);
          line-height: 1.55;
          font-weight: 300;
        }

        /* ── FADE IN ── */
        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.12s; }
        .d3 { transition-delay: 0.2s; }
        .d4 { transition-delay: 0.28s; }
        .d5 { transition-delay: 0.35s; }

        /* ── SECTION DIVIDER ── */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120, 70, 220, 0.12), transparent);
          margin: 0 2rem;
        }

        /* Kentucky callout */
        .ky-callout {
          background: linear-gradient(135deg, rgba(180, 90, 10, 0.1), rgba(100, 40, 200, 0.08));
          border: 1px solid rgba(255, 165, 40, 0.12);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ky-callout-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .ky-callout-text {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1rem;
          color: rgba(210, 185, 255, 0.65);
          line-height: 1.5;
        }

        .ky-callout-text strong {
          color: rgba(255, 190, 70, 0.8);
          font-style: normal;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="booze-hero">
        <div className="booze-hero-bg" />
        <div className="booze-hero-orb-1" />
        <div className="booze-hero-orb-2" />
        <div className="booze-hero-content">
          <p className="hero-eyebrow">The Full Pour</p>
          <h1 className="hero-title">
            What We<br />
            <em>Drink Here</em>
          </h1>
          <p className="hero-sub">
            Dozens of beers, a serious bourbon program, house cocktails, and wine for the civilized.
            Kentucky is a Commonwealth — get it?
          </p>
        </div>
      </section>

      {/* ── CATEGORY NAV ── */}
      <div className="cat-nav-wrap">
        <div className="cat-nav-inner">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="cat-btn-emoji">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── DRAFTS ── */}
      {activeCategory === "drafts" && (
        <section id="drafts" ref={reg("drafts")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("drafts") ? "visible" : ""}`}>12 Lines Running</p>
            <h2 className={`section-title fade-in d1 ${vis("drafts") ? "visible" : ""}`}>
              On <em>Tap</em> Tonight
            </h2>
            <p className={`section-body fade-in d2 ${vis("drafts") ? "visible" : ""}`}>
              Twelve handles of the good stuff, rotating seasonally. Hover to learn more about each pour.
            </p>
            <div className={`drafts-grid fade-in d3 ${vis("drafts") ? "visible" : ""}`}>
              {drafts.map((d, i) => (
                <div
                  key={d.name}
                  className="draft-card"
                  onMouseEnter={() => setHoveredDraft(i)}
                  onMouseLeave={() => setHoveredDraft(null)}
                >
                  <div
                    className="draft-card-img"
                    style={{ backgroundImage: `url(${d.img})` }}
                  />
                  <div className="draft-card-overlay" />
                  <div className="draft-card-content">
                    <div className="draft-abv">ABV {d.abv}</div>
                    <div className="draft-name">{d.name}</div>
                    <div className="draft-style">{d.style}</div>
                    <div className="draft-desc">{d.desc}</div>
                    <div className="draft-origin">{d.origin}</div>
                  </div>
                  <div
                    className="draft-card-accent"
                    style={{ background: `linear-gradient(90deg, ${d.accent}55, ${d.accent}22)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTLES ── */}
      {activeCategory === "bottles" && (
        <section id="bottles" ref={reg("bottles")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("bottles") ? "visible" : ""}`}>Cold & Ready</p>
            <h2 className={`section-title fade-in d1 ${vis("bottles") ? "visible" : ""}`}>
              Bottles <em>&</em> Cans
            </h2>
            <p className={`section-body fade-in d2 ${vis("bottles") ? "visible" : ""}`}>
              From the classics to a few surprises. Always cold, always rotating.
            </p>
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

      {/* ── BOURBON ── */}
      {activeCategory === "bourbon" && (
        <section id="bourbon" ref={reg("bourbon")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("bourbon") ? "visible" : ""}`}>The Good Stuff</p>
            <h2 className={`section-title fade-in d1 ${vis("bourbon") ? "visible" : ""}`}>
              Kentucky <em>Bourbon</em>
            </h2>
            <div className={`ky-callout fade-in d2 ${vis("bourbon") ? "visible" : ""}`}>
              <span className="ky-callout-icon">🏛️</span>
              <p className="ky-callout-text">
                <strong>Kentucky is a Commonwealth.</strong> And so are we. That's not a coincidence — it's a philosophy. We take our bourbon seriously, and so should you.
              </p>
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

      {/* ── COCKTAILS ── */}
      {activeCategory === "cocktails" && (
        <section id="cocktails" ref={reg("cocktails")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("cocktails") ? "visible" : ""}`}>House Made</p>
            <h2 className={`section-title fade-in d1 ${vis("cocktails") ? "visible" : ""}`}>
              Special <em>Cocktails</em>
            </h2>
            <p className={`section-body fade-in d2 ${vis("cocktails") ? "visible" : ""}`}>
              Each one built by hand. Some have stories. Ask the bartender.
            </p>
            <div className={`cocktails-grid fade-in d3 ${vis("cocktails") ? "visible" : ""}`}>
              {cocktails.map((c) => (
                <div key={c.name} className="cocktail-card">
                  <div
                    className="cocktail-color-bar"
                    style={{ background: `linear-gradient(90deg, ${c.color}99, ${c.color}33)` }}
                  />
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

      {/* ── WINE ── */}
      {activeCategory === "wine" && (
        <section id="wine" ref={reg("wine")}>
          <div className="section-wrap">
            <p className={`section-eyebrow fade-in ${vis("wine") ? "visible" : ""}`}>For the Civilized</p>
            <h2 className={`section-title fade-in d1 ${vis("wine") ? "visible" : ""}`}>
              Wine <em>Selection</em>
            </h2>
            <p className={`section-body fade-in d2 ${vis("wine") ? "visible" : ""}`}>
              We're a bar, not a wine bar. But we do it right.
            </p>
            <div className={`wine-grid fade-in d3 ${vis("wine") ? "visible" : ""}`}>
              {wines.map((w) => (
                <div key={w.name} className="wine-item">
                  <div className="wine-type-dot">
                    <span
                      className={`wine-dot ${w.style === "White" ? "white" : w.style === "Rosé" ? "rose" : "red"}`}
                    />
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