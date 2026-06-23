'use client';

import { motion } from 'framer-motion';
import type { Match } from '@/lib/data/types';

export default function H2HHeader({ match }: { match: Match }) {
  const aWins = match.h2hRecords.filter((r) => r.winner === 'A').length;
  const bWins = match.h2hRecords.filter((r) => r.winner === 'B').length;
  const draws = match.h2hRecords.filter((r) => r.winner === 'D').length;
  const total = match.h2hRecords.length;

  return (
    <div className="glass-card-neon p-6 sm:p-8">
      {/* Teams Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Team A */}
        <motion.div
          className="flex-1 flex flex-col items-center gap-3"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-6xl sm:text-8xl">{match.teamA.flag}</span>
          <div className="text-center">
            <div className="font-display font-bold text-2xl sm:text-3xl text-white">
              {match.teamA.name}
            </div>
            <div className="text-sm text-white/40 mt-1">المدرب: {match.teamA.coach}</div>
            <div className="text-xs text-white/30 mt-0.5">
              بطل العالم {match.teamA.worldCupWins} مرة
            </div>
          </div>
          {/* Form */}
          <div className="flex gap-1.5">
            {match.teamA.form.map((f, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-xs font-display font-bold form-badge-${f.result}`}
              >
                {f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Center stats */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="font-display font-black text-4xl sm:text-5xl neon-gradient-text">
            ضد
          </div>
          {/* Record pills */}
          {total > 0 && (
            <div className="flex gap-2 text-center">
              <div className="flex flex-col items-center px-3 py-2 rounded-lg"
                style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)' }}
              >
                <span className="font-display font-black text-xl text-neon-green">{aWins}</span>
                <span className="text-[10px] text-white/40">{match.teamA.shortName}</span>
              </div>
              <div className="flex flex-col items-center px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="font-display font-black text-xl text-white/50">{draws}</span>
                <span className="text-[10px] text-white/40">تعادل</span>
              </div>
              <div className="flex flex-col items-center px-3 py-2 rounded-lg"
                style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                <span className="font-display font-black text-xl text-neon-blue">{bWins}</span>
                <span className="text-[10px] text-white/40">{match.teamB.shortName}</span>
              </div>
            </div>
          )}
          <div className="text-[10px] text-white/25">
            {total} مواجهة في كأس العالم
          </div>
        </motion.div>

        {/* Team B */}
        <motion.div
          className="flex-1 flex flex-col items-center gap-3"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-6xl sm:text-8xl">{match.teamB.flag}</span>
          <div className="text-center">
            <div className="font-display font-bold text-2xl sm:text-3xl text-white">
              {match.teamB.name}
            </div>
            <div className="text-sm text-white/40 mt-1">المدرب: {match.teamB.coach}</div>
            <div className="text-xs text-white/30 mt-0.5">
              بطل العالم {match.teamB.worldCupWins} مرة
            </div>
          </div>
          {/* Form */}
          <div className="flex gap-1.5">
            {match.teamB.form.map((f, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-xs font-display font-bold form-badge-${f.result}`}
              >
                {f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
