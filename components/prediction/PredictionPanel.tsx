'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreSlider from './ScoreSlider';
import PlayerGrid from './PlayerGrid';
import StatsSliders from './StatsSliders';
import type { Match } from '@/lib/data/types';
import type { usePrediction } from '@/lib/hooks/usePrediction';

type PredictionHook = ReturnType<typeof usePrediction>;

interface PredictionPanelProps {
  match: Match;
  hook: PredictionHook;
}

const STEPS = ['النتيجة', 'أول هداف', 'الإحصائيات'];

export default function PredictionPanel({ match, hook }: PredictionPanelProps) {
  const { state, setScoreA, setScoreB, setGoalscorer, setPossessionA, setYellowCardsA, setYellowCardsB, submit } = hook;
  const [step, setStep] = useState(0);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="glass-card-neon p-5 sm:p-6">
      {/* Step tabs */}
      <div className="flex gap-2 mb-6">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="flex-1 py-2 rounded-lg text-xs font-display font-bold transition-all duration-200"
            style={{
              background: step === i ? 'rgba(57,255,20,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${step === i ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.06)'}`,
              color: step === i ? '#39FF14' : 'rgba(255,255,255,0.35)',
            }}
            id={`prediction-step-${i}`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {/* STEP 0: Score */}
        {step === 0 && (
          <motion.div
            key="score"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display font-bold text-white text-xl mb-1">النتيجة النهائية</h3>
            <p className="text-xs text-white/30 mb-6">حرّك الأشرطة لتحديد نتيجتك المتوقعة</p>

            <div className="grid grid-cols-3 items-center gap-4">
              <ScoreSlider
                value={state.scoreA}
                onChange={setScoreA}
                label={match.teamA.shortName}
                flag={match.teamA.flag}
                color="green"
              />
              {/* Score display */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <span className="score-digit" style={{ fontSize: '3.5rem' }}>{state.scoreA}</span>
                  <span className="font-display font-light text-white/20 text-4xl">-</span>
                  <span className="score-digit" style={{ fontSize: '3.5rem', background: 'linear-gradient(180deg, #00F0FF, rgba(0,240,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {state.scoreB}
                  </span>
                </div>
                <div className="text-[10px] text-white/20">نهاية المباراة</div>
              </div>
              <ScoreSlider
                value={state.scoreB}
                onChange={setScoreB}
                label={match.teamB.shortName}
                flag={match.teamB.flag}
                color="blue"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 1: Goalscorer */}
        {step === 1 && (
          <motion.div
            key="goalscorer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display font-bold text-white text-xl mb-1">أول هداف في المباراة</h3>
            <p className="text-xs text-white/30 mb-5">
              اختر اللاعب الذي تتوقع أنه سيسجل أول هدف
              {state.goalscorerPlayerId && (
                <span className="mr-2 text-neon-green">✓ تم الاختيار</span>
              )}
            </p>

            <div className="space-y-6">
              <PlayerGrid
                players={match.teamA.players}
                teamLabel={match.teamA.name}
                flag={match.teamA.flag}
                selectedPlayerId={state.goalscorerTeam === 'A' ? state.goalscorerPlayerId : null}
                onSelect={(id) => setGoalscorer('A', id)}
                color="green"
              />
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="pt-4">
                <PlayerGrid
                  players={match.teamB.players}
                  teamLabel={match.teamB.name}
                  flag={match.teamB.flag}
                  selectedPlayerId={state.goalscorerTeam === 'B' ? state.goalscorerPlayerId : null}
                  onSelect={(id) => setGoalscorer('B', id)}
                  color="blue"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Stats */}
        {step === 2 && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display font-bold text-white text-xl mb-1">إحصائيات المباراة</h3>
            <p className="text-xs text-white/30 mb-5">توقّع سير المباراة ومستوى الانضباط</p>

            <StatsSliders
              possessionA={state.possessionA}
              yellowCardsA={state.yellowCardsA}
              yellowCardsB={state.yellowCardsB}
              teamAFlag={match.teamA.flag}
              teamBFlag={match.teamB.flag}
              teamAShort={match.teamA.shortName}
              teamBShort={match.teamB.shortName}
              onPossessionChange={setPossessionA}
              onYellowCardsAChange={setYellowCardsA}
              onYellowCardsBChange={setYellowCardsB}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            onClick={goPrev}
            className="flex-1 py-3 rounded-xl font-display font-bold text-sm transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            → السابق
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            className="flex-1 py-3 rounded-xl font-display font-bold text-sm transition-all duration-200"
            style={{
              background: 'rgba(57,255,20,0.12)',
              border: '1px solid rgba(57,255,20,0.3)',
              color: '#39FF14',
            }}
            id="prediction-next"
          >
            التالي ←
          </button>
        ) : (
          <motion.button
            onClick={submit}
            disabled={!state.isComplete}
            className={`btn-cta flex-1 ${state.isComplete ? 'pulsing' : ''}`}
            whileHover={state.isComplete ? { scale: 1.02 } : {}}
            whileTap={state.isComplete ? { scale: 0.98 } : {}}
            id="confirm-prediction"
          >
            {state.isComplete ? '🔒 تأكيد التوقع' : 'اختر أول هداف أولاً'}
          </motion.button>
        )}
      </div>

      {/* Completion indicator */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-3">
          <span className="text-xs text-neon-green">✓ النتيجة</span>
          <span className={`text-xs ${state.goalscorerPlayerId ? 'text-neon-green' : 'text-white/20'}`}>
            {state.goalscorerPlayerId ? '✓' : '○'} الهداف
          </span>
          <span className="text-xs text-white/30">✓ الإحصائيات</span>
        </div>
      </div>
    </div>
  );
}
