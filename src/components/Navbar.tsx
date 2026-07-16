import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ArrowUpRight, Menu, X, Palette, Sun, Moon, Check, ChevronDown, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LogoBlackTransparent from '../assets/Logo_Black_Transparent.png';
import LogoWhiteTransparent from '../assets/Logo_White_Transparent.png';
import { navigateTo } from '../lib/router';

const THEME_PRESETS = [
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
  { id: 'violet', name: 'Violet', color: '#a855f7' },
  { id: 'sky', name: 'Sky', color: '#0ea5e9' },
  { id: 'fuchsia', name: 'Fuchsia', color: '#d946ef' },
  { id: 'crimson', name: 'Crimson', color: '#dc2626' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('wozku-theme') || 'emerald';
  });
  const [customHex, setCustomHex] = useState(() => localStorage.getItem('wozku-custom-hex') || '#10b981');
  const isDark = false;
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      return;
    }
    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-rose', 'theme-amber', 'theme-violet', 'theme-sky', 'theme-fuchsia', 'theme-crimson');
    if (activeTheme === 'custom') {
      if (/^#[0-9A-F]{6}$/i.test(customHex)) {
        import('../lib/designSystem').then(({ applyCustomTheme }) => {
          applyCustomTheme(customHex);
        });
      }
    } else if (activeTheme !== 'indigo') {
      import('../lib/designSystem').then(({ clearCustomTheme }) => {
        clearCustomTheme();
      });
      root.classList.add(`theme-${activeTheme}`);
    } else {
      import('../lib/designSystem').then(({ clearCustomTheme }) => {
        clearCustomTheme();
      });
    }
    if (/^#[0-9A-F]{6}$/i.test(customHex)) localStorage.setItem('wozku-custom-hex', customHex);
    localStorage.setItem('wozku-theme', activeTheme);
  }, [activeTheme, customHex]);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const root = document.documentElement;
    root.classList.remove('dark');
    if (activeTheme === 'custom' && /^#[0-9A-F]{6}$/i.test(customHex)) {
      import('../lib/designSystem').then(({ applyCustomTheme }) => {
        applyCustomTheme(customHex);
      });
    }
    localStorage.setItem('wozku-dark', 'false');
  }, [activeTheme, customHex]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Close theme dropdown on outside click or Escape key
  useEffect(() => {
    if (!isThemeOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsThemeOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemeOpen]);


  // Active-state helpers
  const isHome        = currentPath === '/';
  const isWhyWozku    = currentPath.startsWith('/why-wozku');
  const isSolutions   = currentPath.startsWith('/product');
  const isInsights    = currentPath.startsWith('/insights');
  const isPricing     = currentPath.startsWith('/pricing');

  const navBase = 'px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--indigo-500)]';
  const navActive   = 'font-bold';
  const navActiveStyle = { color: 'var(--indigo-600)' };
  const navInactive = 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50';

  const scrollToSection = (id: string) => {
    const path = window.location.pathname;
    if (path !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (window.location.pathname !== '/') {
      navigateTo('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const selectCustomTheme = (hex: string) => {
    setCustomHex(hex.toUpperCase());
    setActiveTheme('custom');
  };

  const selectPresetTheme = (id: string, hex: string) => {
    setCustomHex(hex.toUpperCase());
    setActiveTheme(id);
  };

  const handleCustomHexChange = (value: string) => {
    const normalized = value.trim().toUpperCase();
    setCustomHex(normalized);
    if (/^#[0-9A-F]{6}$/.test(normalized)) setActiveTheme('custom');
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b border-neutral-200/50 bg-white/75 backdrop-blur-md py-3 shadow-xs' 
        : 'border-b border-transparent bg-white/40 backdrop-blur-xs py-4'
    }`}>
      {/* Per-page gradient glow band */}
      <div
        className="absolute left-0 right-0 top-full h-36 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 0%, color-mix(in srgb, var(--indigo-500) 15%, transparent), color-mix(in srgb, var(--indigo-500) 5%, transparent) 55%, transparent 80%)',
          transition: 'background 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.02] duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg relative z-10"
        >
          <img src={isDark ? LogoWhiteTransparent : LogoBlackTransparent} width={108} height={24} className="h-6 w-auto object-contain" alt="Wozku Logo" />
        </button>

        {/* Desktop Navigation links - Premium Minimalist Typography (Centered) */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={handleLogoClick}
            className={`${navBase} ${isHome ? navActive : navInactive}`}
            style={isHome ? navActiveStyle : undefined}
          >
            Home
          </button>

          <button
            onClick={() => { navigateTo('/why-wozku'); setActiveDropdown(null); }}
            className={`${navBase} ${isWhyWozku ? navActive : navInactive}`}
            style={isWhyWozku ? navActiveStyle : undefined}
          >
            Why Wozku
          </button>

          {/* Solutions Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`${navBase} flex items-center gap-1 ${
                isSolutions || activeDropdown === 'solutions' ? navActive : navInactive
              }`}
              style={isSolutions || activeDropdown === 'solutions' ? navActiveStyle : undefined}
            >
              Solutions
              <svg 
                viewBox="0 0 24 24" 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeDropdown === 'solutions' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-[40%] top-full pt-4 z-50"
                >
                  <div className="w-[780px] bg-white border border-neutral-200 rounded-3xl p-6 shadow-2xl flex gap-8 text-left">
                    {/* Product Column */}
                    <div className="flex-1 space-y-4">
                      <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400">Product</h4>
                      <ul className="space-y-1">
                        {[
                          { label: 'Teams & Employees', path: '/product/teams-employees', desc: 'Help your team share company news and jobs' },
                          { label: 'Events & Communities', path: '/product/events-communities', desc: 'Let attendees and fans recommend your brand' }
                        ].map((item) => (
                          <li key={item.label}>
                            <button 
                              onClick={() => {
                                navigateTo(item.path);
                                setActiveDropdown(null);
                              }}
                              className={`block group text-left cursor-pointer focus:outline-hidden rounded-xl px-3 py-1.5 transition-all ${currentPath === item.path ? 'bg-indigo-500/10' : 'hover:bg-neutral-100/80'}`}
                            >
                              <span className={`text-xs font-bold transition-colors block ${currentPath === item.path ? 'text-indigo-600' : 'text-neutral-900 group-hover:text-indigo-600'}`}>{item.label}</span>
                              <span className="text-[10px] text-neutral-400 block mt-0.5">{item.desc}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* About Column */}
                    <div className="flex-1 space-y-4">
                      <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400">About</h4>
                      <ul className="space-y-1">
                        {[
                          { label: 'Core Team & Offices', path: '/about/core-team', desc: 'Meet our team and find our locations' },
                          { label: 'Security & Safety', path: '/about/security-compliance', desc: 'Enterprise-grade protection policies' }
                        ].map((item) => (
                          <li key={item.label}>
                            <button 
                              onClick={() => {
                                navigateTo(item.path);
                                setActiveDropdown(null);
                              }}
                              className={`block group text-left cursor-pointer focus:outline-hidden rounded-xl px-3 py-1.5 transition-all ${currentPath === item.path ? 'bg-indigo-500/10' : 'hover:bg-neutral-100/80'}`}
                            >
                              <span className={`text-xs font-bold transition-colors block ${currentPath === item.path ? 'text-indigo-600' : 'text-neutral-900 group-hover:text-indigo-600'}`}>{item.label}</span>
                              <span className="text-[10px] text-neutral-400 block mt-0.5">{item.desc}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="flex-1 space-y-4">
                      <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400">Resources</h4>
                      <ul className="space-y-1">
                        {[
                          { label: 'Ecosystem Integrations', path: '/resources/ecosystem-integrations', desc: 'Connect Slack, Salesforce, HubSpot' },
                          { label: 'Frequently Asked Questions', path: '/resources/faq', desc: 'Answers to common questions' },
                          { label: 'Global Reach Map', path: '/resources/global-reach-map', desc: 'See shares spread across the map' },
                          { label: 'ROI Calculator', path: '/resources/roi-calculator', desc: 'Calculate how much you can save' }
                        ].map((item) => (
                          <li key={item.label}>
                            <button 
                              onClick={() => {
                                navigateTo(item.path);
                                setActiveDropdown(null);
                              }}
                              className={`block group text-left cursor-pointer focus:outline-hidden rounded-xl px-3 py-1.5 transition-all ${currentPath === item.path ? 'bg-indigo-500/10' : 'hover:bg-neutral-100/80'}`}
                            >
                              <span className={`text-xs font-bold transition-colors block ${currentPath === item.path ? 'text-indigo-600' : 'text-neutral-900 group-hover:text-indigo-600'}`}>{item.label}</span>
                              <span className="text-[10px] text-neutral-400 block mt-0.5">{item.desc}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Highlight Card */}
                    <div 
                      onClick={() => {
                        navigateTo('/resources/roi-calculator');
                        setActiveDropdown(null);
                      }}
                      className="w-[230px] rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-fixed-white p-5 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-md cursor-pointer hover:opacity-95 active:scale-[0.99] transition-all group"
                    >
                      {/* Background subtle lines waves */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-fixed-white fill-none stroke-[0.8]">
                          <path d="M0 20 Q 25 40, 50 20 T 100 20" />
                          <path d="M0 40 Q 25 60, 50 40 T 100 40" />
                          <path d="M0 60 Q 25 80, 50 60 T 100 60" />
                          <path d="M0 80 Q 25 100, 50 80 T 100 80" />
                        </svg>
                      </div>
                      
                      <div className="space-y-2 relative z-10">
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-fixed-white/20 text-fixed-white px-2 py-0.5 rounded-full">LATEST ARRIVAL</span>
                        <h5 className="text-sm font-bold leading-tight mt-2 text-fixed-white">ROI Calculator</h5>
                        <p className="text-[10px] text-fixed-white/85 leading-relaxed">
                          Calculate your organization's potential equivalent advertising value and advocate pipeline multiplier.
                        </p>
                      </div>

                      <div className="mt-4 text-xs font-bold text-fixed-white flex items-center gap-1 transition-colors relative z-10">
                        Calculate ROI
                        <span className="transition-transform duration-300 group-hover:translate-x-1">»</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Insights Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('insights')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`${navBase} flex items-center gap-1 ${
                isInsights || activeDropdown === 'insights' ? navActive : navInactive
              }`}
              style={isInsights || activeDropdown === 'insights' ? navActiveStyle : undefined}
            >
              Insights
              <svg 
                viewBox="0 0 24 24" 
                className={`w-3.5 h-3.5 transition-transform duration-350 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {activeDropdown === 'insights' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                >
                  <div className="w-[260px] bg-white border border-neutral-200 rounded-3xl p-4 shadow-2xl space-y-1 text-left">
                    {[
                      { label: 'Case Studies', path: '/insights/case-studies', desc: 'Real-world customer success metrics' },
                      { label: 'Blog & Articles', path: '/insights/blog', desc: 'Advocacy strategy and industry news' }
                    ].map((item) => (
                      <button 
                        key={item.label}
                        onClick={() => {
                          navigateTo(item.path);
                          setActiveDropdown(null);
                        }}
                        className="w-full block group text-left cursor-pointer focus:outline-hidden rounded-xl px-3 py-2 hover:bg-neutral-100/80 transition-all"
                      >
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors block">{item.label}</span>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              navigateTo('/pricing');
              setActiveDropdown(null);
            }}
            className={`${navBase} ${isPricing ? navActive : navInactive}`}
            style={isPricing ? navActiveStyle : undefined}
          >
            Pricing
          </button>
        </nav>

        {/* Action CTAs - Sleek pill style & microinteractions */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div className="hidden lg:flex items-center gap-3">
            {/* Dynamic Theme Settings Dropdown */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white/80 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 text-xs font-semibold cursor-pointer select-none transition-all shadow-3xs"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Theme</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isThemeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isThemeOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xl z-50 space-y-4 text-left">
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider block uppercase">Theme Colors</span>
                      <div className="grid grid-cols-4 gap-2">
                        {THEME_PRESETS.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => selectPresetTheme(t.id, t.color)}
                            title={t.name}
                            className={`h-7 w-7 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-3xs hover:shadow-2xs ${
                              activeTheme === t.id ? 'ring-2 ring-neutral-450 ring-offset-2 scale-105' : 'opacity-85'
                            }`}
                            style={{ backgroundColor: t.color }}
                          >
                            {activeTheme === t.id && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-neutral-200" />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider uppercase">Custom</span>
                        {activeTheme === 'custom' && <span className="text-[9px] font-bold text-indigo-600">ACTIVE</span>}
                      </div>
                      <div className={`flex items-center gap-2 rounded-xl border p-2 transition-colors ${activeTheme === 'custom' ? 'border-indigo-300 bg-indigo-50/50' : 'border-neutral-200 bg-neutral-50'}`}>
                        <label className="relative h-8 w-8 shrink-0 cursor-pointer rounded-full border-2 border-white shadow-sm ring-1 ring-neutral-300" style={{ backgroundColor: /^#[0-9A-F]{6}$/i.test(customHex) ? customHex : '#6366f1' }}>
                          <input aria-label="Custom theme color" type="color" value={/^#[0-9A-F]{6}$/i.test(customHex) ? customHex : '#6366f1'} onChange={(e) => selectCustomTheme(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                        </label>
                        <input aria-label="Custom theme hex code" value={customHex} onChange={(e) => handleCustomHexChange(e.target.value)} onFocus={() => setActiveTheme('custom')} maxLength={7} spellCheck={false} className="min-w-0 flex-1 bg-transparent font-mono text-xs font-semibold uppercase text-neutral-800 outline-none placeholder:text-neutral-400" placeholder="#6366F1" />
                      </div>
                      <p className="text-[9px] leading-4 text-neutral-400">Choose a color or enter a six-digit HEX value to preview it across the site.</p>
                    </div>

                    <div className="h-px bg-neutral-200" />
                    <button 
                      onClick={() => {
                        import('../lib/designSystem').then(({ downloadThemeTokens }) => {
                          downloadThemeTokens(activeTheme, isDark);
                        });
                      }} 
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-[10px] font-bold text-indigo-700 transition-colors hover:bg-indigo-100 cursor-pointer"
                    >
                      <Download className="h-3 w-3" />
                      Export .JSON
                    </button>

                  </div>
              )}
            </div>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-auth-modal'));
                setIsMenuOpen(false);
              }} 
              className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 px-3 py-1.5 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
            >
              Sign In
            </button>
            
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-demo-modal'));
                setIsMenuOpen(false);
              }}
              className="group relative inline-flex items-center gap-1.5 bg-neutral-950 dark:bg-[#141418] hover:bg-neutral-900 dark:hover:bg-[#161920] text-white dark:text-fixed-white px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden border border-transparent dark:border-fixed-white/12 hover:dark:border-indigo-500/45 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span className="relative z-10">Book a Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-fixed-light group-hover:text-indigo-300" />
              
              {/* Ambient hover glow line inside the button */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-indigo-500/12 via-indigo-500/8 to-transparent transition-transform duration-500" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors lg:hidden cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Slide-out Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-white border-l border-neutral-200 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <button 
                    onClick={handleLogoClick}
                    className="flex items-center cursor-pointer"
                  >
                    <img src={LogoBlackTransparent} className="h-5 w-auto object-contain" alt="Wozku Logo" />
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links List */}
                <nav className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider uppercase px-4 block">Product & Company</span>
                  {[
                    { label: 'Home', action: () => { handleLogoClick(); } },
                    { label: 'Why Wozku?', action: () => { navigateTo('/why-wozku'); setIsMenuOpen(false); } },
                    { label: 'For Teams & Employees', action: () => { navigateTo('/product/teams-employees'); setIsMenuOpen(false); } },
                    { label: 'For Events & Communities', action: () => { navigateTo('/product/events-communities'); setIsMenuOpen(false); } },
                    { label: 'Core Team & Offices', action: () => { navigateTo('/about/core-team'); setIsMenuOpen(false); } },
                    { label: 'Security & Safety', action: () => { navigateTo('/about/security-compliance'); setIsMenuOpen(false); } },
                    { label: 'Pricing', action: () => { navigateTo('/pricing'); setIsMenuOpen(false); } }
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={link.action}
                      className="text-left py-2 px-4 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}

                  <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider uppercase px-4 pt-3 block">Insights</span>
                  {[
                    { label: 'Case Studies', path: '/insights/case-studies' },
                    { label: 'Blog & Articles', path: '/insights/blog' }
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        navigateTo(link.path);
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}

                  <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider uppercase px-4 pt-3 block">Resources</span>
                  {[
                    { label: 'ROI Calculator', path: '/resources/roi-calculator' },
                    { label: 'Frequently Asked Questions', path: '/resources/faq' },
                    { label: 'Global Reach Map', path: '/resources/global-reach-map' },
                    { label: 'Ecosystem Integrations', path: '/resources/ecosystem-integrations' }
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        navigateTo(link.path);
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="space-y-4 pt-6 border-t border-neutral-100">
                {/* Theme Selector (Mobile) */}
                <div className="space-y-3 px-1 py-3 bg-neutral-100/50 rounded-2xl border border-neutral-200">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Theme Options</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {THEME_PRESETS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => selectPresetTheme(t.id, t.color)}
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                          activeTheme === t.id ? 'ring-2 ring-neutral-450 ring-offset-2 scale-105' : 'opacity-85'
                        }`}
                        style={{ backgroundColor: t.color }}
                      >
                        {activeTheme === t.id && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                      </button>
                    ))}
                  </div>
                  <div className="mx-2 flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-2">
                    <label className="relative h-7 w-7 shrink-0 cursor-pointer rounded-full border-2 border-white shadow-sm ring-1 ring-neutral-300" style={{ backgroundColor: /^#[0-9A-F]{6}$/i.test(customHex) ? customHex : '#6366f1' }}>
                      <input aria-label="Custom theme color" type="color" value={/^#[0-9A-F]{6}$/i.test(customHex) ? customHex : '#6366f1'} onChange={(e) => selectCustomTheme(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                    </label>
                    <input aria-label="Custom theme hex code" value={customHex} onChange={(e) => handleCustomHexChange(e.target.value)} onFocus={() => setActiveTheme('custom')} maxLength={7} spellCheck={false} className="min-w-0 flex-1 bg-transparent font-mono text-xs font-semibold uppercase text-neutral-800 outline-none" placeholder="#6366F1" />
                    <span className="text-[9px] font-bold text-neutral-400">CUSTOM</span>
                  </div>
                  <button 
                    onClick={() => {
                      import('../lib/designSystem').then(({ downloadThemeTokens }) => {
                        downloadThemeTokens(activeTheme, isDark);
                      });
                    }} 
                    className="mx-2 flex w-[calc(100%-1rem)] items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-[10px] font-bold text-indigo-700 cursor-pointer"
                  >
                    <Download className="h-3 w-3" /> Export .JSON
                  </button>
                </div>

                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-auth-modal'));
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all cursor-pointer block border border-neutral-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-demo-modal'));
                    setIsMenuOpen(false);
                  }}
                  className="w-full relative inline-flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-900 text-white py-3.5 rounded-xl text-sm font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Try for Free</span>
                  <span className="text-indigo-400 font-bold">»</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
