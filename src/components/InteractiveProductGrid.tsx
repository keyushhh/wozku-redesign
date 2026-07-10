import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Lock, 
  Plus, 
  ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import slackLogo from '../assets/slack.svg';
import hubspotLogo from '../assets/hubspot.svg';
import zapierLogo from '../assets/zapier.svg';
import notionLogo from '../assets/notion.svg';
import stripeLogo from '../assets/stripe.svg';
import linkedinLogo from '../assets/linkedin.svg';
import gmailLogo from '../assets/gmail.svg';
import outlookLogo from '../assets/outlook.svg';

export default function InteractiveProductGrid() {
  // Card 1: Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Active Directory Sync', checked: true },
    { id: 2, label: 'Partner Group Whitelist', checked: true },
    { id: 3, label: 'Employee Invite Sent', checked: false },
    { id: 4, label: 'Points Leaderboard Live', checked: true },
    { id: 5, label: 'GDPR Compliance Check', checked: false },
    { id: 6, label: 'SSO Identity Verification', checked: true },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Card 2: Concentric loop state
  const [loopActive, setLoopActive] = useState(true);

  // Card 3: Form metadata state
  const [titleInput, setTitleInput] = useState('Herbal Therapy');
  const [complianceActive, setComplianceActive] = useState(true);

  // Card 4: Integration state (which apps are connected)
  const [connectedApps, setConnectedApps] = useState<Record<string, boolean>>({
    slack: true,
    hubspot: true,
    zapier: false,
    notion: true,
    stripe: false,
    linkedin: true,
    gmail: true,
    outlook: false
  });

  const toggleConnect = (app: string) => {
    setConnectedApps(prev => ({ ...prev, [app]: !prev[app] }));
  };

  return (
    <div className="grid grid-cols-12 gap-6 w-full auto-rows-fr">
      
      {/* CARD 1: ADVOCATE DIRECTORY (Left, Tall, Dark) */}
      <div className="col-span-12 md:col-span-3 row-span-1 md:row-span-2 bg-[#0c0c0e] border border-fixed-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative group hover:border-fixed-white/20 transition-all duration-300 shadow-sm min-h-[480px]">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />
        
        {/* Slanted Checklist Preview Panel */}
        <div className="relative h-56 w-full overflow-visible">
          <div 
            className="absolute top-4 right-[-10%] w-[120%] transform rotate-[-10deg] -skew-x-12 origin-top-right flex flex-col gap-2.5 transition-transform duration-500 group-hover:scale-[1.01]"
          >
            {checklist.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  item.checked 
                    ? 'bg-[#18181b] border-indigo-500/35 text-fixed-light' 
                    : 'bg-[#121215]/80 border-fixed-white/10 text-fixed-muted hover:border-fixed-white/20'
                }`}
                style={{
                  opacity: idx === 0 ? 0.3 : idx === 5 ? 0.5 : 1,
                  transform: `translateX(${idx * 4}px)`
                }}
              >
                <div className={`h-4.5 w-4.5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                  item.checked 
                    ? 'bg-[#F27E31]/10 border-[#F27E31] text-[#F27E31]' 
                    : 'border-neutral-700 text-transparent'
                }`}>
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2 relative z-10 pt-4">
          <h4 className="font-display font-bold text-base text-fixed-white/90">Advocate directory</h4>
          <p className="text-xs text-fixed-light/70 leading-relaxed font-sans">
            Sync organization tables, map invite tokens, and segment corporate squad filters within seconds.
          </p>
        </div>
      </div>

      {/* CARD 2: AUTOMATED LOOP (Middle Top, Square, Light) */}
      <div className="col-span-12 md:col-span-3 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs">
        {/* Concentric loops panel */}
        <div className="relative h-40 w-full flex items-center justify-center">
          
          {/* Loop Concentric Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                animate={loopActive ? {
                  scale: [1, 1.05, 0.95, 1],
                  opacity: [0.35, 0.6, 0.35, 0.35],
                } : {}}
                transition={{
                  duration: 4 + ring * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute border border-neutral-100 rounded-full"
                style={{
                  width: `${ring * 52}px`,
                  height: `${ring * 52}px`,
                }}
              />
            ))}
          </div>

          {/* Central Loop Button */}
          <button 
            onClick={() => setLoopActive(!loopActive)}
            className={`relative z-10 h-14 w-14 rounded-full bg-white border flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:scale-105 active:scale-95 cursor-pointer ${
              loopActive ? 'border-neutral-200 text-neutral-800' : 'border-neutral-150 text-neutral-400'
            }`}
          >
            <motion.div
              animate={loopActive ? { rotate: 360 } : {}}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Share2 className="h-5 w-5" />
            </motion.div>
            
            {loopActive && (
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center animate-pulse" />
            )}
          </button>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-base text-neutral-900">Neural intelligence</h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Scale dynamic post routing and auto-trigger campaigns to target advocate circles.
          </p>
        </div>
      </div>

      {/* CARD 3: AI CONTENT STUDIO (Right Top, Wide, Dark) */}
      <div className="col-span-12 md:col-span-6 bg-[#0c0c0e] border border-fixed-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative group hover:border-fixed-white/20 transition-all duration-300 shadow-sm min-h-[280px]">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />

        {/* Studio Editor Preview Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center w-full relative z-10">
          
          {/* Left side: Post Card Preview */}
          <div className="sm:col-span-7 bg-[#141418] border border-fixed-white/15 rounded-2xl p-4 space-y-3.5 shadow-md relative overflow-hidden">
            {/* Visual Header image block */}
            <div className="h-28 w-full rounded-lg bg-[#111116] border border-fixed-white/10 overflow-hidden relative group-hover:border-fixed-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080b]/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-fixed-muted uppercase tracking-widest font-extrabold bg-[#1a1a24]/30">
                Wozku Campaign
              </div>
              
              {/* Floating badges overlay */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 z-25">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wide bg-[#27272a] text-fixed-light border border-fixed-white/10 px-2 py-0.5 rounded-full">
                  Beauty & Cosmetics
                </span>
              </div>
              <div className="absolute top-2 left-2 flex items-center gap-1.5 z-25">
                <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-[#F27E31]/10 border-[#F27E31]/30 text-[#F27E31] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Optimizing with AI
                </span>
              </div>
            </div>

            {/* Badges and tags */}
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => setComplianceActive(!complianceActive)}
                className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                  complianceActive 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-[#24242a] border-fixed-white/15 text-fixed-muted'
                }`}
              >
                {complianceActive ? 'Compliance Approved' : 'Draft mode'}
              </button>
            </div>
          </div>

          {/* Right side: Fields metadata preview */}
          <div className="sm:col-span-5 space-y-4">
            <div>
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-fixed-muted block mb-1">
                Campaign Title
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full bg-[#141418] border border-fixed-white/10 rounded-xl px-3 py-2 text-xs text-fixed-white/80 font-semibold focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="h-1 bg-fixed-white/80 rounded-full w-[85%]" />
              <div className="h-1 bg-fixed-white/80 rounded-full w-[65%]" />
              <div className="h-1 bg-fixed-white/65 rounded-full w-[45%]" />
            </div>
          </div>

        </div>

        {/* Text Area */}
        <div className="space-y-2 pt-6 relative z-10 border-t border-fixed-white/10">
          <h4 className="font-display font-bold text-base text-fixed-white/90">Product optimization</h4>
          <p className="text-xs text-fixed-light/70 leading-relaxed font-sans">
            Build and audit pre-approved templates that advocates share with one click.
          </p>
        </div>
      </div>

      {/* CARD 4: WORKFLOW INTEGRATIONS (Middle Bottom, Wide, Light) */}
      <div className="col-span-12 md:col-span-5 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[260px]">
        {/* Integrations pills grid container */}
        <div className="relative h-32 w-full flex flex-col justify-center overflow-hidden">
          <div className="flex flex-wrap gap-2.5 justify-center py-2">
            {[
              { id: 'slack', name: 'Slack', logo: slackLogo },
              { id: 'hubspot', name: 'HubSpot', logo: hubspotLogo },
              { id: 'zapier', name: 'Zapier', logo: zapierLogo },
              { id: 'notion', name: 'Notion', logo: notionLogo },
              { id: 'stripe', name: 'Stripe', logo: stripeLogo },
              { id: 'linkedin', name: 'LinkedIn', logo: linkedinLogo },
              { id: 'gmail', name: 'Gmail', logo: gmailLogo },
              { id: 'outlook', name: 'Outlook', logo: outlookLogo },
            ].map((app) => {
              const isConnected = connectedApps[app.id];
              return (
                <button
                  key={app.id}
                  onClick={() => toggleConnect(app.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[11px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    isConnected 
                      ? 'bg-neutral-50 border-neutral-200 text-neutral-800 shadow-2xs' 
                      : 'bg-white border-neutral-150 text-neutral-400 hover:border-neutral-250 opacity-60'
                  }`}
                >
                  <img src={app.logo} className={`h-4.5 w-auto object-contain transition-all ${isConnected ? 'opacity-90' : 'opacity-45 grayscale'}`} alt={app.name} />
                  <span>{app.name}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-base text-neutral-900">Warehouse management</h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Sync connections natively with Slack, Microsoft Teams, HubSpot, and Salesforce.
          </p>
        </div>
      </div>

      {/* CARD 5: TRUST & COMPLIANCE (Right Bottom, Square/Tall, Light) */}
      <div className="col-span-12 md:col-span-4 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[260px]">
        
        {/* Soft Radial Ambient Glow in top right */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-radial-[at_top_right] from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none z-0" />

        {/* Floating pill notifications */}
        <div className="relative h-32 w-full flex flex-col justify-center gap-3.5 z-10 px-2">
          
          {/* Notification 1 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100/80 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
            <div className="h-6 w-6 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <span className="text-[11px] font-bold text-neutral-800 font-sans">Identity check completed</span>
          </div>

          {/* Notification 2 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100/80 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
            <div className="h-6 w-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F27E31] shrink-0">
              <RefreshCw className="h-3.5 w-3.5 stroke-[2.5] animate-spin" />
            </div>
            <span className="text-[11px] font-bold text-neutral-800 font-sans">Checking account history</span>
          </div>

        </div>

        {/* Text Area */}
        <div className="space-y-2 relative z-10 pt-2">
          <h4 className="font-display font-bold text-base text-neutral-900">Built-in security</h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            GDPR compliant tracking parameters and SSO integration whitelist schemas.
          </p>
        </div>
      </div>

    </div>
  );
}
