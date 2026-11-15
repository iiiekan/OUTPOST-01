// MIDDLE: the big window onto the moon surface.
// Displays Santun's background artwork through the transparent layout.
import './GameWindow.css'

export default function GameWindow({ timeLeft }) {
  return (
    <div className="window">
      {/* Countdown to mission complete */}
      <div className="timer">MISSION {timeLeft}s</div>
    </div>
  )
}
