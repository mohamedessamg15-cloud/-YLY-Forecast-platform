'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GROUPS, TEAMS_MAP } from '@/lib/data/matches';
import { getFlagUrl } from '@/lib/utils/flags';

export default function GroupsOverview() {
  const groupEntries = Object.entries(GROUPS).sort(([a], [b]) => a.localeCompare(b));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <motion.div
        className="flex items-center gap-3 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
        <span className="text-xl font-display font-black text-white tracking-widest uppercase">
          مجموعات كأس العالم 2026
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groupEntries.map(([groupName, teamIds], idx) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.4 }}
            className="glass-card rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="bg-black/40 px-4 py-3 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-black text-wc-cyan">المجموعة {groupName}</h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {teamIds.map((teamId, index) => {
                const team = TEAMS_MAP[teamId];
                if (!team) return null;
                return (
                  <div key={teamId} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white/40 font-bold w-4 text-center">{index + 1}</span>
                    <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                      {getFlagUrl(team.flagCode) ? (
                        <Image src={getFlagUrl(team.flagCode)} alt={team.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-xs">{team.flag}</div>
                      )}
                    </div>
                    <span className="font-display font-bold text-sm text-white flex-1">{team.name}</span>
                    <span className="text-[10px] text-white/30">#{team.ranking}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
