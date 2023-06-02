import { useState } from "react"
import { removePlayerPosition } from "api/players"
import { Sortable } from "components/common/Sortable"
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
      <Sortable
        items={items}
        onChange={(newItems) => {
          setItems(newItems)
          onReorder(newItems)
        }}
      >
        {items.map((item) => (
          <ActivePositionItem
            key={item.id}
            onDelete={() => removePlayerPosition(playerId, item.id)}
            value={item.id}
          >
            {item.name}
          </ActivePositionItem>
        ))}
      </Sortable>
    </div>
  )
}
