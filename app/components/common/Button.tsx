import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "react-aria-components"
import { VariantProps } from "tailwind-variants"
import { button } from "./Button.styles"

export interface ButtonProps
  extends BaseButtonProps,
    VariantProps<typeof button> {
  children: React.ReactNode
  className?: string
}

export function Button({
  children,
  className,
  color,
  size,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type="button"
      className={button({ className, color, size })}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
