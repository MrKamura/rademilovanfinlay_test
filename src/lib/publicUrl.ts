/** Paths to files in `/public`; respects `base` (e.g. GitHub Pages `/repo/`). */
export function publicUrl(pathFromPublicRoot: string): string {
  const relative = pathFromPublicRoot.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${relative}`
}
