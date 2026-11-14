// RIGHT WALL (middle): radiation graph.
//   solid line  = radiation over the last 30 seconds
//   dashed line = the player's current shielding
// To protect the crew, keep the dashed line at or above the solid line.
import './RadiationGraph.css'

// Converts a 0-100 value into a y position in the 80px tall graph
// (SVG y=0 is the TOP, so higher values need a smaller y)
const toY = (value) => 80 - value * 0.8

export default function RadiationGraph({ history, shield, radiation }) {
  // Turn the list of samples into "x,y x,y x,y ..." points for the line
  const points = history
    .map((value, i) => `${(i * 200) / (history.length - 1)},${toY(value)}`)
    .join(' ')

  return (
    <div className="panel graph">
      <div className="label">
        RADIATION <b>{radiation}</b>
      </div>

      <svg viewBox="0 0 200 80" preserveAspectRatio="none">
        {/* Dashed line: current shielding */}
        <line x1="0" x2="200" y1={toY(shield)} y2={toY(shield)} className="shield-line" />

        {/* Solid line: radiation history */}
        <polyline points={points} className="rad-line" />
      </svg>

      <div className="label small">dashed = shielding {shield}</div>
    </div>
  )
}
