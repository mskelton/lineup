import { useNavigate } from "react-router-dom"
import { deleteRoster } from "api/rosters"
import DeleteModal from "components/DeleteModal"

export interface DeleteRosterModalProps {
  id: string
}

export default function DeleteRosterModal({ id }: DeleteRosterModalProps) {
  const navigate = useNavigate()

  return (
    <DeleteModal
      title="Delete roster"
      onDelete={async () => {
        await deleteRoster(id)
        navigate("/rosters")
      }}
    >
      Are you sure you want to delete this roster? This will not delete any
      players, but you will loose all roster data. This action cannot be undone.
    </DeleteModal>
  )
}
