# OUTPOST 01

Junior Astronaut Mission Trainer - a browser game made for NASA Space Apps 2026.
You manage a lunar base from a control room: keep the crew alive by balancing
power, oxygen and radiation shielding while random space-weather hazards hit.

Built with React + Vite + JavaScript.

## Run it

    npm install
    npm run dev       # start the dev server
    npm run build     # production build
    npm run lint      # check the code for mistakes

## How the game works

| Thing           | Rule                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------- |
| Power           | Starts at 100, recovers very slowly. Shielding and the oxygen pump both use it.              |
| Minimum power   | Shielding and the oxygen pump need at least 5 power, otherwise they turn red and stop.       |
| Oxygen          | Drains steadily. Hold the button to turn power into oxygen. At 0 the crew loses health.      |
| Shielding       | Stops radiation damage when set to the radiation level or higher. Lower only slows damage. The slider moves in steps of 4 (0, 4, 8 ... 100). |
| Radiation       | Higher radiation = faster health loss.                                                       |
| Crew health     | Game over at 0. Win by surviving the whole mission.                                          |
| Hazards         | Solar flare, coronal mass ejection, geomagnetic storm. The alarm never says which one.       |

## Folder guide

    src/
      main.jsx               starts the app
      App.jsx                the screen layout (no game rules in here)

      game/                  ALL the game rules (no React in this folder)
        config.js            every balance number - tweak the game here
        state.js             what a new game looks like
        engine.js            step(): advances the game by one tick
        mechanics/           one file per mechanic
          power.js           power recovery and drain
          oxygen.js          oxygen drain and pumping
          shielding.js       shielding rules
          health.js          crew health damage
          hazards.js         hazards and the radiation level
          comms.js           astronaut lines and face
          utils.js           small helpers

      hooks/
        useGame.js           runs the game loop and gives the UI the player actions
        useFrameAnimation.js plays sprite frames one by one (the flipbook animation)

      components/            the control room panels (each has its own .css file)
        WarningPanel         alarm light (left wall)
        GameWindow           window onto the moon
        CommsPanel           astronaut face and speech (bottom screen of the right wall)
        RadiationGraph       radiation vs shielding graph (top screen of the right wall)
        Console              slider, oxygen button, meters
        ShieldSlider         sprite slider (assets/slide), clicks between notches
        OxygenButton         sprite button (assets/but), press / release animation
        Meter                small labeled bar
        Overlay              start / game over / mission complete screen

      styles/base.css        colors, page layout, shared styles

      assets/
        frames.js            loads and orders the sprite frames (but/ and slide/)
        but/                 oxygen button frames, but1 (up) ... but8 (pressed)
        slide/               shielding slider frames, slide1 (0) ... slide30 (max)

      services/nasaApi.js    (placeholder) NASA DONKI API
      logic/consequenceEngine.js  (placeholder) trade-off logic
      data/mockHazards.json  (placeholder) fake hazard data for testing

## Where to work

- Balance the game: `src/game/config.js`
- Add a new rule or system: new file in `src/game/mechanics/`, then call it from `src/game/engine.js`
- Real NASA data: `src/services/nasaApi.js` + `updateHazards()` in `src/game/mechanics/hazards.js`
- Move the right-wall screens: the `left / top / width / height` percentages at the top of `RadiationGraph.css` and `CommsPanel.css`
- Change the art: the SVG drawings in `GameWindow.jsx`, `CommsPanel.jsx`, `WarningPanel.jsx`, and the colors at the top of `styles/base.css`

## Sprite controls

- The oxygen button plays `but1` -> `but8` when pressed and back when released.
- The slider has 26 notches (step 4). The knob animates through the slide frames between notches.
- The slider sprites `slide4, 9, 14, 19, 24, 29` are copies of the frame before them, so
  `assets/frames.js` skips them. The knob has 24 different positions.
- Change the shielding step in `SHIELD` in `src/game/config.js`. If you change it, the slider
  still works (the notches are spread over the frames), but check that it looks right.
- Locked (power below 5): both sprites are tinted red with a CSS filter in
  `OxygenButton.css` and `ShieldSlider.css`.
