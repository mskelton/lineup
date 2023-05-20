import {
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline"
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
      <ActionButton color="red" icon={<ArrowPathIcon />}>
        Regenerate Lineup
      </ActionButton>

      <ActionButton
        color="green"
        icon={<BackwardIcon />}
        isDisabled={!inning}
        onPress={onPrev}
      >
        Previous Inning
      </ActionButton>

      <ActionButton
        color="blue"
        icon={<ForwardIcon />}
        isDisabled={inning > totalInnings}
        onPress={onNext}
      >
        Next Inning
      </ActionButton>
    </ActionButton.Container>
  )
}
