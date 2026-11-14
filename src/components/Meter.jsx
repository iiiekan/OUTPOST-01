// A small labeled bar (used for power, oxygen and crew health).
// `value` is 0 - 100. The number is rounded DOWN so it matches the lock rules
// (e.g. a real power of 4.6 shows as 4, which is "not enough power").
export default function Meter({ label, value }) {
  return (
    <div className="meter">
      <span>{label}</span>

      <div className="bar">
        <div style={{ width: `${value}%` }} />
      </div>

      <span>{Math.floor(value)}</span>
    </div>
  )
}
