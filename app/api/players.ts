import { push, ref, set } from "firebase/database"
import { useRef } from "react"
import { useSnapshot, useSnapshotVal } from "../hooks/useSnapshot"
import { db } from "./firebase"

export interface Player {
  createdAt: number
  id: string
  name: string
  players: string[]
  status: string
}

export function usePlayers() {
  const playersRef = useRef(ref(db, "players"))
  const val = useSnapshotVal<Record<string, Player>>(playersRef.current)
  const players = val
    ? Object.entries(val).map(([id, player]) => ({ ...player, id }))
    : undefined

  return [players, { loading: !val }] as const
}

export function usePlayer(id: string) {
  const playerRef = useRef(ref(db, `players/${id}`))
  return useSnapshot(playerRef.current)
}

export function addPlayer(name: string) {
  const playersRef = ref(db, "players")
  const newPlayerRef = push(playersRef)

  return set(newPlayerRef, {
    createdAt: new Date().toISOString(),
    name,
  })
}
