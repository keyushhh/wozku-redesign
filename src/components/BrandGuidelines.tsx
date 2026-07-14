import React, { useState, useEffect, useRef } from 'react';
import './BrandGuidelines.css';

// Import asset files
import logoBlack from '../assets/Logo_Black_Transparent.png';
import logoWhite from '../assets/Logo_White_Transparent.png';
import busyCrowd from '../assets/busy-crowd.avif';

const PRESETS = [
  { id: 'indigo',  name: 'Indigo',  color: '#6366f1' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose',    name: 'Rose',    color: '#f43f5e' },
  { id: 'amber',   name: 'Amber',   color: '#f59e0b' },
  { id: 'violet',  name: 'Violet',  color: '#8b5cf6' },
  { id: 'sky',     name: 'Sky',     color: '#0ea5e9' },
  { id: 'fuchsia', name: 'Fuchsia', color: '#d946ef' },
  { id: 'crimson', name: 'Crimson', color: '#dc2626' },
];

const THEME_DEFS: Record<string, { primary: string; secondary: string }> = {
  indigo:  { primary: '#6366f1', secondary: '#6366f1' },
  emerald: { primary: '#10b981', secondary: '#22c55e' },
  rose:    { primary: '#f43f5e', secondary: '#f97316' },
  amber:   { primary: '#f59e0b', secondary: '#eab308' },
  violet:  { primary: '#8b5cf6', secondary: '#d946ef' },
  sky:     { primary: '#0ea5e9', secondary: '#3b82f6' },
  fuchsia: { primary: '#d946ef', secondary: '#a855f7' },
  crimson: { primary: '#dc2626', secondary: '#f97316' },
};

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const n = parseInt(cleanHex, 16);
  if (isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const rp = r / 255, gp = g / 255, bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  const c = (1 - rp - k) / (1 - k) || 0;
  const m = (1 - gp - k) / (1 - k) || 0;
  const y = (1 - bp - k) / (1 - k) || 0;
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function hexToHsl(hex: string): [number, number, number] {
  let [r, g, b] = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface BrandGuidelinesProps {
  radiusMode?: 'rounded' | 'sharp';
}

export default function BrandGuidelines({ radiusMode }: BrandGuidelinesProps) {
  const wgRef = useRef<HTMLDivElement>(null);
  
  // Storage key safely scoped to guidelines
  const storageKey = 'wozku-guidelines-custom-palette';

  // Load and parse initial state from URL query parameters (supports both standard and hash queries)
  const urlParams = (() => {
    const params = new URLSearchParams(window.location.search);
    const hashPart = window.location.hash;
    if (hashPart.includes('?')) {
      const hashQuery = hashPart.split('?')[1];
      const hashParams = new URLSearchParams(hashQuery);
      for (const [key, val] of hashParams.entries()) {
        params.set(key, val);
      }
    }
    // Perform console check for malformed hex strings
    const checkKeys = ['primary', 'secondary', 'neutral', 'accent'];
    checkKeys.forEach(k => {
      const val = params.get(k);
      if (val && !/^#[0-9A-F]{6}$/i.test(val)) {
        console.warn(`[Wozku Guidelines] Invalid hex value found for query parameter '${k}': ${val}. Falling back to default.`);
      }
    });
    return params;
  })();

  const isValidHex = (hex: string | null) => {
    if (!hex) return false;
    return /^#[0-9A-F]{6}$/i.test(hex);
  };

  const [activeTheme, setActiveTheme] = useState(() => {
    const urlPreset = urlParams.get('preset');
    if (urlPreset) return urlPreset;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.activeTheme === 'string') return parsed.activeTheme;
      }
    } catch (e) {}
    return 'emerald';
  });

  const [activeNav, setActiveNav] = useState('cover');
  const [isEditingColors, setIsEditingColors] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [customPrimary, setCustomPrimary] = useState(() => {
    const urlPrimary = urlParams.get('primary');
    if (isValidHex(urlPrimary)) return urlPrimary!;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.customPrimary) return parsed.customPrimary;
      }
    } catch (e) {}
    return '#10b981';
  });

  const [customSecondary, setCustomSecondary] = useState(() => {
    const urlSecondary = urlParams.get('secondary');
    if (isValidHex(urlSecondary)) return urlSecondary!;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.customSecondary) return parsed.customSecondary;
      }
    } catch (e) {}
    return '#22c55e';
  });

  const [customNeutral, setCustomNeutral] = useState(() => {
    const urlNeutral = urlParams.get('neutral');
    if (isValidHex(urlNeutral)) return urlNeutral!;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.customNeutral) return parsed.customNeutral;
      }
    } catch (e) {}
    return '#737373';
  });

  const [hasAccent, setHasAccent] = useState(() => {
    const urlAccent = urlParams.get('accent');
    if (isValidHex(urlAccent)) return true;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.hasAccent === 'boolean') return parsed.hasAccent;
      }
    } catch (e) {}
    return false;
  });

  const [customAccent, setCustomAccent] = useState(() => {
    const urlAccent = urlParams.get('accent');
    if (isValidHex(urlAccent)) return urlAccent!;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.customAccent) return parsed.customAccent;
      }
    } catch (e) {}
    return '#ec4899';
  });

  // Input elements refs to anchor swatch clicks
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const secondaryInputRef = useRef<HTMLInputElement>(null);
  const accentInputRef = useRef<HTMLInputElement>(null);

  // Palette values computed based on actual styles applied
  const [computedColors, setComputedColors] = useState({
    primary: '#10b981',
    secondary: '#22c55e',
    accent: '#ec4899',
  });

  // Calculate shades for custom hexpicker
  const shade = (hex: string, percent: number) => {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + Math.round(2.55 * percent);
    let g = ((n >> 8) & 0xff) + Math.round(2.55 * percent);
    let b = (n & 0xff) + Math.round(2.55 * percent);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  };

  // Sync / calculate actual rendered variables
  const updateRenderedPalette = () => {
    if (!wgRef.current) return;
    
    const hexFromComputed = (varName: string) => {
      if (!wgRef.current) return '#000000';
      const val = getComputedStyle(wgRef.current).getPropertyValue(varName).trim();
      if (val.startsWith('#')) return val;
      const m = val.match(/\d+/g);
      if (!m) return '#000000';
      return '#' + m.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('');
    };

    setComputedColors({
      primary: hexFromComputed('--indigo-500'),
      secondary: hexFromComputed('--accent-500'),
      accent: hexFromComputed('--brand-accent-500'),
    });
  };

  // Swap preset theme handler
  const handleSetTheme = (themeId: string) => {
    setActiveTheme(themeId);
    const def = THEME_DEFS[themeId] || THEME_DEFS['emerald'];
    setCustomPrimary(def.primary);
    setCustomSecondary(def.secondary);
    setCustomNeutral('#737373');
    setCustomAccent('#ec4899');
  };

  // Reset to current preset's defaults
  const handleReset = () => {
    localStorage.removeItem(storageKey);
    // Clear URL parameters
    const hashRoute = window.location.hash.split('?')[0];
    window.history.replaceState(null, '', `${window.location.pathname}${hashRoute}`);

    setHasAccent(false);
    const presetId = activeTheme || 'emerald';
    setActiveTheme(presetId);
    const def = THEME_DEFS[presetId];
    setCustomPrimary(def.primary);
    setCustomSecondary(def.secondary);
    setCustomNeutral('#737373');
    setCustomAccent('#ec4899');
  };

  // Build current config URL and copy to clipboard
  const handleCopyLink = () => {
    const params = new URLSearchParams();
    if (activeTheme) params.set('preset', activeTheme);
    if (customPrimary) params.set('primary', customPrimary);
    if (customSecondary) params.set('secondary', customSecondary);
    if (customNeutral) params.set('neutral', customNeutral);
    if (hasAccent && customAccent) params.set('accent', customAccent);

    const hashRoute = window.location.hash.split('?')[0];
    const shareUrl = `${window.location.origin}${window.location.pathname}${hashRoute}?${params.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Manual scroll handler to prevent hash route collisions
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = wgRef.current?.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
    }
  };

  // Write changes to localStorage on any state modification
  useEffect(() => {
    const state = {
      activeTheme,
      customPrimary,
      customSecondary,
      customNeutral,
      hasAccent,
      customAccent
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [activeTheme, customPrimary, customSecondary, customNeutral, hasAccent, customAccent]);

  // Apply variable styles directly to .wg-doc wrapper ref
  useEffect(() => {
    if (!wgRef.current) return;

    // Apply primary shades
    wgRef.current.style.setProperty('--indigo-500', customPrimary);
    wgRef.current.style.setProperty('--indigo-600', shade(customPrimary, -12));
    wgRef.current.style.setProperty('--indigo-700', shade(customPrimary, -24));
    wgRef.current.style.setProperty('--indigo-400', shade(customPrimary, 16));
    wgRef.current.style.setProperty('--indigo-300', shade(customPrimary, 32));
    wgRef.current.style.setProperty('--indigo-200', shade(customPrimary, 48));
    wgRef.current.style.setProperty('--indigo-100', shade(customPrimary, 64));
    wgRef.current.style.setProperty('--indigo-50', shade(customPrimary, 80));

    // Apply secondary shades
    wgRef.current.style.setProperty('--accent-500', customSecondary);
    wgRef.current.style.setProperty('--accent-600', shade(customSecondary, -12));
    wgRef.current.style.setProperty('--accent-700', shade(customSecondary, -24));
    wgRef.current.style.setProperty('--accent-400', shade(customSecondary, 16));
    wgRef.current.style.setProperty('--accent-300', shade(customSecondary, 32));
    wgRef.current.style.setProperty('--accent-200', shade(customSecondary, 48));
    wgRef.current.style.setProperty('--accent-100', shade(customSecondary, 64));
    wgRef.current.style.setProperty('--accent-50', shade(customSecondary, 80));

    // Apply neutral shades with capped saturation for contrast safety
    const [nh, ns, nl] = hexToHsl(customNeutral);
    const cappedS = Math.min(ns, 8);
    wgRef.current.style.setProperty('--neutral-0', hslToHex(nh, cappedS, 100));
    wgRef.current.style.setProperty('--neutral-50', hslToHex(nh, cappedS, 98));
    wgRef.current.style.setProperty('--neutral-100', hslToHex(nh, cappedS, 96));
    wgRef.current.style.setProperty('--neutral-150', hslToHex(nh, cappedS, 93));
    wgRef.current.style.setProperty('--neutral-200', hslToHex(nh, cappedS, 90));
    wgRef.current.style.setProperty('--neutral-300', hslToHex(nh, cappedS, 83));
    wgRef.current.style.setProperty('--neutral-400', hslToHex(nh, cappedS, 64));
    wgRef.current.style.setProperty('--neutral-500', hslToHex(nh, cappedS, 45));
    wgRef.current.style.setProperty('--neutral-600', hslToHex(nh, cappedS, 32));
    wgRef.current.style.setProperty('--neutral-700', hslToHex(nh, cappedS, 25));
    wgRef.current.style.setProperty('--neutral-800', hslToHex(nh, cappedS, 15));
    wgRef.current.style.setProperty('--neutral-900', hslToHex(nh, cappedS, 9));
    wgRef.current.style.setProperty('--neutral-950', hslToHex(nh, cappedS, 4));

    // Apply optional accent shades
    if (hasAccent) {
      wgRef.current.style.setProperty('--brand-accent-500', customAccent);
      wgRef.current.style.setProperty('--brand-accent-600', shade(customAccent, -12));
      wgRef.current.style.setProperty('--brand-accent-700', shade(customAccent, -24));
      wgRef.current.style.setProperty('--brand-accent-400', shade(customAccent, 16));
      wgRef.current.style.setProperty('--brand-accent-300', shade(customAccent, 32));
      wgRef.current.style.setProperty('--brand-accent-200', shade(customAccent, 48));
      wgRef.current.style.setProperty('--brand-accent-100', shade(customAccent, 64));
      wgRef.current.style.setProperty('--brand-accent-50', shade(customAccent, 80));
    } else {
      wgRef.current.style.removeProperty('--brand-accent-500');
      wgRef.current.style.removeProperty('--brand-accent-600');
      wgRef.current.style.removeProperty('--brand-accent-700');
      wgRef.current.style.removeProperty('--brand-accent-400');
      wgRef.current.style.removeProperty('--brand-accent-300');
      wgRef.current.style.removeProperty('--brand-accent-200');
      wgRef.current.style.removeProperty('--brand-accent-100');
      wgRef.current.style.removeProperty('--brand-accent-50');
    }

    updateRenderedPalette();
    const timer = setTimeout(updateRenderedPalette, 20);
    return () => clearTimeout(timer);
  }, [activeTheme, customPrimary, customSecondary, customNeutral, customAccent, hasAccent]);

  // Active section scroll indicator IntersectionObserver
  useEffect(() => {
    const sections = wgRef.current?.querySelectorAll('.page');
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const getContrastColor = (hex: string) => {
    return getLuminance(hex) > 0.6 ? '#171717' : '#ffffff';
  };

  // Swatch card renderer
  const renderSwatchCard = (
    label: string, 
    role: string, 
    hex: string, 
    bg: string, 
    textColor: string,
    onEditClick?: () => void
  ) => {
    const [r, g, b] = hexToRgb(hex);
    const [c, m, y, k] = rgbToCmyk(r, g, b);
    return (
      <div className="swatch-card" style={{ background: bg, color: textColor, position: 'relative' }}>
        {onEditClick && (
          <button
            onClick={onEditClick}
            className="swatch-edit-btn"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: textColor,
              transition: 'background 0.15s ease'
            }}
            title={`Edit ${label} Color`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '12px', height: '12px' }}>
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </button>
        )}
        <div>
          <div className="label">{label}</div>
          <div className="role">{role}</div>
        </div>
        <div className="specs">
          HEX {hex.toUpperCase()}
          <b>RGB</b>{r}, {g}, {b}
          <b>CMYK</b>{c}, {m}, {y}, {k}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`wg-doc ${activeTheme ? `theme-${activeTheme}` : ''} ${radiusMode === 'sharp' ? 'corners-sharp' : ''}`} 
      ref={wgRef}
    >
      {/* Hidden native color pickers for card editing sync */}
      <input 
        type="color" 
        ref={primaryInputRef} 
        style={{ display: 'none' }} 
        value={customPrimary} 
        onChange={(e) => { setCustomPrimary(e.target.value); setActiveTheme(''); }}
      />
      <input 
        type="color" 
        ref={secondaryInputRef} 
        style={{ display: 'none' }} 
        value={customSecondary} 
        onChange={(e) => { setCustomSecondary(e.target.value); setActiveTheme(''); }}
      />
      {hasAccent && (
        <input 
          type="color" 
          ref={accentInputRef} 
          style={{ display: 'none' }} 
          value={customAccent} 
          onChange={(e) => { setCustomAccent(e.target.value); setActiveTheme(''); }}
        />
      )}

      {/* ================= SIDE NAV ================= */}
      <aside className="sidenav">
        <div className="sidenav-brand">
          <img src={logoBlack} alt="Wozku Logo" style={{ height: '18px', objectFit: 'contain' }} />
        </div>
        <nav className="sidenav-scroll">
          <a href="#cover" onClick={(e) => handleScrollToSection(e, 'cover')} className={activeNav === 'cover' ? 'active' : ''}><span className="n">00</span>Cover</a>
          <a href="#toc" onClick={(e) => handleScrollToSection(e, 'toc')} className={activeNav === 'toc' ? 'active' : ''}><span className="n">01</span>Contents</a>
          <a href="#typography" onClick={(e) => handleScrollToSection(e, 'typography')} className={activeNav === 'typography' ? 'active' : ''}><span className="n">02</span>Typography</a>
          <a href="#hierarchy" onClick={(e) => handleScrollToSection(e, 'hierarchy')} className={activeNav === 'hierarchy' ? 'active' : ''}><span className="n">03</span>Type Hierarchy</a>
          <a href="#logo" onClick={(e) => handleScrollToSection(e, 'logo')} className={activeNav === 'logo' ? 'active' : ''}><span className="n">04</span>Logo</a>
          <a href="#color" onClick={(e) => handleScrollToSection(e, 'color')} className={activeNav === 'color' ? 'active' : ''}><span className="n">05</span>Colour Palette</a>
          <a href="#visual-language" onClick={(e) => handleScrollToSection(e, 'visual-language')} className={activeNav === 'visual-language' ? 'active' : ''}><span className="n">06</span>Visual Language</a>
          <a href="#clearspace" onClick={(e) => handleScrollToSection(e, 'clearspace')} className={activeNav === 'clearspace' ? 'active' : ''}><span className="n">07</span>Logo Clear Space</a>
          <a href="#misuse" onClick={(e) => handleScrollToSection(e, 'misuse')} className={activeNav === 'misuse' ? 'active' : ''}><span className="n">08</span>Logo Misuse</a>
          <a href="#voice-tone" onClick={(e) => handleScrollToSection(e, 'voice-tone')} className={activeNav === 'voice-tone' ? 'active' : ''}><span className="n">09</span>Voice &amp; Tone</a>
          <a href="#accessibility" onClick={(e) => handleScrollToSection(e, 'accessibility')} className={activeNav === 'accessibility' ? 'active' : ''}><span className="n">10</span>Accessibility</a>
          <a href="#components" onClick={(e) => handleScrollToSection(e, 'components')} className={activeNav === 'components' ? 'active' : ''}><span className="n">11</span>Components</a>
          <a href="#final-notes" onClick={(e) => handleScrollToSection(e, 'final-notes')} className={activeNav === 'final-notes' ? 'active' : ''}><span className="n">12</span>Final Notes</a>
        </nav>
        <div className="sidenav-tools">
          <div className="flex items-center gap-3 justify-between" style={{ marginBottom: '8px' }}>
            <div className="tools-label" style={{ marginBottom: 0 }}>Preview theme</div>
            <button 
              className="edit-toggle-btn"
              onClick={() => setIsEditingColors(!isEditingColors)}
              title="Edit Theme Colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '13px', height: '13px' }}>
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
              </svg>
            </button>
          </div>

          {isEditingColors ? (
            <div className="edit-panel">
              <div className="edit-input-row">
                <span className="edit-input-label">Primary</span>
                <div className="edit-input-field">
                  <input 
                    type="color" 
                    value={customPrimary}
                    onChange={(e) => { setCustomPrimary(e.target.value); setActiveTheme(''); }}
                  />
                  <span>{customPrimary.toUpperCase()}</span>
                </div>
              </div>
              <div className="edit-input-row">
                <span className="edit-input-label">Secondary</span>
                <div className="edit-input-field">
                  <input 
                    type="color" 
                    value={customSecondary}
                    onChange={(e) => { setCustomSecondary(e.target.value); setActiveTheme(''); }}
                  />
                  <span>{customSecondary.toUpperCase()}</span>
                </div>
              </div>
              <div className="edit-input-row">
                <span className="edit-input-label">Neutral</span>
                <div className="edit-input-field">
                  <input 
                    type="color" 
                    value={customNeutral}
                    onChange={(e) => { setCustomNeutral(e.target.value); setActiveTheme(''); }}
                  />
                  <span>{customNeutral.toUpperCase()}</span>
                </div>
              </div>

              <div className="edit-checkbox-row">
                <input 
                  type="checkbox" 
                  id="toggle-accent" 
                  checked={hasAccent}
                  onChange={(e) => setHasAccent(e.target.checked)}
                />
                <label htmlFor="toggle-accent">+ Add accent colour</label>
              </div>

              {hasAccent && (
                <div className="edit-input-row" style={{ marginTop: '4px' }}>
                  <span className="edit-input-label">Accent</span>
                  <div className="edit-input-field">
                    <input 
                      type="color" 
                      value={customAccent}
                      onChange={(e) => { setCustomAccent(e.target.value); setActiveTheme(''); }}
                    />
                    <span>{customAccent.toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="swatch-row">
              {PRESETS.map((p) => (
                <div
                  key={p.id}
                  className={`swatch ${activeTheme === p.id ? 'active' : ''}`}
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                  onClick={() => handleSetTheme(p.id)}
                />
              ))}
            </div>
          )}

          <button className="export-btn" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>
            </svg>
            Export as PDF
          </button>

          <button 
            className="export-btn" 
            style={{ marginTop: '8px', background: 'var(--neutral-150)', color: 'var(--neutral-850)', border: '1px solid var(--neutral-200)' }} 
            onClick={handleCopyLink}
          >
            {isCopied ? (
              <>✓ Link Copied!</>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Copy Share Link
              </>
            )}
          </button>
          
          <button 
            className="export-btn" 
            style={{ marginTop: '8px', background: '#1c1917', color: '#fff' }} 
            onClick={() => { window.location.hash = '#/'; }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)', width: '14px', height: '14px' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Exit Guidelines
          </button>
        </div>
      </aside>

      {/* ================= MAIN BOOK ================= */}
      <main className="book">
        
        {/* 00 COVER */}
        <section id="cover" className="page page-cover">
          <svg className="wave" viewBox="0 0 800 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50 500 C 150 400, 300 620, 550 480 S 900 380, 950 550" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M-50 560 C 150 460, 300 680, 550 540 S 900 440, 950 610" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M-50 620 C 150 520, 300 740, 550 600 S 900 500, 950 670" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
          <div className="brandmark">
            <img src={logoWhite} alt="Wozku Logo" style={{ height: '28px', objectFit: 'contain' }} />
          </div>
          <div className="cover-title">
            <h1>BRAND<br/>GUIDELINES</h1>
            <p>The visual language of Wozku — how we look, sound, and show up across every surface.</p>
          </div>
          <div className="cover-foot">
            <span>Version 1.0</span>
            <span>July 2026</span>
          </div>
        </section>

        {/* 01 TABLE OF CONTENTS */}
        <section id="toc" className="page page-toc">
          <div className="toc-head">
            <div className="big">Index</div>
            <p>Twelve sections covering identity, type, colour, voice, accessibility, components and usage rules — the foundation every touchpoint is built from.</p>
          </div>
          <div className="toc-list">
            <div className="toc-item"><span className="num">01</span><span className="name">Table of Contents</span></div>
            <div className="toc-item"><span className="num">02</span><span className="name">Typography</span></div>
            <div className="toc-item"><span className="num">03</span><span className="name">Type Hierarchy</span></div>
            <div className="toc-item"><span className="num">04</span><span className="name">Logo</span></div>
            <div className="toc-item"><span className="num">05</span><span className="name">Colour Palette</span></div>
            <div className="toc-item"><span className="num">06</span><span className="name">Visual Language</span></div>
            <div className="toc-item"><span className="num">07</span><span className="name">Logo Clear Space</span></div>
            <div className="toc-item"><span className="num">08</span><span className="name">Logo Misuse</span></div>
            <div className="toc-item"><span className="num">09</span><span className="name">Voice &amp; Tone</span></div>
            <div className="toc-item"><span className="num">10</span><span className="name">Accessibility</span></div>
            <div className="toc-item"><span className="num">11</span><span className="name">Components</span></div>
            <div className="toc-item"><span className="num">12</span><span className="name">Final Notes</span></div>
          </div>
        </section>

        {/* 02 TYPOGRAPHY */}
        <section id="typography" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Typography</h1>
          <div className="type-grid">
            <div>
              <p className="page-body">Our typography is modern, readable and built for digital experiences. Each typeface has a specific role in creating clarity and hierarchy. We use a combination of three families with carefully selected fallbacks for every platform.</p>
              <div className="type-mini-list">
                <div className="tm"><b>Primary — Space Grotesk</b>Used for headlines and key messaging.</div>
                <div className="tm"><b>Secondary — Satoshi</b>Used for body copy and interface text.</div>
                <div className="tm"><b>Tertiary — JetBrains Mono</b>Used for technical content, labels and data.</div>
              </div>
            </div>
            <div className="type-showcase">
              <h3>Space Grotesk</h3>
              <div className="type-row">
                <div className="label">Medium</div>
                <div className="sample medium">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>0123456789 !?@#%&</div>
              </div>
              <div className="type-row">
                <div className="label">SemiBold</div>
                <div className="sample semibold">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>0123456789 !?@#%&</div>
              </div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 02</span></div>
        </section>

        {/* 03 TYPE HIERARCHY */}
        <section id="hierarchy" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Type Hierarchy</h1>
          <div className="hier-grid">
            <div className="hier-specs">
              <p className="page-body" style={{ marginBottom: 20 }}>Our type scale is built to establish a clear visual hierarchy across all platforms and devices. Use these sizes and styles consistently to maintain rhythm and readability.</p>
              <div className="spec"><div className="name">H1 / Display</div><div className="meta">Space Grotesk / Bold — 56 / 64 · -2%</div></div>
              <div className="spec"><div className="name">H2 / Heading</div><div className="meta">Space Grotesk / SemiBold — 32 / 40 · -1%</div></div>
              <div className="spec"><div className="name">H3 / Subheading</div><div className="meta">Space Grotesk / Medium — 20 / 28 · 0%</div></div>
              <div className="spec"><div className="name">Body / Large</div><div className="meta">Satoshi / Regular — 16 / 24 · 0%</div></div>
              <div className="spec"><div className="name">Body / Small</div><div className="meta">Satoshi / Regular — 13 / 20 · 0%</div></div>
            </div>
            <div className="hier-demo">
              <h2>The total solution for data centres.</h2>
              <h3>Power. Cooling. Infrastructure. All working as one.</h3>
              <p className="lg">We help enterprises design, build and operate future-ready data centres with end-to-end solutions — from site selection to commissioning.</p>
              <p className="sm">Reliable. Scalable. Sustainable.</p>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 03</span></div>
        </section>

        {/* 04 LOGO */}
        <section id="logo" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Logo</h1>
          <div className="logo-grid">
            <div>
              <p className="page-body">Our logo is the key identifier of the Wozku brand. Use it with care and consistency. It is available in primary and reverse variants for different backgrounds — never redraw, recolour, or reconstruct it.</p>
              <div className="min-size-row">
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="8" width="18" height="8" rx="2"/></svg>
                  <div className="cap">Digital min · 32px</div>
                </div>
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M3 12h18"/></svg>
                  <div className="cap">Print min · 10mm</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="logo-card primary">
                <span className="tag">Primary</span>
                <div className="lockup">
                  <img src={logoWhite} alt="Wozku Logo" style={{ height: '32px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="logo-card reverse">
                <span className="tag">Reverse</span>
                <div className="lockup">
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '32px', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 04.1</span></div>
        </section>

        {/* 05 COLOUR PALETTE */}
        <section id="color" className="page">
          <div className="eyebrow">Content Section</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <h1 className="page-title" style={{ marginBottom: 0 }}>Colour Palette</h1>
            <button 
              onClick={handleReset} 
              className="reset-btn-link" 
              style={{ background: 'none', border: 'none', color: 'var(--indigo-600)', cursor: 'pointer', fontSize: '12.5px', fontWeight: 600, textDecoration: 'underline', padding: 0 }}
            >
              Reset to theme default
            </button>
          </div>
          <p className="page-body">Only the colours listed here may be used in the Wozku visual style. Primary and Secondary shift with the theme preview below; Black and White are fixed constants in every configuration.</p>
          <div className={`palette-grid ${hasAccent ? 'cols-5' : ''}`}>
            {renderSwatchCard('Primary', 'Primary', computedColors.primary, computedColors.primary, getContrastColor(computedColors.primary), () => primaryInputRef.current?.click())}
            {renderSwatchCard('Secondary', 'Secondary', computedColors.secondary, computedColors.secondary, getContrastColor(computedColors.secondary), () => secondaryInputRef.current?.click())}
            {hasAccent && renderSwatchCard('Accent', 'Accent', computedColors.accent, computedColors.accent, getContrastColor(computedColors.accent), () => accentInputRef.current?.click())}
            {renderSwatchCard('Black', 'Neutral', '#000000', '#000000', '#ffffff')}
            {renderSwatchCard('White', 'Neutral', '#ffffff', '#ffffff', '#171717')}
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 05</span></div>
        </section>

        {/* 06 VISUAL LANGUAGE */}
        <section id="visual-language" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Visual Language</h1>
          <p className="page-body">These key elements shape how we express the Wozku brand across all touchpoints. Use them consistently to create a clear, professional and unified brand presence.</p>
          <div className="vl-grid">
            <div className="vl-card">
              <h4>Grid &amp; Spacing</h4>
              <div className="vl-visual"><div className="mock-grid"><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/></div></div>
              <div className="cap">8pt spacing system for layouts and consistent rhythm.</div>
            </div>
            <div className="vl-card">
              <h4>Corner Radius</h4>
              <div className="vl-visual"><div className="mock-radius"><i/><i/><i/></div></div>
              <div className="cap">{radiusMode === 'sharp' ? '0px' : '16px'} is our default radius for cards and UI surfaces.</div>
            </div>
            <div className="vl-card">
              <h4>Iconography</h4>
              <div className="vl-visual"><div className="mock-icons">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l7 4v10l-7 4-7-4V7z"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 6L9 17l-5-5"/></svg>
              </div></div>
              <div className="cap">Rounded, outline icons with 1.5–2px stroke weight.</div>
            </div>
            <div className="vl-card">
              <h4>Illustration Style</h4>
              <div className="vl-visual"><div className="mock-illustration"><div className="b1"/><div className="b2"/><div className="b3"/></div></div>
              <div className="cap">Clean, minimal illustrations using geometric shapes and brand colours.</div>
            </div>
            <div className="vl-card">
              <h4>Gradients &amp; Effects</h4>
              <div className="vl-visual"><div className="mock-gradient"/></div>
              <div className="cap">Soft gradients and shadows used sparingly to create depth and emphasis.</div>
            </div>
            <div className="vl-card">
              <h4>Photography Style</h4>
              <div className="vl-visual"><div className="mock-photo"/></div>
              <div className="cap">Authentic, natural imagery focused on people, collaboration and infrastructure.</div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 06</span></div>
        </section>

        {/* 07 LOGO CLEAR SPACE */}
        <section id="clearspace" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Logo Clear Space</h1>
          <p className="page-body">To ensure visibility and impact, always keep clear space around the logo. The clear space is defined by the height of the logo mark (X). No text, graphics, or other elements should enter this zone.</p>
          <div className="clearspace-wrap">
            <div className="clearspace-box">
              <span className="x-label top">X</span>
              <span className="x-label bottom">X</span>
              <span className="x-label left">X</span>
              <span className="x-label right">X</span>
              <div className="lockup">
                <img src={logoBlack} alt="Wozku Logo" style={{ height: '28px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 07</span></div>
        </section>

        {/* 08 LOGO MISUSE */}
        <section id="misuse" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Logo Misuse</h1>
          <p className="page-body">To maintain the integrity of the brand, never alter the logo. Examples of incorrect usage are shown below.</p>
          <div className="misuse-grid">
            <div className="misuse-card">
              <div className="misuse-preview">
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup" style={{ transform: 'scaleX(1.8)' }}>
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't stretch the logo</div>
            </div>
            <div className="misuse-card">
              <div className="misuse-preview">
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup" style={{ color: '#f43f5e' }}>
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't change the colours</div>
            </div>
            <div className="misuse-card">
              <div className="misuse-preview">
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,.45))' }}>
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't add drop shadows</div>
            </div>
            <div className="misuse-card">
              <div className="misuse-preview">
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup" style={{ transform: 'rotate(-16deg)' }}>
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't rotate the logo</div>
            </div>
            <div className="misuse-card">
              <div className="misuse-preview busy" style={{ backgroundImage: `url(${busyCrowd})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup">
                  <img src={logoWhite} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't use on busy backgrounds</div>
            </div>
            <div className="misuse-card">
              <div className="misuse-preview">
                <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                <div className="lockup" style={{ transform: 'scale(0.5)' }}>
                  <img src={logoBlack} alt="Wozku Logo" style={{ height: '24px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="cap">Don't resize elements independently</div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 08</span></div>
        </section>

        {/* 09 VOICE & TONE */}
        <section id="voice-tone" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Voice &amp; Tone</h1>
          <div className="type-grid">
            <div>
              <p className="page-body">Wozku speaks with the confidence of an engineer and the clarity of an operator. Our voice is direct, technical when it needs to be, and never inflated. We describe infrastructure the way the people who run it actually talk about it — plainly, and with respect for the reader's time.</p>
              <div className="type-mini-list" style={{ marginTop: '20px' }}>
                <div className="tm"><b>Clear over clever</b>Say exactly what a system does. Let capability speak for itself.</div>
                <div className="tm"><b>Confident, not boastful</b>State facts plainly; let the numbers do the persuading.</div>
                <div className="tm"><b>Technical when useful, plain everywhere else</b>Precision matters in specs; simplicity matters in explanation.</div>
                <div className="tm"><b>Respect the reader's expertise</b>Talk to operators and engineers as peers, not prospects.</div>
              </div>
            </div>
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--neutral-50)', border: '1px solid var(--neutral-150)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--neutral-150)', textAlign: 'left', background: 'var(--neutral-100)' }}>
                    <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Do</th>
                    <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Don't</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--neutral-150)' }}>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--indigo-700)', fontWeight: 500, verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--indigo-100)', color: 'var(--indigo-700)', fontSize: '10px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span>"This rack supports up to 40kW per cabinet."</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--neutral-400)', textDecoration: 'line-through', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', fontSize: '8px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✕</span>
                        <span>"Unleash groundbreaking power density like never before."</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--neutral-150)' }}>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--indigo-700)', fontWeight: 500, verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--indigo-100)', color: 'var(--indigo-700)', fontSize: '10px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span>"Deployment typically takes six to eight weeks."</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--neutral-400)', textDecoration: 'line-through', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', fontSize: '8px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✕</span>
                        <span>"Blazing-fast deployment in the blink of an eye."</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--indigo-700)', fontWeight: 500, verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--indigo-100)', color: 'var(--indigo-700)', fontSize: '10px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span>"Reliable. Scalable. Sustainable."</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12.5px', color: 'var(--neutral-400)', textDecoration: 'line-through', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', fontSize: '8px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>✕</span>
                        <span>"The ultimate game-changing infrastructure revolution."</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 09</span></div>
        </section>

        {/* 10 ACCESSIBILITY */}
        <section id="accessibility" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Accessibility</h1>
          <p className="page-body" style={{ marginBottom: '24px' }}>
            Every Wozku interface should be usable regardless of ability, device, or context. Accessibility isn't a final pass — it's a constraint we design within from the start.
          </p>
          <div className="vl-grid">
            <div className="vl-card">
              <h4>Colour contrast</h4>
              <div className="vl-visual" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', background: 'var(--neutral-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '4px', background: 'var(--indigo-50)', border: '1px solid var(--indigo-150)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--indigo-700)' }}>Pass (AA 4.5:1)</span>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--indigo-600)' }}>✓ Passed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '4px', background: 'var(--indigo-50)', opacity: 0.45 }}>
                  <span style={{ fontSize: '11px', color: 'var(--indigo-300)' }}>Fail (low contrast)</span>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--neutral-400)' }}>✕ Low</span>
                </div>
              </div>
              <div className="cap">Body text maintains a minimum 4.5:1 contrast ratio against its background; large text and UI components maintain 3:1.</div>
            </div>

            <div className="vl-card">
              <h4>Focus states</h4>
              <div className="vl-visual" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'var(--neutral-50)' }}>
                <input type="text" placeholder="Focused state" style={{ border: '1px solid var(--indigo-500)', outline: 'none', boxShadow: '0 0 0 2px var(--indigo-100)', background: 'var(--neutral-0)', color: 'var(--neutral-900)', padding: '6px 10px', fontSize: '11px', borderRadius: 'var(--radius-sm)', width: '100%' }} readOnly />
              </div>
              <div className="cap">Every interactive element shows a visible focus ring in the active Primary colour. Never removed, never invisible.</div>
            </div>

            <div className="vl-card">
              <h4>Motion</h4>
              <div className="vl-visual" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'var(--neutral-50)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>⚡</div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--neutral-500)' }}>prefers-reduced-motion</span>
                </div>
              </div>
              <div className="cap">Animations respect prefers-reduced-motion. Nothing essential to understanding is conveyed through motion alone.</div>
            </div>

            <div className="vl-card">
              <h4>Semantic structure</h4>
              <div className="vl-visual" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center', background: 'var(--neutral-50)' }}>
                <code style={{ fontSize: '9.5px', fontFamily: 'var(--font-mono)', color: 'var(--neutral-600)' }}>
                  &lt;main&gt;<br/>
                  &nbsp;&nbsp;&lt;h1&gt;Header&lt;/h1&gt;<br/>
                  &nbsp;&nbsp;&lt;nav aria-label="Page"&gt;<br/>
                  &lt;/main&gt;
                </code>
              </div>
              <div className="cap">Headings, landmarks, and form labels follow a logical, programmatically readable order.</div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 10</span></div>
        </section>

        {/* 11 COMPONENTS */}
        <section id="components" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Components</h1>
          <p className="page-body" style={{ marginBottom: '24px' }}>
            A live showcase of core interface elements rendered in the current brand theme palette configuration. Use these components as the building blocks for creating consistent, accessible layouts.
          </p>
          <div className="vl-grid">
            <div className="vl-card" style={{ gridColumn: 'span 2' }}>
              <h4>Buttons</h4>
              <div className="vl-visual" style={{ height: 'auto', padding: '16px', background: 'var(--neutral-50)', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <button style={{ background: 'var(--indigo-500)', color: 'var(--neutral-0)', border: 'none', padding: '7px 14px', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Primary</button>
                <button style={{ background: 'var(--accent-500)', color: 'var(--neutral-0)', border: 'none', padding: '7px 14px', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Secondary</button>
                <button style={{ border: '1px solid var(--indigo-500)', color: 'var(--indigo-500)', background: 'transparent', padding: '6px 13px', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Outline</button>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--indigo-500)', padding: '7px 14px', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Ghost</button>
                <button style={{ background: 'var(--neutral-200)', color: 'var(--neutral-400)', border: 'none', padding: '7px 14px', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'not-allowed', opacity: 0.6 }} disabled>Disabled</button>
              </div>
              <div className="cap">Live button styles representing primary actions, secondary pathing, outline details, and disabled states.</div>
            </div>

            <div className="vl-card" style={{ gridColumn: 'span 1' }}>
              <h4>Inputs</h4>
              <div className="vl-visual" style={{ height: 'auto', padding: '16px', background: 'var(--neutral-50)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Default state" style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-900)', padding: '6px 10px', fontSize: '11px', borderRadius: 'var(--radius-sm)', width: '100%' }} readOnly />
                <input type="text" placeholder="Focused state" style={{ border: '1px solid var(--indigo-500)', outline: 'none', boxShadow: '0 0 0 2px var(--indigo-100)', background: 'var(--neutral-0)', color: 'var(--neutral-900)', padding: '6px 10px', fontSize: '11px', borderRadius: 'var(--radius-sm)', width: '100%' }} readOnly />
                <input type="text" placeholder="Disabled state" style={{ border: '1px solid var(--neutral-200)', background: 'var(--neutral-100)', color: 'var(--neutral-400)', padding: '6px 10px', fontSize: '11px', borderRadius: 'var(--radius-sm)', width: '100%', cursor: 'not-allowed' }} disabled />
              </div>
              <div className="cap">Inputs featuring clear status borders and customized focus rings.</div>
            </div>

            <div className="vl-card" style={{ gridColumn: 'span 2' }}>
              <h4>Badges &amp; Tags</h4>
              <div className="vl-visual" style={{ height: 'auto', padding: '16px', background: 'var(--neutral-50)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', minHeight: '116px' }}>
                <span style={{ background: 'var(--indigo-50)', color: 'var(--indigo-700)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>Primary</span>
                <span style={{ background: 'var(--accent-50)', color: 'var(--accent-700)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>Secondary</span>
                <span style={{ background: 'var(--neutral-150)', color: 'var(--neutral-700)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>Neutral</span>
                <span style={{ background: hasAccent ? 'var(--brand-accent-50)' : 'var(--accent-50)', color: hasAccent ? 'var(--brand-accent-700)' : 'var(--accent-700)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>Success</span>
              </div>
              <div className="cap">Pill labels for statuses, categories, and key properties.</div>
            </div>

            <div className="vl-card" style={{ gridColumn: 'span 1' }}>
              <h4>Toggle / Checkbox</h4>
              <div className="vl-visual" style={{ height: 'auto', padding: '16px', background: 'var(--neutral-50)', display: 'flex', gap: '20px', alignItems: 'center', justifyCenter: 'center', minHeight: '116px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '20px', borderRadius: '9999px', background: 'var(--indigo-500)', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--neutral-0)', position: 'absolute', top: '3px', right: '3px' }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--neutral-700)' }}>On</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--indigo-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--neutral-0)" strokeWidth="4" style={{ width: '10px', height: '10px', margin: 'auto' }}>
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--neutral-700)' }}>Checked</span>
                </div>
              </div>
              <div className="cap">Switches and checkboxes highlighting active status options.</div>
            </div>

            <div className="vl-card" style={{ gridColumn: 'span 1' }}>
              <h4>Cards</h4>
              <div className="vl-visual" style={{ height: 'auto', padding: '16px', background: 'var(--neutral-50)', display: 'flex', alignItems: 'center', justifyCenter: 'center', minHeight: '116px' }}>
                <div style={{ border: '1px solid var(--neutral-150)', background: 'var(--neutral-0)', borderRadius: 'var(--radius-card)', padding: '12px', boxShadow: 'var(--shadow-soft)', width: '100%', maxWidth: '200px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: 'var(--neutral-950)', marginBottom: '4px' }}>Wozku Card</div>
                  <p style={{ fontSize: '10px', color: 'var(--neutral-500)', marginBottom: '8px', lineHeight: 1.4 }}>Live example of standard component cards.</p>
                  <button style={{ background: 'var(--indigo-500)', color: 'var(--neutral-0)', border: 'none', padding: '4px 8px', fontSize: '9px', fontWeight: 600, borderRadius: 'var(--radius-sm)', width: '100%', cursor: 'pointer' }}>Action</button>
                </div>
              </div>
              <div className="cap">Live card layout showing standard typography and actions.</div>
            </div>
          </div>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 11</span></div>
        </section>

        {/* 12 FINAL NOTES */}
        <section id="final-notes" className="page">
          <div className="eyebrow">Content Section</div>
          <h1 className="page-title">Final Notes</h1>
          <p className="page-body" style={{ marginBottom: '24px' }}>
            These brand guidelines serve to align Wozku's digital design identity across all touchpoints. By adhering to the layouts, spacing patterns, color variables, and components listed in this document, you maintain a professional and premium representation of the Wozku brand.
          </p>
          <div className="footer-row"><span>Wozku Brand Guidelines</span><span>Page 12</span></div>
        </section>

      </main>
    </div>
  );
}
