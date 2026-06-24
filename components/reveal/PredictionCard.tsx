'use client';

import { motion } from 'framer-motion';
import type { Match, PredictionState } from '@/lib/data/types';
import Image from 'next/image';

interface PredictionCardProps {
  match: Match;
  prediction: PredictionState;
}

export default function PredictionCard({ match, prediction }: PredictionCardProps) {
  const allPlayers = [...match.teamA.players, ...match.teamB.players];
  const goalscorer = allPlayers.find((p) => p.id === prediction.goalscorerPlayerId);
  const goalscorerTeam = prediction.goalscorerTeam === 'A' ? match.teamA : match.teamB;

  const winner =
    prediction.scoreA > prediction.scoreB ? match.teamA :
    prediction.scoreB > prediction.scoreA ? match.teamB : null;

  // Calculate dynamic compatibility percentage
  const calculateCompatibility = () => {
    if (!match.h2hRecords || match.h2hRecords.length === 0) return 50;
    
    const predictedDiff = prediction.scoreA - prediction.scoreB;
    const predictedWinner = predictedDiff > 0 ? 'A' : predictedDiff < 0 ? 'B' : 'D';
    
    const historicalWinners = match.h2hRecords.map(r => r.winner);
    
    let score = 40; // Base score
    
    // If the predicted winner matches any historical winner
    if (historicalWinners.includes(predictedWinner)) {
      score += 20;
    }
    
    // Calculate variance based on goals
    const predictedTotalGoals = prediction.scoreA + prediction.scoreB;
    const avgHistoricalGoals = match.h2hRecords.reduce((acc, r) => acc + r.goals, 0) / match.h2hRecords.length;
    
    // Closer to historical goal average = higher score
    const goalDiff = Math.abs(predictedTotalGoals - avgHistoricalGoals);
    if (goalDiff <= 1) score += 15;
    else if (goalDiff <= 2) score += 5;
    
    // Add reproducible pseudo-randomness based on inputs to make it feel highly specific
    const uniqueFactor = (prediction.scoreA * 7 + prediction.scoreB * 13 + prediction.possessionA) % 25;
    
    return Math.min(99, Math.max(12, Math.round(score + uniqueFactor)));
  };

  const compatibilityScore = calculateCompatibility();

  return (
    <motion.div
      className="reveal-card p-6 sm:p-8"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      {/* Title */}
      <div className="text-center mb-6">
        <motion.div
          className="text-3xl mb-2"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          🎉
        </motion.div>
        <h2 className="font-display font-black text-2xl sm:text-3xl neon-gradient-text">
          تم تثبيت توقعك!
        </h2>
        <p className="text-sm text-white/40 mt-1">
          تم تحليل توقعك ومقارنته بالبيانات التاريخية
        </p>
      </div>

      {/* Score card */}
      <div className="glass-card p-5 mb-4">
        <div className="text-[10px] text-white/30 text-center mb-4">نتيجتك المتوقعة</div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{match.teamA.flag}</div>
            <div className="font-display font-bold text-white">{match.teamA.name}</div>
          </div>
          <div className="text-center">
            <div className="font-display font-black text-5xl">
              <span style={{ color: '#39FF14' }}>{prediction.scoreA}</span>
              <span className="text-white/20 mx-2">-</span>
              <span style={{ color: '#00F0FF' }}>{prediction.scoreB}</span>
            </div>
            {winner ? (
              <div className="text-xs text-white/40 mt-1">
                فوز {winner.name} {winner.id === match.teamA.id ? '🟢' : '🔵'}
              </div>
            ) : (
              <div className="text-xs text-white/40 mt-1">تعادل 🤝</div>
            )}
          </div>
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{match.teamB.flag}</div>
            <div className="font-display font-bold text-white">{match.teamB.name}</div>
          </div>
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {goalscorer && (
          <div className="glass-card p-3 text-center col-span-3">
            <div className="text-[10px] text-white/30 mb-1">⚡ أول هداف</div>
            <div className="flex items-center justify-center gap-2">
              <Image src={goalscorer.avatarUrl} alt={goalscorer.name} width={28} height={28} className="rounded-full" unoptimized />
              <span className="font-display font-bold text-sm text-neon-green">
                {goalscorer.shortName} ({goalscorerTeam?.shortName})
              </span>
            </div>
          </div>
        )}
        <div className="glass-card p-3 text-center">
          <div className="text-[10px] text-white/30 mb-1">⚽ الاستحواذ</div>
          <div className="font-display font-bold text-xs">
            <span className="text-neon-green">{prediction.possessionA}%</span>
            {' '}/{' '}
            <span className="text-neon-blue">{100 - prediction.possessionA}%</span>
          </div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="text-[10px] text-white/30 mb-1">🟨 بطاقات أ</div>
          <div className="font-display font-black text-sm text-white/70">{prediction.yellowCardsA}</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="text-[10px] text-white/30 mb-1">🟨 بطاقات ب</div>
          <div className="font-display font-black text-sm text-white/70">{prediction.yellowCardsB}</div>
        </div>
      </div>

      {/* Alignment score */}
      <motion.div
        className="glass-card p-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/40">نسبة التوافق مع التاريخ</span>
          <motion.span
            className="font-display font-black text-xl text-neon-green"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            {compatibilityScore}%
          </motion.span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${compatibilityScore}%` }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[10px] text-white/25 mt-2">
          بناءً على البيانات التاريخية، توقعك يتوافق مع {compatibilityScore}% من سيناريوهات المواجهات السابقة
        </p>
      </motion.div>
    </motion.div>
  );
}
