import { useEffect, useState } from "react";
import { loadArt } from "../lib/content";

type Art = {
  title: string;
  date: string;
  image: string;
  alt?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
  forSale?: boolean;
  content?: string;
};

function Home() {
    const [artworks, setArtworks] = useState<Art[]>([]);
    //const [selected, setSelected] = useState<Art | null>(null);

    useEffect(() => {
        loadArt().then(setArtworks).catch(console.error);
    }, []);

    //const handleSelect = (art: Art) => setSelected(art);
    //const handleClose = () => setSelected(null);

    return (
        <div className="main">
            <h1>Emily's Art Portfolio</h1>
            <div className="gallery">
                <h2>My Work</h2>
                {artworks.length === 0 ? (
                <p className="loading">Loading artworks...</p>
            ) : (
                <div className="grid">
                {artworks.map((art) => (
                    <article
                    key={art.title}
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
                        <h2>{art.title}</h2>
                        {art.medium && <p className="medium">{art.medium}</p>}
                        {art.forSale && <span className="tag for-sale">For Sale</span>}
                    </div>
                    </article>
                ))}
                </div>
            )}
            </div>
        </div>
    )
}

export default Home;