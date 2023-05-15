import Actions from "./components/Actions"
import ResponsiveTitle from "./components/common/ResponsiveTitle"
import Lineup from "./components/Lineup"
import { roster } from "./data/roster"

export default function LineupPage() {
  return (
    <main className="mb-20">
      <ResponsiveTitle className="mb-8">Lineup</ResponsiveTitle>
      <Lineup roster={roster} />
      <Actions />
    </main>
  )
}
