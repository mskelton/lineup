import { Reorder } from "framer-motion"
import { useEffect, useState } from "react"
import { usePlayers } from "api/players"
import { useRoster } from "api/rosters"
import { ActionButton } from "components/Actions/ActionButton"
import AddButton from "components/common/AddButton"
import Alert from "components/common/Alert"
import Skeleton from "components/common/Skeleton"
import ActivePositionItem from "components/Players/ActivePositionItem"
import { truthy } from "utils/truthy"

export interface SelectPlayer {
  onSelect(ids: string[]): void
  rosterId: string
}

export default function SelectPlayer({ onSelect, rosterId }: SelectPlayer) {
  const [roster, { loading: loadingRoster }] = useRoster(rosterId)
  const [players, { loading: loadingPlayers }] = usePlayers()
  const [selected, setSelected] = useState<string[]>([])

  const active = players?.filter((player) => roster?.players?.[player.id]) ?? []
  const unselected = active?.filter((player) => !selected.includes(player.id))
  const loading = loadingRoster || loadingPlayers

  useEffect(() => {
    if (!roster) return
    setSelected(Object.keys(roster.players ?? {}))
  }, [roster])

  return loading ? (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-12" />
      ))}
    </div>
  ) : active ? (
    <div>
      <Alert className="mb-6" variant="info">
        Add players from the roster to your lineup. You can re-order the
        selected players before starting the game.
      </Alert>

      <h2 className="font-medium">Selected Players</h2>
      {selected.length ? (
        <Reorder.Group
          key={selected.length}
          axis="y"
          className="mb-6 mt-2 space-y-3"
          onReorder={setSelected}
          values={selected}
        >
          {selected
            .map((playerId) => active.find((p) => p.id === playerId))
            .filter(truthy)
            .map((player) => (
              <ActivePositionItem
                key={player.id}
                onDelete={() => {
                  setSelected((prev) => prev.filter((id) => id !== player.id))
                }}
                value={player.id}
              >
                {player.name}
              </ActivePositionItem>
            ))}
        </Reorder.Group>
      ) : (
        <p className="mb-6 text-xs text-gray-600">No players selected</p>
      )}

      {unselected?.length ? (
        <>
          <h2 className="mb-2 font-medium">Roster</h2>
          <ul className="space-y-2">
            {unselected.map((player) => (
              <li key={player.id}>
                <AddButton
                  aria-label={`Add ${player.name} to the lineup`}
                  onClick={() => setSelected((prev) => [...prev, player.id])}
                >
                  {player.name}
                </AddButton>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <ActionButton.Container>
        <ActionButton color="green" onPress={() => onSelect(selected)}>
          Play Ball!
        </ActionButton>
      </ActionButton.Container>
    </div>
  ) : null
}
