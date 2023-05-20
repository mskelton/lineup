import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useParams } from "react-router-dom"
import { addPlayerPosition, setPlayerPositions, usePlayer } from "api/players"
import NotFound from "components/common/NotFound"
import Skeleton from "components/common/Skeleton"
import Title from "components/common/Title"
import { ActivePositions } from "components/Players/ActivePositions"
import { DeletePlayerModal } from "components/Players/DeletePlayerModal"
import { fieldPositionNames, fieldPositions } from "utils/positions"

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
            Select up to 4 preferred positions
          </p>
          <ul className="space-y-2">
            {fieldPositions
              .filter(
                (position) =>
                  !selectedItems?.some((item) => item.id === position)
              )
              .map((position) => (
                <li key={position}>
                  <button
                    aria-label={`Add ${fieldPositionNames[position]}`}
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-100 disabled:pointer-events-none disabled:bg-gray-200 disabled:opacity-50"
                    disabled={selectedItems.length >= 4}
                    onClick={() => {
                      addPlayerPosition(
                        player.id,
                        position,
                        selectedItems.length + 1
                      )
                    }}
                    type="button"
                  >
                    {fieldPositionNames[position]}
                    <PlusCircleIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </li>
              ))}
          </ul>

          <div className="mt-8">
            {!loading ? <DeletePlayerModal id={player.id} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
