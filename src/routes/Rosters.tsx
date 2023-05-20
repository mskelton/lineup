import { UserGroupIcon } from "@heroicons/react/24/outline"
import { Roster, useRosters } from "api/rosters"
import Badge from "components/common/Badge"
import EmptyState from "components/common/EmptyState"
import Skeleton from "components/common/Skeleton"
import Title from "components/common/Title"
import AddRosterModal from "components/Rosters/AddRosterModal"
import StackedList from "components/StackedList"
import StackedListItem from "components/StackedList/StackedListItem"
import { titleCase } from "utils/format"

const getTotalPlayers = (roster: Roster) =>
  Object.values(roster?.players ?? {}).filter(Boolean).length

export default function Rosters() {
  const [rosters, { loading }] = useRosters()

  return (
    <div className="mb-20">
      <div className="mb-8 flex items-center justify-between">
        <Title>Rosters</Title>

        {!loading && rosters?.length ? <AddRosterModal /> : null}
      </div>

      {loading ? (
        <Skeleton className="h-44" />
      ) : rosters?.length ? (
        <StackedList>
          {rosters.map((roster) => {
            const total = getTotalPlayers(roster)

            return (
              <StackedListItem
                key={roster.id}
                href={`/rosters/${roster.id}`}
                subtitle={`${total || "No"} player${total === 1 ? "" : "s"}`}
                title={roster.name}
              >
                <Badge
                  color={roster.status === "active" ? "green" : "yellow"}
                  size="lg"
                >
                  {titleCase(roster.status)}
                </Badge>
              </StackedListItem>
            )
          })}
        </StackedList>
      ) : (
        <EmptyState icon={<UserGroupIcon />}>Create a new roster</EmptyState>
      )}
    </div>
  )
}
