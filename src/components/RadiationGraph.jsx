// RIGHT WALL, TOP SCREEN: radiation graph.
//   solid line  = radiation over the last 30 seconds
//   dashed line = the player's current shielding
// To protect the crew, keep the dashed line at or above the solid line.
//
// The position on screen is set in RadiationGraph.css (it sits on the top
// screen hole of the room artwork).
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
    // graph-screen = the box placed on the artwork, graph = what is drawn inside it
    <div className="graph-screen">
      <div className="graph">
        {/* Top row: current radiation on the left, shielding on the right */}
        <div className="graph-header">
          <span>
            RADIATION <b>{radiation}</b>
          </span>
          <span className="graph-shield">SHIELD {shield}</span>
        </div>

        <svg viewBox="0 0 200 80" preserveAspectRatio="none">
          {/* Dashed line: current shielding */}
          <line x1="0" x2="200" y1={toY(shield)} y2={toY(shield)} className="shield-line" />

          {/* Solid line: radiation history */}
          <polyline points={points} className="rad-line" />
        </svg>
      </div>
    </div>
  )
}
