import { UserGroupIcon } from "@heroicons/react/24/outline"
import { usePlayers } from "api/players"
import EmptyState from "components/common/EmptyState"
import Skeleton from "components/common/Skeleton"
import Title from "components/common/Title"
import AddPlayerModal from "components/Players/AddPlayerModal"
import StackedList from "components/StackedList"
import StackedListItem from "components/StackedList/StackedListItem"

export default function Players() {
  const [players, { loading }] = usePlayers()

  return (
    <div className="mb-20">
      <div className="mb-8 flex items-center justify-between">
        <Title>Players</Title>

        {!loading && players?.length ? <AddPlayerModal /> : null}
      </div>

      {loading ? (
        <Skeleton className="h-44" />
      ) : players?.length ? (
        <StackedList>
          {players.map((player) => (
            <StackedListItem
              href={`/players/${player.id}`}
              key={player.id}
              title={player.name}
            />
          ))}
        </StackedList>
      ) : (
        <EmptyState icon={<UserGroupIcon />}>Create a new player</EmptyState>
      )}
    </div>
  )
}
