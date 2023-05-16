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

export function Button({
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
    className,
    isDisabled: disabled,
    isLoading,
    size,
    variant,
  })

  return (
    <BaseButton
      isDisabled={disabled}
      type="button"
      className={styles.base()}
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
