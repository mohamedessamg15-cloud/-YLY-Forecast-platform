/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#000000',
          secondary: '#111111',
          card: '#1A1A1A',
          glass: 'rgba(26,26,26,0.8)',
        },
        wc: {
          purple: '#6B00FF',
          magenta: '#FF0055',
          cyan: '#00F0FF',
          green: '#39FF14',
          yellow: '#FFDF00'
        },
        team: {
          win: '#39FF14',
          loss: '#FF0055',
          draw: '#6B00FF',
        },
      },
      fontFamily: {
        display: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        body: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #39FF14 0%, #00F0FF 100%)',
        'dark-gradient': 'linear-gradient(180deg, #070B14 0%, #0D1220 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(13,18,32,0.9) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #39FF14 0%, #00F0FF 100%)',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.1)',
        'neon-blue': '0 0 20px rgba(0,240,255,0.4), 0 0 60px rgba(0,240,255,0.1)',
        'neon-green-sm': '0 0 8px rgba(57,255,20,0.6)',
        'neon-blue-sm': '0 0 8px rgba(0,240,255,0.6)',
        'card': '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'count-up': 'countUp 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14' },
          to: { textShadow: '0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 60px #39FF14' },
        },
        countUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          from: { transform: 'translateY(40px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
