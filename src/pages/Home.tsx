import { useEffect, useState, useMemo } from "react";
import { loadArt } from "../lib/content";
import Nav from "../Nav";
import flowers from "../assets/flowers.png";

type Art = {
  title: string;
  date: string;
  image: string;
  alt?: string;
  medium?: string;     // e.g., "Charcoal", "Photography", "Oil", etc.
  dimensions?: string;
  price?: string;
  forSale?: boolean;
  content?: string;
};

function Home() {
  const [artworks, setArtworks] = useState<Art[]>([]);

  useEffect(() => {
    setArtworks(loadArt()); // sync load (your current approach)
  }, []);

  // --- group by medium ---
  const groupedByMedium = useMemo(() => {
    const by: Record<string, Art[]> = {};
    for (const art of artworks) {
      const key = (art.medium?.trim() || "Uncategorized");
      (by[key] ||= []).push(art);
    }
    return by;
  }, [artworks]);

  // Optional: control section order (others follow alphabetically)
  const preferredOrder = ["Charcoal", "Photography", "Oil", "Acrylic", "Watercolor", "Ink", "Digital"];
  const sectionKeys = useMemo(() => {
    const all = Object.keys(groupedByMedium);
    const orderedFirst = preferredOrder.filter((k) => all.includes(k));
    const remaining = all.filter((k) => !preferredOrder.includes(k)).sort((a, b) => a.localeCompare(b));
    return [...orderedFirst, ...remaining];
  }, [groupedByMedium]);

  return (
    <>
      <Nav />
      <div className="main">
        <div className="hero">
          <h1>Some Big Words About Emily&apos;s Art Portfolio</h1>
          <img className="left-img" src={flowers} alt="" />
          <img className="right-img" src={flowers} alt="" />
        </div>

        <div className="gallery">
          {artworks.length === 0 ? (
            <p className="loading">Loading artworks...</p>
          ) : (
            sectionKeys.map((mediumKey, idx) => (
              <section key={mediumKey} className="medium-section">
                <h2 className={idx % 2 === 0 ? "left" : "right"}>{mediumKey}</h2>
                <div className="grid">
                  {groupedByMedium[mediumKey].map((art) => (
                    <article
                      key={`${mediumKey}-${art.title}`}
                      className="card"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={art.image}
                        alt={art.alt || art.title}
                        loading="lazy"
                      />
                      <div className="info">
                        <h3>{art.title}</h3>
                        {art.medium && <p className="medium">{art.medium}</p>}
                        {art.forSale && <span className="tag for-sale">For Sale</span>}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
