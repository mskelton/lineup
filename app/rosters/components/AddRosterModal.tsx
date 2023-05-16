import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { addRoster } from "../../api/rosters"
import { AddModal } from "../../components/AddModal"

export function AddRosterModal() {
  const { push } = useRouter()

  return (
    <AddModal
      title="Create roster"
      icon={<SquaresPlusIcon />}
      onCreate={async (name) => {
        const id = await addRoster(name)
        push(`/rosters/${id}`)
      }}
    />
  )
}
