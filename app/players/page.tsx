"use client"

import { UserGroupIcon } from "@heroicons/react/24/outline"
import { usePlayers } from "../api/players"
import { Button } from "../components/common/Button"
import { EmptyState } from "../components/common/EmptyState"
import { Loader } from "../components/common/Loader"
import Title from "../components/common/Title"
import StackedList from "../components/StackedList/StackedList"
import StackedListItem from "../components/StackedList/StackedListItem"
import { AddPlayerModal } from "./components/AddPlayerModal"

export default function PlayersPage() {
  const [players, { loading }] = usePlayers()
  console.log(players)

  return (
    <main className="mb-20">
      <div className="mb-8 flex items-center justify-between">
        <Title>Players</Title>

        {!loading && players?.length ? <AddPlayerModal /> : null}
      </div>

      {loading ? (
        <Loader className="h-44 w-full" />
      ) : players?.length ? (
        <StackedList>
          {players?.map((player) => (
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
    </main>
  )
}
