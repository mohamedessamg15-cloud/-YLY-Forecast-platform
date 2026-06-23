'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessingAnimationProps {
  onComplete: () => void;
}

const STAGES = [
  { label: 'جاري مسح البيانات التاريخية...', icon: '📡', duration: 900 },
  { label: 'مقارنة أنماط المواجهات السابقة...', icon: '🧠', duration: 900 },
  { label: 'حساب نسبة التطابق مع التاريخ...', icon: '⚙️', duration: 700 },
  { label: 'تم تأكيد التوقع!', icon: '✅', duration: 400 },
];

export default function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers: NodeJS.Timeout[] = [];

    STAGES.forEach((s, i) => {
      const t = setTimeout(() => {
        setStage(i);
        setProgress(((i + 1) / STAGES.length) * 100);
        if (i === STAGES.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, elapsed);
      timers.push(t);
      elapsed += s.duration;
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[320px] gap-8 py-8">
      {/* Hex pulse rings */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 28}px`,
              height: `${80 + i * 28}px`,
              border: `1px solid rgba(57,255,20,${0.4 - i * 0.1})`,
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'rgba(57,255,20,0.1)', border: '2px solid rgba(57,255,20,0.5)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {STAGES[stage]?.icon}
        </motion.div>
      </div>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-display font-semibold text-white/80 text-base text-center"
        >
          {STAGES[stage]?.label}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {STAGES.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i <= stage ? '#39FF14' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className="w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.6), transparent)' }}
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
