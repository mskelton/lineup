import { UserPlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { addPlayer } from "api/players"
import { AddModal } from "components/AddModal"

export default function AddPlayerModal() {
  const navigate = useNavigate()

  return (
    <AddModal
      icon={<UserPlusIcon />}
      onCreate={async (name) => {
        const id = await addPlayer(name)
        navigate(`/players/${id}`)
      }}
      title="Create player"
    />
  )
}
