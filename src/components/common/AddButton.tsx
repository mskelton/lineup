import { PlusCircleIcon } from "@heroicons/react/24/outline"

export interface AddButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AddButton({ children, ...props }: AddButtonProps) {
  return (
    <button
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-100 disabled:pointer-events-none disabled:bg-gray-200 disabled:opacity-50"
      type="button"
      {...props}
    >
      {children}
      <PlusCircleIcon className="h-5 w-5 text-gray-500" />
    </button>
  )
}
