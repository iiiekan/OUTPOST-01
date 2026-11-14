// SHIELDING
// Protects the crew from radiation.
// If shield >= radiation, the crew takes no radiation damage.
// If shield < radiation, the damage is only slowed (see health.js).

import { SHIELD } from '../config.js'
import { hasPower } from './power.js'

// The shield level that is really working this tick.
// Shielding does nothing while there isn't enough power.
export const effectiveShield = (state) => (hasPower(state) ? state.shield : 0)

// ----- Slider notches -----
// The shielding slider moves in fixed steps (see SHIELD in config.js).
// These two functions convert between a notch number and a shielding value.

// How many notches the slider has (0, 4, 8 ... 100 -> 26)
export const NOTCH_COUNT = Math.round(SHIELD.max / SHIELD.step) + 1

// Notch number -> shielding value.  Example: notch 9 -> 36
export const notchToShield = (notch) => notch * SHIELD.step

// Shielding value -> nearest notch number.  Example: 36 -> notch 9
export const shieldToNotch = (shield) => Math.round(shield / SHIELD.step)

// True if the shield fully blocks the current radiation.
export const isFullyShielded = (shield, radiation) => shield >= radiation
