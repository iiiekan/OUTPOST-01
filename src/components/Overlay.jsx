// Full-screen message shown before the game starts and when it ends.
//   'ready' -> start screen
//   'lost'  -> game over (crew health hit 0)
//   'won'   -> mission complete (survived the whole mission)
import './Overlay.css'

const TITLES = {
  ready: 'OUTPOST 01',
  lost: 'CREW LOST',
  won: 'MISSION COMPLETE',
}

export default function Overlay({ phase, time, onStart }) {
  return (
    <div className="overlay">
      <h1>{TITLES[phase]}</h1>

      {phase === 'ready' && (
        <p>Keep the crew alive. Match shielding to radiation, pump oxygen, spend power wisely.</p>
      )}

      {phase === 'lost' && <p>You lasted {Math.floor(time)} seconds.</p>}

      <button className="big-btn" onClick={onStart}>
        {phase === 'ready' ? 'START MISSION' : 'TRY AGAIN'}
      </button>
    </div>
  )
}
