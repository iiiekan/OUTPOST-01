import { useState } from 'react';
import cam1 from '../assets/cams/cam1.png';
import cam2 from '../assets/cams/cam2.png';
import cam3 from '../assets/cams/cam3.png';
import './CameraMonitor.css';

export default function CameraMonitor() {
  const [activeCam, setActiveCam] = useState(1);
  const camImages = { 1: cam1, 2: cam2, 3: cam3 };

  return (
    <div className="camera-monitor-wrapper">
      {/* The Camera Feed Screen */}
      <div className="camera-screen-container">
        <img src={camImages[activeCam]} alt={`Camera Feed ${activeCam}`} className="camera-feed-img" />
        <div className="cam-hud-overlay">CAM {activeCam} - LIVE FEED</div>
      </div>

      {/* Temporary Switcher Buttons */}
      <div className="cam-switch-controls">
        <button onClick={() => setActiveCam(1)}>CAM 1</button>
        <button onClick={() => setActiveCam(2)}>CAM 2</button>
        <button onClick={() => setActiveCam(3)}>CAM 3</button>
      </div>
    </div>
  );
}