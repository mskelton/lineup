import clsx from "clsx"
import { useId } from "react"
import {
  Switch as BaseSwitch,
  SwitchProps as BaseSwitchProps,
} from "react-aria-components"

export interface SwitchProps extends BaseSwitchProps {
  align?: "left" | "right"
  label: string
  labelVisibility?: "hidden" | "visible"
}

export default function Switch({
  align = "right",
  isSelected,
  label: labelProp,
  labelVisibility = "visible",
  ...props
}: SwitchProps) {
  const id = useId()
  const label = (
    <label
      className={clsx(
        "text-sm font-medium text-gray-900",
        labelVisibility === "hidden" && "sr-only"
      )}
      htmlFor={id}
    >
      {labelProp}
    </label>
  )

  return (
    <div className="flex items-center gap-2">
      {align === "left" ? label : null}

      <BaseSwitch
        className={clsx(
          "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full",
          isSelected ? "bg-indigo-600" : "bg-gray-200"
        )}
        id={id}
        isSelected={isSelected}
        {...props}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition",
            isSelected ? "translate-x-6" : "translate-x-1"
          )}
        />
      </BaseSwitch>

      {align === "right" ? label : null}
    </div>
  )
}
