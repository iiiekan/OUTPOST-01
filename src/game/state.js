// The starting state of a new game.
// Everything the game knows about the current moment lives in this one object.
import { POWER, OXYGEN, HEALTH, RADIATION, HAZARD_SPAWN } from './config.js'

export const createInitialState = (phase = 'ready') => ({
  // 'ready' (start screen) | 'playing' | 'won' | 'lost'
  phase,

  // Seconds since the mission started
  t: 0,

  // The resources (all 0 - 100)
  power: POWER.start,
  oxygen: OXYGEN.start,
  health: HEALTH.start,

  // Player controls
  shield: 0,          // where the player put the shielding slider
  pumping: false,     // true while the oxygen button is held
  aborted: false,     // true when crew is evacuated

  // Hazards
  hazards: [],                     // hazards that are active right now
  nextHazard: HAZARD_SPAWN.firstAt, // seconds until the next one appears
  cmeSchedule: [],

  // Radiation
  radiation: RADIATION.baseline,                  // current level
  history: Array(60).fill(RADIATION.baseline),    // last 60 samples, drawn on the graph
})
