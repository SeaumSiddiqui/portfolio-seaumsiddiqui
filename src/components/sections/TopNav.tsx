import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSanityProfile } from '../../hooks/useSanity';

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useSanityProfile();
  const name = profile?.name || 'Seaum Siddiqui';

  const isHomePage = location.pathname === '/';
  const isInfoPage = location.pathname === '/info';
  const isWorkPage = location.pathname.startsWith('/work');
  const isDashboard =
    location.pathname === '/secret-dashboard' ||
    location.pathname === '/console' ||
    location.pathname === '/telemetry';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      const monthStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        month: 'short',
      });
      const day = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        day: 'numeric',
      });
      setCurrentTime(`${monthStr} ${day}, ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Secret keyboard shortcut: Ctrl+Shift+D or Cmd+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        navigate(isDashboard ? '/' : '/secret-dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isDashboard]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-11 bg-brand-bg z-50 flex justify-between lg:grid lg:grid-cols-[1fr_1.65fr_1fr] ${
          isMenuOpen ? 'border-b-0 lg:border-b lg:border-brand-border' : 'border-b border-brand-border'
        }`}
      >
        <div className="px-[15px] flex items-center text-brand-text min-w-0 font-inter font-bold text-[15px] leading-normal tracking-tight">
          <span
            onDoubleClick={() => navigate('/secret-dashboard')}
            className="text-brand-text mr-1.5 text-[15px] leading-none translate-y-[-1px] cursor-pointer select-none"
            title="Seaum Siddiqui (Double-click for Console)"
          >
            ◆
          </span>
          <Link to="/" className="truncate hover:opacity-80 transition-opacity">
            {name}
          </Link>
        </div>
        <div
          className="flex lg:hidden items-center px-[15px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-brand-text cursor-pointer origin-center"
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </motion.svg>
        </div>
        <div className="hidden lg:flex items-center px-[15px] text-brand-muted min-w-0 font-inter font-semibold text-[14px] leading-[14px]">
          {isDashboard ? (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[12px] font-semibold tracking-wider uppercase text-brand-text">
                Site Telemetry Console
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-brand-surface border border-brand-border text-brand-text rounded-[2px]">
                RESTRICTED
              </span>
            </div>
          ) : (
            <>
              <Link
                to="/"
                className={`shrink-0 cursor-pointer transition-opacity ${
                  isHomePage
                    ? 'text-brand-text font-bold opacity-100'
                    : 'text-brand-muted opacity-75 hover:opacity-100 hover:text-brand-text'
                }`}
              >
                Home
              </Link>
              <span className="text-brand-muted opacity-75 shrink-0">,&nbsp;</span>
              <span className="truncate">
                <Link
                  to="/info"
                  className={`cursor-pointer transition-opacity ${
                    isInfoPage
                      ? 'text-brand-text font-bold opacity-100'
                      : 'text-brand-muted opacity-75 hover:opacity-100 hover:text-brand-text'
                  }`}
                >
                  Info
                </Link>
                <span className="text-brand-muted opacity-75">, </span>
                <Link
                  to="/work"
                  className={`cursor-pointer transition-opacity ${
                    isWorkPage
                      ? 'text-brand-text font-bold opacity-100'
                      : 'text-brand-muted opacity-75 hover:opacity-100 hover:text-brand-text'
                  }`}
                >
                  Work
                </Link>
              </span>
            </>
          )}
        </div>
        <div className="hidden lg:flex items-center justify-between pl-[30px] pr-[15px] min-w-0 gap-4">
          {/* Live Date Time with Geist 500 font */}
          <span className="text-[#333333] font-geist font-medium text-[14px] leading-[20px] truncate opacity-90">
            {currentTime || '...'}
          </span>
          {isDashboard ? (
            <Link
              to="/"
              className="text-brand-text cursor-pointer shrink-0 font-inter font-bold text-[13px] leading-normal tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5 border border-brand-border px-2.5 py-1 rounded-[2px] bg-brand-surface/60"
            >
              <span>Exit Console</span>
              <span className="text-[11px] font-mono">✕</span>
            </Link>
          ) : (
            <span className="text-brand-text cursor-pointer shrink-0 font-inter font-bold text-[14px] leading-normal tracking-tight hover:opacity-70 transition-opacity">
              Dhaka, Bangladesh
            </span>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-11 left-0 right-0 z-40 bg-brand-bg border-b border-brand-border lg:hidden overflow-hidden origin-top"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col px-[15px] pt-6 pb-6 gap-5"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
                }}
                className="font-inter font-semibold text-[14px] leading-[14px]"
              >
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`cursor-pointer transition-opacity ${
                    isHomePage
                      ? 'text-brand-text font-bold opacity-100'
                      : 'text-brand-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  Home
                </Link>
                <span className="text-brand-muted opacity-75">, </span>
                <Link
                  to="/info"
                  onClick={() => setIsMenuOpen(false)}
                  className={`cursor-pointer transition-opacity ${
                    isInfoPage
                      ? 'text-brand-text font-bold opacity-100'
                      : 'text-brand-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  Info
                </Link>
                <span className="text-brand-muted opacity-75">, </span>
                <Link
                  to="/work"
                  onClick={() => setIsMenuOpen(false)}
                  className={`cursor-pointer transition-opacity ${
                    isWorkPage
                      ? 'text-brand-text font-bold opacity-100'
                      : 'text-brand-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  Work
                </Link>
              </motion.div>

              {isDashboard ? (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
                  }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-inter font-bold text-[14px] text-brand-text flex items-center justify-between py-2 border-t border-brand-border"
                  >
                    <span>Exit Telemetry Console</span>
                    <span className="text-[12px] font-mono">✕</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
                  }}
                  className="font-inter font-bold text-[14px] text-brand-text cursor-pointer hover:opacity-70"
                >
                  Dhaka, Bangladesh
                </motion.div>
              )}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
                }}
                className="text-[#333333] font-geist font-medium text-[14px] opacity-90 mt-1"
              >
                {currentTime || '...'}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
