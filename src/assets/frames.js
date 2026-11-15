// SPRITE FRAMES
// Loads the animation frames for the oxygen button, the shielding slider and the
// red camera buttons, and puts them in the right order (red1, red2, ... red10 -
// not red1, red10, red2).
//
// Just drop new numbered .png files into assets/but/, assets/slide/ or assets/red/
// to add frames.

// Turns the object that import.meta.glob gives us into a list of image URLs,
// sorted by the number in the file name.
const numberInName = (path) => Number(path.match(/(\d+)\.png$/)[1])

const sortedFrames = (files) =>
  Object.entries(files)
    .sort(([pathA], [pathB]) => numberInName(pathA) - numberInName(pathB))
    .map(([path, url]) => ({ number: numberInName(path), url }))


// ---------- Oxygen button ----------
// but1 = button up  ...  but8 = button fully pressed down

export const BUTTON_FRAMES = sortedFrames(
  import.meta.glob('./but/*.png', { eager: true, import: 'default' }),
).map((frame) => frame.url)


// ---------- Shielding slider ----------
// slide1 = knob at the bottom (0 shielding)  ...  slide30 = knob at the top (max).
//
// Some slider sprites are (almost) exact copies of the frame before them, so the
// knob would look stuck for a moment. We skip those duplicates:
const DUPLICATE_SLIDER_FRAMES = [4, 9, 14, 19, 24, 29]

export const SLIDER_FRAMES = sortedFrames(
  import.meta.glob('./slide/*.png', { eager: true, import: 'default' }),
)
  .filter((frame) => !DUPLICATE_SLIDER_FRAMES.includes(frame.number))
  .map((frame) => frame.url)


// ---------- Red camera buttons ----------
// red1 = button up  ...  red10 = button fully pressed down

export const RED_FRAMES = sortedFrames(
  import.meta.glob('./red/*.png', { eager: true, import: 'default' }),
).map((frame) => frame.url)


// ---------- Preload ----------
// Load every frame right away so the animation never flickers
// the first time a frame is shown.
;[...BUTTON_FRAMES, ...SLIDER_FRAMES, ...RED_FRAMES].forEach((url) => {
  new Image().src = url
})
