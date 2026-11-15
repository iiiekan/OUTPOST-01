// Plays a sprite animation toward a target frame, one frame at a time.
//
// Example: the frame is 0 and the target becomes 7 -> the hook returns
// 1, 2, 3 ... 7 (one every `frameMs` milliseconds). If the target changes
// again on the way, it simply turns around. This gives the "flipbook" look.
import { useEffect, useState } from 'react'

export function useFrameAnimation(targetFrame, frameMs = 25) {
  const [frame, setFrame] = useState(targetFrame)

  useEffect(() => {
    // Already there - nothing to animate
    if (frame === targetFrame) return

    // Move one frame toward the target after a short delay
    const timer = setTimeout(() => {
      setFrame((current) => current + Math.sign(targetFrame - current))
    }, frameMs)

    return () => clearTimeout(timer)
  }, [frame, targetFrame, frameMs])

  return frame
}
