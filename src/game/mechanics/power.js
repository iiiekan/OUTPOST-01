// POWER
// Starts at 100 and recovers very slowly, so the player has to spend it carefully.
// Shielding and the oxygen pump both use power.
import { TICK, POWER } from '../config.js'
import { clamp } from './utils.js'

// True if there is enough power to use shielding / the oxygen pump.
// (Takes a power NUMBER, e.g. canUsePower(4.2))
export const canUsePower = (power) => power >= POWER.minToUse

// Same check, but takes the whole game state.
export const hasPower = (state) => canUsePower(state.power)

// Returns the new power level after one tick.
export function updatePower(power, shield, pumping) {
  const recovered = POWER.recovery
  const usedByShield = POWER.shieldCost * shield * shield  // higher shield = much faster drain
  const usedByPump = pumping ? POWER.pumpCost : 0

  const change = recovered - usedByShield - usedByPump

  return clamp(power + change * TICK)
}
