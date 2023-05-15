import BaseLink, { LinkProps as BaseLinkProps } from "next/link"
import { VariantProps } from "tailwind-variants"
import { button } from "./Button.styles"

export interface LinkProps extends BaseLinkProps, VariantProps<typeof button> {
  children: React.ReactNode
  className?: string
}

export function Link({
  children,
  className,
  color,
  size,
  ...props
}: LinkProps) {
  return (
    <BaseLink className={button({ className, color, size })} {...props}>
      {children}
    </BaseLink>
  )
}
