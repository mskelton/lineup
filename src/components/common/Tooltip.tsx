import {
  OverlayArrow,
  Tooltip as BaseTooltip,
  TooltipTrigger,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "",
})

export interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipTrigger>
      {children}

      <BaseTooltip>
        <OverlayArrow>
          <svg width={8} height={8}>
            <path d="M0 0,L4 4,L8 0" />
          </svg>
        </OverlayArrow>

        {content}
      </BaseTooltip>
    </TooltipTrigger>
  )
}
