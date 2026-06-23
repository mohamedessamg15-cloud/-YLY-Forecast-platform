'use client';

import { motion } from 'framer-motion';
import type { Match } from '@/lib/data/types';

export default function H2HHeader({ match }: { match: Match }) {
  const aWins = match.h2hRecords.filter((r) => r.winner === 'A').length;
  const bWins = match.h2hRecords.filter((r) => r.winner === 'B').length;
  const draws = match.h2hRecords.filter((r) => r.winner === 'D').length;
  const total = match.h2hRecords.length;

  return (
    <div className="glass-card-neon p-4 sm:p-8 overflow-hidden">

      {/* ── Mobile: vertical stack / Desktop: horizontal row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Team A */}
        <motion.div
          className="flex items-center gap-3 sm:flex-col sm:items-center sm:flex-1"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-5xl sm:text-7xl flex-shrink-0">{match.teamA.flag}</span>
          <div className="text-right sm:text-center min-w-0 flex-1">
            <div className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
              {match.teamA.name}
            </div>
            <div className="text-xs text-white/40 mt-0.5">المدرب: {match.teamA.coach}</div>
            <div className="text-[10px] text-white/30 mt-0.5">
              بطل العالم {match.teamA.worldCupWins} مرة
            </div>
            {/* Form */}
            <div className="flex gap-1 mt-2 flex-wrap justify-end sm:justify-center">
              {match.teamA.form.map((f, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-display font-bold form-badge-${f.result}`}
                >
                  {f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center VS + Stats */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:flex-col sm:gap-4 py-1 sm:py-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="font-display font-black text-3xl sm:text-5xl neon-gradient-text flex-shrink-0">
            ضد
          </div>
          {/* Record pills */}
          {total > 0 && (
            <div className="flex gap-1.5 sm:gap-2 text-center">
              <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)' }}
              >
                <span className="font-display font-black text-base sm:text-xl text-neon-green">{aWins}</span>
                <span className="text-[9px] sm:text-[10px] text-white/40">{match.teamA.shortName}</span>
              </div>
              <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="font-display font-black text-base sm:text-xl text-white/50">{draws}</span>
                <span className="text-[9px] sm:text-[10px] text-white/40">تعادل</span>
              </div>
              <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                <span className="font-display font-black text-base sm:text-xl text-neon-blue">{bWins}</span>
                <span className="text-[9px] sm:text-[10px] text-white/40">{match.teamB.shortName}</span>
              </div>
            </div>
          )}
          <div className="text-[10px] text-white/25 text-center hidden sm:block">
            {total} مواجهة في كأس العالم
          </div>
        </motion.div>

        {/* Team B */}
        <motion.div
          className="flex items-center gap-3 flex-row-reverse sm:flex-col sm:items-center sm:flex-1"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-5xl sm:text-7xl flex-shrink-0">{match.teamB.flag}</span>
          <div className="text-left sm:text-center min-w-0 flex-1">
            <div className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
              {match.teamB.name}
            </div>
            <div className="text-xs text-white/40 mt-0.5">المدرب: {match.teamB.coach}</div>
            <div className="text-[10px] text-white/30 mt-0.5">
              بطل العالم {match.teamB.worldCupWins} مرة
            </div>
            {/* Form */}
            <div className="flex gap-1 mt-2 flex-wrap justify-start sm:justify-center">
              {match.teamB.form.map((f, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-display font-bold form-badge-${f.result}`}
                >
                  {f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Mobile only: total matches */}
      {total > 0 && (
        <div className="text-[10px] text-white/25 text-center mt-3 sm:hidden">
          {total} مواجهة في كأس العالم
        </div>
      )}
    </div>
  );
}
