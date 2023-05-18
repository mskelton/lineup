import clsx from "clsx"
import { Player } from "api/players"

export interface LineupItemProps {
  active: boolean
  player: Player
  position: string | undefined
}

export default function LineupItem({
  active,
  player,
  position,
}: LineupItemProps) {
  return (
    <li
      className={clsx(
        "flex w-full flex-col rounded-lg border border-gray-200 px-4 py-3 text-sm",
        active ? "bg-white" : "bg-gray-200 opacity-50"
      )}
    >
      <span className="font-medium">{player.name}</span>
      <span className="text-xs text-gray-500">{position}</span>
    </li>
  )
}
