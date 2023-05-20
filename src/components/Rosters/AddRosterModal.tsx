import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { addRoster } from "api/rosters"
import { AddModal } from "components/AddModal"

export default function AddRosterModal() {
  const navigate = useNavigate()

  return (
    <AddModal
      icon={<SquaresPlusIcon />}
      onCreate={async (name) => {
        const id = await addRoster(name)
        navigate(`/rosters/${id}`)
      }}
      title="Create roster"
    />
  )
}
