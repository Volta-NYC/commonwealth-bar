"use client"

import Link from "next/link"
import { pageStyles } from "@/lib/components/pageStyles"

const artists = [
  "The Kinks", "Big Star", "The Fugs", "Guided by Voices", "Big Mama Thornton",
  "The Clash", "Johnny Paycheck", "The Ramones", "George Jones", "Jets to Brazil",
  "Pere Ubu", "John Lee Hooker", "the Db's", "Radiohead", "Psychedelic Furs",
  "Wilco", "The Beatles", "Gillian Welch", "Charlie Rich", "The Dead Boys",
  "Bob Mould", "Sonic Youth", "Dirty Looks", "Teenage Fanclub", "Dinosaur Jr.",
  "Uncle Tupelo", "The Pixies", "R.E.M.", "The Silos", "Hello", "The Doors",
  "Slade", "Buffalo Tom", "Mudhoney", "Frank Black", "Smashing Pumpkins",
  "Archers of Loaf", "The Black Keys", "The White Stripes", "Blitzen Trapper",
  "The Sweet", "Iggy and the Stooges", "The MC5", "The Gun Club", "Lee Dorsey",
  "New York Dolls", "Meat Puppets", "The Nazz", "Magnetic Fields", "Elvis Costello",
  "James Hand", "Lene Lovich", "Tom T. Hall", "Johnny Cash", "Reunion",
  "Ohio Express", "Dave Edmunds", "Nick Lowe", "Flamin Groovies",
  "Richard and Linda Thompson", "The Dream Syndicate", "The Toy Dolls", "The Saints",
  "Superchunk", "The Stranglers", "Aaron Neville", "The Turtles", "Ryan Adams",
  "Them", "Television", "Bay City Rollers", "Kitty Wells", "The Modern Lovers",
  "Donovan", "The Byrds", "Aztec Camera", "Vic Chesnutt", "The Only Ones",
  "The Minutemen", "Sebadoh", "The Cramps", "Buck Owens", "Ass Ponys",
  "Cage The Elephant", "My Morning Jacket", "The Soft Boys", "Cheap Trick",
  "Radio Birdman", "Generation X", "Mission of Burma", "X-Ray Spex",
  "Public Image Ltd", "Merle Haggard", "The Vaselines", "Get Up Kids",
  "Rank & File", "Pylon", "Broadcast", "Hank Williams", "Clem Snide",
  "Del-Vettes", "Grateful Dead", "Captain Beefheart", "David Bowie", "The Cure",
  "Eels", "Morrissey", "The Angels", "Arcade Fire", "Beach Boys", "Decemberists",
  "Howlin Wolf", "Jimi Hendrix", "Talking Heads", "Lucinda Williams",
  "the Shangri-La's", "Porter Wagoner", "Chickasaw Mudd Puppies", "Pretenders",
  "Art Brut", "Futureheads", "The Avengers", "Bruce Springsteen", "Phoenix",
  "Jesus and Mary Chain", "Patti Smith", "The Bee Gees", "Echo And The Bunnymen",
  "Rain Parade", "The Lyres", "Cat Power", "Helium", "New Pornographers",
  "The Animals", "Kings of Leon", "20/20", "Queen", "The Blasters", "Yo La Tengo",
  "AC/DC", "Pizzicato Five", "Secret Machines", "The Verve", "Sam & Dave",
  "Wire", "Gang of Four", "Bo Diddley", "Sparks", "Roxy Music", "T. Rex",
  "Alice Cooper", "War", "Jane's Addiction", "Nirvana", "Luff", "Holly Golightly",
  "Sugar", "The Embarrassment", "The B-52's", "The Clique", "Redd Kross",
  "Leonard Nimoy", "Cornershop", "Clap Your Hands Say Yeah", "The National",
  "Elastica", "Screaming Trees", "Loretta Lynn", "Wanda Jackson", "Oasis",
  "The Standells", "Tenacious D", "Camper Van Beethoven", "Mountain Goats",
  "Laura Cantrell", "Sex Pistols", "Spoon", "Moxy Fruvous", "Will Oldham",
  "The Leaves", "Dead Kennedys", "Pink Floyd", "Folk Implosion", "Graham Parker",
  "The Creation", "The Who", "The Breeders", "Moby Grape", "The Buzzcocks",
  "Pearl Jam", "The Caesars", "John Lennon", "Wide Right", "Leaving Trains",
  "Thee Mighty Caesars", "Small Faces", "Green Day", "Swervedriver",
  "X", "Roy Orbison", "The Monkees", "Bob Dylan", "The Band", "Vice Squad",
  "Tommy James", "Bobby Fuller Four", "Joy Division", "Mercury Rev", "Sparklehorse",
  "Son Volt", "The Zombies", "Fountains of Wayne", "Pedro The Lion", "The Specials",
  "Idlewild", "The Pooh Sticks", "The Sea and Cake", "Arthur \"Big Boy\" Crudup",
  "The Pretty Things", "Beck", "Drive By Truckers", "Suzi Quatro", "Black Sabbath",
  "Urge Overkill", "Louis Jordan", "Solomon Burke", "Ian Dury", "Eddie Floyd",
  "Badfinger", "The Muffs", "The Yardbirds", "Baby Huey", "Aretha Franklin",
  "Elvis Presley", "Gene Vincent", "Carl Perkins", "Muddy Waters", "Jimmy Reed",
  "Poster Children", "Blondie", "Velvet Underground", "Mott The Hoople", "The Move",
  "William Shatner", "Hasil Adkins", "Grizzly Bear", "Chuck Berry", "Buddy Holly",
  "Suede", "Dave Rawlings Machine", "Syd Barrett", "Buffalo Springfield",
  "The Martinets", "Bloc Party", "Led Zeppelin", "Moldy Peaches", "The Donnas",
  "They Might Be Giants", "Stone Roses", "Husker Du", "Brian Jonestown Massacre",
  "Olivia Tremor Control", "Neutral Milk Hotel", "Hoodoo Gurus", "Tammy Wynette",
  "Black Rebel Motorcycle Club", "The Fall", "The Replacements", "Death",
  "The Damned", "Rodriguez", "Staple Singers", "Sly & The Family Stone",
  "Thee Headcoats", "Throwing Muses", "The Strokes", "Blur", "Eugenius",
  "Depeche Mode", "Aerosmith", "Black Francis", "Catherine Wheel", "Ride",
  "Soundtrack of Our Lives", "Mojave 3", "Lush", "The Fleshtones", "The Hives",
  "The Chills", "The Church", "Frank Zappa", "Kaiser Chiefs", "The Clean",
  "The Sonics", "Sex Clark Five", "Bad Books", "Editors", "The Killers",
  "Os Mutantes", "Built To Spill", "Otis Redding", "Brian Eno", "Wreckless Eric",
  "Green On Red", "The Jam", "Love", "Os Mutantes", "Earl Greyhound",
]

