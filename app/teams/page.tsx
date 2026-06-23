'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TeamDetailsModal from '@/components/ui/TeamDetailsModal';
import { MATCHES } from '@/lib/data/matches';
import type { Team } from '@/lib/data/types';

export default function TeamsPage() {
  // Extract unique teams
  const teamsMap = new Map<string, Team>();
  MATCHES.forEach(match => {
    if (!teamsMap.has(match.teamA.id)) teamsMap.set(match.teamA.id, match.teamA);
    if (!teamsMap.has(match.teamB.id)) teamsMap.set(match.teamB.id, match.teamB);
  });
  
  const teams = Array.from(teamsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <main className="min-h-screen wc26-bg pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display font-black text-4xl sm:text-5xl neon-gradient-text mb-4">
            المنتخبات المشاركة
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            تعرف على فرق البطولة، إحصائياتهم، تشكيلاتهم الأساسية وتاريخهم في كأس العالم.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {teams.map((team, idx) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedTeam(team)}
              className="glass-card p-6 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-colors"
            >
              <div 
                className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
                style={{ background: `linear-gradient(45deg, ${team.primaryColor}, transparent)` }}
              />
              
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: team.primaryColor }}>
                    <Image
                      src={`https://flagcdn.com/w160/${team.flagCode}.png`}
                      alt={`${team.name} flag`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">{team.name}</h3>
                    <p className="text-sm text-white/50 uppercase tracking-widest">{team.shortName}</p>
                  </div>
                </div>
                <div className="text-3xl opacity-50">{team.flag}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <span className="block text-xs text-white/40 mb-1">تصنيف FIFA</span>
                  <span className="font-bold text-neon-green">#{team.ranking}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <span className="block text-xs text-white/40 mb-1">ألقاب المونديال</span>
                  <span className="font-bold text-yellow-500">{team.worldCupWins} 🏆</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white/70 mb-3 border-b border-white/10 pb-2">أبرز النجوم</h4>
                <div className="flex flex-wrap gap-2">
                  {team.players.slice(0, 4).map(player => (
                    <div key={player.id} className="flex items-center gap-2 bg-white/5 pr-3 rounded-full border border-white/5 overflow-hidden">
                      <div className="relative w-8 h-8 shrink-0 bg-white/10">
                        {player.avatarUrl && (
                          <Image src={player.avatarUrl} alt={player.name} fill className="object-cover" />
                        )}
                      </div>
                      <span className="text-xs font-medium">{player.shortName}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {selectedTeam && (
          <TeamDetailsModal 
            team={selectedTeam} 
            onClose={() => setSelectedTeam(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
