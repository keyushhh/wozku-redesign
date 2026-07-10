import React, { useState } from 'react';
import { 
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoMarkWhite from '../assets/logo-mark-white.png';
import slackLogo from '../assets/slack.svg';
import gmailLogo from '../assets/gmail.svg';
import zapierLogo from '../assets/zapier.svg';
import outlookLogo from '../assets/outlook.svg';
import stripeLogo from '../assets/stripe.svg';
import notionLogo from '../assets/notion.svg';
import hubspotLogo from '../assets/hubspot.svg';

interface AppIcon {
  id: string;
  name: string;
  color: string;
  logo: React.ReactNode;
  canIntegrate: boolean;
  unsupportedReason?: string;
}

const DRAGGABLE_APPS: AppIcon[] = [
  { 
    id: 'slack', 
    name: 'Slack', 
    color: 'border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:border-emerald-400', 
    logo: (
      <img src={slackLogo} className="w-6 h-6 object-contain shrink-0" alt="Slack" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'gmail', 
    name: 'Gmail', 
    color: 'border-red-200 text-red-700 bg-red-50/50 hover:border-red-400', 
    logo: (
      <img src={gmailLogo} className="w-6 h-6 object-contain shrink-0" alt="Gmail" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'zapier', 
    name: 'Zapier', 
    color: 'border-orange-200 text-orange-700 bg-orange-50/50 hover:border-orange-400', 
    logo: (
      <img src={zapierLogo} className="w-6 h-6 object-contain shrink-0" alt="Zapier" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'outlook', 
    name: 'Outlook', 
    color: 'border-blue-200 text-blue-700 bg-blue-50/50 hover:border-blue-400', 
    logo: (
      <img src={outlookLogo} className="w-6 h-6 object-contain shrink-0" alt="Outlook" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    color: 'border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:border-indigo-400', 
    logo: (
      <img src={stripeLogo} className="w-6 h-6 object-contain shrink-0" alt="Stripe" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'notion', 
    name: 'Notion', 
    color: 'border-neutral-300 text-neutral-800 bg-neutral-50 hover:border-neutral-500', 
    logo: (
      <img src={notionLogo} className="w-6 h-6 object-contain shrink-0" alt="Notion" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'hubspot', 
    name: 'HubSpot', 
    color: 'border-orange-200 text-orange-700 bg-orange-50/50 hover:border-orange-400', 
    logo: (
      <img src={hubspotLogo} className="w-6 h-6 object-contain shrink-0" alt="HubSpot" />
    ),
    canIntegrate: true 
  },
  { 
    id: 'unsupported-crm', 
    name: 'Legacy CRM', 
    color: 'border-amber-200 text-amber-700 bg-amber-50/50 hover:border-amber-400', 
    logo: (
      <span className="text-amber-600 font-mono text-base font-bold shrink-0">L</span>
    ),
    canIntegrate: false,
    unsupportedReason: 'Requires modern REST API protocol'
  }
];

// Layout mapping for 6 slots symmetrically placed on the coordinate scale
const SLOT_COORDINATES = [
  { id: 'slot-0', label: 'Slot 1', x: 12, y: 15 },
  { id: 'slot-1', label: 'Slot 2', x: 88, y: 15 },
  { id: 'slot-2', label: 'Slot 3', x: 6, y: 50 },
  { id: 'slot-3', label: 'Slot 4', x: 94, y: 50 },
  { id: 'slot-4', label: 'Slot 5', x: 12, y: 85 },
  { id: 'slot-5', label: 'Slot 6', x: 88, y: 85 }
];

// Trims a connector line from the central node (50,50) to a slot center by
// subtracting a radius offset at each end so lines stop at each shape's visible border.
const getTrimmedLine = (slotX: number, slotY: number) => {
  const cx = 50;
  const cy = 50;
  const dx = slotX - cx;
  const dy = slotY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { x1: cx, y1: cy, x2: slotX, y2: slotY, path: `M ${cx} ${cy} L ${slotX} ${slotY}` };
  const ux = dx / dist;
  const uy = dy / dist;
  const rStart = 7.5; // half-width of central Wozku node in SVG units
  const rEnd = 7.5;   // half-width of slot icon node in SVG units
  const x1 = cx + rStart * ux;
  const y1 = cy + rStart * uy;
  const x2 = slotX - rEnd * ux;
  const y2 = slotY - rEnd * uy;
  return { x1, y1, x2, y2, path: `M ${x1} ${y1} L ${x2} ${y2}` };
};

const playConnectionSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Primary oscillator for the snap/click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
    
    // A secondary higher-pitched chime
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    
    chime.type = 'sine';
    chime.frequency.setValueAtTime(780, ctx.currentTime);
    chime.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.22);
    
    chimeGain.gain.setValueAtTime(0.06, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    
    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    
    chime.start();
    chime.stop(ctx.currentTime + 0.22);
  } catch (e) {
    console.warn('Web Audio connection sound failed:', e);
  }
};

export default function IntegrationsSection() {
  const [isDragOver, setIsDragOver] = useState(false);
  // An array of up to 6 apps mapped to their slots [AppIcon | null, AppIcon | null, ...]
  const [slots, setSlots] = useState<(AppIcon | null)[]>([null, null, null, null, null, null]);
  const [toastMessage, setToastMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleDragStart = (e: React.DragEvent, app: AppIcon) => {
    e.dataTransfer.setData('text/plain', app.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const showToast = (text: string, success: boolean) => {
    setToastMessage({ text, success });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const appId = e.dataTransfer.getData('text/plain');
      if (!appId) return;
      
      const app = DRAGGABLE_APPS.find(a => a.id === appId);
      if (!app) return;
      
      if (!app.canIntegrate) {
        showToast(`Cannot integrate ${app.name}: ${app.unsupportedReason}`, false);
        return;
      }

      // Check if already in slots
      if (slots.some(s => s && s.id === app.id)) {
        showToast(`${app.name} is already connected to Wozku!`, true);
        return;
      }

      // Find first empty slot in sequence
      const emptyIndex = slots.findIndex(s => s === null);
      if (emptyIndex === -1) {
        showToast('All integration channels are occupied. Disconnect one to add another.', false);
        return;
      }

      const updatedSlots = [...slots];
      updatedSlots[emptyIndex] = app;
      setSlots(updatedSlots);
      
      playConnectionSound();
      showToast(`Successfully integrated ${app.name} with Wozku!`, true);
    } catch (err) {
      console.error('Error handling drop:', err);
    }
  };

  const removeSlot = (index: number) => {
    const updatedSlots = [...slots];
    const removedApp = updatedSlots[index];
    updatedSlots[index] = null;
    setSlots(updatedSlots);
    if (removedApp) {
      showToast(`Disconnected ${removedApp.name} pipeline.`, true);
    }
  };

  const handleReset = () => {
    setSlots([null, null, null, null, null, null]);
    showToast('Integrations sandbox reset successfully.', true);
  };

  const connectedCount = slots.filter(Boolean).length;

  return (
    <div id="ecosystem-integrations" className="border border-neutral-200 rounded-[2rem] overflow-hidden bg-white shadow-xs font-sans text-neutral-900 grid grid-cols-1 md:grid-cols-12 items-stretch transition-all duration-300">
      
      {/* ================= COLUMN 1 (Left): Narrative & Copy ================= */}
      <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 bg-white">
        <div className="space-y-4">
          <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">
            Ecosystem Connectivity
          </span>
          <h3 className="font-display font-semibold text-2xl tracking-tight text-neutral-900 leading-tight">
            Continuous context for everyone.
          </h3>
          <p className="text-sm text-neutral-500 font-sans leading-relaxed">
            Sales, success, finance, and every agent in the company, all running on the same live picture of the customer.
          </p>
          
          <div className="pt-4 border-t border-neutral-100 hidden md:block">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block mb-1">
              Sandbox Actions
            </span>
            <p className="text-xs text-neutral-400">
              Drag tools from the right column and drop them in the center to connect them to Wozku! Click any connected icon to disconnect.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <button 
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-indigo-600 transition-colors cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1.5 py-0.5"
          >
            <RefreshCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
            Reset Sandbox
          </button>
        </div>
      </div>

      {/* ================= COLUMN 2 (Center): Wozku Connectivity Canvas ================= */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: 'linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        className={`md:col-span-6 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 bg-slate-50/20 relative overflow-hidden min-h-[580px] transition-all duration-300 ${
          isDragOver ? 'bg-indigo-50/40 ring-2 ring-indigo-500 ring-inset' : ''
        }`}
      >
        {/* Connection Animation Lines (Animated SVG Overlay) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              {SLOT_COORDINATES.map((slot, index) => {
                const isConnected = slots[index] !== null;
                const { x1, y1, x2, y2, path: trimmedPath } = getTrimmedLine(slot.x, slot.y);
                return (
                  <g key={slot.id}>
                    {/* Background faint guide line */}
                    <line 
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      className={`transition-colors duration-500 ${
                        isConnected ? 'stroke-indigo-500 stroke-[0.4]' : 'stroke-neutral-200 stroke-[0.2]'
                      }`}
                      strokeDasharray={isConnected ? 'none' : '1 1'}
                    />
                    
                    {/* Animated running pulse for active connection */}
                    {isConnected && (
                      <circle cx={x1} cy={y1} r="1.2" className="fill-indigo-600">
                        <animateMotion 
                          path={trimmedPath} 
                          dur="1.5s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Dynamic Drag-over Indicator Mask */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="absolute inset-0 bg-indigo-50/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-30 text-center"
            >
              <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg animate-bounce mb-3">
                <Plus className="w-7 h-7" />
              </div>
              <p className="font-display font-semibold text-indigo-950 text-sm">
                Drop app here to integrate with Wozku!
              </p>
              <p className="text-xs text-indigo-600 mt-1">
                Snaps automatically into the next available channel
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 bg-white border border-neutral-200 shadow-md p-3 rounded-2xl w-16 h-16 flex items-center justify-center hover:border-indigo-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <img src={logoMarkWhite} className="w-10 h-10 object-contain" alt="Wozku Logo" />
          {connectedCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          )}
        </div>

        {/* 6 Grid Slots (Placed using precise percent positioning) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="relative w-full h-full max-w-lg mx-auto">
            {SLOT_COORDINATES.map((slot, index) => {
              const activeApp = slots[index];
              const isLeft = slot.x < 50;

              return (
                <div 
                  key={slot.id}
                  style={{
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300`}
                >
                  <AnimatePresence mode="wait">
                    {activeApp ? (
                      <motion.div
                        key={activeApp.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={() => removeSlot(index)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Disconnect ${activeApp.name} pipeline`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            removeSlot(index);
                          }
                        }}
                        className={`group relative z-10 bg-white border border-indigo-400 rounded-2xl p-3.5 shadow-md flex items-center justify-center cursor-pointer hover:border-red-400 hover:scale-105 transition-all w-16 h-16 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500`}
                      >
                        {activeApp.logo}
                        
                        {/* Interactive Trash disconnect hover button */}
                        <div className="absolute inset-0 bg-red-50/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
 
                        {/* Connection indicator */}
                        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-indigo-500 border-2 border-white" />
                      </motion.div>
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-2xl relative z-10 border border-dashed border-neutral-300 bg-neutral-50/50 flex items-center justify-center transition-colors hover:border-indigo-400/80 hover:bg-indigo-50/10 cursor-default"
                        title="Empty Connection Slot"
                      >
                        <Plus className="w-5 h-5 text-neutral-300" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sandbox Help Banner */}
        <div className="absolute bottom-6 bg-white/95 border border-neutral-150 px-4 py-2.5 rounded-xl shadow-2xs text-[11px] text-neutral-500 z-10 flex items-center gap-2 max-w-xs text-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse shrink-0" />
          <span className="font-medium">
            {connectedCount === 0 
              ? 'Status: Drag apps here to connect live streams.' 
              : `Connected pipelines: ${connectedCount} of 6`}
          </span>
        </div>

        {/* Toast feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className={`absolute top-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-xl border shadow-md text-xs font-semibold flex items-center gap-2 ${
                toastMessage.success 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {toastMessage.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <HelpCircle className="w-4 h-4 text-amber-600" />
              )}
              <span>{toastMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ================= COLUMN 3 (Right): Draggable Apps Palette ================= */}
      <div className="md:col-span-3 flex flex-col bg-white">
        
        {/* Top Half: Draggable App Cards Grid */}
        <div className="p-6 flex-1 flex flex-col justify-center space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
              Integrations Hub
            </span>
            <p className="text-xs text-neutral-500">
              Drag apps into the pipeline network to connect them.
            </p>
          </div>

          {/* Draggable Apps Grid - Pure icons (No titles/descriptions) */}
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DRAGGABLE_APPS.map((app) => {
              const isUsed = slots.some((s) => s && s.id === app.id);
              return (
                <div
                  key={app.id}
                  draggable={!isUsed}
                  onDragStart={(e) => handleDragStart(e, app)}
                  tabIndex={isUsed ? -1 : 0}
                  role="button"
                  aria-label={`Integrate ${app.name}`}
                  onKeyDown={(e) => {
                    if (isUsed) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const emptyIndex = slots.findIndex((s) => s === null);
                      if (emptyIndex === -1) {
                        showToast('All integration channels are occupied. Disconnect one to add another.', false);
                        return;
                      }
                      if (!app.canIntegrate) {
                        showToast(`Cannot integrate ${app.name}: ${app.unsupportedReason}`, false);
                        return;
                      }
                      const updatedSlots = [...slots];
                      updatedSlots[emptyIndex] = app;
                      setSlots(updatedSlots);
                      playConnectionSound();
                      showToast(`Successfully integrated ${app.name} with Wozku!`, true);
                    }
                  }}
                  className={`group relative border rounded-2xl p-4 flex items-center justify-center transition-all duration-200 shadow-3xs select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isUsed 
                      ? 'bg-neutral-50/50 border-neutral-200 opacity-30 cursor-not-allowed' 
                      : `${app.color} border-neutral-200 hover:shadow-xs cursor-grab active:cursor-grabbing`
                  }`}
                >
                  {app.logo}

                  {/* Clean CSS-based mini tooltip showing name on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#0c0c0e] border border-white/10 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 font-medium">
                    {app.name} {!app.canIntegrate ? '(Unsupported)' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Half: Isometric wireframe drawing (Matches design aesthetic) */}
        <div 
          style={{
            backgroundImage: 'linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
          className="h-44 border-t border-neutral-200 flex items-center justify-center relative overflow-hidden bg-slate-50/20"
        >
          {/* Wireframe drawing perfectly rendered inside a slate grid */}
          <svg viewBox="0 0 160 160" className="w-36 h-36 relative z-10" fill="none" stroke="currentColor">
            <g className="text-neutral-400 stroke-[1.2]" strokeLinecap="round" strokeLinejoin="round">
              {/* Left Wing isometric projection */}
              <path d="M 40,95 L 40,115 L 56,123 L 56,103 Z" fill="white" />
              <path d="M 40,95 L 56,87 L 72,95 L 56,103 Z" fill="white" />
              <path d="M 56,103 L 72,95 L 72,115 L 56,123 Z" fill="white" />
              
              {/* Right Wing isometric projection */}
              <path d="M 104,103 L 104,123 L 120,115 L 120,95 Z" fill="white" />
              <path d="M 88,95 L 104,103 L 120,95 L 104,87 Z" fill="white" />
              <path d="M 88,95 L 88,115 L 104,123 L 104,103 Z" fill="white" />

              {/* Central body block */}
              <path d="M 56,75 L 56,115 L 80,127 L 80,87 Z" fill="white" />
              <path d="M 80,87 L 80,127 L 104,115 L 104,75 Z" fill="white" />
              <path d="M 56,75 L 80,63 L 104,75 L 80,87 Z" fill="white" />

              {/* Top Cap raised plate */}
              <path d="M 64,55 L 64,63 L 80,71 L 80,63 Z" fill="white" />
              <path d="M 80,63 L 80,71 L 96,63 L 96,55 Z" fill="white" />
              <path d="M 64,55 L 80,47 L 96,55 L 80,63 Z" fill="white" />
            </g>
          </svg>
        </div>

      </div>

    </div>
  );
}
