'use client';

import { motion } from 'framer-motion';
import type { Player } from '@/lib/data/types';
import Image from 'next/image';

interface PlayerGridProps {
  players: Player[];
  teamLabel: string;
  flag: string;
  selectedPlayerId: string | null;
  onSelect: (playerId: string) => void;
  color: 'green' | 'blue';
}

const positionOrder = { GK: 0, DEF: 1, MID: 2, FWD: 3 };

export default function PlayerGrid({ players, teamLabel, flag, selectedPlayerId, onSelect, color }: PlayerGridProps) {
  const sorted = [...players].sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
  const isGreen = color === 'green';
  const neon = isGreen ? '#39FF14' : '#00F0FF';

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{flag}</span>
        <span className="font-display font-600 text-sm tracking-widest text-white/60 uppercase">{teamLabel}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {sorted.map((player, i) => {
          const isSelected = selectedPlayerId === player.id;
          return (
            <motion.button
              key={player.id}
              onClick={() => onSelect(player.id)}
              className={`player-card p-2 flex flex-col items-center gap-1.5 text-center ${isSelected ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.95 }}
              id={`player-${player.id}`}
              aria-label={`Select ${player.name} as first goalscorer`}
              style={isSelected ? {
                borderColor: neon,
                background: `rgba(${isGreen ? '57,255,20' : '0,240,255'}, 0.1)`,
                boxShadow: `0 0 16px rgba(${isGreen ? '57,255,20' : '0,240,255'}, 0.35)`,
              } : {}}
            >
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden"
                style={isSelected ? { outline: `2px solid ${neon}`, boxShadow: `0 0 8px ${neon}` } : {}}
              >
                <Image
                  src={player.avatarUrl}
                  alt={player.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  unoptimized
                />
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${neon}`, boxShadow: `0 0 8px ${neon}` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </div>

              {/* Name */}
              <div className="text-[10px] leading-tight"
                style={{ color: isSelected ? neon : 'rgba(255,255,255,0.55)' }}
              >
                {player.shortName}
              </div>

              {/* Position badge */}
              <span className="text-[8px] px-1.5 py-0.5 rounded uppercase font-display font-600"
                style={{
                  background: `rgba(${player.position === 'FWD' ? '255,100,0' : player.position === 'MID' ? '0,120,255' : player.position === 'DEF' ? '0,200,100' : '150,0,255'}, 0.15)`,
                  color: `rgba(${player.position === 'FWD' ? '255,100,0' : player.position === 'MID' ? '0,150,255' : player.position === 'DEF' ? '0,220,120' : '180,0,255'}, 0.9)`,
                }}
              >
                {player.position}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
