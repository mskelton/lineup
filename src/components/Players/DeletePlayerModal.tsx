import { useNavigate } from "react-router-dom"
import { deletePlayer } from "api/players"
import DeleteModal from "components/DeleteModal"

export interface DeletePlayerModalProps {
  id: string
}

export function DeletePlayerModal({ id }: DeletePlayerModalProps) {
  const navigate = useNavigate()

  return (
    <DeleteModal
      title="Delete player"
      onDelete={async () => {
        await deletePlayer(id)
        navigate("/players")
      }}
    >
      Are you sure you want to delete this player? Their fielding position
      preferences will be permanently removed from our servers forever. This
      action cannot be undone.
    </DeleteModal>
  )
}
