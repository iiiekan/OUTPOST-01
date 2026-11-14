// OXYGEN
// Drains steadily. At 0 the crew starts losing health.
// The player can hold the oxygen button to turn power into oxygen.
import { TICK, OXYGEN } from '../config.js'
import { clamp } from './utils.js'
import { hasPower } from './power.js'

// True if the pump is really running (button held AND enough power).
export const isPumping = (state) => state.pumping && hasPower(state)

// Returns the new oxygen level after one tick.
export function updateOxygen(oxygen, pumping) {
  const gained = pumping ? OXYGEN.pumpGain : 0
  const change = gained - OXYGEN.drain

  return clamp(oxygen + change * TICK)
}
