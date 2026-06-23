'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MATCHES } from '@/lib/data/matches';
import { CalendarDays, MapPin } from 'lucide-react';

export default function SchedulePage() {
  return (
    <main className="min-h-screen wc26-bg pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display font-black text-4xl sm:text-5xl neon-gradient-text mb-4">
            جدول المباريات
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            مواعيد المباريات القادمة، الملاعب، وتفاصيل الجولات.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {MATCHES.filter(match => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const nextWeek = new Date(now);
            nextWeek.setDate(now.getDate() + 7);
            const matchDate = new Date(match.date);
            return matchDate >= now && matchDate <= nextWeek;
          }).map((match, idx) => {
            const date = new Date(match.date);
            const formattedDate = new Intl.DateTimeFormat('ar-EG', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(date);
            
            const time = new Intl.DateTimeFormat('ar-EG', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(date);

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/match/${match.id}`} className="block">
                  <div className="glass-card p-4 sm:p-6 hover:bg-white/5 transition-colors border-l-4" style={{ borderLeftColor: match.teamA.primaryColor }}>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      
                      {/* Match Info */}
                      <div className="flex flex-col gap-2 flex-1">
                        <span className="text-xs font-display font-bold text-neon-green uppercase tracking-widest px-3 py-1 bg-neon-green/10 rounded-full w-fit">
                          المجموعة {match.group} • {match.round}
                        </span>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-3">
                            <span className="font-display font-bold text-lg sm:text-2xl">{match.teamA.name}</span>
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image src={`https://flagcdn.com/w160/${match.teamA.flagCode}.png`} alt={match.teamA.name} fill className="object-cover" />
                            </div>
                          </div>
                          <span className="text-white/30 font-bold">ضد</span>
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image src={`https://flagcdn.com/w160/${match.teamB.flagCode}.png`} alt={match.teamB.name} fill className="object-cover" />
                            </div>
                            <span className="font-display font-bold text-lg sm:text-2xl">{match.teamB.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Date & Venue */}
                      <div className="flex flex-col gap-3 sm:items-end sm:text-left shrink-0 bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-white/80">
                          <span className="font-bold">{formattedDate} • {time}</span>
                          <CalendarDays className="w-4 h-4 text-white/50" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <span>{match.stadium}, {match.city} ({match.country})</span>
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
