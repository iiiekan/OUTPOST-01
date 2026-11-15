// HAZARDS AND RADIATION
// Random events (solar flare, coronal mass ejection, geomagnetic storm)
// add extra radiation on top of the normal background level.
// The hazard types are defined in config.js.
import { TICK, HAZARDS, HAZARD_SPAWN, RADIATION } from '../config.js'
import { clamp } from './utils.js'

// How much radiation ONE hazard is adding right now.
function hazardRadiation(hazard) {
  const progress = hazard.t / hazard.dur  // 0 at the start, 1 at the end

  if (hazard.shape === 'decay') {
    // Starts at full strength and fades out
    return hazard.peak * (1 - progress)
  }

  // 'bell': rises to the peak in the middle, then falls
  return hazard.peak * Math.sin(Math.PI * progress)
}

// Ages the active hazards, removes finished ones, and sometimes starts a new one.
// Returns { hazards, nextHazard }.
export function updateHazards(state) {
  // Age every hazard by one tick, drop the ones that finished
  const hazards = state.hazards
    .map((hazard) => ({ ...hazard, t: hazard.t + TICK }))
    .filter((hazard) => hazard.t < hazard.dur)

  // Count down to the next hazard - but ONLY while no hazard is happening.
  // This keeps hazards from overlapping, so the warning lights really do
  // turn off when an event is over.
  let nextHazard = state.nextHazard
  if (hazards.length === 0) {
    nextHazard -= TICK
  }

  // Time for a new hazard: pick a random type
  if (nextHazard <= 0) {
    const types = Object.keys(HAZARDS)
    const type = types[Math.floor(Math.random() * types.length)]

    hazards.push({ type, t: 0, ...HAZARDS[type] })

    // The quiet time that will follow once this hazard has ended
    nextHazard =
      HAZARD_SPAWN.min + Math.random() * (HAZARD_SPAWN.max - HAZARD_SPAWN.min)
  }

  return { hazards, nextHazard }
}

// The total radiation level right now (0 - 100, whole number).
// It is rounded so the player can match it exactly with the shield slider.
export function computeRadiation(t, hazards) {
  const background = RADIATION.baseline + RADIATION.wobble * Math.sin(t / 4)
  const fromHazards = hazards.reduce((sum, hazard) => sum + hazardRadiation(hazard), 0)

  return Math.round(clamp(background + fromHazards))
}
