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
