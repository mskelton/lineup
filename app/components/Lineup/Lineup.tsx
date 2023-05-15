"use client"

import { useMemo } from "react"
import { usePlayers } from "../../api/players"
import { useRoster } from "../../api/rosters"
import { fieldPositionNames } from "../../utils/positions"
import { Loader } from "../common/Loader"
import LineupItem from "./LineupItem"
import { useLineups } from "./useLineups"

export interface LineupProps {
  rosterId: string
}

export default function Lineup({ rosterId = "123" }: LineupProps) {
  const [roster, { loading: loadingRoster }] = useRoster(rosterId)
  const [players, { loading: loadingPlayers }] = usePlayers()
  const loading = loadingRoster || loadingPlayers

  const activeRoster = useMemo(() => {
    return players?.filter((player) => roster?.players?.[player.id]) ?? []
  }, [players, roster])

  const [lineup] = useLineups(activeRoster)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
          {activeRoster.map((player) => (
            <LineupItem
              key={player.name}
              player={player}
              active={false}
              position={fieldPositionNames[lineup[player.name] ?? ""]}
              onActiveChange={(active) =>
                setActivePlayers((players) => {
                  return active
                    ? [...players, player.name]
                    : players.filter((name) => name !== player.name)
                })
              }
            />
          ))}
        </div>
      )}
    </>
  )
}
