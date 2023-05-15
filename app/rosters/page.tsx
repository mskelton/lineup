"use client"

import { UserGroupIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Roster, useRosters } from "../api/rosters"
import { EmptyState } from "../components/common/EmptyState"
import { Loader } from "../components/common/Loader"
import Title from "../components/common/Title"
import StackedList from "../components/StackedList/StackedList"
import StackedListItem from "../components/StackedList/StackedListItem"
import { titleCase } from "../utils/format"
import { AddRosterModal } from "./components/AddRosterModal"

const getTotalPlayers = (roster: Roster) =>
  Object.values(roster?.players ?? {}).filter(Boolean).length

const statuses = {
  active: "text-green-700 bg-green-50 ring-green-600/20",
  archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

export default function RostersPage() {
  const [rosters, { loading }] = useRosters()

  return (
    <main className="mb-20">
      <div className="mb-8 flex items-center justify-between">
        <Title>Rosters</Title>

        {!loading && rosters?.length ? <AddRosterModal /> : null}
      </div>

      {loading ? (
        <Loader className="h-44 w-full" />
      ) : rosters?.length ? (
        <StackedList>
          {rosters.map((roster) => {
            const total = getTotalPlayers(roster)

            return (
              <StackedListItem
                title={roster.name}
                href={`/rosters/${roster.id}`}
                subtitle={`${total || "No"} player${total === 1 ? "" : "s"}`}
                key={roster.id}
              >
                <p
                  className={clsx(
                    "mt-1 hidden whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset sm:block",
                    statuses[roster.status as keyof typeof statuses]
                  )}
                >
                  {titleCase(roster.status)}
                </p>
              </StackedListItem>
            )
          })}
        </StackedList>
      ) : (
        <EmptyState icon={<UserGroupIcon />}>Create a new roster</EmptyState>
      )}
    </main>
  )
}
