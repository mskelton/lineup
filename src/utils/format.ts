export function formatDate(date: Date | string) {
  return new Date(date).toLocaleString(undefined, { dateStyle: "medium" })
}

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const plural = new Intl.PluralRules("en-US", { type: "ordinal" })
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
])

export function formatOrdinal(num: number) {
  const rule = plural.select(num)
  const suffix = suffixes.get(rule)

  return `${num}${suffix}`
}
