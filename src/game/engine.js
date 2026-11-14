// The game engine.
//
// step() takes the old state and returns the next one. One call = one tick.
// It is a "pure" function (no React, no side effects), which makes it easy to test.
// Each mechanic (power, oxygen, ...) lives in its own file in ./mechanics/.
import { TICK, MISSION_LENGTH } from './config.js'

import { updateHazards, computeRadiation } from './mechanics/hazards.js'
import { updatePower, canUsePower } from './mechanics/power.js'
import { effectiveShield } from './mechanics/shielding.js'
import { updateOxygen, isPumping } from './mechanics/oxygen.js'
import { updateHealth } from './mechanics/health.js'

export function step(state) {
  // Only run while the game is being played
  if (state.phase !== 'playing') return state

  // 1. Advance time
  const t = state.t + TICK

  // 2. Hazards and radiation
  const { hazards, nextHazard } = updateHazards(state)
  const radiation = computeRadiation(t, hazards)

  // 3. What the player's controls are actually doing right now
  //    (both are switched off if there isn't enough power)
  const shield = effectiveShield(state)
  const pumping = isPumping(state)

  // 4. Update the resources
  const power = updatePower(state.power, shield, pumping)
  const oxygen = updateOxygen(state.oxygen, pumping)
  const health = updateHealth(state.health, { oxygen, radiation, shield })

  // 5. Save a radiation sample for the graph (every 0.5 seconds)
  const shouldSample = Math.round(t * 10) % 5 === 0
  const history = shouldSample
    ? [...state.history.slice(1), radiation]
    : state.history

  // 6. If power ran out, the oxygen pump switches off.
  //    The shield slider keeps the player's setting, but effectiveShield()
  //    ignores it while power is below the minimum.
  const locked = !canUsePower(power)

  // 7. Did the game end?
  const phase =
    health <= 0 ? 'lost' :
    t >= MISSION_LENGTH ? 'won' :
    'playing'

  return {
    ...state,
    t,
    hazards,
    nextHazard,
    radiation,
    power,
    oxygen,
    health,
    history,
    phase,
    pumping: locked ? false : state.pumping,
  }
}
