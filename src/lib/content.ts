import matter from "gray-matter";

export type Art = {
  title: string;
  date: string;
  image: string;
  alt?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
  forSale?: boolean;
  content?: string;
  path: string;
};

export function loadArt(): Art[] {
  // new Vite 5+ syntax
  const modules = import.meta.glob("/content/art/*.md", {
    query: '?raw',
    import: 'default',
    eager: true,
  });

  const entries: Art[] = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = matter(raw as string);
    return {
      title: (data as any).title ?? "Untitled",
      date: (data as any).date ?? new Date(0).toISOString(),
      image: (data as any).image ?? "",
      alt: (data as any).alt,
      medium: (data as any).medium,
      dimensions: (data as any).dimensions,
      price: (data as any).price,
      forSale: (data as any).forSale ?? false,
      content,
      path,
    };
  });

  return entries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
