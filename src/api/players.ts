import { child, ref, remove, serverTimestamp, set } from "firebase/database"
import { useMemo, useRef } from "react"
import { useSnapshotVal } from "hooks/useSnapshot"
import { generateId } from "utils/id"
import { db } from "./firebase"

export interface Player {
  createdAt: number
  id: string
  name: string
  positions?: Record<string, number>
}

const playersRef = ref(db, "players")

export function usePlayers() {
  const val = useSnapshotVal<Record<string, Player>>(playersRef)
  const players = useMemo(() => {
    return val
      ? Object.entries(val).map(([id, player]) => ({ ...player, id }))
      : undefined
  }, [val])

  return [players, { loading: !val }] as const
}

export function usePlayer(id: string) {
  const playerRef = useRef(child(playersRef, id))
  const val = useSnapshotVal<Player>(playerRef.current)
  const player = val ? { ...val, id } : undefined

  return [player, { loading: !val }] as const
}

export async function addPlayer(name: string) {
  const id = generateId()
  const newPlayerRef = child(playersRef, id)

  await set(newPlayerRef, {
    createdAt: serverTimestamp(),
    name,
  })

  return id
}

export async function deletePlayer(id: string) {
  await remove(child(playersRef, id))
}

export async function addPlayerPosition(
  playerId: string,
  position: string,
  order: number
) {
  const positionRef = child(playersRef, `${playerId}/positions/${position}`)
  await set(positionRef, order)
}

export async function removePlayerPosition(playerId: string, position: string) {
  const positionRef = child(playersRef, `${playerId}/positions/${position}`)
  await remove(positionRef)
}

export async function setPlayerPositions(
  playerId: string,
  positions: string[]
) {
  const positionRef = child(playersRef, `${playerId}/positions`)
  const orderedPositions = positions.reduce(
    (acc, cur, i) => ({ ...acc, [cur]: i + 1 }),
    {}
  )

  await set(positionRef, orderedPositions)
}
