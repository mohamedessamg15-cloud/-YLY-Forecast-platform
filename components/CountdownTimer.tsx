'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card px-1.5 py-0.5 min-w-[1.8rem] text-center">
        <span className="font-display font-bold text-xs text-neon-green tabular-nums" suppressHydrationWarning>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[8px] text-white/30 tracking-wide mt-0.5">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted || !timeLeft) {
    return (
      <div className="flex items-end gap-0.5">
        <div className="glass-card px-1.5 py-0.5 min-w-[1.8rem] text-center">
          <span className="font-display font-bold text-xs text-neon-green tabular-nums">--</span>
        </div>
        <span className="text-neon-green/60 font-display font-bold text-[10px] mb-2">:</span>
        <div className="glass-card px-1.5 py-0.5 min-w-[1.8rem] text-center">
          <span className="font-display font-bold text-xs text-neon-green tabular-nums">--</span>
        </div>
        <span className="text-neon-green/60 font-display font-bold text-[10px] mb-2">:</span>
        <div className="glass-card px-1.5 py-0.5 min-w-[1.8rem] text-center">
          <span className="font-display font-bold text-xs text-neon-green tabular-nums">--</span>
        </div>
      </div>
    );
  }

  const isOver = Object.values(timeLeft).every((v) => v === 0);

  if (isOver) {
    return (
      <span className="text-xs font-display font-bold text-neon-green uppercase animate-pulse">
        يُلعب الآن
      </span>
    );
  }

  return (
    <div className="flex items-end gap-0.5">
      {timeLeft.days > 0 && (
        <>
          <Digit value={timeLeft.days} label="ي" />
          <span className="text-neon-green/60 font-display font-bold text-[10px] mb-2">:</span>
        </>
      )}
      <Digit value={timeLeft.hours} label="س" />
      <span className="text-neon-green/60 font-display font-bold text-[10px] mb-2">:</span>
      <Digit value={timeLeft.minutes} label="د" />
      <span className="text-neon-green/60 font-display font-bold text-[10px] mb-2">:</span>
      <Digit value={timeLeft.seconds} label="ث" />
    </div>
  );
}
