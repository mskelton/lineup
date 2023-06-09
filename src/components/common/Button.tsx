import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "react-aria-components"
import { VariantProps } from "tailwind-variants"
import { button } from "./Button.styles"
import { LoadingSpinner } from "./LoadingSpinner"

export interface ButtonProps
  extends BaseButtonProps,
    VariantProps<typeof button> {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

export default function Button({
  children,
  className,
  isDisabled,
  isLoading,
  size,
  variant,
  ...props
}: ButtonProps) {
  const disabled = isDisabled || isLoading
  const styles = button({
    isDisabled: disabled,
    isLoading,
    size,
    variant,
  })

  return (
    <BaseButton
      className={styles.base({ className })}
      isDisabled={disabled}
      type="button"
      {...props}
    >
      <span className={styles.content()}>{children}</span>
      {isLoading ? (
        <div className={styles.spinnerContainer()}>
          <LoadingSpinner className={styles.spinner()} />
        </div>
      ) : null}
    </BaseButton>
  )
}
