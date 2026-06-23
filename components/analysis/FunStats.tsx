'use client';

import { motion } from 'framer-motion';
import type { Match } from '@/lib/data/types';

export default function FunStats({ match }: { match: Match }) {
  return (
    <motion.div
      className="glass-card p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <h3 className="font-display font-bold text-white text-lg mb-1">
        بالأرقام
      </h3>
      <p className="text-xs text-white/30 mb-5">بيانات إحصائية لهذه المباراة</p>

      <div className="space-y-4">
        {match.funStats.map((stat, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.06 }}
          >
            <span className="text-xl w-7 text-center flex-shrink-0">{stat.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white/40 mb-1.5">{stat.label}</div>
              <div className="flex items-center gap-3">
                <span className="font-display font-black text-neon-green text-base">{stat.valueA}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #39FF14, #00F0FF)', width: '60%' }}
                  />
                </div>
                <span className="font-display font-black text-neon-blue text-base">{stat.valueB}</span>
              </div>
              {stat.unit && (
                <div className="text-[10px] text-white/20 mt-1">{stat.unit}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
