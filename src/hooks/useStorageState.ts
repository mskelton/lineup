import { useCallback, useState } from "react"

export function useStorageState<T>(
  key: string,
  initialValue: T,
  storage = sessionStorage
) {
  const [state, setState] = useState(() => {
    const stored = storage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initialValue
  })

  const setStorageState = useCallback(
    (value: T) => {
      storage.setItem(key, JSON.stringify(value))
      setState(value)
    },
    [key, storage]
  )

  return [state, setStorageState] as const
}
