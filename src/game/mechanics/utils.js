// Small helpers shared by the mechanics.

// Keeps a number between min and max. Example: clamp(120) -> 100
export const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value))
