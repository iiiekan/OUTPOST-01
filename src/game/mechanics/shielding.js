// SHIELDING
// Protects the crew from radiation.
// If shield >= radiation, the crew takes no radiation damage.
// If shield < radiation, the damage is only slowed (see health.js).

import { hasPower } from './power.js'

// The shield level that is really working this tick.
// Shielding does nothing while there isn't enough power.
export const effectiveShield = (state) => (hasPower(state) ? state.shield : 0)

// True if the shield fully blocks the current radiation.
export const isFullyShielded = (shield, radiation) => shield >= radiation
