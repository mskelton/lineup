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
    <div className="fixed bottom-0 right-0 flex w-full justify-evenly gap-2 bg-slate-100 p-4 shadow-lg lg:w-[calc(100%-18rem)]">
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
    </div>
  )
}