// deduplicate
const uniqueArtists = [...new Set(artists)]

export default function JukeboxPage() {
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
          padding: clamp(5rem, 12vw, 9rem) clamp(1.25rem, 5vw, 2.5rem) clamp(3rem, 6vw, 5rem);
          text-align: center;
        }

        /* ambient glow behind the title */
        .jukebox-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%,
              rgba(155, 32, 10, 0.22) 0%,
              rgba(130, 22, 5, 0.08) 45%,
              transparent 70%
            ),
            radial-gradient(ellipse 50% 50% at 50% 100%,
              rgba(185, 80, 12, 0.10) 0%,
              transparent 60%
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
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-style: italic;
          color: var(--text-muted);
          margin-top: 1.5rem;
          max-width: 50ch;
          margin-inline: auto;
          line-height: 1.7;
          position: relative;
        }

        /* ══════════════════════════════════════════
           DIVIDER WITH ORNAMENT
        ══════════════════════════════════════════ */
        .ornate-rule {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
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
          padding: 4rem clamp(1.25rem, 5vw, 2.5rem) 6rem;
        }

        .artists-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 0.55rem;
          /* ragged alignment gives it an organic, printed-list feel */
          align-items: baseline;
        }

        .artist-chip {
          font-family: var(--font-display);
          font-size: clamp(0.85rem, 1.8vw, 1.05rem);
          font-weight: 400;
          color: var(--text-secondary);
          cursor: default;
          padding: 0.18em 0;
          transition:
            color var(--t-fast) var(--ease-in-out),
            text-shadow var(--t-fast) var(--ease-in-out);
          /* separator dot after each, except last */
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .artist-chip::after {
          content: '·';
          color: var(--border-copper);
          font-size: 0.9em;
          line-height: 1;
          flex-shrink: 0;
        }

        .artist-chip:last-child::after {
          display: none;
        }

        .artist-chip:hover {
          color: var(--cream-warm);
          text-shadow:
            0 0 12px rgba(215, 100, 28, 0.40),
            0 0 30px rgba(180, 65, 12, 0.18);
        }

        /* Every ~7th chip gets the italic Cormorant treatment —
           like a hand-written addition to a typed list */
        .artist-chip:nth-child(7n+2) {
          font-style: italic;
          color: var(--text-muted);
        }

        .artist-chip:nth-child(7n+2):hover {
          color: var(--copper-hot);
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
          line-height: 1.6;
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
          transition: all var(--t-mid) var(--ease-warm);
          flex-shrink: 0;
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

      {/* ORNATE RULE */}
      <div className="ornate-rule">
        <span className="ornate-rule-dot" />
        <span className="ornate-rule-dot" />
        <span className="ornate-rule-dot" />
      </div>

      {/* ARTIST CLOUD */}
      <section className="artists-section">
        <div className="artists-cloud">
          {uniqueArtists.map((artist) => (
            <span key={artist} className="artist-chip">
              {artist}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="ornate-rule">
        <span className="ornate-rule-dot" />
        <span className="ornate-rule-dot" />
        <span className="ornate-rule-dot" />
      </div>

      <div className="jukebox-footer-note">
        <p>
          Artists subject to change without notice — and frequently do,
          because Ray has opinions.
        </p>
        <Link href="/" className="back-link">← Back to Home</Link>
      </div>
    </>
  )
}