'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 'landing' | 'video' | 'flash' | 'done';

export default function IntroAnimation() {
  const [stage, setStage] = useState<Stage>('landing');

  const triggerExit = useCallback(() => {
    // Step 1: show cinematic flash overlay
    setStage('flash');
    // Step 2: after flash completes, hide everything
    setTimeout(() => setStage('done'), 1000);
  }, []);

  // Callback ref: fires the moment the video element is added to the DOM
  const videoCallbackRef = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    node.muted = false;
    node.volume = 1;
    node.play().catch(() => {
      node.muted = true;
      node.play().catch(() => {});
    });
    // Auto-dismiss after 7 seconds
    setTimeout(() => triggerExit(), 7000);
  }, [triggerExit]);

  const handleEnter = () => setStage('video');
  const dismiss = () => triggerExit();

  if (stage === 'done') return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', overflow: 'hidden' }}>
      
      {/* ── GLOBAL STATIC LOGOS ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        <motion.img src="/yly-logo.png" alt="YLY"
          initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 }}
          style={{ position:'absolute', top:32, left:32, height:80, width:'auto', filter:'drop-shadow(0 0 16px rgba(255,255,255,0.4))' }} />
        <motion.img src="/egypt-logo.png" alt="Egypt"
          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 }}
          style={{ position:'absolute', top:32, right:32, height:80, width:'auto', filter:'drop-shadow(0 0 16px rgba(255,255,255,0.4))' }} />
      </div>

      {/* ── GLOBAL BOTTOM BAR (Logo + Text) ── */}
      <div style={{ position: 'absolute', bottom: 32, left: 0, width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <AnimatePresence>
            {stage === 'landing' && (
              <motion.p
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ delay:1.4, duration: 0.5 }}
                style={{ color:'rgba(255,255,255,0.4)', fontSize:14, fontFamily:'var(--font-cairo)', margin:0 }}
              >
                حلّل · توقّع · تنافس عالمياً
              </motion.p>
            )}
          </AnimatePresence>

          <motion.img src="/season8-logo.png" alt="Season 8"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.4, duration: 0.5 }}
            style={{ height: 60, width: 'auto', filter:'drop-shadow(0 0 16px rgba(255,255,255,0.4))' }} />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── STAGE 1: Landing ── */}
        {stage === 'landing' && (
          <motion.div key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'radial-gradient(ellipse at 50% 60%, #0a0020 0%, #000 100%)',
            }}
          >
            {/* Glow orbs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              <motion.div animate={{ scale: [1,1.2,1] }} transition={{ repeat: Infinity, duration: 4 }}
                style={{ position:'absolute', top:'-20%', left:'-10%', width:'50%', height:'50%', borderRadius:'50%', background:'#6B00FF', filter:'blur(120px)', opacity:0.35 }} />
              <motion.div animate={{ scale: [1,1.15,1] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                style={{ position:'absolute', bottom:'-10%', right:'-10%', width:'45%', height:'45%', borderRadius:'50%', background:'#FF0055', filter:'blur(100px)', opacity:0.25 }} />
              <motion.div animate={{ scale: [1,1.1,1] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }}
                style={{ position:'absolute', top:'30%', right:'5%', width:'30%', height:'40%', borderRadius:'50%', background:'#00F0FF', filter:'blur(90px)', opacity:0.15 }} />
            </div>


            {/* Center */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:28, zIndex:1, textAlign:'center' }}>
              <motion.p initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                style={{ color:'rgba(255,255,255,0.3)', fontSize:13, letterSpacing:'0.35em', fontFamily:'var(--font-cairo)', fontWeight:700, margin:0 }}>
                كأس العالم FIFA 2026
              </motion.p>
              
              <motion.h1 initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.7, type:'spring', stiffness:120 }}
                style={{ fontFamily:'var(--font-cairo)', fontWeight:900, fontSize:'clamp(2rem,6vw,4rem)', lineHeight:1.2, margin:0,
                  background:'linear-gradient(135deg, #39FF14 0%, #00F0FF 50%, #FF0055 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                منصة توقعات YLY
              </motion.h1>
              <motion.button onClick={handleEnter}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1 }}
                whileHover={{ scale:1.06 }} whileTap={{ scale:0.95 }}
                style={{
                  fontFamily:'var(--font-cairo)', fontWeight:900, fontSize:'clamp(1.1rem,3vw,1.45rem)',
                  padding:'18px 52px', borderRadius:99, cursor:'pointer', border:'none',
                  background:'linear-gradient(135deg, #39FF14 0%, #00F0FF 100%)', color:'#000',
                  position:'relative', boxShadow:'0 0 40px rgba(57,255,20,0.5), 0 0 80px rgba(0,240,255,0.25)',
                }}>
                <motion.span animate={{ scale:[1,1.5,1], opacity:[0.6,0,0.6] }} transition={{ repeat:Infinity, duration:2 }}
                  style={{ position:'absolute', inset:0, borderRadius:99, border:'2px solid #39FF14', pointerEvents:'none' }} />
                🐐 جاهز تكون ال GOAT؟
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── STAGE 2: Video ── */}
        {stage === 'video' && (
          <motion.div key="video"
            initial={{ opacity:0, scale:1.04 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.6, ease:[0.76,0,0.24,1] }}
            style={{ position:'absolute', inset:0 }}
            onClick={dismiss}
          >
            <video
              ref={videoCallbackRef}
              playsInline
              onEnded={dismiss}
              style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>

            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background:'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />


            <motion.button onClick={(e)=>{ e.stopPropagation(); dismiss(); }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
              style={{ position:'absolute', bottom:28, right:28, color:'rgba(255,255,255,0.4)', fontSize:12,
                fontFamily:'var(--font-cairo)', background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.12)', borderRadius:99, padding:'6px 16px', cursor:'pointer' }}>
              تخطي ▶
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 3: Cinematic Flash Transition ── */}
        {stage === 'flash' && (
          <motion.div key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.2, 0.6, 1], ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, #ffffff 0%, #39FF14 40%, #000 100%)',
            }}
          />
        )}

      </AnimatePresence>
    </div>
  );
}
