import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline"
import Button from "components/common/Button"

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className="mb-3 flex w-full items-center justify-between gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium"
      id={value}
      style={style}
    >
      <div className="flex items-center gap-3">
        <Button className="-ml-2" onPress={onDelete} size="md" variant="ghost">
          <TrashIcon className="h-5 w-5 text-red-600" />
        </Button>

        <span>{children}</span>
      </div>

      <button
        {...attributes}
        {...listeners}
        className="-my-3.5 -mr-4 cursor-grab touch-none py-3.5 pl-12 pr-4"
        type="button"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
    </div>
  )
}
