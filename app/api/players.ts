import { ref } from "firebase/database"
import { useRef } from "react"
import { useSnapshot } from "../hooks/useSnapshot"
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
  const snapshot = useSnapshot(playersRef.current)
  const players = snapshot
    ? Object.entries(snapshot.val() as Record<string, Player>).map(
        ([id, player]) => ({ ...player, id })
      )
    : undefined

  return [players, { loading: !snapshot }] as const
}

export function usePlayer(id: string) {
  const playerRef = useRef(ref(db, `players/${id}`))
  return useSnapshot(playerRef.current)
}
