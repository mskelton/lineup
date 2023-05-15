import { DatabaseReference, DataSnapshot, onValue } from "firebase/database"
import { useEffect, useState } from "react"

export function useSnapshot(ref: DatabaseReference) {
  const [state, setState] = useState<DataSnapshot | null>(null)

  useEffect(() => {
    return onValue(ref, setState)
  }, [ref])

  return state
}

export function useSnapshotVal<T>(ref: DatabaseReference): T | null {
  const snapshot = useSnapshot(ref)
  return snapshot?.val() ?? null
}
