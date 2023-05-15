import { UserPlusIcon } from "@heroicons/react/24/outline"
import { addPlayer } from "../../api/players"
import { AddModal } from "../../components/AddModal"

export function AddPlayerModal() {
  return (
    <AddModal
      title="Create player"
      icon={<UserPlusIcon />}
      onCreate={(name) => addPlayer(name)}
    />
  )
}
