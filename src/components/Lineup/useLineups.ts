import { useEffect, useState } from "react"
import { Player } from "api/players"
import type { Lineup, WorkerMessage } from "./worker"

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
})

export function useLineups(roster: Player[], inning: number) {
  const [lineups, setLineups] = useState<Lineup[]>()

  useEffect(() => {
    if (!roster.length) return

    // Generate a random token to identify the message. This ensures that we
    // only handle non-cancelled messages.
    const token = Math.random().toString(36).slice(8)

    function handleMessage(event: MessageEvent<WorkerMessage>) {
      if (event.data.type === "lineups" && event.data.token === token) {
        setLineups(event.data.lineups)
      }
    }

    worker.addEventListener("message", handleMessage)
    worker.postMessage({ inning, roster, token, type: "generate" })

    return () => worker.removeEventListener("message", handleMessage)
  }, [inning, roster])

  return [lineups?.[0], { loading: !lineups }] as const
}
