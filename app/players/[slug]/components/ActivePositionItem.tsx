import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline"
import { Reorder, useDragControls } from "framer-motion"
import { removePlayerPosition } from "api/players"
import { Button } from "components/common/Button"

export interface ActivePosition {
  id: string
  name: string
  order: number
}

export interface ActivePositionItemProps {
  item: ActivePosition
  playerId: string
}

export function ActivePositionItem({
  item,
  playerId,
}: ActivePositionItemProps) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="mb-3 flex w-full select-none items-center justify-between gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium"
    >
      <span className="flex items-center gap-3">
        <div className="cursor-grab" onPointerDown={(e) => controls.start(e)}>
          <Bars3Icon className="h-5 w-5" />
        </div>

        <span>{item.name}</span>
      </span>

      <Button
        variant="ghost"
        size="md"
        onPress={() => removePlayerPosition(playerId, item.id)}
      >
        <TrashIcon className="h-5 w-5 text-red-600" />
      </Button>
    </Reorder.Item>
  )
}
