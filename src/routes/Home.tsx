import SelectPlayers from "components/Home/SelectPlayers"
import SelectRoster from "components/Home/SelectRoster"
import SelectVenue from "components/Home/SelectVenue"
import Lineup from "components/Lineup/Lineup"
import { useStorageState } from "hooks/useStorageState"

export default function Home() {
  const [rosterId, setRosterId] = useStorageState("rosterId", "")
  const [players, setPlayers] = useStorageState("players", [])
  const [venue, setVenue] = useStorageState("venue", "")

  return !rosterId ? (
    <SelectRoster
      onSelect={(id) => {
        sessionStorage.setItem("rosterId", id)
        setRosterId(id)
      }}
    />
  ) : !venue ? (
    <SelectVenue onSelect={setVenue} />
  ) : !players.length ? (
    <SelectPlayers onSelect={setPlayers} rosterId={rosterId} />
  ) : (
    <Lineup playerIds={players} venue={venue} />
  )
}
