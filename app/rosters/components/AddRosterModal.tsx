import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { addRoster } from "../../api/rosters"
import { AddModal } from "../../components/AddModal"

export function AddRosterModal() {
  return (
    <AddModal
      title="Create roster"
      icon={<SquaresPlusIcon />}
      onCreate={(name) => addRoster(name)}
    />
  )
}
