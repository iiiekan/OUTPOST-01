// React hook that runs the game.
//
// - Keeps the game state in React.
// - Calls step() (see game/engine.js) every TICK seconds to advance the game.
// - Gives the UI the actions the player can take (start, shield, pump).
import { useEffect, useState } from 'react'
import { TICK } from '../game/config.js'
import { createInitialState } from '../game/state.js'
import { step } from '../game/engine.js'
import { canUsePower } from '../game/mechanics/power.js'
import { fetchNasaCmeSchedule } from '../game/nasaDonki.js'

export function useGame() {
  // Always initialize with a valid state object
  const [game, setGame] = useState(() => createInitialState())

  useEffect(() => {
    const id = setInterval(() => setGame((s) => step(s)), TICK * 1000)

    // Stop the loop when the component unmounts
    return () => clearInterval(id)
  }, [])

  return {
    // Guaranteed to be an object, never undefined
    game: game || createInitialState(),

    start: async () => {
      const schedule = await fetchNasaCmeSchedule()
      setGame({ ...createInitialState('playing'), cmeSchedule: schedule })
    },

    setShield: (shield) => setGame((s) => ({ ...s, shield })),

    setPumping: (pumping) =>
      setGame((s) => ({ ...s, pumping: pumping && canUsePower(s.power) })),

    toggleAbort: () =>
      setGame((s) => ({ ...s, aborted: !s.aborted })),
  }
}