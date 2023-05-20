import { useParams } from "react-router-dom"
import { usePlayers } from "api/players"
import { setAllPlayersActive, setPlayerActive, useRoster } from "api/rosters"
import Button from "components/common/Button"
import NotFound from "components/common/NotFound"
import Skeleton from "components/common/Skeleton"
import Switch from "components/common/Switch"
import Title from "components/common/Title"
import DeleteRosterModal from "components/Rosters/DeleteRosterModal"

export default function RosterPage() {
  const params = useParams()
  const [roster, { loading: loadingRoster }] = useRoster(params.id!)
  const [players, { loading: loadingPlayers }] = usePlayers()
  const loading = loadingRoster || loadingPlayers
  const isAllSelected = Object.values(roster?.players ?? {}).every(Boolean)

  return (
    <div className="mb-20">
      {loading ? (
        <Skeleton className="h-44" />
      ) : !roster ? (
        <NotFound
          subtitle="Sorry, we couldn’t find the roster you're looking for."
          title="Roster not found"
        />
      ) : (
        <div>
          <Title className="mb-8">{roster.name}</Title>

          <fieldset>
            <legend className="flex w-full items-end justify-between px-2 text-base font-semibold leading-6 text-gray-900">
              <span>Players</span>

              <Button
                onPress={() => {
                  setAllPlayersActive(
                    roster.id,
                    players?.map((player) => player.id) ?? [],
                    !isAllSelected
                  )
                }}
                variant="link"
              >
                {isAllSelected ? "Remove" : "Add"} all
              </Button>
            </legend>

            <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
              {(players ?? []).map((player, personIdx) => {
                const isSelected = !!roster.players?.[player.id]
                const handleChange = (isSelected: boolean) =>
                  setPlayerActive(roster.id, player.id, isSelected)

                return (
                  <div
                    key={personIdx}
                    className="relative flex cursor-pointer items-start px-2 py-4 transition-colors hover:bg-gray-50"
                    onClick={() => handleChange(!isSelected)}
                  >
                    <div className="min-w-0 flex-1 text-sm leading-6">
                      {player.name}
                    </div>

                    <Switch
                      isSelected={isSelected}
                      label={`Add ${player.name} to roster`}
                      labelVisibility="hidden"
                      onChange={(isSelected) => handleChange(isSelected)}
                    />
                  </div>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-8">
            {!loading ? <DeleteRosterModal id={roster.id} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
