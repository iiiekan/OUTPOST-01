// ASTRONAUT COMMUNICATION
// The astronaut never says which hazard is happening, but gives hints.
// What they say and how they look also tells the player how healthy the crew is.

// Vague hints for each hazard type
const HAZARD_HINTS = {
  flare: 'Whoa, a bright flash on the horizon!',
  cme: 'Instruments are acting strange out here...',
  storm: "Radio's full of static and the sky is glowing.",
}

// The line the astronaut says right now. Low health always comes first.
export function commsLine({ health, hazards }) {
  if (health <= 10) return "I feel like I'm about to die..."
  if (health <= 50) return "I don't feel so good..."

  // Healthy but a hazard is active -> vague hint about it
  if (hazards[0]) return HAZARD_HINTS[hazards[0].type]

  return 'All good out here, Mission Control!'
}

// How the astronaut looks (used to pick the face drawing):
// 'good' | 'ok' | 'sick' | 'bad' | 'dying'
export function moodFor(health) {
  if (health > 66) return 'good'
  if (health > 50) return 'ok'
  if (health > 25) return 'sick'
  if (health > 10) return 'bad'
  return 'dying'
}
