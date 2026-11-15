// The three red camera buttons (sprites in assets/red/).
// Press a button to switch the camera feed. Only the button you press animates.
//
// The red sprites are ONE complete press: red1 = resting, the button goes down
// around red5-red7, and comes back up by red10. So we just play red2 -> red10
// once and return to red1. (Don't play it backwards - that would press twice.)
// The selected camera is shown by its label being brighter (and by the feed itself).
//
// Props:
//   activeCam - which camera is selected (1, 2 or 3)
//   onSelect  - called with the camera number when a button is pressed
import { useEffect, useState } from 'react'

import { RED_FRAMES } from '../assets/frames.js'
import './CameraButtons.css'

const CAMERAS = [1, 2, 3]

const LAST_FRAME = RED_FRAMES.length - 1   // red10: the end of the press animation
const FRAME_MS = 25                        // time per animation frame

// One button. It plays its own press animation when pressed.
function CameraButton({ number, active, onSelect }) {
  // 0 = resting (red1). 1 ... LAST_FRAME = the press animation is playing.
  const [frame, setFrame] = useState(0)

  // While playing, move to the next frame after a short delay.
  // After the last frame, go back to resting.
  useEffect(() => {
    if (frame === 0) return

    const timer = setTimeout(() => {
      setFrame((current) => (current >= LAST_FRAME ? 0 : current + 1))
    }, FRAME_MS)

    return () => clearTimeout(timer)
  }, [frame])

  // Switch the camera and (re)start the animation
  const press = () => {
    onSelect()
    setFrame(1)
  }

  return (
    <button
      type="button"
      className={`cam-button ${active ? 'active' : ''}`}
      aria-label={`Camera ${number}`}
      aria-pressed={active}
      onPointerDown={press}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && press()}
    >
      <img src={RED_FRAMES[frame]} alt="" draggable={false} />
      <span className="cam-button-label">CAM {number}</span>
    </button>
  )
}

export default function CameraButtons({ activeCam, onSelect }) {
  return (
    <div className="cam-buttons">
      {CAMERAS.map((number) => (
        <CameraButton
          key={number}
          number={number}
          active={number === activeCam}
          onSelect={() => onSelect(number)}
        />
      ))}
    </div>
  )
}
