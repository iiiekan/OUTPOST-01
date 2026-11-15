// BOTTOM: the player's console.
//   - Shielding slider (sprites in assets/slide/)
//   - Oxygen button (sprites in assets/but/, hold to turn power into oxygen)
//   - Meters for power, oxygen and crew health
//
// When power is below the minimum, both controls turn red and say
// "NOT ENOUGH POWER". The shield stops working and the button is disabled.
// (The slider can still be moved, so the player can lower it.)
import Meter from './Meter.jsx'
import OxygenButton from './OxygenButton.jsx'
import ShieldSlider from './ShieldSlider.jsx'
import { SHOW_OXYGEN_GAUGE } from '../game/config.js'
import { canUsePower } from '../game/mechanics/power.js'
import './Console.css'

export default function Console({ game, onShield, onPump }) {
  const locked = !canUsePower(game.power)

  return (
    <div className="console">
      {/* Shielding slider */}
      <div className={`control sprite-control ${locked ? 'locked' : ''}`}>
        <ShieldSlider value={game.shield} locked={locked} onChange={onShield} />

        <div className="label">SHIELDING {game.shield}</div>

        {locked && <div className="warn-text">NOT ENOUGH POWER</div>}
      </div>

      {/* Oxygen button: pumping lasts only while the button is held down */}
      <div className={`control sprite-control ${locked ? 'locked' : ''}`}>
        <OxygenButton
          pressed={game.pumping}
          locked={locked}
          onPress={() => !locked && onPump(true)}
          onRelease={() => onPump(false)}
        />

        <div className="label">OXYGEN PUMP</div>

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
