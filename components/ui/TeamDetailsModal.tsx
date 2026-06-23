import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Team } from '@/lib/data/types';

interface TeamDetailsModalProps {
  team: Team;
  onClose: () => void;
}

export default function TeamDetailsModal({ team, onClose }: TeamDetailsModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Group players by position
  const positions = [
    { key: 'GK', label: 'حراس المرمى' },
    { key: 'DEF', label: 'المدافعون' },
    { key: 'MID', label: 'لاعبو الوسط' },
    { key: 'FWD', label: 'المهاجمون' },
    { key: 'SUB', label: 'الاحتياط' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Decorative Header Background */}
        <div 
          className="absolute top-0 left-0 right-0 h-48 opacity-20"
          style={{ background: `linear-gradient(135deg, ${team.primaryColor}, transparent)` }}
        />

        {/* Header / Sticky Top */}
        <div className="relative z-10 flex-shrink-0 border-b border-white/10 p-6">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/70"
          >
            ✕
          </button>

          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: team.primaryColor }}>
              <Image
                src={`https://flagcdn.com/w320/${team.flagCode}.png`}
                alt={`${team.name} flag`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-display font-black text-3xl sm:text-5xl drop-shadow-md">{team.name}</h2>
                <span className="text-3xl sm:text-5xl opacity-80">{team.flag}</span>
              </div>
              <p className="text-white/60 font-semibold tracking-widest uppercase mb-4">{team.shortName}</p>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-xs text-white/50">تصنيف FIFA:</span>
                  <span className="font-bold text-neon-green">#{team.ranking}</span>
                </div>
                <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-xs text-white/50">ألقاب:</span>
                  <span className="font-bold text-yellow-500">{team.worldCupWins} 🏆</span>
                </div>
                <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-xs text-white/50">المدرب:</span>
                  <span className="font-bold text-white">{team.coach || 'غير محدد'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          {/* Recent Form */}
          {team.form && team.form.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold font-display mb-4 border-b border-white/10 pb-2">آخر مباريات</h3>
              <div className="flex gap-2">
                {team.form.map((f, i) => {
                  const color = f.result === 'W' ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : f.result === 'D' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30';
                  return (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold ${color}`}>
                      {f.result}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Players Grid */}
          <div>
            <h3 className="text-xl font-bold font-display mb-6 border-b border-white/10 pb-2">قائمة اللاعبين</h3>
            
            <div className="space-y-8">
              {positions.map(pos => {
                const posPlayers = team.players.filter(p => p.position === pos.key);
                if (posPlayers.length === 0) return null;
                
                return (
                  <div key={pos.key}>
                    <h4 className="text-sm font-semibold text-white/40 mb-4">{pos.label} ({posPlayers.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {posPlayers.map(player => (
                        <div key={player.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-black/50 border border-white/10">
                            {player.avatarUrl && (
                              <Image 
                                src={player.avatarUrl} 
                                alt={player.name} 
                                fill 
                                className="object-cover" 
                                sizes="48px"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate" title={player.name}>{player.name}</p>
                            <p className="text-xs text-white/40 truncate">{pos.key}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
