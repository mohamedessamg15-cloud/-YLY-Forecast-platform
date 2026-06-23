'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import H2HHeader from '@/components/analysis/H2HHeader';
import LiveAIFeed from '@/components/analysis/LiveAIFeed';
import H2HChart from '@/components/analysis/H2HChart';
import HighScoringMatches from '@/components/analysis/HighScoringMatches';
import FunStats from '@/components/analysis/FunStats';
import PredictionPanel from '@/components/prediction/PredictionPanel';
import RevealScreen from '@/components/reveal/RevealScreen';
import GeminiAnalysis from '@/components/analysis/GeminiAnalysis';
import { getMatchById } from '@/lib/data/matches';
import { usePrediction } from '@/lib/hooks/usePrediction';

type Step = 'analysis' | 'predict' | 'reveal';

function StepIndicator({ current }: { current: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: 'analysis', label: '① التحليل' },
    { id: 'predict', label: '② التوقع' },
    { id: 'reveal', label: '③ النتيجة' },
  ];
  return (
    <div className="flex gap-3 sm:gap-4">
      {steps.map((s) => (
        <div
          key={s.id}
          className="text-xs font-display font-bold transition-all duration-300"
          style={{ color: s.id === current ? '#39FF14' : 'rgba(255,255,255,0.2)' }}
        >
          {s.label}
        </div>
      ))}
    </div>
  );
}

export default function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const match = getMatchById(id);
  if (!match) notFound();

  const hook = usePrediction(match.id);
  const { state, reset } = hook;

  return (
    <main className="min-h-screen wc26-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        {/* Step indicator */}
        <motion.div
          className="flex items-center justify-between mb-6 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <StepIndicator current={state.isSubmitted ? 'reveal' : 'analysis'} />
          <Link href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
            جميع المباريات →
          </Link>
        </motion.div>

        {/* Match metadata strip */}
        <motion.div
          className="glass-card px-4 py-2 mb-6 flex flex-wrap gap-4 items-center text-xs text-white/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span>📅 {new Date(match.date).toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>🏟 {match.stadium}</span>
          <span>📍 {match.city}، {match.country}</span>
          <span className="mr-auto">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-display font-bold"
              style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)', color: '#39FF14' }}
            >
              المجموعة {match.group}
            </span>
          </span>
        </motion.div>

        {/* ═══ SECTION 1: H2H ANALYSIS ═══ */}
        <section className="mb-6">
          <H2HHeader match={match} />
          
          <div className="mt-6">
            <LiveAIFeed teamA={match.teamA.name} teamB={match.teamB.name} />
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <H2HChart match={match} />
          <FunStats match={match} />
        </div>

        <div className="mb-6">
          <HighScoringMatches match={match} />
        </div>

        {/* ═══ GEMINI AI ANALYSIS ═══ */}
        <div className="mb-8">
          <GeminiAnalysis match={match} />
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.15)' }} />
          <span className="text-xs font-display font-semibold text-white/40">
            توقعك للمباراة
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.15)' }} />
        </motion.div>

        {/* ═══ SECTION 2: PREDICT or REVEAL ═══ */}
        <AnimatePresence mode="wait">
          {!state.isSubmitted ? (
            <motion.div
              key="predict"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PredictionPanel match={match} hook={hook} />
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RevealScreen match={match} prediction={state} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
