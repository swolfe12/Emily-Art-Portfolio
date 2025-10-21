// src/lib/content.ts
import YAML from "yaml";

export type Art = {
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
  path: string;
};

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(raw);
  if (!m) return { data: {}, content: raw };
  return { data: YAML.parse(m[1]) ?? {}, content: m[2] ?? "" };
}

export function loadArt(): Art[] {
  const modules = import.meta.glob("/content/art/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const normalizeSection = (s: unknown): Art["section"] => {
    if (typeof s !== "string") return undefined;
    const v = s.trim();
    if (["Sketches", "Projects", "Photography"].includes(v)) return v as Art["section"];
    return undefined; // ignore unexpected values
  };

  const entries: Art[] = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw as string);
    return {
      title: data.title ?? "Untitled",
      date: data.date ?? new Date(0).toISOString(),
      image: data.image ?? "",
      alt: data.alt,
      section: normalizeSection(data.section),   // <-- IMPORTANT
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
