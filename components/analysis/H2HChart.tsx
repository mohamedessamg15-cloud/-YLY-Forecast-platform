'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Match } from '@/lib/data/types';

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { year: number; stage: string; highlight: string; teamAScore: number; teamBScore: number } }[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="glass-card p-3 text-xs max-w-[200px]">
        <p className="font-display font-bold text-neon-green">{d.year} — {d.stage}</p>
        <p className="text-white/70 mt-1">{d.highlight}</p>
      </div>
    );
  }
  return null;
};

export default function H2HChart({ match }: { match: Match }) {
  const data = match.h2hRecords.map((r) => ({
    year: r.year,
    stage: r.stage,
    highlight: r.highlight,
    teamAScore: r.teamAScore,
    teamBScore: r.teamBScore,
    winner: r.winner,
    totalGoals: r.goals,
  }));

  return (
    <motion.div
      className="glass-card p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="font-display font-bold text-white text-lg mb-1">
        الأهداف في كل مواجهة
      </h3>
      <p className="text-xs text-white/30 mb-5">نتائج لقاءات كأس العالم التاريخية</p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4} barSize={28}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'Cairo' }}
            axisLine={false}
            tickLine={false}
            width={20}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="teamAScore" name={match.teamA.shortName} radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.winner === 'A' ? '#39FF14' : 'rgba(57,255,20,0.3)'} />
            ))}
          </Bar>
          <Bar dataKey="teamBScore" name={match.teamB.shortName} radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.winner === 'B' ? '#00F0FF' : 'rgba(0,240,255,0.3)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#39FF14' }} />
          <span className="text-xs text-white/50">{match.teamA.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#00F0FF' }} />
          <span className="text-xs text-white/50">{match.teamB.name}</span>
        </div>
      </div>
    </motion.div>
  );
}
