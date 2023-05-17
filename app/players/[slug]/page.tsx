"use client"

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import {
  addPlayerPosition,
  removePlayerPosition,
  usePlayer,
} from "../../api/players"
import { Button } from "../../components/common/Button"
import { Loader } from "../../components/common/Loader"
import { NotFound } from "../../components/common/NotFound"
import Title from "../../components/common/Title"
import { fieldPositionNames, fieldPositions } from "../../utils/positions"
import { DeletePlayerModal } from "./components/DeletePlayerModal"

export interface PlayerPageProps {
  params: {
    slug: string
  }
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const [player, { loading }] = usePlayer(params.slug)
  const selectedItems = Object.entries(player?.positions ?? {}).map(
    ([id, position]) => ({
      id,
      name: fieldPositionNames[position.position],
      ...position,
    })
  )

  return (
    <div className="mb-20">
      {loading ? (
        <Loader className="h-44 w-full" />
      ) : !player ? (
        <NotFound
          title="Player not found"
          subtitle="Sorry, we couldn’t find the player you're looking for."
        />
      ) : (
        <div>
          <Title className="mb-8">{player.name}</Title>
          {selectedItems.length ? (
            <>
              <h2 className="mb-4 text-lg font-bold">Positions</h2>
              <ul className="mb-8 space-y-2">
                {selectedItems.map((item) => (
                  <li
                    className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-indigo-600 px-4 py-3 font-medium"
                    key={item.id}
                  >
                    {item.name}
                    <Button
                      variant="ghost"
                      size="md"
                      onPress={() => removePlayerPosition(player.id, item.id)}
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </Button>
                  </li>
                ))}
              </ul>
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
                  !selectedItems?.some((item) => item.position === position)
              )
              .map((position) => (
                <li key={position}>
                  <button
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-100 disabled:pointer-events-none disabled:bg-gray-200 disabled:opacity-50"
                    aria-label={`Add ${fieldPositionNames[position]}`}
                    disabled={selectedItems.length >= 4}
                    onClick={() => {
                      addPlayerPosition(player.id, {
                        order: selectedItems.length + 1,
                        position,
                      })
                    }}
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
