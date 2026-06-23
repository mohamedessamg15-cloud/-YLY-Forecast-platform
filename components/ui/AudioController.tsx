'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  startBgMusic,
  stopBgMusic,
  setBgVolume,
  isBgMusicPlaying,
  playClick,
} from '@/lib/audio';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioController() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const [started, setStarted] = useState(false);

  // Start music after first user interaction (browser policy)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!started) {
        setStarted(true);
        startBgMusic();
        setPlaying(true);
        document.removeEventListener('click', handleFirstInteraction);
      }
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    if (playing) {
      stopBgMusic();
      setPlaying(false);
    } else {
      startBgMusic();
      setPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setBgVolume(v);
  };

  return (
    <div
      className="fixed bottom-24 left-4 z-40 flex flex-col items-start gap-2"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {/* Volume slider */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className="glass-card px-3 py-2 flex items-center gap-2 mb-1"
          >
            <VolumeX size={10} className="text-white/30" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolume}
              className="w-20 accent-neon-green h-1 cursor-pointer"
            />
            <Volume2 size={10} className="text-white/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center border border-white/10 relative"
        title={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      >
        {/* Pulsing ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border border-neon-green/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
        <Music
          size={14}
          className={playing ? 'text-neon-green' : 'text-white/30'}
        />
      </motion.button>
    </div>
  );
}
