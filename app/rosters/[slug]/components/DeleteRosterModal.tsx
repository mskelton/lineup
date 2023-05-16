import { useRouter } from "next/navigation"
import { deleteRoster } from "../../../api/rosters"
import DeleteModal from "../../../components/DeleteModal"

export interface DeleteRosterModalProps {
  id: string
}

export function DeleteRosterModal({ id }: DeleteRosterModalProps) {
  const { push } = useRouter()

  return (
    <DeleteModal
      title="Delete roster"
      onDelete={async () => {
        await deleteRoster(id)
        push("/rosters")
      }}
    >
      Are you sure you want to delete this roster? This will not delete any
      players, but you will loose all roster data. This action cannot be undone.
    </DeleteModal>
  )
}
