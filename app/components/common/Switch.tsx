import clsx from "clsx"
import {
  Switch as BaseSwitch,
  SwitchProps as BaseSwitchProps,
} from "react-aria-components"

export interface SwitchProps extends BaseSwitchProps {
  children: React.ReactNode
}

export default function Switch({
  children,
  isSelected,
  ...props
}: SwitchProps) {
  return (
    <BaseSwitch
      isSelected={isSelected}
      className={clsx(
        "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full",
        isSelected ? "bg-indigo-600" : "bg-gray-200"
      )}
      {...props}
    >
      <span
        className={clsx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          isSelected ? "translate-x-6" : "translate-x-1"
        )}
      />

      {children}
    </BaseSwitch>
  )
}
