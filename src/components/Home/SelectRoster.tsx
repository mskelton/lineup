import { useRosters } from "api/rosters"
import AddButton from "components/common/AddButton"
import Alert from "components/common/Alert"
import Skeleton from "components/common/Skeleton"

export interface SelectRoster {
  onSelect(id: string): void
}

export default function SelectRoster({ onSelect }: SelectRoster) {
  const [rosters, { loading }] = useRosters()

  return loading ? (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-12" />
      ))}
    </div>
  ) : rosters ? (
    <div>
      <Alert className="mb-6" variant="info">
        Select the roster for the lineup. Players from the roster who are not
        playing can be removed.
      </Alert>

      <ul className="space-y-2">
        {rosters.map((roster) => (
          <li key={roster.id}>
            <AddButton
              aria-label={`Add ${roster.name}`}
              onClick={() => onSelect(roster.id)}
            >
              {roster.name}
            </AddButton>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
