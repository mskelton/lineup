"use client"

import { Item, ListBox, useDragAndDrop } from "react-aria-components"
import { useListData } from "react-stately"
import { usePlayer } from "../../api/players"
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
  const list = useListData({
    initialItems: (player?.positions ?? fieldPositions).map((position) => ({
      id: position,
      name: fieldPositionNames[position] ?? "Unknown",
    })),
  })

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({ "text/plain": list.getItem(key).name })),
    onReorder(e) {
      console.log(e)
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys)
      }
    },
  })

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

          <ListBox
            aria-label="Field positions"
            selectionMode="none"
            items={list.items}
            dragAndDropHooks={dragAndDropHooks}
          >
            {(item) => <Item>{item.name}</Item>}
          </ListBox>

          <div className="mt-8">
            {!loading ? <DeletePlayerModal id={player.id} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
