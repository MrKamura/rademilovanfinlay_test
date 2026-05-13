/** Paths to files in `/public`; respects `base` (e.g. GitHub Pages `/repo/`). */
export function publicUrl(pathFromPublicRoot: string): string {
  const relative = pathFromPublicRoot.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${relative}`
}

export const avatarPhotoUrl = publicUrl('ac5399700333c1dbd7fc7aca9bc3cf75fa88de6b.jpg')
