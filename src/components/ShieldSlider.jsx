// The shielding slider, drawn with the sprites in assets/slide/.
// Drag the knob (or click anywhere on the track) to set the shielding.
// The slider clicks between fixed notches and the knob animates between them.
// Keyboard: arrow keys move one notch, Home / End jump to the ends.
//
// Props:
//   value    - the current shielding (0 - 100)
//   locked   - true when there isn't enough power (slider is red, shield doesn't work)
//   onChange - called with the new shielding value
import { useRef } from 'react'

import { SLIDER_FRAMES } from '../assets/frames.js'
import { useFrameAnimation } from '../hooks/useFrameAnimation.js'
import { NOTCH_COUNT, notchToShield, shieldToNotch } from '../game/mechanics/shielding.js'
import { clamp } from '../game/mechanics/utils.js'
import './ShieldSlider.css'

// Size of one sprite image in pixels
const SPRITE_WIDTH = 568
const SPRITE_HEIGHT = 480

// Where the knob sits in the first sprite (bottom) and the last sprite (top),
// in sprite pixels. The knob travels along the line between these two points.
const KNOB_BOTTOM = { x: 166, y: 330 }
const KNOB_TOP = { x: 369, y: 66 }

// How far along the track the knob is in each (non-duplicate) sprite: 0 = bottom, 1 = top.
// The knob positions are slightly uneven, so we use these to find the sprite
// closest to the pointer. That way the knob lands right under your finger.
const KNOB_ALONG = [
  0.00, 0.05, 0.11, 0.16, 0.21, 0.26, 0.30, 0.35,
  0.40, 0.45, 0.49, 0.53, 0.57, 0.62, 0.66, 0.70,
  0.74, 0.78, 0.82, 0.85, 0.89, 0.93, 0.96, 1.00,
]

const FRAME_MS = 16            // time per animation frame
const LAST_FRAME = SLIDER_FRAMES.length - 1
const LAST_NOTCH = NOTCH_COUNT - 1

// Which sprite to show for a notch. The notches (26) are spread evenly
// over the available frames, so the knob always lines up with the sprites.
const frameForNotch = (notch) => Math.round((notch * LAST_FRAME) / LAST_NOTCH)

export default function ShieldSlider({ value, locked, onChange }) {
  const sliderRef = useRef(null)
  const isDragging = useRef(false)

  const notch = shieldToNotch(value)
  const frame = useFrameAnimation(frameForNotch(notch), FRAME_MS)

  // Reports a new notch to the game
  const setNotch = (newNotch) => {
    onChange(notchToShield(clamp(newNotch, 0, LAST_NOTCH)))
  }

  // Works out which notch the mouse / finger is pointing at.
  // The pointer position is projected onto the line the knob travels along.
  const notchFromPointer = (event) => {
    const box = sliderRef.current.getBoundingClientRect()

    // Pointer position in sprite pixels
    const x = ((event.clientX - box.left) / box.width) * SPRITE_WIDTH
    const y = ((event.clientY - box.top) / box.height) * SPRITE_HEIGHT

    // How far along the track is the pointer? 0 = bottom, 1 = top
    const trackX = KNOB_TOP.x - KNOB_BOTTOM.x
    const trackY = KNOB_TOP.y - KNOB_BOTTOM.y
    const along =
      ((x - KNOB_BOTTOM.x) * trackX + (y - KNOB_BOTTOM.y) * trackY) /
      (trackX * trackX + trackY * trackY)

    // Find the sprite whose knob is closest, then convert that frame to a notch
    let closestFrame = 0
    KNOB_ALONG.forEach((knobAlong, frameNumber) => {
      if (Math.abs(knobAlong - along) < Math.abs(KNOB_ALONG[closestFrame] - along)) {
        closestFrame = frameNumber
      }
    })

    return Math.round((closestFrame * LAST_NOTCH) / LAST_FRAME)
  }

  const handlePointerDown = (event) => {
    isDragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)  // keep tracking outside the sprite
    setNotch(notchFromPointer(event))
  }

  const handlePointerMove = (event) => {
    if (isDragging.current) setNotch(notchFromPointer(event))
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const handleKeyDown = (event) => {
    const moves = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }

    if (event.key in moves) {
      event.preventDefault()
      setNotch(notch + moves[event.key])
    } else if (event.key === 'Home') {
      event.preventDefault()
      setNotch(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setNotch(LAST_NOTCH)
    }
  }

  return (
    <div
      ref={sliderRef}
      className={`shield-slider ${locked ? 'locked' : ''}`}
      role="slider"
      tabIndex={0}
      aria-label="Shielding"
      aria-valuemin={0}
      aria-valuemax={notchToShield(LAST_NOTCH)}
      aria-valuenow={value}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <img src={SLIDER_FRAMES[frame]} alt="" draggable={false} />
    </div>
  )
}
