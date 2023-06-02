import { cloneElement } from "react"
import { Button, ButtonProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"

const colors = {
  blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
}

export interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode
  color: keyof typeof colors
  icon?: React.ReactElement
}

export function ActionButton({
  children,
  color,
  icon,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      className={twMerge(
        "flex flex-1 items-center justify-center rounded-md px-4 py-3 text-white focus:outline-none focus:ring-offset-2 focus-visible:ring-2",
        colors[color],
        props.isDisabled && "pointer-events-none bg-gray-400 opacity-50"
      )}
      type="button"
      {...props}
    >
      {icon ? cloneElement(icon, { className: "h-6 w-6" }) : null}
      <span className={icon ? "sr-only" : ""}>{children}</span>
    </Button>
  )
}

export interface ActionButtonContainerProps {
  children: React.ReactNode
}

ActionButton.Container = function ActionButtonContainer({
  children,
}: ActionButtonContainerProps) {
  return (
    <div className="mt-20">
      <div className="fixed bottom-0 right-0 flex w-full justify-evenly gap-2 bg-slate-100 p-4 shadow-lg lg:w-[calc(100%-18rem)]">
        {children}
      </div>
    </div>
  )
}
