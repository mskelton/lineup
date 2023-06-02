import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline"
import Button from "components/common/Button"
import { SortableItem } from "components/common/Sortable"

export interface ActivePosition {
  id: string
  name: string
  order: number
}

export interface ActivePositionItemProps {
  children: React.ReactNode
  onDelete(): void
  value: string
}

export default function ActivePositionItem({
  children,
  onDelete,
  value,
}: ActivePositionItemProps) {
  return (
    <SortableItem
      className="mb-3 flex w-full cursor-grab select-none items-center justify-between gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium"
      id={value}
    >
      <span className="flex items-center gap-3">
        <Bars3Icon className="h-5 w-5" />
        <span>{children}</span>
      </span>

      <Button onPress={onDelete} size="md" variant="ghost">
        <TrashIcon className="h-5 w-5 text-red-600" />
      </Button>
    </SortableItem>
  )
}
