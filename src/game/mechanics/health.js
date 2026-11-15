// CREW HEALTH
// The game is lost when this reaches 0.
// The crew loses health from two things:
//   1. No oxygen
//   2. Radiation that the shield doesn't fully block
import { TICK, HEALTH } from '../config.js'
import { clamp } from './utils.js'
import { isFullyShielded } from './shielding.js'

// Returns the new health after one tick.
export function updateHealth(health, { oxygen, radiation, shield, hazards = [], aborted = false }) {
  let loss = 0

  // No oxygen -> constant damage
  if (oxygen <= 0) {
    loss += HEALTH.suffocateDamage
  }

  // Not fully shielded -> damage grows with the gap between radiation and shield.
  // (Example: radiation 35, shield 20 -> damage is based on 15.)
  if (!isFullyShielded(shield, radiation)) {
    loss += HEALTH.radiationDamage * (radiation - shield)
  }

  // CME active and astronauts are still outside on EVA -> heavy plasma damage
  const cmeActive = hazards.some((h) => h.type === 'cme')
  if (cmeActive && !aborted) {
    loss += 12
  }

  return clamp(health - loss * TICK)
}
