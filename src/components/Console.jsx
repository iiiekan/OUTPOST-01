// BOTTOM: the player's console.
//   - Shielding slider
//   - Oxygen button (hold to turn power into oxygen)
//   - Meters for power, oxygen and crew health
//
// When power is below the minimum, both controls turn red and say
// "NOT ENOUGH POWER". The shield stops working and the button is disabled.
// (The slider can still be moved, so the player can lower it.)
import Meter from './Meter.jsx'
import { SHOW_OXYGEN_GAUGE } from '../game/config.js'
import { canUsePower } from '../game/mechanics/power.js'
import './Console.css'

export default function Console({ game, onShield, onPump }) {
  const locked = !canUsePower(game.power)

  return (
    <div className="console">
      {/* Shielding slider */}
      <div className={`control ${locked ? 'locked' : ''}`}>
        <div className="label">SHIELDING {game.shield}</div>

        <input
          type="range"
          min="0"
          max="100"
          value={game.shield}
          onChange={(e) => onShield(Number(e.target.value))}
        />

        {locked && <div className="warn-text">NOT ENOUGH POWER</div>}
      </div>

      {/* Oxygen button: pumping lasts only while the button is held down */}
      <div className={`control ${locked ? 'locked' : ''}`}>
        <button
          className={`big-btn ${game.pumping && !locked ? 'held' : ''} ${locked ? 'locked' : ''}`}
          disabled={locked}
          onPointerDown={() => !locked && onPump(true)}
          onPointerUp={() => onPump(false)}
          onPointerLeave={() => onPump(false)}
          onPointerCancel={() => onPump(false)}
        >
          HOLD TO PUMP OXYGEN
        </button>

        {locked && <div className="warn-text">NOT ENOUGH POWER</div>}
      </div>

      {/* Meters */}
      <div className="control">
        <Meter label="POWER" value={game.power} />
        {SHOW_OXYGEN_GAUGE && <Meter label="OXYGEN" value={game.oxygen} />}
        <Meter label="CREW" value={game.health} />
      </div>
    </div>
  )
}
