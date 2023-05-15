import Actions from "./components/Actions"
import ResponsiveTitle from "./components/common/ResponsiveTitle"
import Lineup from "./components/Lineup"

export default function LineupPage() {
  return (
    <div className="mb-20">
      <ResponsiveTitle className="mb-8">Lineup</ResponsiveTitle>
      <Lineup />
      <Actions />
    </div>
  )
}
