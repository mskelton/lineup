import { useMemo, useState } from "react"
import { usePlayers } from "api/players"
import Actions from "components/Actions"
import Title from "components/common/Title"
import Batting from "./Batting"
import Fielding from "./Fielding"
import Inning from "./Inning"

export interface LineupProps {
  playerIds: string[]
  venue: string
}

export default function Lineup({ playerIds, venue }: LineupProps) {
  const [players, { loading: loadingPlayers }] = usePlayers()
  const [catchers, setCatchers] = useState<string[]>([])
  const [inning, setInning] = useState(1)
  const realInning = Math.ceil(inning / 2)
  const top = inning % 2 === 1
  const batting = venue === "away" ? top : !top

  // Remove any players in the roster that were deleted
  const activeRoster = useMemo(() => {
    const haveCaught = catchers.slice(0, inning)
    const roster = (players ?? []).filter((player) =>
      playerIds.includes(player.id)
    )

    roster
      .filter((player) => haveCaught.includes(player.name))
      .forEach((player) => {
        if (player.positions && "catcher" in player.positions) {
          delete player.positions.catcher
        }
      })

    return roster
    // I know what I'm doing here. This is for perf reasons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inning, players, playerIds])

  return (
    <div className="mb-20">
      <div className="mb-4 flex items-end justify-between">
        <Title>{batting ? "Batting" : "Fielding"}</Title>
        <Inning inning={realInning} top={top} />
      </div>

      {batting ? (
        <Batting
          inning={realInning}
          loadingPlayers={loadingPlayers}
          roster={activeRoster}
        />
      ) : (
        <Fielding
          inning={realInning}
          loadingPlayers={loadingPlayers}
          onLineup={(lineup) => {
            if (!lineup || catchers.length >= realInning) return
            const catcher = Object.entries(lineup.players).find(
              ([, positon]) => positon === "catcher"
            )?.[0]

            if (!catcher) return
            setCatchers((prev) => {
              const arr = [...prev]
              arr[realInning - 1] = catcher
              return arr
            })
          }}
          roster={activeRoster}
        />
      )}

      <Actions
        inning={inning}
        onNext={() => setInning(inning + 1)}
        onPrev={() => setInning(inning - 1)}
      />
    </div>
  )
}
