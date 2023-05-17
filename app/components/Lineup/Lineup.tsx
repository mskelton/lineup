"use client"

import { useMemo } from "react"
import { usePlayers } from "../../api/players"
import { useRoster } from "../../api/rosters"
import { fieldPositionNames } from "../../utils/positions"
import { fieldPositions } from "../../utils/positions"
import Badge from "../common/Badge"
import { Skeleton } from "../common/Skeleton"
import LineupItem from "./LineupItem"
import { useLineups } from "./useLineups"

export interface LineupProps {
  rosterId: string
}

export default function Lineup({ rosterId = "123" }: LineupProps) {
  const [roster, { loading: loadingRoster }] = useRoster(rosterId)
  const [players, { loading: loadingPlayers }] = usePlayers()

  const activeRoster = useMemo(() => {
    return players?.filter((player) => roster?.players?.[player.id]) ?? []
  }, [players, roster])

  const [lineup, { loading: loadingLineups }] = useLineups(activeRoster)
  const loading = loadingRoster || loadingPlayers || loadingLineups

  const sortedRoster = useMemo(() => {
    if (!lineup) return activeRoster

    return activeRoster.sort((a, b) => {
      const aPos = lineup?.players[a.name] ?? ""
      const bPos = lineup?.players[b.name] ?? ""

      return fieldPositions.indexOf(aPos) - fieldPositions.indexOf(bPos)
    })
  }, [activeRoster, lineup])

  return (
    <>
      <div className="mb-8">
        {loading ? (
          <Skeleton className="h-16" />
        ) : (
          <div
            color="green"
            className="w-full rounded-md bg-green-50 px-4 py-3 text-green-700 ring-1 ring-inset ring-green-600/20"
          >
            <p className="mb-1 text-base font-semibold">Great Lineup!</p>
            <p className="text-xs font-medium">
              With a total score of 4, each player received either their 1
              <sup>st</sup> or 2<sup>nd</sup> choice.
            </p>
          </div>
        )}
      </div>

      <ul className="space-y-3">
        {sortedRoster.map((player) =>
          loading ? (
            <Skeleton key={player.id} className="h-[62px]" />
          ) : (
            <LineupItem
              key={player.id}
              active={!!lineup?.players[player.name]}
              player={player}
              position={fieldPositionNames[lineup?.players[player.name] ?? ""]}
            />
          )
        )}
      </ul>
    </>
  )
}
