import clsx from "clsx"
import { useId } from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelVisibility?: "hidden" | "visible"
}

export default function Input({
  label,
  labelVisibility = "visible",
  ...props
}: InputProps) {
  const id = useId()

  return (
    <div>
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-medium leading-6 text-gray-900",
          labelVisibility === "hidden" && "sr-only"
        )}
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  )
}
