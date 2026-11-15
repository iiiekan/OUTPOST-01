// LEFT WALL (lower panel): the LED level-meter screen under the warning sign.
// Pre-positioned full-size overlay, same approach as GreenPanels.
import leftPanelImg from '../assets/left-panel.png';
import './LeftPanel.css';

export default function LeftPanel() {
  return (
    <div className="left-panel-container">
      <img src={leftPanelImg} alt="Left LED Panel" className="left-panel-img" />
    </div>
  );
}
