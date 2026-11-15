<<<<<<< HEAD
// MIDDLE WINDOW: shows the feed of the selected camera.
// Which camera is selected is decided in App.jsx and changed with the red
// buttons (see CameraButtons.jsx).
import cam1 from '../assets/cams/cam1.png'
import cam2 from '../assets/cams/cam2.png'
import cam3 from '../assets/cams/cam3.png'
import './CameraMonitor.css'

// Camera number -> its picture
const CAMERA_IMAGES = { 1: cam1, 2: cam2, 3: cam3 }
=======
import { useState } from 'react';
import cam1 from '../assets/cams/cam1.png';
import cam2 from '../assets/cams/cam2.png';
import cam3 from '../assets/cams/cam3.png';
import cam1Empty from '../assets/cams/cam1_empty.png';
import cam2Empty from '../assets/cams/cam2_empty.png';
import cam3Empty from '../assets/cams/cam3_empty.png';
import './CameraMonitor.css';

export default function CameraMonitor({ hazards = [], isAborted, onToggleAbort }) {
  const [activeCam, setActiveCam] = useState(1);

  // Choose between normal cams and evacuated cams based on whether or not the aborted button is pressed
  const normalCams = { 1: cam1, 2: cam2, 3: cam3 };
  const emptyCams = { 1: cam1Empty, 2: cam2Empty, 3: cam3Empty };
  const currentFeed = isAborted ? emptyCams[activeCam] : normalCams[activeCam];

  const currentHazard = hazards.length > 0 ? hazards[0].type : null;
>>>>>>> 3d9cac1 (Added NASA DONKI API for CME Probability)

export default function CameraMonitor({ activeCam }) {
  return (
    <div className="camera-monitor-wrapper">
<<<<<<< HEAD
      {/* The camera feed screen */}
      <div className="camera-screen-container">
        <img
          src={CAMERA_IMAGES[activeCam]}
          alt={`Camera Feed ${activeCam}`}
          className="camera-feed-img"
        />

        <div className="cam-hud-overlay">CAM {activeCam} - LIVE FEED</div>
      </div>
=======
      <div className="camera-screen-container">
        <img src={currentFeed} alt={`Camera Feed ${activeCam}`} className="camera-feed-img" />
        
        {currentHazard && <div className="hazard-filter-radiation" />}

        <div className="cam-hud-overlay">
          CAM {activeCam} - {isAborted ? 'EVA ABORTED (CREW SHELTERED)' : 'EVA ACTIVE'}
          {currentHazard && ` | ALERT: ${currentHazard.toUpperCase()}`}
        </div>
      </div>

      {/* Camera Switchers + Placeholder Abort Button */}
      <div className="cam-switch-controls">
        <button onClick={() => setActiveCam(1)}>CAM 1</button>
        <button onClick={() => setActiveCam(2)}>CAM 2</button>
        <button onClick={() => setActiveCam(3)}>CAM 3</button>
        
        {/* Placeholder Abort Button (Aria can swap this for Francis's sprite later!) */}
        <button 
          onClick={onToggleAbort} 
          style={{ 
            marginLeft: '15px', 
            background: isAborted ? '#ff3333' : '#222', 
            color: isAborted ? '#fff' : '#ff3333',
            borderColor: '#ff3333'
          }}
        >
          {isAborted ? 'RESUME EVA' : 'ABORT EVA'}
        </button>
      </div>
>>>>>>> 3d9cac1 (Added NASA DONKI API for CME Probability)
    </div>
  )
}
