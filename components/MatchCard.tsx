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
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/match/${match.id}`} className="block">
        <div className="glass-card overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-neon-green/30"
          style={{ borderColor: 'rgba(57,255,20,0.08)' }}
        >
          {/* Header bar */}
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
          >
            <span className="text-xs font-display font-semibold text-white/40">
              المجموعة {match.group} · {match.round.split('—')[0].trim()}
            </span>
            <span className="text-xs text-white/30">
              {match.city}، {match.country}
            </span>
          </div>

          {/* Teams */}
          <div className="p-6 flex items-center justify-between gap-4">
            {/* Team A */}
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="relative w-20 h-14 sm:w-24 sm:h-16 lg:w-28 lg:h-20 rounded-md overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-wc-cyan/50 transition-colors bg-white/5">
                {getFlagUrl(match.teamA.flagCode) && (
                  <Image src={getFlagUrl(match.teamA.flagCode)} alt={match.teamA.name} fill className="object-cover" />
                )}
              </div>
              <h3 className="font-display font-black text-lg text-center tracking-wide">{match.teamA.name}</h3>
              <span className="text-[10px] text-white/40 tracking-widest">المصنف #{match.teamA.ranking}</span>
              <FormDots form={match.teamA.form} />
            </div>

            {/* VS Badge */}
            <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center">
              <CountdownTimer targetDate={match.date} />
              <span className="text-xl font-display font-black text-wc-magenta italic mt-2">VS</span>
            </div>

            {/* Team B */}
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="relative w-20 h-14 sm:w-24 sm:h-16 lg:w-28 lg:h-20 rounded-md overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-wc-green/50 transition-colors bg-white/5">
                {getFlagUrl(match.teamB.flagCode) && (
                  <Image src={getFlagUrl(match.teamB.flagCode)} alt={match.teamB.name} fill className="object-cover" />
                )}
              </div>
              <h3 className="font-display font-black text-lg text-center tracking-wide">{match.teamB.name}</h3>
              <span className="text-[10px] text-white/40 tracking-widest">المصنف #{match.teamB.ranking}</span>
              <FormDots form={match.teamB.form} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-black/30 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🏟️</span>
              <span className="text-xs text-white/50">{match.stadium}</span>
            </div>
            <span className="text-xs font-display font-bold text-wc-cyan group-hover:text-wc-green transition-colors">
              حلّل وتوقّع ←
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
