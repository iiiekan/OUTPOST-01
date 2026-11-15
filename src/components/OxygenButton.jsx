// The oxygen button, drawn with the sprites in assets/but/.
// Hold it down to turn power into oxygen. The button plays a short
// "push down" animation when pressed and "spring back" animation when released.
//
// Props:
//   pressed   - true while the game is pumping oxygen
//   locked    - true when there isn't enough power (button is red and can't be used)
//   onPress   - called when the player presses the button
//   onRelease - called when the player lets go
import { BUTTON_FRAMES } from '../assets/frames.js'
import { useFrameAnimation } from '../hooks/useFrameAnimation.js'
import './OxygenButton.css'

const UP_FRAME = 0                          // button up
const DOWN_FRAME = BUTTON_FRAMES.length - 1 // button fully pressed
const FRAME_MS = 22                         // time per animation frame

export default function OxygenButton({ pressed, locked, onPress, onRelease }) {
  // Where the animation is heading: down while pumping, otherwise up
  const target = pressed && !locked ? DOWN_FRAME : UP_FRAME
  const frame = useFrameAnimation(target, FRAME_MS)

  // Keyboard: hold Space or Enter to pump (ignore the repeat while held)
  const isPressKey = (e) => e.key === ' ' || e.key === 'Enter'

  return (
    <button
      type="button"
      className={`o2-button ${locked ? 'locked' : ''}`}
      disabled={locked}
      aria-label="Hold to pump oxygen"
      onPointerDown={onPress}
      onPointerUp={onRelease}
      onPointerLeave={onRelease}
      onPointerCancel={onRelease}
      onKeyDown={(e) => isPressKey(e) && !e.repeat && onPress()}
      onKeyUp={(e) => isPressKey(e) && onRelease()}
    >
      <img src={BUTTON_FRAMES[frame]} alt="" draggable={false} />
    </button>
  )
}
