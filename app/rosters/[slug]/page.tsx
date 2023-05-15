"use client"

import { usePlayers } from "../../api/players"
import { setPlayerActive, useRoster } from "../../api/rosters"
import { Loader } from "../../components/common/Loader"
import { NotFound } from "../../components/common/NotFound"
import Switch from "../../components/common/Switch"
import Title from "../../components/common/Title"

export interface RostersPageProps {
  params: {
    slug: string
  }
}

export default function RostersPage({ params }: RostersPageProps) {
  const [roster, { loading: loadingRoster }] = useRoster(params.slug)
  const [players, { loading: loadingPlayers }] = usePlayers()
  const loading = loadingRoster || loadingPlayers

  return (
    <main className="mb-20">
      {loading ? (
        <Loader className="h-44 w-full" />
      ) : !roster ? (
        <NotFound
          title="Roster not found"
          subtitle="Sorry, we couldn’t find the roster you're looking for."
        />
      ) : (
        <div>
          <Title className="mb-8">{roster.name}</Title>

          <fieldset>
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Players
            </legend>

            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
              {(players ?? []).map((player, personIdx) => {
                const isSelected = roster.players[player.id]
                const handleChange = (isSelected: boolean) =>
                  setPlayerActive(roster.id, player.id, isSelected)

                return (
                  <div
                    key={personIdx}
                    className="relative flex cursor-pointer items-start px-4 py-4 transition-colors hover:bg-gray-50"
                    onClick={() => handleChange(!isSelected)}
                  >
                    <div className="min-w-0 flex-1 text-sm leading-6">
                      {player.name}
                    </div>

                    <Switch
                      isSelected={isSelected}
                      onChange={(isSelected) => handleChange(isSelected)}
                    >
                      <span className="sr-only">
                        Add {player.name} to roster
                      </span>
                    </Switch>
                  </div>
                )
              })}
            </div>
          </fieldset>
        </div>
      )}
    </main>
  )
}
