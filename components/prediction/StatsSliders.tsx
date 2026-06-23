'use client';

import { motion } from 'framer-motion';

interface StatsSliderProps {
  possessionA: number;
  yellowCardsA: number;
  yellowCardsB: number;
  teamAFlag: string;
  teamBFlag: string;
  teamAShort: string;
  teamBShort: string;
  onPossessionChange: (v: number) => void;
  onYellowCardsAChange: (v: number) => void;
  onYellowCardsBChange: (v: number) => void;
}

export default function StatsSliders({
  possessionA, yellowCardsA, yellowCardsB,
  teamAFlag, teamBFlag, teamAShort, teamBShort,
  onPossessionChange, onYellowCardsAChange, onYellowCardsBChange,
}: StatsSliderProps) {
  const possessionB = 100 - possessionA;

  return (
    <div className="space-y-6">
      {/* Possession */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-white/40">الاستحواذ</span>
          <div className="flex items-center gap-2 text-xs font-display font-bold">
            <span className="text-neon-green">{possessionA}%</span>
            <span className="text-white/20">·</span>
            <span className="text-neon-blue">{possessionB}%</span>
          </div>
        </div>
        {/* Dual bar */}
        <div className="relative h-4 rounded-full overflow-hidden"
          style={{ background: 'rgba(0,240,255,0.3)' }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #39FF14, rgba(57,255,20,0.6))' }}
            animate={{ width: `${possessionA}%` }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
            <span className="text-[10px] font-display font-bold text-black/70">{teamAFlag}</span>
            <span className="text-[10px] font-display font-bold text-white/70">{teamBFlag}</span>
          </div>
        </div>
        <input
          type="range" min={20} max={80} step={1} value={possessionA}
          onChange={(e) => onPossessionChange(parseInt(e.target.value))}
          className="neon-slider w-full mt-2" id="possession-slider"
          aria-label="شريط الاستحواذ"
          style={{
            background: `linear-gradient(to right, #39FF14 0%, #39FF14 ${((possessionA - 20) / 60) * 100}%, rgba(255,255,255,0.1) ${((possessionA - 20) / 60) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white/30">هيمنة {teamAShort} ←</span>
          <span className="text-[10px] text-white/30">→ هيمنة {teamBShort}</span>
        </div>
      </div>

      {/* Yellow Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/40">{teamAFlag} بطاقات صفراء</span>
            <span className="font-display font-black text-base" style={{ color: '#FFD60A' }}>{yellowCardsA}</span>
          </div>
          <input
            type="range" min={0} max={5} step={1} value={yellowCardsA}
            onChange={(e) => onYellowCardsAChange(parseInt(e.target.value))}
            className="neon-slider w-full" id="yellow-cards-a"
            aria-label={`بطاقات ${teamAShort} الصفراء`}
            style={{
              background: `linear-gradient(to right, #FFD60A 0%, #FFD60A ${(yellowCardsA / 5) * 100}%, rgba(255,255,255,0.1) ${(yellowCardsA / 5) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1 h-3 rounded-sm transition-all duration-200"
                style={{ background: i < yellowCardsA ? '#FFD60A' : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/40">{teamBFlag} بطاقات صفراء</span>
            <span className="font-display font-black text-base" style={{ color: '#FFD60A' }}>{yellowCardsB}</span>
          </div>
          <input
            type="range" min={0} max={5} step={1} value={yellowCardsB}
            onChange={(e) => onYellowCardsBChange(parseInt(e.target.value))}
            className="neon-slider w-full" id="yellow-cards-b"
            aria-label={`بطاقات ${teamBShort} الصفراء`}
            style={{
              background: `linear-gradient(to right, #FFD60A 0%, #FFD60A ${(yellowCardsB / 5) * 100}%, rgba(255,255,255,0.1) ${(yellowCardsB / 5) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1 h-3 rounded-sm transition-all duration-200"
                style={{ background: i < yellowCardsB ? '#FFD60A' : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
