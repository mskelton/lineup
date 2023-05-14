"use client"

import { useState } from "react"
import { fieldPositionNames } from "../../data/positions"
import LineupItem, { TeamPlayer } from "./LineupItem"
import { useLineups } from "./useLineups"

export interface LineupProps {
  roster: TeamPlayer[]
}

export default function Lineup({ roster }: LineupProps) {
  const [activePlayers, setActivePlayers] = useState<string[]>(
    roster.map((player) => player.name)
  )
  const [lineup] = useLineups(roster, activePlayers)

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
      {roster.map((player) => (
        <LineupItem
          key={player.name}
          player={player}
          active={activePlayers.includes(player.name)}
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
  )
}
