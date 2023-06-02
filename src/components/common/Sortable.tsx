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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

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
