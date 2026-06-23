'use client';

import { motion } from 'framer-motion';
import type { Match } from '@/lib/data/types';

export default function HighScoringMatches({ match }: { match: Match }) {
  const sorted = [...match.h2hRecords].sort((a, b) => b.goals - a.goals);

  return (
    <motion.div
      className="glass-card p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-display font-bold text-white text-lg mb-1">
        الخط الزمني للمواجهات
      </h3>
      <p className="text-xs text-white/30 mb-5">جميع اللقاءات بين الفريقين في كأس العالم</p>

      <div className="space-y-5">
        {sorted.map((record, i) => (
          <motion.div
            key={record.year}
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-black text-neon-green text-base">{record.year}</span>
                  <span className="text-xs text-white/30 px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {record.stage}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">{record.highlight}</p>
                <p className="text-[10px] text-white/20 mt-1">📍 {record.venue}</p>
              </div>

              {/* Score */}
              <div className="flex-shrink-0 flex items-center gap-1.5">
                <span className={`font-display font-black text-2xl ${record.winner === 'A' ? 'text-neon-green' : 'text-white/60'}`}>
                  {record.teamAScore}
                </span>
                <span className="text-white/20 font-display font-bold">-</span>
                <span className={`font-display font-black text-2xl ${record.winner === 'B' ? 'text-neon-blue' : 'text-white/60'}`}>
                  {record.teamBScore}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
