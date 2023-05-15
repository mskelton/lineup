import { useEffect, useMemo, useState } from "react"
import { fieldPositions } from "../../data/positions"
import { TeamPlayer } from "./LineupItem"

export type Lineup = Record<string, string | undefined>

/**
 * Convert an index-based lineup to a more useful object-based lineup.
 */
function convertToLineup(lineup: number[], roster: TeamPlayer[]) {
  return roster.reduce((acc, player, i) => {
    return { ...acc, [player.name]: fieldPositions[lineup[i]] }
  }, {} as Lineup)
}

const cache = new WeakMap<TeamPlayer[], Lineup[]>()

/**
 * Score the lineup based on the players and their positions. The goal is the
 * lowest overall score.
 *
 * @param lineup The lineup to score. This is a list corresponding to the list
 * of positions where each value is the player index.
 * @param playerPreferences The list of players and their scores for each position. If a
 * position is not chosen by the player, the score is Infinity.
 * @returns The score of the lineup. If the lineup is invalid, Infinity is returned.
 */
function getScore(lineup: number[], playerPreferences: number[][]) {
  // If the lineup has any duplicates, it is invalid.
  if (new Set(lineup).size !== lineup.length) {
    return Infinity
  }

  return lineup.reduce((acc, playerIndex, i) => {
    return acc + playerPreferences[playerIndex][i]
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

function generateIdealLineups(roster: TeamPlayer[]) {
  if (cache.has(roster)) {
    return cache.get(roster)!
  }

  console.time("generateIdealLineups")

  // Step 1 is constructing a mapping of positions to players that can play
  // those positions.
  const playersByPosition = fieldPositions.map((position) => {
    return roster.reduce((acc, player, i) => {
      return player.positions.includes(position) ? [...acc, i] : acc
    }, [] as number[])
  })

  // Next, we need to construct a inverse list of players and their position
  // preferences. This is used for scoring the lineups.
  const playerPreferences = roster.map((player) => {
    return fieldPositions.map((position) => {
      const index = player.positions.indexOf(position)
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

  const lineups = [convertToLineup(bestLineup, roster)] as Lineup[]
  cache.set(roster, lineups)

  console.timeEnd("generateIdealLineups")
  return lineups
}

export function useLineups(roster: TeamPlayer[], activePlayers: string[]) {
  const [lineups, setLineups] = useState<Lineup[]>([{}])
  const activeRoster = useMemo(() => {
    return roster.filter((player) => activePlayers.includes(player.name))
  }, [roster, activePlayers])

  useEffect(() => {
    setTimeout(() => {
      setLineups(generateIdealLineups(activeRoster))
    })
  }, [activeRoster])

  return lineups
}