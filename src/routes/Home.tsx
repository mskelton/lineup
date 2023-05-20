import { useState } from "react"
import { useRosters } from "api/rosters"
import Lineup from "components/Lineup/Lineup"

function SelectRoster() {
  const [rosters, { loading }] = useRosters()
  console.log(rosters)

  return loading ? <div /> : null
}

export default function Home() {
  const [rosterId, setRosterId] = useState(
    () => sessionStorage.getItem("rosterId") || ""
  )

  return rosterId ? <Lineup rosterId={rosterId} /> : <SelectRoster />
}
