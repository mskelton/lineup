import { Reorder } from "framer-motion"
import { useState } from "react"
import { ActivePosition, ActivePositionItem } from "./ActivePositionItem"

export interface ActivePositionsProps {
  items: ActivePosition[]
  onReorder(items: ActivePosition[]): void
  playerId: string
}

export function ActivePositions({
  items: itemsProp,
  onReorder,
  playerId,
}: ActivePositionsProps) {
  const [items, setItems] = useState(itemsProp)

  return (
    <div className="mb-8 space-y-3">
      <Reorder.Group
        className="mb-8 space-y-3"
        axis="y"
        values={items}
        onReorder={(newItems) => {
          setItems(newItems)
          onReorder(newItems)
        }}
      >
        {items.map((item) => (
          <ActivePositionItem key={item.id} item={item} playerId={playerId} />
        ))}
      </Reorder.Group>
    </div>
  )
}
