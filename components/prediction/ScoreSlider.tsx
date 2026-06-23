'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ScoreSliderProps {
  value: number;
  onChange: (v: number) => void;
  label: string;
  flag: string;
  color: 'green' | 'blue';
}

export default function ScoreSlider({ value, onChange, label, flag, color }: ScoreSliderProps) {
  const isGreen = color === 'green';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Flag + Team */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl">{flag}</span>
        <span className="font-display font-600 text-sm tracking-widest text-white/60 uppercase">
          {label}
        </span>
      </div>

      {/* Score digit */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ y: -15, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="score-digit"
            style={{
              textShadow: isGreen
                ? '0 0 30px rgba(57,255,20,0.8)'
                : '0 0 30px rgba(0,240,255,0.8)',
              background: isGreen
                ? 'linear-gradient(180deg, #39FF14 0%, rgba(57,255,20,0.7) 100%)'
                : 'linear-gradient(180deg, #00F0FF 0%, rgba(0,240,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider */}
      <div className="w-full px-2">
        <input
          type="range"
          min={0}
          max={6}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`neon-slider ${!isGreen ? 'neon-slider-blue' : ''} w-full`}
          style={{
            background: `linear-gradient(to right, ${isGreen ? '#39FF14' : '#00F0FF'} 0%, ${isGreen ? '#39FF14' : '#00F0FF'} ${(value / 6) * 100}%, rgba(255,255,255,0.1) ${(value / 6) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
          aria-label={`${label} score`}
          id={`score-slider-${label.toLowerCase()}`}
        />
        <div className="flex justify-between mt-1">
          {[0, 1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n} className={`text-[9px] tabular-nums ${value === n ? (isGreen ? 'text-neon-green' : 'text-neon-blue') : 'text-white/15'}`}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
