// The main screen. It gets the game state from the useGame hook and lays out
// all the control-room panels. It contains no game rules itself.
import { useState } from 'react'

import { useGame } from './hooks/useGame.js'
import { MISSION_LENGTH } from './game/config.js'

import WarningPanel from './components/WarningPanel.jsx'
import GreenPanels from './components/GreenPanels.jsx'
import GameWindow from './components/GameWindow.jsx'
import CommsPanel from './components/CommsPanel.jsx'
import RadiationGraph from './components/RadiationGraph.jsx'
import Console from './components/Console.jsx'
import Overlay from './components/Overlay.jsx'
import CameraMonitor from './components/CameraMonitor.jsx'
import CameraButtons from './components/CameraButtons.jsx'

import './styles/base.css'

export default function App() {
  const { game, start, setShield, setPumping } = useGame()

  // Which camera feed is showing (1, 2 or 3). Changed with the red buttons.
  const [activeCam, setActiveCam] = useState(1)

  // The warning light turns on while any hazard is active.
  // It never says WHICH hazard, so the player must listen to the astronaut.
  const alarmOn = game.phase === 'playing' && game.hazards.length > 0

  // Seconds left until the mission is complete
  const timeLeft = Math.max(0, Math.ceil(MISSION_LENGTH - game.t))

  return (
    <div className="room">
      {/* Left wall */}
      <WarningPanel active={alarmOn} />

      {/* Middle: the window onto the moon */}
      <GameWindow timeLeft={timeLeft} />

      {/* Green radar screens on the table, and the camera feed in the window */}
      <GreenPanels />
      <CameraMonitor activeCam={activeCam} />

      {/* Right wall: comms and radiation graph */}
      <div className="right">
        <CommsPanel game={game} />
        <RadiationGraph
          history={game.history}
          shield={game.shield}
          radiation={game.radiation}
        />
      </div>

      {/* Table: the three red camera buttons */}
      <CameraButtons activeCam={activeCam} onSelect={setActiveCam} />

      {/* Bottom: shielding slider, oxygen button, meters */}
      <Console game={game} onShield={setShield} onPump={setPumping} />

      {/* Start / game over / mission complete screen */}
      {game.phase !== 'playing' && (
        <Overlay phase={game.phase} time={game.t} onStart={start} />
      )}
    </div>
  )
}
