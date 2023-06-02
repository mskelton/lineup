import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export interface SortableItemProps {
  children: React.ReactNode
  className?: string
  id: string
}

export function SortableItem({ children, className, id }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

type Item = UniqueIdentifier | { id: UniqueIdentifier }

const find = <T extends Item>(items: T[], id: UniqueIdentifier) => {
  return items.findIndex((item) =>
    typeof item === "object" ? item.id === id : item === id
  )
}

export interface SortableProps<T extends Item> {
  children: React.ReactNode
  items: T[]
  onChange(items: T[]): void
}

export function Sortable<T extends Item>({
  children,
  items,
  onChange,
}: SortableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = find(items, active.id)
      const newIndex = find(items, over.id)

      onChange(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
