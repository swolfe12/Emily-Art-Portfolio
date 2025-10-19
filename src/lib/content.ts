// src/lib/content.ts
import YAML from "yaml";

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

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  // Matches:
  // ---\n<yaml>\n---\n<markdown>
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(raw);
  if (!m) return { data: {}, content: raw };
  const data = YAML.parse(m[1]) ?? {};
  const content = m[2] ?? "";
  return { data, content };
}

export function loadArt(): Art[] {
  // Vite 5+ syntax (replaces `as: 'raw'`)
  const modules = import.meta.glob("/content/art/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const entries: Art[] = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw as string);
    return {
      title: data.title ?? "Untitled",
      date: data.date ?? new Date(0).toISOString(),
      image: data.image ?? "",
      alt: data.alt,
      medium: data.medium,
      dimensions: data.dimensions,
      price: data.price,
      forSale: data.forSale ?? false,
      content,
      path,
    };
  });

  return entries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
