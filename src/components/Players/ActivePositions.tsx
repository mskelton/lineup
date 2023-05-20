import { Reorder } from "framer-motion"
import { useState } from "react"
import { removePlayerPosition } from "api/players"
import ActivePositionItem, { ActivePosition } from "./ActivePositionItem"

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
        axis="y"
        className="mb-8 space-y-3"
        onReorder={(newItems) => {
          setItems(newItems)
          onReorder(newItems)
        }}
        values={items}
      >
        {items.map((item) => (
          <ActivePositionItem
            key={item.id}
            onDelete={() => removePlayerPosition(playerId, item.id)}
            value={item}
          >
            {item.name}
          </ActivePositionItem>
        ))}
      </Reorder.Group>
    </div>
  )
}
