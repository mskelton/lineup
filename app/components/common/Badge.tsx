import { VariantProps } from "tailwind-variants"
import { badgeStyles } from "./Badge.styles"

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeStyles> {}

export default function Badge({
  className,
  color,
  size,
  ...props
}: BadgeProps) {
  return <span className={badgeStyles({ className, color, size })} {...props} />
}
