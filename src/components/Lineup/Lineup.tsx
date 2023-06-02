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
  const [inning, setInning] = useState(1)
  const realInning = Math.ceil(inning / 2)
  const top = inning % 2 === 1
  const batting = venue === "away" ? top : !top

  // Remove any players in the roster that were deleted
  const activeRoster = useMemo(
    () => players?.filter((player) => playerIds.includes(player.id)) ?? [],
    [players, playerIds]
  )

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
