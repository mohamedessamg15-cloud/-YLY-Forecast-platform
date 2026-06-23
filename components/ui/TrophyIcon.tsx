import { motion } from 'framer-motion';

export default function TrophyIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 360"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="30%" stopColor="#F5B700" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>
        
        <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="50%" stopColor="#F5B700" />
          <stop offset="100%" stopColor="#8A630B" />
        </linearGradient>

        <linearGradient id="greenBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B4D2C" />
          <stop offset="50%" stopColor="#1B7A4B" />
          <stop offset="100%" stopColor="#0B4D2C" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base */}
      <path
        d="M 80 320 L 160 320 C 165 320 170 325 170 330 L 175 350 L 65 350 L 70 330 C 70 325 75 320 80 320 Z"
        fill="url(#goldGradient)"
      />
      
      {/* Green Malachite Rings */}
      <rect x="72" y="328" width="96" height="6" fill="url(#greenBase)" />
      <rect x="68" y="340" width="104" height="6" fill="url(#greenBase)" />

      {/* Stem / Body */}
      <path
        d="M 90 320 C 90 270 70 200 70 160 C 70 120 100 80 120 80 C 140 80 170 120 170 160 C 170 200 150 270 150 320 Z"
        fill="url(#goldHighlight)"
        filter="url(#glow)"
      />

      {/* Spiral details on the body */}
      <path
        d="M 90 320 C 110 250 80 180 80 160 C 80 130 110 100 120 100"
        fill="none"
        stroke="#FFF1B8"
        strokeWidth="4"
        opacity="0.5"
      />
      <path
        d="M 150 320 C 130 250 160 180 160 160 C 160 130 130 100 120 100"
        fill="none"
        stroke="#AA7C11"
        strokeWidth="6"
        opacity="0.5"
      />

      {/* Globe Top */}
      <circle cx="120" cy="80" r="50" fill="url(#goldGradient)" filter="url(#glow)" />
      
      {/* Globe Continents (Abstract) */}
      <path
        d="M 90 50 C 100 40 120 30 130 40 C 140 50 130 70 140 80 C 150 90 140 110 120 110 C 100 110 90 90 80 80 C 70 70 80 60 90 50 Z"
        fill="#FFE066"
        opacity="0.7"
      />
      <path
        d="M 140 50 C 150 55 160 65 155 80 C 150 95 160 105 145 115"
        fill="none"
        stroke="#FFE066"
        strokeWidth="6"
        opacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
