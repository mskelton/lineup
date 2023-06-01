import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline"
import { ActionButton } from "./ActionButton"

export const totalInnings = 7

export interface ActionsProps {
  inning: number
  onNext(): void
  onPrev(): void
}

export default function Actions({ inning, onNext, onPrev }: ActionsProps) {
  return (
    <ActionButton.Container>
      <ActionButton
        color="green"
        icon={<BackwardIcon />}
        isDisabled={inning <= 1}
        onPress={onPrev}
      >
        Previous Inning
      </ActionButton>

      <ActionButton
        color="blue"
        icon={<ForwardIcon />}
        isDisabled={inning >= totalInnings * 2}
        onPress={onNext}
      >
        Next Inning
      </ActionButton>
    </ActionButton.Container>
  )
}
