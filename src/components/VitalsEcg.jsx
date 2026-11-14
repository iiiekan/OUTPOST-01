// RIGHT WALL (bottom): the crew's heartbeat (sinus rhythm).
// The line scrolls across the screen. The lower the crew's health,
// the faster the heartbeat, which hints at how much health they have left.
import { heartRate } from '../game/mechanics/comms.js'
import './VitalsEcg.css'

// One heartbeat drawn as an SVG path (60 units wide)
const BEAT =
  'M0 20 L15 20 L18 16 L21 20 L26 20 L29 4 L32 34 L35 20 L42 20 L46 15 L50 20 L60 20'

export default function VitalsEcg({ health }) {
  // How many seconds one beat takes to scroll past
  const secondsPerBeat = 60 / heartRate(health)

  return (
    <div className="panel">
      <div className="label">CREW VITALS</div>

      <svg className="ecg" viewBox="0 0 120 40" preserveAspectRatio="none">
        {/* Scrolling group; the speed comes from the heart rate */}
        <g className="ecg-scroll" style={{ animationDuration: `${secondsPerBeat}s` }}>
          {/* Three copies side by side so the scroll looks endless */}
          {[0, 1, 2].map((i) => (
            <path key={i} d={BEAT} transform={`translate(${i * 60} 0)`} />
          ))}
        </g>
      </svg>
    </div>
  )
}
