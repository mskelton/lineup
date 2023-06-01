import { useCallback, useEffect, useRef, useState } from "react"

export function useStorageState<T>(
  key: string,
  initialValue: T,
  storage = sessionStorage
) {
  const initialValueRef = useRef(initialValue)
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

  useEffect(() => {
    function handleEvent() {
      setState(initialValueRef.current)
    }

    window.addEventListener("clear-storage", handleEvent)
    return () => window.removeEventListener("clear-storage", handleEvent)
  }, [storage])

  return [state, setStorageState] as const
}
