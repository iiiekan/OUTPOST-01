import cam1 from '../assets/cams/cam1.png';
import cam2 from '../assets/cams/cam2.png';
import cam3 from '../assets/cams/cam3.png';
import cam1Empty from '../assets/cams/cam1_empty.png';
import cam2Empty from '../assets/cams/cam2_empty.png';
import cam3Empty from '../assets/cams/cam3_empty.png';
import './CameraMonitor.css';

export default function CameraMonitor({ activeCam = 1, hazards = [], isAborted }) {
  const normalCams = { 1: cam1, 2: cam2, 3: cam3 };
  const emptyCams = { 1: cam1Empty, 2: cam2Empty, 3: cam3Empty };
  
  const currentFeed = isAborted ? emptyCams[activeCam] : normalCams[activeCam];
  const currentHazard = hazards.length > 0 ? hazards[0].type : null;

  return (
    <div className="camera-monitor-wrapper">
      <div className="camera-screen-container">
        <img src={currentFeed} alt={`Camera Feed ${activeCam}`} className="camera-feed-img" />
        
        {currentHazard && <div className="hazard-filter-radiation" />}

        <div className="cam-hud-overlay">
          CAM {activeCam} - {isAborted ? 'EVA ABORTED (CREW SHELTERED)' : 'EVA ACTIVE'}
          {currentHazard && ` | ALERT: ${currentHazard.toUpperCase()}`}
        </div>
      </div>
    </div>
  );
}