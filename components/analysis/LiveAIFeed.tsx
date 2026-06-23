'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveAIFeed({ teamA, teamB }: { teamA: string; teamB: string }) {
  const [news, setNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveNews() {
      try {
        const response = await fetch('/api/live-intel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ match: `${teamA} ضد ${teamB}` }),
        });
        const data = await response.json();
        if (data.news) {
          setNews(data.news);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveNews();
  }, [teamA, teamB]);

  if (loading) {
    return (
      <div className="w-full p-4 glass-card-wc rounded-2xl mb-8 flex items-center justify-between border-wc-cyan/20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-wc-cyan animate-ping" />
          <span className="text-sm font-display text-white/50">الذكاء الاصطناعي يجلب أحدث البيانات الحية...</span>
        </div>
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-5 glass-card-wc rounded-2xl mb-8 border-wc-magenta/30 shadow-[0_0_20px_rgba(255,0,85,0.1)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-wc-magenta animate-pulse shadow-[0_0_10px_#FF0055]" />
        <h3 className="font-display font-bold text-wc-magenta">مستجدات حية (مدعومة بـ AI)</h3>
      </div>
      <div className="space-y-3">
        {news.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5"
          >
            <span className="text-xl">⚡</span>
            <p className="text-sm text-white/80 leading-relaxed">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
