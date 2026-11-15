import greenPanelsImg from '../assets/green-panels.png';
import './GreenPanels.css';

export default function GreenPanels() {
  return (
    <div className="green-panels-container">
      <img src={greenPanelsImg} alt="Green Monitoring Screens" className="green-panels-img" />
    </div>
  );
}