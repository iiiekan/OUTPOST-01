// LEFT WALL & RIGHT WALL: the warning lights.
import warningImg from '../assets/warning-on.png';
import warning2Img from '../assets/warning2-on.png';
import './WarningPanel.css';

export default function WarningPanel({ active }) {
  return (
    <div className={`panel warning ${active ? 'on' : ''}`}>
      <img src={warningImg} alt="Warning 1" className="warning-img" />
      <img src={warning2Img} alt="Warning 2" className="warning-img-2" />
    </div>
  );
}
