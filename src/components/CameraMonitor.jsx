// MIDDLE WINDOW: shows the feed of the selected camera.
// Which camera is selected is decided in App.jsx and changed with the red
// buttons (see CameraButtons.jsx).
import cam1 from '../assets/cams/cam1.png'
import cam2 from '../assets/cams/cam2.png'
import cam3 from '../assets/cams/cam3.png'
import './CameraMonitor.css'

// Camera number -> its picture
const CAMERA_IMAGES = { 1: cam1, 2: cam2, 3: cam3 }

export default function CameraMonitor({ activeCam }) {
  return (
    <div className="camera-monitor-wrapper">
      {/* The camera feed screen */}
      <div className="camera-screen-container">
        <img
          src={CAMERA_IMAGES[activeCam]}
          alt={`Camera Feed ${activeCam}`}
          className="camera-feed-img"
        />

        <div className="cam-hud-overlay">CAM {activeCam} - LIVE FEED</div>
      </div>
    </div>
  )
}
