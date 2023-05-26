import {
  ExclamationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { Player } from "api/players"
import Alert from "components/common/Alert"
import Skeleton from "components/common/Skeleton"
import { fieldPositionNames, fieldPositions } from "utils/positions"
import LineupItem from "./LineupItem"
import { useLineups } from "./useLineups"

export interface BattingProps {
  inning: number
  loadingPlayers: boolean
  roster: Player[]
}

export default function Batting({
  inning,
  loadingPlayers,
  roster,
}: BattingProps) {
  const extra = roster.length - fieldPositions.length

  return (
    <ul className="space-y-3">
      {loadingPlayers
        ? new Array(10)
            .fill(0)
            .map((_, i) => <Skeleton key={i} className="h-[62px]" />)
        : roster.map((player) => (
            <LineupItem key={player.id} active player={player} position="" />
          ))}
    </ul>
  )
}
