'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        let errStr = 'فشل الاتصال بالخادم';
        try {
          const errData = await response.json();
          if (errData.error) errStr = errData.error;
        } catch (e) {}
        throw new Error(errStr);
      }

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { id: Date.now().toString() + '1', role: 'assistant', content: data.text }]);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-wc-magenta text-white shadow-lg flex items-center justify-center z-50 hover:bg-wc-purple transition-colors overflow-hidden border-2 border-white/20 p-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ boxShadow: '0 4px 20px rgba(255, 0, 85, 0.4)' }}
      >
        {isOpen ? <X size={24} /> : (
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img src="/yly-logo.png" alt="YLY" className="w-full h-full object-cover" />
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-2 left-2 sm:left-auto sm:right-6 sm:w-[350px] h-[500px] z-50 glass-card rounded-2xl flex flex-col border border-white/10 shadow-2xl overflow-hidden bg-bg-secondary/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-black/40 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20 overflow-hidden relative">
                <img src="/yly-logo.png" alt="YLY Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm">مساعد YLY الذكي</h3>
                <p className="text-[10px] text-white/50">خبير تكتيكات واستراتيجيات كأس العالم</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-white/40 text-sm mt-10">
                  <span className="text-4xl block mb-2">⚽</span>
                  كيف يمكنني مساعدتك اليوم؟ اسألني عن تشكيلات الفرق، التكتيكات، أو توقعات المباريات!
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center overflow-hidden border ${
                    m.role === 'user' ? 'bg-wc-purple/20 text-wc-purple border-transparent' : 'bg-black border-white/20'
                  }`}>
                    {m.role === 'user' ? <User size={14} /> : <img src="/yly-logo.png" alt="YLY" className="w-full h-full object-cover" />}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                      m.role === 'user'
                        ? 'bg-wc-purple text-white rounded-tl-none'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-tr-none'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center overflow-hidden border bg-black border-white/20">
                    <img src="/yly-logo.png" alt="YLY" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tr-none flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-wc-cyan rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-wc-cyan rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-wc-cyan rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-red-400 text-xs mt-2 bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  ⚠️ عذراً، حدث خطأ: {error || 'فشل الاتصال'}
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="اسألني عن المباراة..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-wc-cyan/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading || !input?.trim()}
                  className="absolute left-1.5 top-1.5 bottom-1.5 w-10 bg-wc-cyan text-black rounded-full flex items-center justify-center hover:bg-white disabled:opacity-50 transition-colors cursor-pointer z-10"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
