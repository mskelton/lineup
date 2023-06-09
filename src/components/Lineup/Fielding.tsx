import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { Player } from "api/players"
import Alert from "components/common/Alert"
import Skeleton from "components/common/Skeleton"
import { fieldPositionNames, fieldPositions } from "utils/positions"
import AnalysisSummary from "./AnalysisSummary"
import LineupItem from "./LineupItem"
import { useLineups } from "./useLineups"
import { Lineup } from "./worker"

export interface FieldingProps {
  inning: number
  loadingPlayers: boolean
  onLineup(lineup: Lineup | undefined): void
  roster: Player[]
}

export default function Fielding({
  inning,
  loadingPlayers,
  onLineup,
  roster,
}: FieldingProps) {
  const [lineup, { loading: loadingLineups }] = useLineups(
    roster,
    inning,
    onLineup
  )
  const loading = loadingPlayers || loadingLineups

  const sortedRoster = useMemo(() => {
    if (!lineup) return roster

    return roster.slice().sort((a, b) => {
      const aPos = lineup?.players[a.name] ?? ""
      const bPos = lineup?.players[b.name] ?? ""

      if (!aPos) return 1
      if (!bPos) return -1
      return fieldPositions.indexOf(aPos) - fieldPositions.indexOf(bPos)
    })
  }, [roster, lineup])

  return lineup?.analysis.score === Infinity ? (
    <Alert
      title={
        <>
          <span>Uh oh!</span>
          <ExclamationCircleIcon className="h-5 w-5" />
        </>
      }
      variant="error"
    >
      We couldn&rsquo;t find a valid lineup for the players you selected. Make
      sure you have players that can coverage each of the available positions.
    </Alert>
  ) : (
    <>
      <div className="mb-8">
        {loading ? (
          <Skeleton className="h-16" />
        ) : lineup ? (
          <AnalysisSummary analysis={lineup.analysis} />
        ) : null}
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
    </>
  )
}
