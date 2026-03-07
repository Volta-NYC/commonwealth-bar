"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { pageStyles } from "@/lib/components/pageStyles"

const artists: { name: string; genres: string[] }[] = [
  { name: "The Kinks", genres: ["Rock", "British Invasion"] },
  { name: "Big Star", genres: ["Power Pop", "Rock"] },
  { name: "The Fugs", genres: ["Punk", "Rock"] },
  { name: "Guided by Voices", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "Big Mama Thornton", genres: ["Blues", "R&B"] },
  { name: "The Clash", genres: ["Punk", "Rock"] },
  { name: "Johnny Paycheck", genres: ["Country"] },
  { name: "The Ramones", genres: ["Punk"] },
  { name: "George Jones", genres: ["Country"] },
  { name: "Jets to Brazil", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Pere Ubu", genres: ["Post-Punk", "Experimental"] },
  { name: "John Lee Hooker", genres: ["Blues"] },
  { name: "the Db's", genres: ["Power Pop", "Indie Rock"] },
  { name: "Radiohead", genres: ["Indie Rock", "Experimental"] },
  { name: "Psychedelic Furs", genres: ["Post-Punk", "New Wave"] },
  { name: "Wilco", genres: ["Alt-Country", "Indie Rock"] },
  { name: "The Beatles", genres: ["Rock", "British Invasion"] },
  { name: "Gillian Welch", genres: ["Country", "Folk"] },
  { name: "Charlie Rich", genres: ["Country", "R&B"] },
  { name: "The Dead Boys", genres: ["Punk"] },
  { name: "Bob Mould", genres: ["Indie Rock", "Punk"] },
  { name: "Sonic Youth", genres: ["Indie Rock", "Experimental"] },
  { name: "Dirty Looks", genres: ["Rock"] },
  { name: "Teenage Fanclub", genres: ["Power Pop", "Indie Rock"] },
  { name: "Dinosaur Jr.", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "Uncle Tupelo", genres: ["Alt-Country", "Indie Rock"] },
  { name: "The Pixies", genres: ["Indie Rock", "Alternative"] },
  { name: "R.E.M.", genres: ["Indie Rock", "Alternative"] },
  { name: "The Silos", genres: ["Alt-Country", "Indie Rock"] },
  { name: "The Doors", genres: ["Rock", "Psychedelic"] },
  { name: "Slade", genres: ["Rock", "Glam Rock"] },
  { name: "Buffalo Tom", genres: ["Indie Rock", "Alternative"] },
  { name: "Mudhoney", genres: ["Grunge", "Punk"] },
  { name: "Frank Black", genres: ["Indie Rock", "Alternative"] },
  { name: "Smashing Pumpkins", genres: ["Alternative", "Indie Rock"] },
  { name: "Archers of Loaf", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "The Black Keys", genres: ["Blues Rock", "Rock"] },
  { name: "The White Stripes", genres: ["Blues Rock", "Rock"] },
  { name: "Blitzen Trapper", genres: ["Indie Rock", "Folk"] },
  { name: "The Sweet", genres: ["Glam Rock", "Rock"] },
  { name: "Iggy and the Stooges", genres: ["Punk", "Rock"] },
  { name: "The MC5", genres: ["Punk", "Rock"] },
  { name: "The Gun Club", genres: ["Punk", "Blues"] },
  { name: "Lee Dorsey", genres: ["R&B", "Soul"] },
  { name: "New York Dolls", genres: ["Punk", "Glam Rock"] },
  { name: "Meat Puppets", genres: ["Punk", "Alternative"] },
  { name: "The Nazz", genres: ["Power Pop", "Rock"] },
  { name: "Magnetic Fields", genres: ["Indie Rock", "Experimental"] },
  { name: "Elvis Costello", genres: ["New Wave", "Rock"] },
  { name: "James Hand", genres: ["Country"] },
  { name: "Lene Lovich", genres: ["New Wave", "Post-Punk"] },
  { name: "Tom T. Hall", genres: ["Country"] },
  { name: "Johnny Cash", genres: ["Country"] },
  { name: "Dave Edmunds", genres: ["Rock", "Power Pop"] },
  { name: "Nick Lowe", genres: ["Power Pop", "New Wave"] },
  { name: "Flamin Groovies", genres: ["Rock", "Power Pop"] },
  { name: "Richard and Linda Thompson", genres: ["Folk", "Rock"] },
  { name: "The Dream Syndicate", genres: ["Indie Rock", "Post-Punk"] },
  { name: "The Toy Dolls", genres: ["Punk"] },
  { name: "The Saints", genres: ["Punk", "Power Pop"] },
  { name: "Superchunk", genres: ["Indie Rock", "Punk"] },
  { name: "The Stranglers", genres: ["Punk", "New Wave"] },
  { name: "Aaron Neville", genres: ["Soul", "R&B"] },
  { name: "The Turtles", genres: ["Rock", "Power Pop"] },
  { name: "Ryan Adams", genres: ["Alt-Country", "Indie Rock"] },
  { name: "Them", genres: ["Blues Rock", "Rock"] },
  { name: "Television", genres: ["Post-Punk", "Punk"] },
  { name: "Bay City Rollers", genres: ["Rock", "Power Pop"] },
  { name: "Kitty Wells", genres: ["Country"] },
  { name: "The Modern Lovers", genres: ["Punk", "Rock"] },
  { name: "Donovan", genres: ["Folk", "Psychedelic"] },
  { name: "The Byrds", genres: ["Folk Rock", "Psychedelic"] },
  { name: "Aztec Camera", genres: ["Indie Rock", "New Wave"] },
  { name: "Vic Chesnutt", genres: ["Indie Rock", "Folk"] },
  { name: "The Only Ones", genres: ["Punk", "Power Pop"] },
  { name: "The Minutemen", genres: ["Punk", "Post-Punk"] },
  { name: "Sebadoh", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "The Cramps", genres: ["Punk", "Rockabilly"] },
  { name: "Buck Owens", genres: ["Country"] },
  { name: "Cage The Elephant", genres: ["Indie Rock", "Rock"] },
  { name: "My Morning Jacket", genres: ["Indie Rock", "Alt-Country"] },
  { name: "The Soft Boys", genres: ["Post-Punk", "Psychedelic"] },
  { name: "Cheap Trick", genres: ["Rock", "Power Pop"] },
  { name: "Radio Birdman", genres: ["Punk", "Rock"] },
  { name: "Generation X", genres: ["Punk", "New Wave"] },
  { name: "Mission of Burma", genres: ["Post-Punk", "Punk"] },
  { name: "X-Ray Spex", genres: ["Punk", "New Wave"] },
  { name: "Public Image Ltd", genres: ["Post-Punk", "Experimental"] },
  { name: "Merle Haggard", genres: ["Country"] },
  { name: "The Vaselines", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "Get Up Kids", genres: ["Indie Rock", "Punk"] },
  { name: "Rank & File", genres: ["Alt-Country", "Punk"] },
  { name: "Pylon", genres: ["Post-Punk", "New Wave"] },
  { name: "Broadcast", genres: ["Experimental", "Psychedelic"] },
  { name: "Hank Williams", genres: ["Country"] },
  { name: "Clem Snide", genres: ["Alt-Country", "Indie Rock"] },
  { name: "Grateful Dead", genres: ["Rock", "Psychedelic"] },
  { name: "Captain Beefheart", genres: ["Experimental", "Blues Rock"] },
  { name: "David Bowie", genres: ["Rock", "Glam Rock"] },
  { name: "The Cure", genres: ["Post-Punk", "New Wave"] },
  { name: "Eels", genres: ["Indie Rock", "Alternative"] },
  { name: "Morrissey", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Arcade Fire", genres: ["Indie Rock", "Alternative"] },
  { name: "Beach Boys", genres: ["Rock", "Power Pop"] },
  { name: "Decemberists", genres: ["Indie Rock", "Folk"] },
  { name: "Howlin Wolf", genres: ["Blues"] },
  { name: "Jimi Hendrix", genres: ["Blues Rock", "Psychedelic"] },
  { name: "Talking Heads", genres: ["Post-Punk", "New Wave"] },
  { name: "Lucinda Williams", genres: ["Alt-Country", "Country"] },
  { name: "the Shangri-La's", genres: ["Rock", "R&B"] },
  { name: "Porter Wagoner", genres: ["Country"] },
  { name: "Pretenders", genres: ["Rock", "New Wave"] },
  { name: "Art Brut", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Futureheads", genres: ["Indie Rock", "Post-Punk"] },
  { name: "The Avengers", genres: ["Punk"] },
  { name: "Bruce Springsteen", genres: ["Rock"] },
  { name: "Phoenix", genres: ["Indie Rock", "Alternative"] },
  { name: "Jesus and Mary Chain", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Patti Smith", genres: ["Punk", "Rock"] },
  { name: "The Bee Gees", genres: ["Rock", "R&B"] },
  { name: "Echo And The Bunnymen", genres: ["Post-Punk", "Indie Rock"] },
  { name: "Rain Parade", genres: ["Psychedelic", "Indie Rock"] },
  { name: "The Lyres", genres: ["Punk", "Garage Rock"] },
  { name: "Cat Power", genres: ["Indie Rock", "Folk"] },
  { name: "Helium", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "New Pornographers", genres: ["Power Pop", "Indie Rock"] },
  { name: "The Animals", genres: ["Blues Rock", "British Invasion"] },
  { name: "Kings of Leon", genres: ["Rock", "Indie Rock"] },
  { name: "Queen", genres: ["Rock", "Glam Rock"] },
  { name: "The Blasters", genres: ["Rockabilly", "Blues Rock"] },
  { name: "Yo La Tengo", genres: ["Indie Rock", "Experimental"] },
  { name: "AC/DC", genres: ["Rock"] },
  { name: "Pizzicato Five", genres: ["Indie Rock", "Experimental"] },
  { name: "The Verve", genres: ["Indie Rock", "Alternative"] },
  { name: "Sam & Dave", genres: ["Soul", "R&B"] },
  { name: "Wire", genres: ["Post-Punk", "Punk"] },
  { name: "Gang of Four", genres: ["Post-Punk", "Punk"] },
  { name: "Bo Diddley", genres: ["Blues Rock", "R&B"] },
  { name: "Sparks", genres: ["Glam Rock", "New Wave"] },
  { name: "Roxy Music", genres: ["Glam Rock", "New Wave"] },
  { name: "T. Rex", genres: ["Glam Rock", "Rock"] },
  { name: "Alice Cooper", genres: ["Rock", "Glam Rock"] },
  { name: "War", genres: ["R&B", "Soul"] },
  { name: "Jane's Addiction", genres: ["Alternative", "Rock"] },
  { name: "Nirvana", genres: ["Grunge", "Punk"] },
  { name: "Holly Golightly", genres: ["Garage Rock", "Blues"] },
  { name: "Sugar", genres: ["Indie Rock", "Power Pop"] },
  { name: "The B-52's", genres: ["New Wave", "Post-Punk"] },
  { name: "Redd Kross", genres: ["Power Pop", "Punk"] },
  { name: "The National", genres: ["Indie Rock", "Alternative"] },
  { name: "Elastica", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Screaming Trees", genres: ["Grunge", "Alternative"] },
  { name: "Loretta Lynn", genres: ["Country"] },
  { name: "Wanda Jackson", genres: ["Country", "Rockabilly"] },
  { name: "Oasis", genres: ["Indie Rock", "Rock"] },
  { name: "The Standells", genres: ["Garage Rock", "Punk"] },
  { name: "Camper Van Beethoven", genres: ["Alternative", "Indie Rock"] },
  { name: "Mountain Goats", genres: ["Indie Rock", "Folk"] },
  { name: "Laura Cantrell", genres: ["Country", "Alt-Country"] },
  { name: "Sex Pistols", genres: ["Punk"] },
  { name: "Spoon", genres: ["Indie Rock", "Alternative"] },
  { name: "Will Oldham", genres: ["Folk", "Alt-Country"] },
  { name: "The Leaves", genres: ["Garage Rock", "Rock"] },
  { name: "Dead Kennedys", genres: ["Punk"] },
  { name: "Pink Floyd", genres: ["Psychedelic", "Rock"] },
  { name: "Graham Parker", genres: ["Rock", "New Wave"] },
  { name: "The Creation", genres: ["Garage Rock", "British Invasion"] },
  { name: "The Who", genres: ["Rock", "British Invasion"] },
  { name: "The Breeders", genres: ["Indie Rock", "Alternative"] },
  { name: "Moby Grape", genres: ["Rock", "Psychedelic"] },
  { name: "The Buzzcocks", genres: ["Punk", "Power Pop"] },
  { name: "Pearl Jam", genres: ["Grunge", "Alternative"] },
  { name: "John Lennon", genres: ["Rock"] },
  { name: "Small Faces", genres: ["Rock", "British Invasion"] },
  { name: "Green Day", genres: ["Punk", "Alternative"] },
  { name: "Swervedriver", genres: ["Indie Rock", "Shoegaze"] },
  { name: "X", genres: ["Punk", "Rock"] },
  { name: "Roy Orbison", genres: ["Country", "Rock"] },
  { name: "The Monkees", genres: ["Rock", "Power Pop"] },
  { name: "Bob Dylan", genres: ["Folk", "Rock"] },
  { name: "The Band", genres: ["Rock", "Folk Rock"] },
  { name: "Joy Division", genres: ["Post-Punk"] },
  { name: "Mercury Rev", genres: ["Psychedelic", "Indie Rock"] },
  { name: "Sparklehorse", genres: ["Indie Rock", "Alt-Country"] },
  { name: "Son Volt", genres: ["Alt-Country", "Indie Rock"] },
  { name: "The Zombies", genres: ["British Invasion", "Psychedelic"] },
  { name: "Fountains of Wayne", genres: ["Power Pop", "Indie Rock"] },
  { name: "Pedro The Lion", genres: ["Indie Rock", "Folk"] },
  { name: "The Specials", genres: ["Punk", "Ska"] },
  { name: "The Sea and Cake", genres: ["Indie Rock", "Experimental"] },
  { name: "The Pretty Things", genres: ["Garage Rock", "Rock"] },
  { name: "Beck", genres: ["Alternative", "Indie Rock"] },
  { name: "Drive By Truckers", genres: ["Alt-Country", "Rock"] },
  { name: "Suzi Quatro", genres: ["Rock", "Glam Rock"] },
  { name: "Black Sabbath", genres: ["Rock"] },
  { name: "Urge Overkill", genres: ["Indie Rock", "Rock"] },
  { name: "Louis Jordan", genres: ["R&B", "Blues"] },
  { name: "Solomon Burke", genres: ["Soul", "R&B"] },
  { name: "Ian Dury", genres: ["Punk", "New Wave"] },
  { name: "Eddie Floyd", genres: ["Soul", "R&B"] },
  { name: "Badfinger", genres: ["Rock", "Power Pop"] },
  { name: "The Muffs", genres: ["Punk", "Power Pop"] },
  { name: "The Yardbirds", genres: ["Blues Rock", "British Invasion"] },
  { name: "Aretha Franklin", genres: ["Soul", "R&B"] },
  { name: "Elvis Presley", genres: ["Rock", "Rockabilly"] },
  { name: "Gene Vincent", genres: ["Rockabilly", "Rock"] },
  { name: "Carl Perkins", genres: ["Rockabilly", "Country"] },
  { name: "Muddy Waters", genres: ["Blues"] },
  { name: "Jimmy Reed", genres: ["Blues"] },
  { name: "Blondie", genres: ["New Wave", "Punk"] },
  { name: "Velvet Underground", genres: ["Rock", "Experimental"] },
  { name: "Mott The Hoople", genres: ["Glam Rock", "Rock"] },
  { name: "The Move", genres: ["Rock", "Power Pop"] },
  { name: "Chuck Berry", genres: ["Rock", "Blues Rock"] },
  { name: "Buddy Holly", genres: ["Rock", "Rockabilly"] },
  { name: "Suede", genres: ["Indie Rock", "Glam Rock"] },
  { name: "Dave Rawlings Machine", genres: ["Folk", "Alt-Country"] },
  { name: "Syd Barrett", genres: ["Psychedelic", "Experimental"] },
  { name: "Buffalo Springfield", genres: ["Folk Rock", "Rock"] },
  { name: "Bloc Party", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Led Zeppelin", genres: ["Rock", "Blues Rock"] },
  { name: "Moldy Peaches", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "The Donnas", genres: ["Punk", "Rock"] },
  { name: "They Might Be Giants", genres: ["Indie Rock", "Alternative"] },
  { name: "Stone Roses", genres: ["Indie Rock", "Alternative"] },
  { name: "Husker Du", genres: ["Punk", "Post-Punk"] },
  { name: "Brian Jonestown Massacre", genres: ["Psychedelic", "Indie Rock"] },
  { name: "Olivia Tremor Control", genres: ["Psychedelic", "Indie Rock"] },
  { name: "Neutral Milk Hotel", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "Hoodoo Gurus", genres: ["Power Pop", "Rock"] },
  { name: "Tammy Wynette", genres: ["Country"] },
  { name: "Black Rebel Motorcycle Club", genres: ["Indie Rock", "Rock"] },
  { name: "The Fall", genres: ["Post-Punk", "Indie Rock"] },
  { name: "The Replacements", genres: ["Indie Rock", "Punk"] },
  { name: "Death", genres: ["Punk", "Rock"] },
  { name: "The Damned", genres: ["Punk", "Post-Punk"] },
  { name: "Rodriguez", genres: ["Folk", "Rock"] },
  { name: "Staple Singers", genres: ["Soul", "R&B"] },
  { name: "Sly & The Family Stone", genres: ["Soul", "R&B"] },
  { name: "Thee Headcoats", genres: ["Garage Rock", "Punk"] },
  { name: "Throwing Muses", genres: ["Indie Rock", "Post-Punk"] },
  { name: "The Strokes", genres: ["Indie Rock", "Rock"] },
  { name: "Blur", genres: ["Indie Rock", "Alternative"] },
  { name: "Depeche Mode", genres: ["New Wave", "Post-Punk"] },
  { name: "Aerosmith", genres: ["Rock"] },
  { name: "Black Francis", genres: ["Indie Rock", "Alternative"] },
  { name: "Catherine Wheel", genres: ["Shoegaze", "Indie Rock"] },
  { name: "Ride", genres: ["Shoegaze", "Indie Rock"] },
  { name: "Lush", genres: ["Shoegaze", "Indie Rock"] },
  { name: "The Fleshtones", genres: ["Garage Rock", "Punk"] },
  { name: "The Hives", genres: ["Punk", "Garage Rock"] },
  { name: "The Chills", genres: ["Indie Rock", "Power Pop"] },
  { name: "The Church", genres: ["Indie Rock", "Post-Punk"] },
  { name: "Frank Zappa", genres: ["Experimental", "Rock"] },
  { name: "Kaiser Chiefs", genres: ["Indie Rock", "Post-Punk"] },
  { name: "The Clean", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "The Sonics", genres: ["Garage Rock", "Punk"] },
  { name: "The Killers", genres: ["Indie Rock", "Rock"] },
  { name: "Os Mutantes", genres: ["Psychedelic", "Experimental"] },
  { name: "Built To Spill", genres: ["Indie Rock", "Lo-Fi"] },
  { name: "Otis Redding", genres: ["Soul", "R&B"] },
  { name: "Brian Eno", genres: ["Experimental", "New Wave"] },
  { name: "Wreckless Eric", genres: ["Punk", "New Wave"] },
  { name: "Green On Red", genres: ["Alt-Country", "Indie Rock"] },
  { name: "The Jam", genres: ["Punk", "New Wave"] },
  { name: "Love", genres: ["Psychedelic", "Folk Rock"] },
]

const uniqueArtists = Array.from(new Map(artists.map(a => [a.name, a])).values())

const ALL_GENRES = [
  "Alt-Country", "Alternative", "Blues", "Blues Rock", "British Invasion",
  "Country", "Experimental", "Folk", "Folk Rock", "Garage Rock", "Glam Rock",
  "Grunge", "Indie Rock", "Lo-Fi", "New Wave", "Post-Punk", "Power Pop",
  "Psychedelic", "Punk", "R&B", "Rock", "Rockabilly", "Shoegaze", "Ska", "Soul",
]

export default function JukeboxPage() {
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return uniqueArtists.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchesGenre = !activeGenre || a.genres.includes(activeGenre)
      return matchesSearch && matchesGenre
    })
  }, [search, activeGenre])

  return (
    <>
      <style>{`
        ${pageStyles}

        /* ══════════════════════════════════════════
           PAGE HEADER
        ══════════════════════════════════════════ */
        .jukebox-header {
          position: relative;
          overflow: hidden;
          padding: clamp(5rem, 12vw, 9rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2.5rem, 5vw, 4rem);
          text-align: center;
        }

        .jukebox-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%,
              rgba(155, 32, 10, 0.22) 0%,
              rgba(130, 22, 5, 0.08) 45%,
              transparent 70%
            );
          pointer-events: none;
        }

        .jukebox-eyebrow {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
          position: relative;
        }

        .jukebox-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: var(--cream-bright);
          position: relative;
        }

        .jukebox-title em {
          display: block;
          font-style: italic;
          color: var(--copper-hot);
        }

        .jukebox-desc {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-style: italic;
          color: var(--text-muted);
          margin-top: 1.4rem;
          max-width: 48ch;
          margin-inline: auto;
          line-height: 1.7;
          position: relative;
        }

        /* ══════════════════════════════════════════
           CONTROLS
        ══════════════════════════════════════════ */
        .controls-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem clamp(1.25rem, 5vw, 2.5rem) 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .search-wrap {
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-ghost);
          pointer-events: none;
          display: flex;
        }

        .search-input {
          width: 100%;
          background: rgba(22, 8, 3, 0.70);
          border: 1px solid var(--border-subtle);
          border-radius: 5px;
          padding: 0.72rem 1rem 0.72rem 2.65rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
          transition:
            border-color var(--t-mid) var(--ease-warm),
            box-shadow var(--t-mid) var(--ease-warm);
        }

        .search-input::placeholder { color: var(--text-ghost); }

        .search-input:focus {
          border-color: var(--border-copper);
          box-shadow: var(--glow-copper);
        }

        .genre-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: center;
        }

        .genre-label {
          font-family: var(--font-body);
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-ghost);
          margin-right: 0.2rem;
          flex-shrink: 0;
        }

        .genre-pill {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.32rem 0.75rem;
          border-radius: 100px;
          border: 1px solid var(--border-hair);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition:
            background var(--t-fast) var(--ease-warm),
            border-color var(--t-fast) var(--ease-warm),
            color var(--t-fast) var(--ease-warm),
            box-shadow var(--t-fast) var(--ease-warm);
          white-space: nowrap;
        }

        .genre-pill:hover {
          background: var(--brick-faint);
          border-color: var(--border-subtle);
          color: var(--text-secondary);
        }

        .genre-pill.active {
          background: rgba(165, 38, 10, 0.20);
          border-color: var(--border-soft);
          color: var(--cream-warm);
          box-shadow: var(--glow-brick);
        }

        /* ══════════════════════════════════════════
           RESULTS META
        ══════════════════════════════════════════ */
        .results-meta {
          max-width: 1200px;
          margin: 1.5rem auto 0;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .results-count {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-ghost);
        }

        .results-count strong {
          color: var(--copper-strong);
          font-weight: 500;
        }

        .clear-btn {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-ghost);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color var(--t-fast);
        }

        .clear-btn:hover { color: var(--text-muted); }

        /* ══════════════════════════════════════════
           ORNATE RULE
        ══════════════════════════════════════════ */
        .ornate-rule {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 1.5rem auto 0;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem);
        }

        .ornate-rule::before,
        .ornate-rule::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle) 60%);
        }

        .ornate-rule::after {
          background: linear-gradient(90deg, var(--border-subtle) 40%, transparent);
        }

        .ornate-rule-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--border-copper);
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════════
           ARTIST CLOUD
        ══════════════════════════════════════════ */
        .artists-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem clamp(1.25rem, 5vw, 2.5rem) 5rem;
          min-height: 240px;
        }

        .artists-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.45rem;
          align-items: baseline;
        }

        .artist-chip {
          font-family: var(--font-display);
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          font-weight: 400;
          color: var(--text-secondary);
          cursor: default;
          padding: 0.15em 0;
          transition:
            color var(--t-fast) var(--ease-in-out),
            text-shadow var(--t-fast) var(--ease-in-out);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .artist-chip::after {
          content: '·';
          color: var(--border-copper);
          font-size: 0.85em;
          line-height: 1;
          flex-shrink: 0;
        }

        .artist-chip:last-child::after { display: none; }

        .artist-chip:hover {
          color: var(--cream-warm);
          text-shadow:
            0 0 12px rgba(215, 100, 28, 0.42),
            0 0 28px rgba(180, 65, 12, 0.18);
        }

        .artist-chip:nth-child(7n+3) {
          font-style: italic;
          color: var(--text-muted);
        }

        .artist-chip:nth-child(7n+3):hover { color: var(--copper-hot); }

        /* Empty state */
        .empty-state {
          padding: 4rem 0;
          text-align: center;
        }

        .empty-state p {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-style: italic;
          color: var(--text-ghost);
          max-width: none;
        }

        .empty-state span {
          display: block;
          font-family: var(--font-body);
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-ghost);
          margin-top: 0.6rem;
          font-style: normal;
        }

        /* ══════════════════════════════════════════
           FOOTER NOTE
        ══════════════════════════════════════════ */
        .jukebox-footer-note {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem) 5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .jukebox-footer-note p {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-style: italic;
          color: var(--text-ghost);
          max-width: none;
          line-height: 1.65;
        }

        .back-link {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          border: 1px solid var(--border-hair);
          padding: 0.6rem 1.2rem;
          border-radius: 3px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all var(--t-mid) var(--ease-warm);
        }

        .back-link:hover {
          background: var(--brick-dim);
          border-color: var(--border-soft);
          color: var(--text-secondary);
          box-shadow: var(--glow-brick);
        }
      `}</style>

      {/* HEADER */}
      <header className="jukebox-header">
        <p className="jukebox-eyebrow">Commonwealth Bar — Park Slope</p>
        <h1 className="jukebox-title">
          The
          <em>Jukebox</em>
        </h1>
        <p className="jukebox-desc">
          Curated by Ray. Ranked among the best in New York City.
          No algorithms. No streaming. Just the right records.
        </p>
      </header>

      {/* CONTROLS */}
      <div className="controls-wrap">
        <div className="search-wrap">
          <span className="search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Search artists…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="genre-row">
          <span className="genre-label">Genre</span>
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              className={`genre-pill${activeGenre === g ? " active" : ""}`}
              onClick={() => setActiveGenre(activeGenre === g ? null : g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS META */}
      <div className="results-meta">
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> of {uniqueArtists.length} artists
          {activeGenre && (
            <> &nbsp;·&nbsp; <span style={{ color: "var(--text-muted)" }}>{activeGenre}</span></>
          )}
        </p>
        {(search || activeGenre) && (
          <button className="clear-btn" onClick={() => { setSearch(""); setActiveGenre(null) }}>
            Clear ×
          </button>
        )}
      </div>

      {/* RULE */}
      <div className="ornate-rule">
        <span className="ornate-rule-dot" /><span className="ornate-rule-dot" /><span className="ornate-rule-dot" />
      </div>

      {/* ARTIST CLOUD */}
      <section className="artists-section">
        {filtered.length > 0 ? (
          <div className="artists-cloud">
            {filtered.map((artist) => (
              <span key={artist.name} className="artist-chip">{artist.name}</span>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Nothing found.</p>
            <span>Ray doesn't have that one. Yet.</span>
          </div>
        )}
      </section>

      {/* BOTTOM RULE */}
      <div className="ornate-rule" style={{ marginBottom: "2.5rem" }}>
        <span className="ornate-rule-dot" /><span className="ornate-rule-dot" /><span className="ornate-rule-dot" />
      </div>

      {/* FOOTER */}
      <div className="jukebox-footer-note">
        <p>
          Artists subject to change without notice —<br />
          and frequently do, because Ray has opinions.
        </p>
        <Link href="/" className="back-link">← Back to Home</Link>
      </div>
    </>
  )
}