export function formatGroupedDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  const reversed = [...digits].reverse()
  const groups: string[] = []
  for (let i = 0; i < reversed.length; i += 3) {
    groups.push(reversed.slice(i, i + 3).reverse().join(''))
  }
  return groups.reverse().join(' ')
}
