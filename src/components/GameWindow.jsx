// MIDDLE: the big window onto the moon surface.
// Just a simple line drawing for now (ground, craters, lander, astronaut).
// Redraw or replace the SVG shapes here to change the art.
import './GameWindow.css'

export default function GameWindow({ timeLeft }) {
  return (
    <div className="window">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        {/* Ground and craters */}
        <rect x="0" y="200" width="400" height="100" className="ground" />
        <ellipse cx="90" cy="250" rx="30" ry="8" />
        <ellipse cx="300" cy="270" rx="40" ry="9" />
        <ellipse cx="210" cy="225" rx="18" ry="5" />

        {/* Lander: body, legs, ladder */}
        <rect x="250" y="120" width="90" height="50" />
        <line x1="258" y1="170" x2="245" y2="200" />
        <line x1="332" y1="170" x2="345" y2="200" />
        <line x1="295" y1="170" x2="295" y2="200" />
        <line x1="225" y1="200" x2="248" y2="150" />
        <line x1="236" y1="200" x2="256" y2="156" />

        {/* Astronaut: helmet, body, legs, arms */}
        <circle cx="120" cy="120" r="16" />
        <rect x="102" y="140" width="36" height="42" />
        <line x1="110" y1="182" x2="106" y2="215" />
        <line x1="130" y1="182" x2="136" y2="215" />
        <line x1="102" y1="148" x2="90" y2="172" />
        <line x1="138" y1="148" x2="150" y2="170" />
      </svg>

      {/* Countdown to mission complete */}
      <div className="timer">MISSION {timeLeft}s</div>
    </div>
  )
}
