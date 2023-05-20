import { VariantProps } from "tailwind-variants"
import { alert } from "./Alert.styles"

export interface AlertProps extends VariantProps<typeof alert> {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}

export default function Alert({
  children,
  className,
  title,
  variant,
}: AlertProps) {
  const styles = alert({ variant })

  return (
    <div className={styles.base({ className })}>
      {title ? <p className={styles.title()}>{title}</p> : null}
      <p className={styles.content()}>{children}</p>
    </div>
  )
}
