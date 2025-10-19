// src/lib/content.ts
import matter from "gray-matter";

export type Art = {
  title: string;
  date: string;          // ISO string from frontmatter
  image: string;         // /uploads/...
  alt?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
  forSale?: boolean;
  content?: string;      // markdown body
  path: string;          // file path (helpful for keys/ids)
};

export async function loadArt(): Promise<Art[]> {
  // NOTE: path is from project root. If your content folder is at repo root, this works.
  // If you moved it, adjust the glob accordingly.
  const modules = import.meta.glob("/content/art/*.md", { as: "raw" });

  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const raw = await loader();
      const { data, content } = matter(raw);

      // Runtime guard (prevents missing fields from crashing build)
      const title = (data as any).title ?? "Untitled";
      const date = (data as any).date ?? new Date(0).toISOString();
      const image = (data as any).image ?? "";

      return {
        title,
        date,
        image,
        alt: (data as any).alt,
        medium: (data as any).medium,
        dimensions: (data as any).dimensions,
        price: (data as any).price,
        forSale: (data as any).forSale ?? false,
        content,
        path,
      } as Art;
    })
  );

  // newest first
  return entries.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}
