import Actions from "components/Actions"
import Title from "components/common/Title"
import Lineup from "components/Lineup"

export default function Home() {
  return (
    <div className="mb-20">
      <Title className="sr-only">Lineup</Title>
      <Lineup />
      <Actions />
    </div>
  )
}
