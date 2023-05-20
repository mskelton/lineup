import SelectPlayers from "components/Home/SelectPlayers"
import SelectRoster from "components/Home/SelectRoster"
import Lineup from "components/Lineup/Lineup"
import { useStorageState } from "hooks/useStorageState"

export default function Home() {
  const [rosterId, setRosterId] = useStorageState("rosterId", "")
  const [players, setPlayers] = useStorageState("players", [])

  return !rosterId ? (
    <SelectRoster
      onSelect={(id) => {
        sessionStorage.setItem("rosterId", id)
        setRosterId(id)
      }}
    />
  ) : !players.length ? (
    <SelectPlayers onSelect={setPlayers} rosterId={rosterId} />
  ) : (
    <Lineup playerIds={players} rosterId={rosterId} />
  )
}
