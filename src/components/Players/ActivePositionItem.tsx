import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline"
import { Reorder } from "framer-motion"
import Button from "components/common/Button"

export interface ActivePosition {
  id: string
  name: string
  order: number
}

export interface ActivePositionItemProps {
  children: React.ReactNode
  onDelete(): void
  value: unknown
}

export default function ActivePositionItem({
  children,
  onDelete,
  value,
}: ActivePositionItemProps) {
  return (
    <Reorder.Item
      className="mb-3 flex w-full select-none items-center justify-between gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium"
      value={value}
    >
      <span className="flex items-center gap-3">
        <div className="cursor-grab">
          <Bars3Icon className="h-5 w-5" />
        </div>

        <span>{children}</span>
      </span>

      <Button onPress={onDelete} size="md" variant="ghost">
        <TrashIcon className="h-5 w-5 text-red-600" />
      </Button>
    </Reorder.Item>
  )
}
