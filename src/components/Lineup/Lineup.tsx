import { useMemo, useState } from "react"
import { usePlayers } from "api/players"
import Actions from "components/Actions"
import Title from "components/common/Title"
import { formatOrdinal } from "utils/format"
import Batting from "./Batting"
import Fielding from "./Fielding"

export interface LineupProps {
  playerIds: string[]
  rosterId: string
}

export default function Lineup({ playerIds }: LineupProps) {
  const [players, { loading: loadingPlayers }] = usePlayers()
  const [inning, setInning] = useState(1)
  const realInning = Math.ceil(inning / 2)
  const top = inning % 2 === 1

  // Remove any players in the roster that were deleted
  const activeRoster = useMemo(
    () => players?.filter((player) => playerIds.includes(player.id)) ?? [],
    [players, playerIds]
  )

  return (
    <div className="mb-20">
      <div className="mb-4 flex items-end justify-between">
        <Title>Batting</Title>

        <p className="text-gray-600">
          {top ? "Top" : "Bottom"} of the {formatOrdinal(realInning)}
        </p>
      </div>

      {top ? (
        <Fielding
          inning={realInning}
          loadingPlayers={loadingPlayers}
          roster={activeRoster}
        />
      ) : (
        <Batting
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
