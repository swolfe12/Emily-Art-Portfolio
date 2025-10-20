import { useEffect, useState, useMemo } from "react";
import { loadArt } from "../lib/content";
import Nav from "../Nav";

type Art = {
  title: string;
  date: string;
  image: string;
  alt?: string;
  section?: "Sketches" | "Projects" | "Photography";
  medium?: string;
  dimensions?: string;
  price?: string;
  forSale?: boolean;
  content?: string;
};

function Gallery() {
  const [artworks, setArtworks] = useState<Art[]>([]);

  useEffect(() => {
    setArtworks(loadArt()); // sync load
  }, []);

  // --- group by SECTION (not medium) ---
  const groupedBySection = useMemo(() => {
    const by: Record<string, Art[]> = {};
    for (const art of artworks) {
      const key = (art.section?.trim() || "Uncategorized");
      (by[key] ||= []).push(art);
    }
    return by;
  }, [artworks]);

  // Optional: control section order (others follow alphabetically)
  const preferredOrder = ["Projects", "Sketches", "Photography", "Uncategorized"];
  const sectionKeys = useMemo(() => {
    const all = Object.keys(groupedBySection);
    const orderedFirst = preferredOrder.filter((k) => all.includes(k));
    const remaining = all
      .filter((k) => !preferredOrder.includes(k))
      .sort((a, b) => a.localeCompare(b));
    return [...orderedFirst, ...remaining];
  }, [groupedBySection]);

  return (
    <>
      <Nav />
      <div className="gallery">
        {artworks.length === 0 ? (
          <p className="loading">Loading artworks...</p>
        ) : (
          sectionKeys.map((sectionKey, idx) => (
            <section key={sectionKey} className="section-group">
              <h2 className={idx % 2 === 0 ? "left" : "right"}>{sectionKey}</h2>
              <div className="grid">
                {groupedBySection[sectionKey].map((art) => (
                  <article
                    key={`${sectionKey}-${art.title}`}
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
                      {/* keep medium visible if present, but you can remove this line if you don't want it */}
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
    </>
  );
}

export default Gallery;
