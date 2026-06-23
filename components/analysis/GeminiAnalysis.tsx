'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Match } from '@/lib/data/types';

interface GeminiResult {
  analysis: string;
  prediction: string;
  keyPlayer: string;
  tactical: string;
  probabilities: string;
}

export default function GeminiAnalysis({ match }: { match: Match }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dots, setDots] = useState('');

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Animate dots
    let d = 0;
    const dotsInterval = setInterval(() => {
      d = (d + 1) % 4;
      setDots('.'.repeat(d));
    }, 400);

    try {
      const formA = match.teamA.form.map((f) =>
        f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'
      ).join('-');
      const formB = match.teamB.form.map((f) =>
        f.result === 'W' ? 'ف' : f.result === 'D' ? 'ت' : 'خ'
      ).join('-');

      const h2hWinsA = match.h2hRecords.filter((r) => r.winner === 'A').length;
      const h2hWinsB = match.h2hRecords.filter((r) => r.winner === 'B').length;
      const h2hDraws = match.h2hRecords.filter((r) => r.winner === 'D').length;

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchData: {
            teamA: match.teamA.name,
            teamB: match.teamB.name,
            group: match.group,
            stadium: match.stadium,
            city: match.city,
            rankA: match.teamA.ranking,
            rankB: match.teamB.ranking,
            winsA: match.teamA.worldCupWins,
            winsB: match.teamB.worldCupWins,
            h2hWinsA,
            h2hWinsB,
            h2hDraws,
            formA,
            formB,
          },
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(message);
    } finally {
      clearInterval(dotsInterval);
      setLoading(false);
      setDots('');
    }
  };

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
            style={{ background: 'linear-gradient(135deg, #39FF14, #00F0FF)' }}
          >
            ✦
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">تحليل Gemini AI</h3>
            <p className="text-[10px] text-white/30">مدعوم بذكاء Google Gemini</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/25 px-2 py-1 rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse inline-block" />
          Gemini Flash
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {/* Initial state */}
          {!loading && !result && !error && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6"
            >
              <div className="text-4xl mb-3">🤖</div>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">
                اضغط لتحصل على تحليل احترافي مدعوم بالذكاء الاصطناعي
                <br />
                <span className="text-[11px] text-white/30">
                  يُحلّل البيانات التاريخية · الفورم · التكتيكات · ويتوقع النتيجة
                </span>
              </p>
              <motion.button
                onClick={analyze}
                className="btn-cta inline-flex items-center gap-2 px-6 py-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="gemini-analyze-btn"
              >
                <span>✦</span>
                حلّل بـ Gemini AI
              </motion.button>
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <div className="flex flex-col items-center gap-5">
                {/* Spinning Gemini logo */}
                <div className="relative w-16 h-16">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid rgba(57,255,20,${0.6 - i * 0.15})` }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">✦</div>
                </div>

                <div className="text-center">
                  <p className="font-display font-semibold text-white/80 text-sm">
                    Gemini يُحلّل المباراة{dots}
                  </p>
                  <p className="text-xs text-white/30 mt-1">جاري معالجة البيانات التاريخية والتكتيكية</p>
                </div>

                {/* Fake progress steps */}
                <div className="w-full max-w-xs space-y-2">
                  {[
                    'مراجعة سجلات المواجهات التاريخية',
                    'تحليل الفورم والإحصائيات',
                    'توليد التوقعات التكتيكية',
                  ].map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-2 text-xs text-white/30"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.4 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                        className="text-neon-green"
                      >
                        ◆
                      </motion.span>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center"
            >
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-red-400 text-sm font-display font-semibold mb-2">تعذّر الاتصال بـ Gemini</p>
              <p className="text-white/30 text-xs mb-1 max-w-sm mx-auto leading-relaxed">{error}</p>
              {error.includes('GEMINI_API_KEY') && (
                <div className="mt-4 glass-card p-3 text-right text-xs text-white/40 max-w-sm mx-auto"
                  style={{ border: '1px solid rgba(255,200,0,0.2)', background: 'rgba(255,200,0,0.04)' }}
                >
                  <p className="text-yellow-400 font-bold mb-1">⚙️ إضافة مفتاح Gemini API:</p>
                  <p>أنشئ ملف <code className="text-neon-green">.env.local</code> في مجلد المشروع وأضف:</p>
                  <code className="block mt-1 text-neon-green">GEMINI_API_KEY=مفتاحك_هنا</code>
                  <p className="mt-1 text-white/25">احصل على مفتاح مجاني من: aistudio.google.com</p>
                </div>
              )}
              <button
                onClick={analyze}
                className="mt-4 text-xs text-white/40 hover:text-white/70 transition-colors underline"
              >
                إعادة المحاولة
              </button>
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* AI badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
                <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.25)', color: '#39FF14' }}
                >
                  ✦ تحليل Gemini AI
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
              </div>

              {/* Analysis text */}
              {result.analysis && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-sm text-white/70 leading-relaxed">{result.analysis}</p>
                </div>
              )}

              {/* Prediction */}
              {result.prediction && (
                <motion.div
                  className="p-4 rounded-xl text-center"
                  style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.2)' }}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-[10px] text-white/40 mb-2 uppercase tracking-widest">التوقع المدعوم بالبيانات</p>
                  <p className="font-display font-black text-xl neon-gradient-text">{result.prediction}</p>
                </motion.div>
              )}

              {/* Grid: Key Player + Tactical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.keyPlayer && (
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)' }}>
                    <p className="text-[10px] text-white/35 mb-1">⚡ أبرز لاعب للمتابعة</p>
                    <p className="text-sm text-neon-blue font-display font-semibold leading-snug">{result.keyPlayer}</p>
                  </div>
                )}
                {result.tactical && (
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(191,90,242,0.05)', border: '1px solid rgba(191,90,242,0.15)' }}>
                    <p className="text-[10px] text-white/35 mb-1">🎯 الرؤية التكتيكية</p>
                    <p className="text-sm text-white/70 font-display leading-snug">{result.tactical}</p>
                  </div>
                )}
              </div>

              {/* Win Probabilities */}
              {result.probabilities && (
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] text-white/35 mb-2">📊 نسب الفوز المتوقعة</p>
                  <p className="text-sm text-white/60 font-display">{result.probabilities}</p>
                </div>
              )}

              {/* Re-analyze */}
              <div className="text-center pt-2">
                <button
                  onClick={analyze}
                  className="text-xs text-white/25 hover:text-neon-green transition-colors"
                >
                  ↺ إعادة التحليل
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
