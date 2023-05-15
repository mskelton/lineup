import { push, ref, set } from "firebase/database"
import { useRef } from "react"
import { useSnapshot } from "../hooks/useSnapshot"
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
  const snapshot = useSnapshot(rostersRef.current)
  const rosters = snapshot
    ? Object.entries(snapshot.val() as Record<string, Roster>).map(
        ([id, roster]) => ({ ...roster, id })
      )
    : undefined

  return [rosters, { loading: !snapshot }] as const
}

export function useRoster(id: string) {
  const rosterRef = useRef(ref(db, `rosters/${id}`))
  const snapshot = useSnapshot(rosterRef.current)
  const roster = snapshot ? { ...(snapshot.val() as Roster), id } : undefined

  return [roster, { loading: !snapshot }] as const
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
