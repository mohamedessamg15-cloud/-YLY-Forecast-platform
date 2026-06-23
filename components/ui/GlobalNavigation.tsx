'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Home, Users, CalendarDays, Newspaper } from 'lucide-react';

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'الرئيسية / التوقع', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'المنتخبات المشاركة', href: '/teams', icon: <Users className="w-5 h-5" /> },
    { name: 'جدول المباريات', href: '/schedule', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'أخبار المباريات', href: '/news', icon: <Newspaper className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Top NavBar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0 overflow-hidden"
        style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none flex-shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="relative w-7 h-9 sm:w-8 sm:h-10 drop-shadow-lg flex-shrink-0">
                <Image
                  src="/trophy-real.png"
                  alt="World Cup Trophy"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-wide neon-gradient-text hidden sm:block truncate">
                كأس العالم 2026
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="text-[10px] sm:text-xs font-display font-semibold text-white/30 uppercase tracking-wider hidden xs:block">
              منصة التوقعات
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 sm:w-80 glass-card border-y-0 border-r-0 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
              style={{ background: 'linear-gradient(to bottom, rgba(17,17,34,0.95), rgba(10,10,20,0.98))' }}
            >
              <div className="h-14 flex items-center justify-between px-6 border-b border-white/10">
                <span className="font-display font-bold text-lg neon-gradient-text">
                  القائمة الرئيسية
                </span>
                <button 
                  onClick={toggleSidebar}
                  className="p-2 -mr-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={toggleSidebar}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all group"
                    >
                      <span className="text-neon-green/70 group-hover:text-neon-green transition-colors">
                        {link.icon}
                      </span>
                      <span className="font-body font-medium text-sm">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-white/10">
                <p className="text-xs text-white/40 text-center font-display uppercase tracking-widest">
                  YLY Project
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
