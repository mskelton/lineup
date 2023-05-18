import { Link as BaseLink, LinkProps as BaseLinkProps } from "react-router-dom"
import { VariantProps } from "tailwind-variants"
import { button } from "./Button.styles"

export interface LinkProps
  extends Omit<BaseLinkProps, "to">,
    VariantProps<typeof button> {
  children: React.ReactNode
  className?: string
  href: string
}

export function Link({
  children,
  className,
  href,
  size,
  variant: color,
  ...props
}: LinkProps) {
  const styles = button({ className, size, variant: color })

  return (
    <BaseLink className={styles.base()} to={href} {...props}>
      {children}
    </BaseLink>
  )
}
