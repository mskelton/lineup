import { useParams } from "react-router-dom"
import {
  addPlayerPosition,
  setPlayerAlwaysActive,
  setPlayerPositions,
  usePlayer,
} from "api/players"
import AddButton from "components/common/AddButton"
import NotFound from "components/common/NotFound"
import Skeleton from "components/common/Skeleton"
import Switch from "components/common/Switch"
import Title from "components/common/Title"
import { ActivePositions } from "components/Players/ActivePositions"
import { DeletePlayerModal } from "components/Players/DeletePlayerModal"
import { fieldPositionNames, fieldPositions } from "utils/positions"

const MAX_POSITIONS = 5

export default function Player() {
  const { id } = useParams()
  const [player, { loading }] = usePlayer(id!)
  const selectedItems = Object.entries(player?.positions ?? {})
    .map(([id, order]) => ({
      id,
      name: fieldPositionNames[id] ?? "",
      order,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <div className="mb-20">
      {loading ? (
        <Skeleton className="h-44" />
      ) : !player ? (
        <NotFound
          subtitle="Sorry, we couldn’t find the player you're looking for."
          title="Player not found"
        />
      ) : (
        <div>
          <Title className="mb-8">{player.name}</Title>
          {selectedItems.length ? (
            <>
              <h2 className="text-lg font-bold">Positions</h2>
              <p className="mb-4 text-sm text-gray-700">
                Drag to reorder your preferred positions
              </p>

              <ActivePositions
                key={selectedItems?.length ?? 0}
                items={selectedItems}
                onReorder={(newItems) => {
                  setPlayerPositions(
                    player.id,
                    newItems.map((item) => item.id)
                  )
                }}
                playerId={player.id}
              />
            </>
          ) : null}

          <h2 className="text-lg font-bold">Add positions</h2>
          <p className="mb-4 text-sm text-gray-700">
            Select up to {MAX_POSITIONS} preferred positions
          </p>
          <ul className="space-y-2">
            {fieldPositions
              .filter(
                (position) =>
                  !selectedItems?.some((item) => item.id === position)
              )
              .map((position) => (
                <li key={position}>
                  <AddButton
                    aria-label={`Add ${fieldPositionNames[position]}`}
                    disabled={selectedItems.length >= MAX_POSITIONS}
                    onClick={() => {
                      addPlayerPosition(
                        player.id,
                        position,
                        selectedItems.length + 1
                      )
                    }}
                  >
                    {fieldPositionNames[position]}
                  </AddButton>
                </li>
              ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-lg font-bold">Settings</h2>
            <p className="mb-4 text-sm text-gray-700">
              Additional settings for the player
            </p>

            <Switch
              isSelected={!!player.alwaysActive}
              label="Always active"
              onChange={(value) => setPlayerAlwaysActive(player.id, value)}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold">Danger Zone</h2>
            <p className="mb-4 text-sm text-gray-700">Here be dragons!</p>

            {!loading ? <DeletePlayerModal id={player.id} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
