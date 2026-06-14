import { getMoonPhase } from '../../utils/moonPhase';

const MoonPhase = () => {
  const { day, name, emoji, tip } = getMoonPhase();

  return (
    <div className="glass-card mt-4 p-6 text-white">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">Луна</h3>
      <div className="flex items-center gap-5">
        <span className="text-6xl">{emoji}</span>
        <div>
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-white/60 text-sm mt-1">{day}-й день лунного месяца</p>
          <p className="text-white/50 text-sm mt-2 italic">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default MoonPhase;
