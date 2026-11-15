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
import CmeGraph from './components/CmeGraph.jsx'
import CameraButtons from './components/CameraButtons.jsx'

import './styles/base.css'

export default function App() {
  const { game, start, setShield, setPumping, toggleAbort } = useGame()

  const [activeCam, setActiveCam] = useState(1)

  const alarmOn = game.phase === 'playing' && game.hazards.length > 0
  const timeLeft = Math.max(0, Math.ceil(MISSION_LENGTH - (game?.t || 0)))

  return (
    <div className="room">
      <WarningPanel active={alarmOn} />
      <GameWindow timeLeft={timeLeft} />

      <GreenPanels />
      
      <CameraMonitor
        activeCam={activeCam}
        hazards={game.hazards}
        isAborted={game.aborted}
      />
      
      <CmeGraph gameTime={game.t} cmeSchedule={game.cmeSchedule} />

      <div className="right">
        <CommsPanel game={game} />
        <RadiationGraph
          history={game.history}
          shield={game.shield}
          radiation={game.radiation}
        />
      </div>

      {/* Let Aria's CameraButtons render normally using their component layout */}
      <CameraButtons activeCam={activeCam} onSelect={setActiveCam} />

      {/* Your Abort button placed cleanly on the console */}
      <div style={{ position: 'absolute', bottom: '15px', left: '20px', zIndex: 10 }}>
        <button 
          onClick={toggleAbort} 
          style={{ 
            background: game.aborted ? '#ff3333' : '#222', 
            color: game.aborted ? '#fff' : '#ff3333',
            border: '2px solid #ff3333',
            padding: '6px 14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 'bold',
            fontSize: '12px',
            borderRadius: '4px'
          }}
        >
          {game.aborted ? 'RESUME EVA' : 'ABORT EVA'}
        </button>
      </div>

      <Console game={game} onShield={setShield} onPump={setPumping} />

      {game.phase !== 'playing' && (
        <Overlay phase={game.phase} time={game.t} onStart={start} />
      )}
    </div>
  )
}