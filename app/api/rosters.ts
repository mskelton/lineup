import { push, ref, set } from "firebase/database"
import { useMemo, useRef } from "react"
import { useSnapshotVal } from "../hooks/useSnapshot"
import { db } from "./firebase"

export interface Roster {
  createdAt: number
  id: string
  name: string
  players?: Record<string, boolean>
  status: string
}

export function useRosters() {
  const rostersRef = useRef(ref(db, "rosters"))
  const val = useSnapshotVal<Record<string, Roster>>(rostersRef.current)
  const rosters = val
    ? Object.entries(val).map(([id, roster]) => ({ ...roster, id }))
    : undefined

  return [rosters, { loading: !val }] as const
}

export function useRoster(id: string) {
  const rosterRef = useRef(ref(db, `rosters/${id}`))
  const val = useSnapshotVal<Roster>(rosterRef.current)
  const roster = useMemo(() => (val ? { ...val, id } : undefined), [id, val])

  return [roster, { loading: !val }] as const
}

export function addRoster(name: string) {
  const rostersRef = ref(db, "rosters")
  const newRosterRef = push(rostersRef)

  return set(newRosterRef, {
    createdAt: new Date().toISOString(),
    name,
    status: "active",
  })
}

export async function setPlayerActive(
  rosterId: string,
  playerId: string,
  active: boolean
) {
  await set(ref(db, `rosters/${rosterId}/players/${playerId}`), active)
}
