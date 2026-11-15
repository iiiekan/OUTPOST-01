// ============================================================
// GAME SETTINGS
// All the balance numbers live here. Tweak freely to make the
// game easier or harder without touching any game logic.
// ============================================================

// ---------- General ----------

export const TICK = 0.1                // seconds per game tick
export const MISSION_LENGTH = 240      // survive this many seconds to win
export const SHOW_OXYGEN_GAUGE = true  // false = player must rely on astronaut comms only


// ---------- Power ----------

export const POWER = {
  start: 100,
  minToUse: 5,          // need at least this much power to use shielding / oxygen pump
  recovery: 0.3,        // power gained per second (very slow on purpose)
  shieldCost: 0.0004,   // power lost per second = shieldCost * shield * shield
  pumpCost: 3,          // power lost per second while the oxygen button is held
}


// ---------- Shielding slider ----------

// The slider clicks between fixed notches (like a real switch):
//   0, 4, 8, ... 96, 100  ->  26 notches
export const SHIELD = {
  step: 4,              // shielding goes up by this much per notch
  max: 100,             // highest shielding
}


// ---------- Oxygen ----------

export const OXYGEN = {
  start: 100,
  drain: 1,             // oxygen lost per second
  pumpGain: 6,          // oxygen gained per second while pumping
}


// ---------- Crew health ----------

export const HEALTH = {
  start: 100,
  suffocateDamage: 3,     // health lost per second when oxygen is 0
  radiationDamage: 0.06,  // health lost per second, for every point of UNSHIELDED radiation
}


// ---------- Radiation ----------

export const RADIATION = {
  baseline: 8,          // normal background radiation
  wobble: 3,            // how much the background slowly goes up and down
}


// ---------- Hazards ----------

// When hazards appear (seconds).
// Only ONE hazard happens at a time. After a hazard ends there is a quiet
// period (the warning lights are off) before the next one starts.
export const HAZARD_SPAWN = {
  firstAt: 12,          // time of the first hazard
  min: 10,              // shortest quiet time AFTER a hazard has ended
  max: 20,              // longest quiet time AFTER a hazard has ended
}

// The three hazard types.
//   peak  = how much extra radiation it adds at its strongest
//   dur   = how many seconds it lasts
//   shape = 'decay' -> instant spike that slowly fades
//           'bell'  -> slow wave that rises, then falls
export const HAZARDS = {
  flare: { peak: 45, dur: 20, shape: 'decay' },   // solar flare
  cme:   { peak: 30, dur: 35, shape: 'bell' },    // coronal mass ejection
  storm: { peak: 20, dur: 30, shape: 'bell' },    // geomagnetic storm
}
