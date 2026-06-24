'use client';

import { motion } from 'framer-motion';
import MatchCard from '@/components/MatchCard';
import ClassicMatches from '@/components/home/ClassicMatches';
import LiveNews from '@/components/home/LiveNews';
import GroupsOverview from '@/components/GroupsOverview';
import Image from 'next/image';
import { MATCHES } from '@/lib/data/matches';

export default function HomePage() {
  return (
    <main className="min-h-screen wc26-bg">

      {/* Hero */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
        {/* Trophy */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="mb-8 flex justify-center trophy-float"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-48 h-64 sm:w-56 sm:h-80 drop-shadow-2xl">
              <Image
                src="/trophy-real.png"
                alt="World Cup Trophy"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Headline */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-xs font-display font-semibold tracking-widest text-white/30 uppercase mb-3">
            كأس العالم FIFA 2026 · أمريكا / كندا / المكسيك
          </p>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-tight mb-4">
            <span className="neon-gradient-text">منصة التوقعات</span>
            <br />
            <span className="text-white">لكأس العالم 2026</span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            حلّل بيانات المواجهات التاريخية، توقّع نتائج المباريات وأول الهدّافين،
            ثم تنافس على لوحة المتصدرين العالمية.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex justify-center gap-8 sm:gap-16 lg:gap-24 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: '104', label: 'مباراة' },
            { value: '48', label: 'منتخب' },
            { value: '3', label: 'دول مضيفة' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-black text-2xl sm:text-3xl neon-text-green">{s.value}</div>
              <div className="text-xs text-white/30 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Match grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
          <span className="text-xs font-display font-semibold text-white/30 tracking-widest">
            مباريات قادمة — الجولة الأخيرة
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {MATCHES.filter((match) => {
            const matchDate = new Date(match.date);
            const now = new Date();
            const nextFourDays = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
            return matchDate >= now && matchDate <= nextFourDays;
          }).map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      </section>

      {/* Live News Section */}
      <LiveNews />

      {/* Classic Matches Section */}
      <ClassicMatches />

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-xs text-white/15">
          منصة توقعات كأس العالم 2026 · البيانات للأغراض الترفيهية فقط
        </p>
      </footer>
      {/* Groups Overview */}
      <GroupsOverview />

    </main>
  );
}
