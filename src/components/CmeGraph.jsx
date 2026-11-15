import { getCmeForecast } from '../game/nasaDonki.js'
import './CmeGraph.css'

export default function CmeGraph({ gameTime = 0, cmeSchedule = [] }) {
  const { probability, activeCme, nextCme } = getCmeForecast(gameTime, cmeSchedule || [])

  return (
    <div className="slanted-cme-graph-wrapper">
      <div className="cme-graph-screen">
        <div className="cme-graph-header">
          <span>CME FORECAST</span>
          <span>{nextCme ? `${nextCme.speed} KM/S` : 'IDLE'}</span>
        </div>

        <div className="cme-main-content">
          <div className="cme-label">IMPACT PROBABILITY</div>
          <div className="cme-percentage-readout">{probability}%</div>

          <div className="cme-bar-container">
            <div
              className="cme-bar-fill"
              style={{ width: `${Math.max(5, probability)}%` }}
            />
          </div>
        </div>

        <div className="cme-graph-footer">
          {activeCme ? 'STATUS: PLASMA IMPACT (ABORT EVA)' : probability > 60 ? 'STATUS: WARNING' : 'STATUS: NOMINAL'}
        </div>
      </div>
    </div>
  )
}