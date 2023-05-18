export interface StackedListProps {
  children?: React.ReactNode
}

export default function StackedList({ children }: StackedListProps) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden rounded-xl bg-white ring-1 ring-gray-200"
    >
      {children}
    </ul>
  )
}
