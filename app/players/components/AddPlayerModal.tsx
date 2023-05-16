import { UserPlusIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { addPlayer } from "../../api/players"
import { AddModal } from "../../components/AddModal"

export function AddPlayerModal() {
  const { push } = useRouter()

  return (
    <AddModal
      title="Create player"
      icon={<UserPlusIcon />}
      onCreate={async (name) => {
        const id = await addPlayer(name)
        push(`/players/${id}`)
      }}
    />
  )
}
