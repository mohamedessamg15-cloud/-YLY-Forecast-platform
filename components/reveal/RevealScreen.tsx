'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProcessingAnimation from './ProcessingAnimation';
import PredictionCard from './PredictionCard';
import type { Match, PredictionState } from '@/lib/data/types';

const CTA_URL = '#register'; // ← ضع رابط التسجيل الخاص بك هنا

interface RevealScreenProps {
  match: Match;
  prediction: PredictionState;
  onReset: () => void;
}

type RevealStage = 'processing' | 'revealed';

export default function RevealScreen({ match, prediction, onReset }: RevealScreenProps) {
  const [stage, setStage] = useState<RevealStage>('processing');

  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(57,255,20,0.08) 0%, transparent 70%)',
        }}
      />

      <AnimatePresence mode="wait">
        {stage === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <ProcessingAnimation onComplete={() => setStage('revealed')} />
          </motion.div>
        )}

        {stage === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <PredictionCard match={match} prediction={prediction} />

            {/* GATED CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card-neon p-5 text-center"
            >
              <p className="text-xs text-white/40 mb-3">
                🏆 هل أنت جاهز للتنافس على مستوى عالمي؟
              </p>
              <a
                href="https://www.facebook.com/Ylyministryy"
                target="_blank"
                rel="noopener noreferrer"
                id="gated-cta-button"
                className="btn-cta pulsing block w-full text-center"
              >
                🔒 سجل دلوقتي وخليك انت ال GOAT
              </a>
              <p className="text-[10px] text-white/20 mt-3 leading-relaxed">
                احفظ توقعك في لوحة المتصدرين العالمية وادخل سحب الجوائز.
                انضم لآلاف المشجعين في تحدي توقعات كأس العالم 2026.
              </p>
            </motion.div>

            {/* Reset */}
            <div className="text-center">
              <button
                onClick={onReset}
                className="text-xs text-white/25 hover:text-white/50 transition-colors underline underline-offset-4"
                id="reset-prediction"
              >
                ↺ ابدأ توقعاً جديداً
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
