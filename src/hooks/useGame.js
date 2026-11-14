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

export function useGame() {
  const [game, setGame] = useState(() => createInitialState())

  // Game loop: advance the game one tick at a regular interval.
  useEffect(() => {
    const id = setInterval(() => setGame(step), TICK * 1000)

    // Stop the loop when the component unmounts
    return () => clearInterval(id)
  }, [])

  return {
    // The current game state (read by the UI)
    game,

    // Start a fresh mission (also used for "try again")
    start: () => setGame(createInitialState('playing')),

    // Player moves the shielding slider (0 - 100)
    setShield: (shield) => setGame((s) => ({ ...s, shield })),

    // Player presses / releases the oxygen button.
    // The pump can only turn on if there is enough power.
    setPumping: (pumping) =>
      setGame((s) => ({ ...s, pumping: pumping && canUsePower(s.power) })),
  }
}
