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