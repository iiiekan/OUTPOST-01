// LEFT WALL: the warning light.
// Turns on (and blinks) whenever any hazard is active.
// It does NOT say which hazard - the player has to figure that out from the astronaut.
import './WarningPanel.css'

export default function WarningPanel({ active }) {
  return (
    <div className={`panel warning ${active ? 'on' : ''}`}>
      {/* Warning triangle drawing */}
      <svg viewBox="0 0 100 90" className="triangle">
        <polygon points="50,6 94,84 6,84" />
        <line x1="50" y1="32" x2="50" y2="58" />
        <circle cx="50" cy="71" r="2.5" />
      </svg>

      <div className="label">WARNING</div>
    </div>
  )
}
