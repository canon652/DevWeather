const getSunPosition = (sunrise, sunset) => {
  const now = Date.now() / 1000;
  const total = sunset - sunrise;
  const elapsed = Math.max(0, Math.min(now - sunrise, total));
  return elapsed / total;
};

const formatTime = (unix) => {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const SunriseSunset = ({ sys }) => {
  const position = getSunPosition(sys.sunrise, sys.sunset);
  const angle = Math.PI * position;

  const cx = 150;
  const cy = 100;
  const r = 80;

  const sunX = cx - r * Math.cos(angle);
  const sunY = cy - r * Math.sin(angle);

  return (
    <div className="glass-card mt-4 p-6 text-white">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
        Солнце
      </h3>
      <div className="flex items-center justify-center">
        <svg width="300" height="120" viewBox="0 0 300 120">
          <path
            d="M 70 100 A 80 80 0 0 1 230 100"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M 70 100 A 80 80 0 0 1 ${sunX} ${sunY}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={sunX} cy={sunY} r="8" fill="#fbbf24" />
          <circle cx={sunX} cy={sunY} r="14" fill="rgba(251,191,36,0.3)" />

          <text x="55" y="118" fill="rgba(255,255,255,0.7)" fontSize="11" textAnchor="middle">
            {formatTime(sys.sunrise)}
          </text>
          <text x="245" y="118" fill="rgba(255,255,255,0.7)" fontSize="11" textAnchor="middle">
            {formatTime(sys.sunset)}
          </text>
          <text x="150" y="118" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">
            рассвет / закат
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SunriseSunset;
