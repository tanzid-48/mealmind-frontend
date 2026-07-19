const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600";

// Guards against invalid values (plain text, empty string, etc.) being passed
// to next/image, which throws a hard runtime error on anything that isn't a
// valid absolute URL or root-relative path.
export function safeImageSrc(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE;
  try {
    if (url.startsWith("/")) return url;
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
    return FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}
