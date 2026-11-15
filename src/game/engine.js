// The game engine.
//
// step() takes the old state and returns the next one. One call = one tick.
// It is a "pure" function (no React, no side effects), which makes it easy to test.
// Each mechanic (power, oxygen, ...) lives in its own file in ./mechanics/.
import { TICK, MISSION_LENGTH } from './config.js'
import { createInitialState } from './state.js'
import { updateHazards, computeRadiation } from './mechanics/hazards.js'
import { updatePower, canUsePower } from './mechanics/power.js'
import { effectiveShield } from './mechanics/shielding.js'
import { updateOxygen, isPumping } from './mechanics/oxygen.js'
import { updateHealth } from './mechanics/health.js'
import { getCmeForecast } from './nasaDonki.js'

export function step(state) {
  // 1. ABSOLUTE SAFETY GUARD: If state is undefined, return a fresh initial state instantly
  if (!state || typeof state !== 'object') {
    return createInitialState('ready')
  }

  // Only run while the game is being played
  if (state.phase !== 'playing') return state

  // 2. Advance time
  const t = state.t + TICK

  // 3. Hazards and radiation
  let { hazards, nextHazard } = updateHazards(state)
  const radiation = computeRadiation(t, hazards)
  
  // Sync real NASA DONKI CME impact
  const { activeCme } = getCmeForecast(t, state.cmeSchedule)
  const hasCme = hazards.some((h) => h.type === 'cme')
  if (activeCme && !hasCme) {
    hazards = [...hazards, { type: 'cme', t: 0, dur: activeCme.dur, peak: 40, shape: 'bell' }]
  }

  const shield = effectiveShield(state)
  const pumping = isPumping(state)

  // 4. Update resources
  const power = updatePower(state.power, shield, pumping)
  const oxygen = updateOxygen(state.oxygen, pumping)
  const health = updateHealth(state.health, { 
    oxygen, 
    radiation, 
    shield, 
    hazards, 
    aborted: state.aborted 
  })

  // 5. Radiation history sample
  const shouldSample = Math.round(t * 10) % 5 === 0
  const history = shouldSample
    ? [...state.history.slice(1), radiation]
    : state.history

  const locked = !canUsePower(power)

  // 6. Game over check
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
