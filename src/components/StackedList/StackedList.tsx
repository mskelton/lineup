export interface StackedListProps {
  children?: React.ReactNode
}

export default function StackedList({ children }: StackedListProps) {
  return (
    <ul
      className="divide-y divide-gray-100 overflow-hidden rounded-xl bg-white ring-1 ring-gray-200"
      role="list"
    >
      {children}
    </ul>
  )
}
