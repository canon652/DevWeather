const WRAPPER = {
  position: 'fixed',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  overflow: 'hidden',
};

const CloudSVG = ({ size, opacity }) => (
  <svg viewBox="0 0 200 90" width={size} style={{ opacity }}>
    <ellipse cx="100" cy="68" rx="88" ry="32" fill="white" />
    <ellipse cx="65" cy="52" rx="52" ry="38" fill="white" />
    <ellipse cx="138" cy="56" rx="46" ry="34" fill="white" />
    <ellipse cx="100" cy="46" rx="36" ry="30" fill="white" />
  </svg>
);

const CLOUD_DATA = [
  { id: 0, size: 260, opacity: 0.12, top: '12%', duration: 28, delay: 0, ltr: true },
  { id: 1, size: 190, opacity: 0.09, top: '45%', duration: 38, delay: -14, ltr: false },
  { id: 2, size: 320, opacity: 0.07, top: '68%', duration: 22, delay: -9, ltr: true },
];

const Clouds = () => (
  <div style={WRAPPER}>
    {CLOUD_DATA.map((c) => (
      <div
        key={c.id}
        style={{
          position: 'absolute',
          top: c.top,
          animation: `${c.ltr ? 'cloudDriftLTR' : 'cloudDriftRTL'} ${c.duration}s linear infinite`,
          animationDelay: `${c.delay}s`,
        }}
      >
        <CloudSVG size={c.size} opacity={c.opacity} />
      </div>
    ))}
  </div>
);

const RAIN_DROPS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: (i * 4.1 + (i % 7) * 1.3) % 100,
  delay: (i * 0.11) % 2.4,
  duration: 0.55 + (i % 6) * 0.07,
  height: 12 + (i % 4) * 7,
}));

const Rain = () => (
  <div style={WRAPPER}>
    {RAIN_DROPS.map((d) => (
      <div
        key={d.id}
        style={{
          position: 'absolute',
          left: `${d.left}%`,
          top: '-20px',
          width: '1.5px',
          height: `${d.height}px`,
          background: 'rgba(255,255,255,0.55)',
          borderRadius: '2px',
          transform: 'rotate(15deg)',
          animation: `rainDrop ${d.duration}s linear infinite`,
          animationDelay: `${d.delay}s`,
        }}
      />
    ))}
  </div>
);

const SNOW_FLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 5.8 + (i % 5) * 1.7) % 100,
  delay: (i * 0.28) % 5,
  duration: 5 + (i % 5) * 0.8,
  size: 3 + (i % 3),
}));

const Snow = () => (
  <div style={WRAPPER}>
    {SNOW_FLAKES.map((f) => (
      <div
        key={f.id}
        style={{
          position: 'absolute',
          left: `${f.left}%`,
          top: '-20px',
          width: `${f.size}px`,
          height: `${f.size}px`,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '50%',
          animation: `snowDrift ${f.duration}s ease-in-out infinite`,
          animationDelay: `${f.delay}s`,
        }}
      />
    ))}
  </div>
);

const Lightning = () => (
  <div style={WRAPPER}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'white',
        animation: 'lightningFlash 5s ease-in-out infinite',
      }}
    />
  </div>
);

const FOG_BANDS = [
  { duration: 16, delay: 0, top: '22%' },
  { duration: 22, delay: -6, top: '50%' },
  { duration: 19, delay: -11, top: '74%' },
];

const Fog = () => (
  <div style={WRAPPER}>
    {FOG_BANDS.map((b, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: b.top,
          left: '-20%',
          right: '-20%',
          height: '90px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '50%',
          filter: 'blur(24px)',
          animation: `fogDrift ${b.duration}s ease-in-out infinite`,
          animationDelay: `${b.delay}s`,
        }}
      />
    ))}
  </div>
);

const SUN_RAYS = Array.from({ length: 10 }, (_, i) => ({ id: i, angle: i * 36 }));

const SunRays = () => (
  <div style={WRAPPER}>
    <div
      style={{
        position: 'absolute',
        top: '-30%',
        right: '-15%',
        width: '70vw',
        height: '70vw',
        animation: 'sunRay 60s linear infinite',
      }}
    >
      {SUN_RAYS.map((r) => (
        <div
          key={r.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '2px',
            background: 'rgba(255, 230, 80, 0.3)',
            transformOrigin: '0 0',
            transform: `rotate(${r.angle}deg)`,
          }}
        />
      ))}
    </div>
  </div>
);

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: (i * 2.57 + (i % 9) * 1.3) % 100,
  top: (i * 2.11 + (i % 7) * 2.4) % 85,
  delay: (i * 0.31) % 4,
  size: 1 + (i % 3),
}));

const Stars = () => (
  <div style={WRAPPER}>
    {STARS.map((s) => (
      <div
        key={s.id}
        style={{
          position: 'absolute',
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          background: 'white',
          borderRadius: '50%',
          animation: `twinkle ${2 + (s.delay % 2)}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }}
      />
    ))}
  </div>
);

const WeatherAnimation = ({ weatherCode, isDay }) => {
  if (!weatherCode) return null;
  if (!isDay) return <Stars />;
  if (weatherCode >= 200 && weatherCode < 300) return <><Lightning /><Rain /></>;
  if (weatherCode >= 300 && weatherCode < 600) return <Rain />;
  if (weatherCode >= 600 && weatherCode < 700) return <Snow />;
  if (weatherCode >= 700 && weatherCode < 800) return <Fog />;
  if (weatherCode === 800) return <SunRays />;
  if (weatherCode > 800) return <Clouds />;
  return null;
};

export default WeatherAnimation;
