import type { Player } from "api/players"

// NOTE: Copied from utils/positions since we can't import in the worker.
const fieldPositions = [
  "pitcher",
  "catcher",
  "first",
  "second",
  "shortstop",
  "third",
  "left",
  "left-center",
  "right",
  "right-center",
]

export type WorkerMessage =
  | {
      inning: number
      roster: Player[]
      token: string
      type: "generate"
    }
  | {
      lineups: Lineup[]
      score: number
      token: string
      type: "lineups"
    }

export interface Lineup {
  players: Record<string, string | undefined>
  score: number
}

/**
 * Convert an index-based lineup to a more useful object-based lineup.
 */
function convertToLineupPlayers(lineup: number[], roster: Player[]) {
  return lineup.reduce((acc, player, position) => {
    return { ...acc, [roster[player].name]: fieldPositions[position] }
  }, {} as Lineup["players"])
}

const cache = new Map<string, Lineup[]>()

/**
 * Score the lineup based on the players and their positions. The goal is the
 * lowest overall score.
 *
 * @param lineup The lineup to score. This is a list corresponding to the list
 * of positions where each value is the player index.
 * @param playerPreferences The list of players and their scores for each position.
 * If a position is not chosen by the player, the score is very high to discourage
 * using that lineup..
 * @returns The score of the lineup. If the lineup is invalid, Infinity is returned.
 */
function getScore(lineup: number[], playerPreferences: number[][]) {
  // If the lineup has any duplicates, it is invalid.
  if (new Set(lineup).size !== lineup.length) {
    return Infinity
  }

  return lineup.reduce((acc, playerIndex, i) => {
    // We square the position preference to make less desired positions more
    // costly to the overall team score. This helps ensure a more balanced
    // spread of preferences, rather than a few players having very undesirable
    // positions.
    return acc + playerPreferences[playerIndex][i] ** 2
  }, 0)
}

/**
 * Generate the next lineup from the current lineup. This is done by swapping
 * the first player with the next available player for that position. If there
 * are no more available players, the next position is swapped and the previous
 * position is reset to the first available player for that position.
 *
 * This function is NOT PURE and will mutate the lineup array.
 *
 * @param lineup The current lineup to modify.
 * @param playersByPosition The list of players for each position.
 * @return True if the lineup was modified, false if there are no more lineups.
 */
function nextLineup(lineup: number[], playersByPosition: number[][]) {
  for (let position = 0; position < lineup.length; position++) {
    const availablePlayers = playersByPosition[position]
    // TODO: optimize this
    const currentPlayerIndex = availablePlayers.indexOf(lineup[position])
    const nextPlayer = availablePlayers[currentPlayerIndex + 1]

    // If there is no more players for this position, reset the position and
    // continue to the next position.
    if (nextPlayer === undefined) {
      lineup[position] = availablePlayers[0]
      continue
    }

    // Replace the current player with the next available player for this position.
    lineup[position] = nextPlayer

    return true
  }

  // If we get here, there are no more lineups to generate.
  return false
}

/**
 * When we have more players than positions, we need to bench different players
 * each inning. This is a little tricky since some positions have fewer players
 * that can play them, such as pitcher or shortstop.
 *
 * To account for this, we generate a score for each player. This score is based
 * on how many players have selected a given position. More desirable positions
 * have a higher score, while less desirable positions have a lower score.
 *
 * Players are then sorted by their score and players that sit will be chosen
 * evenly throughout the list. This ensures that players playing the rare
 * positions will not be benched at the same time to ensure those positions have
 * an available player.
 */
function benchPlayers(roster: Player[], inning: number) {
  // TODO:
  return roster.slice(0, 9)
}

function generateIdealLineups(roster: Player[]) {
  const cacheKey = JSON.stringify(roster)
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }

  // Step 1 is constructing a mapping of positions to players that can play
  // those positions.
  const playersByPosition = fieldPositions.map((position) => {
    return roster.reduce((acc, player, i) => {
      const playerPositions = Object.keys(player.positions ?? {})
      return playerPositions.some((p) => p === position) ? [...acc, i] : acc
    }, [] as number[])
  })

  // Next, we need to construct a inverse list of players and their position
  // preferences. This is used for scoring the lineups.
  const playerPreferences = roster.map((player) => {
    const playerPositions = Object.entries(player.positions ?? {})
      .sort((a, b) => a[1] - b[1])
      .map(([key]) => key)

    return fieldPositions.map((position) => {
      const index = playerPositions.indexOf(position) ?? -1
      return index === -1 ? Infinity : index
    })
  })

  // The starting lineup will chose the first available player for each position.
  // This will more than likely not be valid as it likely includes some players
  // more than once and other players not at all.
  const lineup: number[] | null = new Array(fieldPositions.length)
    .fill(0)
    .map((_, i) => playersByPosition[i][0])

  let bestLineup = lineup
  let bestScore = getScore(lineup, playerPreferences)

  while (nextLineup(lineup, playersByPosition)) {
    const newScore = getScore(lineup, playerPreferences)
    if (newScore < bestScore) {
      bestLineup = lineup.slice()
      bestScore = newScore
    }
  }

  const lineups: Lineup[] = [
    {
      players: convertToLineupPlayers(bestLineup, roster),
      score: bestScore,
    },
  ]

  cache.set(cacheKey, lineups)
  return lineups
}

self.addEventListener("message", (event) => {
  const data = event.data as WorkerMessage

  if (data.type === "generate") {
    const roster = benchPlayers(data.roster, data.inning)
    const lineups = generateIdealLineups(roster)
    self.postMessage({ lineups, token: data.token, type: "lineups" })
  }
})
