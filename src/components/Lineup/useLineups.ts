import { useEffect, useRef, useState } from "react"
import { Player } from "api/players"
import type { Lineup, WorkerMessage } from "./worker"

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
})

export function useLineups(
  roster: Player[],
  inning: number,
  onLineup: (lineup: Lineup | undefined) => void
) {
  const [lineups, setLineups] = useState<Lineup[]>()
  const onLineupRef = useRef(onLineup)
  onLineupRef.current = onLineup

  useEffect(() => {
    if (!roster.length) return

    // Generate a random token to identify the message. This ensures that we
    // only handle non-cancelled messages.
    const token = Math.random().toString(36).slice(8)

    function handleMessage(event: MessageEvent<WorkerMessage>) {
      if (event.data.type === "lineups" && event.data.token === token) {
        setLineups(event.data.lineups)
        onLineupRef.current?.(event.data.lineups?.[0])
      }
    }

    worker.addEventListener("message", handleMessage)
    worker.postMessage({ inning, roster, token, type: "generate" })

    return () => worker.removeEventListener("message", handleMessage)
  }, [inning, roster])

  return [lineups?.[0], { loading: !lineups }] as const
}
