export const truthy = Boolean as unknown as <T>(
  value: T
) => value is Exclude<T, false | 0 | "" | null | undefined>
