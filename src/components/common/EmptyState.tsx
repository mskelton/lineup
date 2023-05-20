import { cloneElement } from "react"

export interface EmptyStateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement
}

export default function EmptyState({
  children,
  icon,
  ...props
}: EmptyStateProps) {
  return (
    <button
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      type="button"
      {...props}
    >
      {cloneElement(icon, { className: "mx-auto h-12 w-12 text-gray-400" })}

      <span className="mt-2 block text-sm font-semibold text-gray-900">
        {children}
      </span>
    </button>
  )
}
