import { SparklesIcon } from "@heroicons/react/24/outline"
import { useMemo, useState } from "react"
import { usePlayers } from "api/players"
import { useRoster } from "api/rosters"
import Actions from "components/Actions"
import Skeleton from "components/common/Skeleton"
import Title from "components/common/Title"
import { fieldPositionNames, fieldPositions } from "utils/positions"
import LineupItem from "./LineupItem"
import { useLineups } from "./useLineups"

export interface LineupProps {
  rosterId: string
}

export default function Lineup({ rosterId }: LineupProps) {
  const [roster, { loading: loadingRoster }] = useRoster(rosterId)
  const [players, { loading: loadingPlayers }] = usePlayers()
  const [inning, setInning] = useState(1)

  // Remove any players in the roster that were deleted
  const activeRoster = useMemo(
    () => players?.filter((player) => roster?.players?.[player.id]) ?? [],
    [players, roster?.players]
  )

  // Trim the roster to the number of players that can be on the field
  const extra = activeRoster.length - fieldPositions.length
  const req = useMemo(() => {
    const sitting = Math.abs((inning * extra) % fieldPositions.length)
    return activeRoster.filter((_, i) => i < sitting || i >= sitting + extra)
  }, [activeRoster, extra, inning])

  const [lineup, { loading: loadingLineups }] = useLineups(req)
  const loading = loadingRoster || loadingPlayers || loadingLineups

  const sortedRoster = useMemo(() => {
    if (!lineup) return activeRoster

    return activeRoster.slice().sort((a, b) => {
      const aPos = lineup?.players[a.name] ?? ""
      const bPos = lineup?.players[b.name] ?? ""

      if (!aPos) return 1
      if (!bPos) return -1
      return fieldPositions.indexOf(aPos) - fieldPositions.indexOf(bPos)
    })
  }, [activeRoster, lineup])

  return (
    <div className="mb-20">
      <Title className="sr-only">Lineup</Title>

      <div className="mb-8">
        {loading ? (
          <Skeleton className="h-16" />
        ) : (
          <div
            className="w-full rounded-md bg-green-50 px-4 py-3 text-green-700 ring-1 ring-inset ring-green-600/20"
            color="green"
          >
            <p className="mb-1 flex items-center justify-between text-base font-semibold">
              <span>Great Lineup!</span>
              <SparklesIcon className="h-5 w-5" />
            </p>

            <p className="text-xs font-medium">
              With a total score of {lineup?.score}, each player received either
              their 1<sup>st</sup> or 2<sup>nd</sup> choice.
            </p>
          </div>
        )}
      </div>

      <ul className="space-y-3">
        {loading
          ? new Array(10)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="h-[62px]" />)
          : sortedRoster.map((player) => (
              <LineupItem
                key={player.id}
                active={!!lineup?.players[player.name]}
                player={player}
                position={
                  fieldPositionNames[lineup?.players[player.name] ?? ""]
                }
              />
            ))}
      </ul>

      <Actions
        inning={inning}
        onNext={() => setInning((prev) => prev + 1)}
        onPrev={() => setInning((prev) => prev - 1)}
      />
    </div>
  )
}
