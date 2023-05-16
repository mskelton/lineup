import { child, ref, serverTimestamp, set } from "firebase/database"
import { useMemo, useRef } from "react"
import { useSnapshotVal } from "../hooks/useSnapshot"
import { generateId } from "../utils/id"
import { db } from "./firebase"

export interface Roster {
  createdAt: number
  id: string
  name: string
  players?: Record<string, boolean>
  status: string
}

const rostersRef = ref(db, "rosters")

export function useRosters() {
  const val = useSnapshotVal<Record<string, Roster>>(rostersRef)
  const rosters = val
    ? Object.entries(val).map(([id, roster]) => ({ ...roster, id }))
    : undefined

  return [rosters, { loading: !val }] as const
}

export function useRoster(id: string) {
  const rosterRef = useRef(child(rostersRef, id))
  const val = useSnapshotVal<Roster>(rosterRef.current)
  const roster = useMemo(() => (val ? { ...val, id } : undefined), [id, val])

  return [roster, { loading: !val }] as const
}

export async function addRoster(name: string) {
  const id = generateId()
  const newRosterRef = child(rostersRef, id)

  await set(newRosterRef, {
    createdAt: serverTimestamp(),
    name,
    status: "active",
  })

  return id
}

export async function deleteRoster(id: string) {
  await set(child(rostersRef, id), null)
}

export async function setPlayerActive(
  rosterId: string,
  playerId: string,
  active: boolean
) {
  await set(child(rostersRef, `${rosterId}/players/${playerId}`), active)
}

export async function setAllPlayersActive(
  rosterId: string,
  playerIds: string[],
  active: boolean
) {
  await set(
    child(rostersRef, `${rosterId}/players`),
    playerIds.reduce((acc, cur) => ({ ...acc, [cur]: active }), {})
  )
}
