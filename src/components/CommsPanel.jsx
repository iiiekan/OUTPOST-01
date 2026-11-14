// RIGHT WALL, BOTTOM SCREEN: the astronaut's camera feed.
// Shows a face and a line of speech. Both change with the crew's health,
// so they act as a hint of how much health is left.
//
// The position on screen is set in CommsPanel.css (it sits on the bottom
// screen hole of the room artwork).
import { commsLine, moodFor } from '../game/mechanics/comms.js'
import './CommsPanel.css'

// The mouth drawing for each mood (SVG path data)
const MOUTH = {
  good: 'M36 68 Q50 80 64 68',                    // smile
  ok: 'M38 72 L62 72',                            // flat line
  sick: 'M38 76 Q50 66 62 76',                    // frown
  bad: 'M36 76 Q43 68 50 76 Q57 68 64 76',       // wobbly
  dying: 'M38 76 Q50 64 62 76',                   // deep frown
}

// The face drawing. Dying astronauts get X eyes instead of dots.
function Face({ mood }) {
  const isDying = mood === 'dying'

  return (
    <svg viewBox="0 0 100 100" className="face">
      {/* Head */}
      <circle cx="50" cy="50" r="38" />

      {/* Eyes */}
      {isDying ? (
        <path d="M30 38 L42 50 M42 38 L30 50 M58 38 L70 50 M70 38 L58 50" />
      ) : (
        <>
          <circle cx="36" cy="44" r="3" className="fill" />
          <circle cx="64" cy="44" r="3" className="fill" />
        </>
      )}

      {/* Mouth */}
      <path d={MOUTH[mood]} />
    </svg>
  )
}

export default function CommsPanel({ game }) {
  return (
    // comms-screen = the box placed on the artwork, comms = what is drawn inside it
    <div className="comms-screen">
      <div className="comms">
        <Face mood={moodFor(game.health)} />

        <div className="comms-text">
          <div className="comms-title">CAMERA CONTROL</div>

          <div className="speech">"{commsLine(game)}"</div>
        </div>
      </div>
    </div>
  )
}
