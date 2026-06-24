'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';
import type { Match } from '@/lib/data/types';
import { getFlagUrl } from '@/lib/utils/flags';

function FormDots({ form }: { form: { result: 'W' | 'D' | 'L' }[] }) {
  return (
    <div className="flex gap-1">
      {form.slice(0, 5).map((f, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            f.result === 'W' ? 'bg-neon-green' :
            f.result === 'L' ? 'bg-red-500' :
            'bg-white/30'
          }`}
          title={f.result === 'W' ? 'فوز' : f.result === 'L' ? 'خسارة' : 'تعادل'}
        />
      ))}
    </div>
  );
}

export default function MatchCard({ match, index }: { match: Match; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/match/${match.id}`} className="block">
        <div
          className="glass-card overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-neon-green/30"
          style={{ borderColor: 'rgba(57,255,20,0.08)' }}
        >
          {/* Header bar */}
          <div
            className="px-4 py-2 flex items-center justify-between flex-wrap gap-1"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
          >
            <span className="text-xs font-display font-semibold text-white/40 truncate">
              المجموعة {match.group} · {match.round.split('—')[0].trim()}
            </span>
            <span className="text-xs text-white/30 truncate">
              {match.city}، {match.country}
            </span>
          </div>

          {/* Teams - vertical on mobile, horizontal on sm+ */}
          <div className="p-4 sm:p-6">

            {/* Top Match Status / Countdown */}
            <div className="flex justify-center mb-3">
              {match.status === 'Finished' ? (
                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  <span className="text-xs font-bold text-white tracking-widest uppercase">انتهت (FT)</span>
                </div>
              ) : match.status === 'Live' ? (
                <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 animate-pulse">
                  <span className="text-xs font-bold text-red-500 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    مباشر
                  </span>
                </div>
              ) : (
                <CountdownTimer targetDate={match.date} />
              )}
            </div>

            {/* Teams row */}
            <div className="flex items-center justify-between gap-2">
              {/* Team A */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className="relative w-14 h-10 sm:w-20 sm:h-14 rounded-md overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-wc-cyan/50 transition-colors bg-white/5 flex-shrink-0">
                  {getFlagUrl(match.teamA.flagCode) && (
                    <Image src={getFlagUrl(match.teamA.flagCode)} alt={match.teamA.name} fill className="object-cover" />
                  )}
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-center leading-tight w-full px-1">{match.teamA.name}</h3>
                <span className="text-[9px] sm:text-[10px] text-white/40 tracking-widest">#{match.teamA.ranking}</span>
                <FormDots form={match.teamA.form} />
              </div>

              {/* VS Badge / Score */}
              <div className="flex-shrink-0 px-2 sm:px-4 py-2 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center min-w-[60px] sm:min-w-[80px]">
                {match.status === 'Finished' || match.status === 'Live' ? (
                  <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-widest">
                    {match.homeScore} - {match.awayScore}
                  </span>
                ) : (
                  <span className="text-lg sm:text-xl font-display font-black text-wc-magenta italic">VS</span>
                )}
              </div>

              {/* Team B */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className="relative w-14 h-10 sm:w-20 sm:h-14 rounded-md overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-wc-green/50 transition-colors bg-white/5 flex-shrink-0">
                  {getFlagUrl(match.teamB.flagCode) && (
                    <Image src={getFlagUrl(match.teamB.flagCode)} alt={match.teamB.name} fill className="object-cover" />
                  )}
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-center leading-tight w-full px-1">{match.teamB.name}</h3>
                <span className="text-[9px] sm:text-[10px] text-white/40 tracking-widest">#{match.teamB.ranking}</span>
                <FormDots form={match.teamB.form} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-black/30 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm flex-shrink-0">🏟️</span>
              <span className="text-xs text-white/50 truncate">{match.stadium}</span>
            </div>
            <span className="text-xs font-display font-bold text-wc-cyan group-hover:text-wc-green transition-colors flex-shrink-0 mr-2">
              حلّل وتوقّع ←
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
