//content loader using import.meta.glob
import matter from "gray-matter";

export async function loadArt() {
  const modules = import.meta.glob("/content/art/*.md", { as: "raw" });
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const raw = await loader();
      const { data, content } = matter(raw);
      return { ...data, content, path };
    })
  );
  // sort newest first
  return entries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
