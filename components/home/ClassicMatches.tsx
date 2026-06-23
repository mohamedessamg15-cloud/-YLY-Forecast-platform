'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getFlagUrl } from '@/lib/utils/flags';

interface ClassicMatch {
  id: string;
  year: number;
  stage: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  story: string;
}

const classicMatches: ClassicMatch[] = [
  { id: '1', year: 2022, stage: 'النهائي', teamA: 'الأرجنتين', teamB: 'فرنسا', scoreA: 3, scoreB: 3, story: 'أعظم نهائي في التاريخ، حسمته الأرجنتين بركلات الترجيح 4-2' },
  { id: '2', year: 2014, stage: 'نصف النهائي', teamA: 'ألمانيا', teamB: 'البرازيل', scoreA: 7, scoreB: 1, story: 'صدمة "مينيرازو" التاريخية لأصحاب الأرض' },
  { id: '3', year: 1986, stage: 'ربع النهائي', teamA: 'الأرجنتين', teamB: 'إنجلترا', scoreA: 2, scoreB: 1, story: 'هدف القرن و"يد الرب" لمارادونا في مباراة واحدة' },
];

export default function ClassicMatches() {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-xl">
          📼
        </div>
        <h2 className="text-xl font-display font-black tracking-wide text-white">المباريات التاريخية</h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8">
        {classicMatches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-wc p-5 group hover:border-wc-cyan/50 transition-colors"
          >
            <div className="flex justify-between items-center mb-4 text-xs font-bold text-white/50 tracking-widest uppercase">
              <span>{match.year}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{match.stage}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-12 h-8 rounded-sm overflow-hidden shadow-sm border border-white/10">
                  {getFlagUrl(match.teamA) ? (
                    <Image src={getFlagUrl(match.teamA)} alt={match.teamA} fill className="object-cover" />
                  ) : <div className="w-full h-full bg-white/20" />}
                </div>
                <span className="text-xs font-bold text-white/80">{match.teamA}</span>
              </div>

              <div className="text-2xl font-display font-black text-white/90">
                {match.scoreA} <span className="text-wc-magenta mx-1">-</span> {match.scoreB}
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="relative w-12 h-8 rounded-sm overflow-hidden shadow-sm border border-white/10">
                  {getFlagUrl(match.teamB) ? (
                    <Image src={getFlagUrl(match.teamB)} alt={match.teamB} fill className="object-cover" />
                  ) : <div className="w-full h-full bg-white/20" />}
                </div>
                <span className="text-xs font-bold text-white/80">{match.teamB}</span>
              </div>
            </div>

            <div className="text-[11px] text-white/40 leading-relaxed text-center group-hover:text-white/70 transition-colors">
              {match.story}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
