import clsx from "clsx"
import { cloneElement } from "react"
import { Button, ButtonProps } from "react-aria-components"

const colors = {
  blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
}

export interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode
  color: keyof typeof colors
  icon: React.ReactElement
}

export function ActionButton({
  children,
  color,
  icon,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      className={clsx(
        "flex flex-1 items-center justify-center rounded-md px-4 py-3 text-white",
        colors[color]
      )}
      type="button"
      {...props}
    >
      {cloneElement(icon, { className: "h-6 w-6" })}
      <span className="sr-only">{children}</span>
    </Button>
  )
}
