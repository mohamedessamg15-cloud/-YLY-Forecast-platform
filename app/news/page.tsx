'use client';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Newspaper, Zap, TrendingUp, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        if (data.success && data.articles) {
          setNews(data.articles);
        }
      } catch (err) {
        console.error('Failed to fetch news', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen wc26-bg pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <h1 className="font-display font-black text-4xl sm:text-5xl neon-gradient-text mb-4">
              أخبار البطولة
            </h1>
            <p className="text-white/50 max-w-lg">
              تغطية حية ومباشرة لأحدث مجريات كأس العالم، تحليلات تكتيكية، وتصريحات حصرية.
            </p>
          </div>
          
          <div className="glass-card p-4 flex items-center gap-4 bg-neon-green/10 border-neon-green/30">
            <div className="bg-neon-green/20 p-3 rounded-full text-neon-green">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">تحديثات الذكاء الاصطناعي</span>
              <span className="text-xs text-white/50">تعمل في الخلفية لجلب المستجدات</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-neon-green">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="text-white/70">جاري جلب أحدث الأخبار الحية بواسطة نظام اتحاد شباب يدير شباب...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="glass-card p-12 text-center text-white/50">
                عذراً، لا يوجد أخبار متاحة حالياً.
              </div>
            ) : (
              news.slice(0, 5).map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedNews(article)}
                  className="glass-card overflow-hidden group cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="relative h-48 sm:h-auto sm:w-1/3 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold px-2 py-1 bg-neon-green text-black rounded-md">
                          {article.tag}
                        </span>
                        <span className="text-xs text-white/40">{article.time} - {article.source}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl mb-3 group-hover:text-neon-green transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-neon-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        اقرأ المزيد <span className="text-lg">←</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>

          {/* Sidebar Modules */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 border-t-4 border-neon-green"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="font-display font-bold text-lg">الأكثر قراءة</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {news.slice(5).map((article, idx) => (
                  <li key={article.id} className={idx !== news.slice(5).length - 1 ? "border-b border-white/10 pb-4" : ""}>
                    <button 
                      onClick={() => setSelectedNews(article)}
                      className="text-right w-full hover:text-neon-green transition-colors text-sm font-medium leading-relaxed block"
                    >
                      {article.title}
                    </button>
                  </li>
                ))}
                {news.length <= 5 && (
                  <li className="text-white/50 text-sm">جاري تحديث القائمة...</li>
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
              style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.1), transparent)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="font-display font-bold text-lg">رأي الخبراء</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 italic">
                "البطولة في أمريكا الشمالية ستكون الأسرع رتماً في التاريخ بفضل تجهيزات الملاعب. من يملك الدكة الأقوى سيفوز بالكأس."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20" />
                <div className="text-xs">
                  <span className="block font-bold">محلل الذكاء الاصطناعي</span>
                  <span className="text-white/40">Gemini Sports</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedNews(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-64 w-full">
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 left-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              >
                ✕
              </button>
              <Image 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-4 right-6 left-6">
                <span className="text-xs font-bold px-2 py-1 bg-neon-green text-black rounded-md mb-2 inline-block">
                  {selectedNews.tag}
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">{selectedNews.title}</h2>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <p className="text-white/50 text-sm flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                  نُشر {selectedNews.time} عبر {selectedNews.source}
                </p>
                {selectedNews.link && selectedNews.link !== '#' && (
                  <a 
                    href={selectedNews.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold px-3 py-2 bg-white/10 hover:bg-neon-green hover:text-black rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> قراءة من المصدر
                  </a>
                )}
              </div>
              <p className="text-white/80 leading-relaxed text-lg mb-4 font-semibold">
                {selectedNews.summary}
              </p>
              <div className="h-px w-full bg-white/10 my-6"></div>
              <p className="text-white/70 leading-relaxed">
                {selectedNews.fullText}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
