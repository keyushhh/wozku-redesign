import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navigateTo } from '../lib/router';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { siRedhat, siAutodesk } from 'simple-icons';

import salesforceLogo from '../assets/logos/salesforce.svg?raw';
import confluentLogo from '../assets/logos/confluent.svg?raw';
import rubrikLogo from '../assets/logos/rubrik.svg?raw';
import sentineloneLogo from '../assets/logos/sentinelone.svg?raw';
import hpeLogo from '../assets/logos/hpe.svg?raw';
import veeamLogo from '../assets/logos/veeam.svg?raw';

const ENTERPRISE_LOGOS = [
  { type: 'local', rawSvg: salesforceLogo, name: 'Salesforce', color: '#00A1E0' },
  { type: 'simple-icon', icon: siRedhat, name: 'Red Hat', color: '#EE0000' },
  { type: 'simple-icon', icon: siAutodesk, name: 'Autodesk', color: '#0696D7' },
  { type: 'local', rawSvg: rubrikLogo, name: 'Rubrik', color: '#00A3E0' },
  { type: 'local', rawSvg: confluentLogo, name: 'Confluent', color: '#00A2DF' },
  { type: 'local', rawSvg: sentineloneLogo, name: 'SentinelOne', color: '#FF3366' },
  { type: 'local', rawSvg: hpeLogo, name: 'HPE', color: '#00B06F' },
  { type: 'local', rawSvg: veeamLogo, name: 'Veeam', color: '#00B159' }
];

export default function WhyWozkuPage() {
  const [activeUgcStep, setActiveUgcStep] = useState<number>(0);
  const [selectedNotModule, setSelectedNotModule] = useState<string>('social');

  const ugcSteps = [
    {
      title: '1. Guidance Parameters',
      desc: 'Set topics, compliance bounds, and target links.',
      badge: 'Step 1: Orchestrate'
    },
    {
      title: '2. AI Content Studio',
      desc: 'Generate 5-10 pre-vetted brand-compliant variations.',
      badge: 'Step 2: Diversify'
    },
    {
      title: '3. One-Click Edits',
      desc: 'Advocates customize copy and approve with a single tap.',
      badge: 'Step 3: Authenticate'
    },
    {
      title: '4. Instant Broadcast',
      desc: 'Publish directly to LinkedIn without copy-pasting.',
      badge: 'Step 4: Distribute'
    },
    {
      title: '5. Telemetry Analytics',
      desc: 'Track reach and click conversions back to CRM pipelines.',
      badge: 'Step 5: Attribute'
    }
  ];

  const whatWozkuIsnt = [
    {
      id: 'social',
      title: 'Social Media Management Tools',
      confusedWith: 'Queue managers and publishers (e.g., Hootsuite, Sprout Social).',
      whyDifferent: 'Social media management tools are designed to schedule and publish corporate content to your brand\'s owned handles. Wozku is built to mobilize external human networks (employees, partners, event attendees) to publish trusted updates on their personal feeds, driving organic amplification that algorithms naturally prioritize.',
      outcome: 'Corporate scheduling vs. Human network activation.'
    },
    {
      id: 'influencer',
      title: 'Influencer Marketing Platforms',
      confusedWith: 'Creator marketplaces and paid outreach networks.',
      whyDifferent: 'Influencer platforms pay outsiders for transactional exposure. Wozku activates your existing community—partners, customers, and team members who already know and love your brand. By turning internal and external stakeholders into advocates, you leverage real relationship equity rather than paid advertising sponsorships.',
      outcome: 'Rented audience sponsorships vs. Owned relationship equity.'
    },
    {
      id: 'referral',
      title: 'Referral Software',
      confusedWith: 'Affiliate tracking networks and simple lead-bounty tools.',
      whyDifferent: 'Referral software focuses strictly on one-off lead bounties and transactional tracking. Wozku builds ongoing advocacy loops that compound organic impressions, thought leadership, and brand authority over time, rather than rewarding isolated link shares.',
      outcome: 'Transactional tracking codes vs. Compounding brand authority.'
    },
    {
      id: 'event',
      title: 'Event Technology Platforms',
      confusedWith: 'Ticketing systems and virtual webinar hosts.',
      whyDifferent: 'Event tech manages logistics, registration pages, and badge scans. Wozku integrates directly into these moments to make your event trend globally, converting attendees into real-time content creators through live leaderboards and guided UGC templates.',
      outcome: 'Logistics management vs. Viral real-time distribution.'
    }
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-hidden selection:bg-primary-500/10 selection:text-primary-900 animate-fadeIn">
      
      {/* ── 1. HERO SECTION (Tighter Spacing, Solid Color Heading) ───────── */}
      <section className="relative pt-16 pb-12 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Soft elegant line decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        
        <div className="max-w-4xl space-y-6 relative z-10 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-extrabold border border-neutral-200 px-4.5 py-1.5 rounded-full bg-neutral-50/50">
              Strategic Briefing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-neutral-900"
          >
            The shift from paid reach <br />
            <span className="text-emerald-600">
              to trusted advocacy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Corporate feeds are losing their algorithmic distribution, and rented ads yield shrinking returns. Modern enterprise brands choose Wozku to unlock the collective reach of their community—converting employees, partners, and customers into a permanent, measurable pipeline engine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-850 text-white text-xs font-bold px-8 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              Request a briefing <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { navigateTo('/resources/roi-calculator'); }}
              className="w-full sm:w-auto border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-bold px-8 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              Analyze ROI models <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ENTERPRISE LOGO STRIP (Quiet trust transition) ────────────── */}
      <section className="py-8 border-y border-neutral-100 bg-neutral-50/20 overflow-hidden relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Infinite scrolling logo row with genuine companies */}
        <div className="flex w-[200%] gap-16 items-center justify-around animate-none hover:[animation-play-state:paused]" style={{
          animation: 'marquee-why 40s linear infinite',
          display: 'flex',
          whiteSpace: 'nowrap'
        }}>
          {[...ENTERPRISE_LOGOS, ...ENTERPRISE_LOGOS, ...ENTERPRISE_LOGOS].map((logo, idx) => (
            <div key={idx} style={{ color: logo.color }} className="flex-shrink-0 flex items-center justify-center transition-colors duration-250 opacity-40 hover:opacity-85 transition-all duration-200">
              {logo.type === 'local' ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: logo.rawSvg }} 
                  className="h-6 w-auto flex items-center justify-center fill-current [&>svg]:h-6 [&>svg]:w-auto [&>svg]:max-w-28"
                />
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: logo.icon.svg }} 
                  className="h-6 w-6 flex items-center justify-center fill-current [&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-current"
                />
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee-why {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}</style>
      </section>      {/* ── 3. PHILOSOPHIES SPREAD (Premium Card Split Layout) ────────── */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column A: Without Wozku (Legacy Path Card) */}
          <div className="bg-neutral-50/50 border border-neutral-150 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between space-y-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-neutral-450 font-extrabold uppercase bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
                The Legacy Path
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
                Renting Attention
              </h2>
              <p className="text-xs text-neutral-550 leading-relaxed max-w-sm">
                Relying entirely on corporate broadcast profiles and high-frequency paid advertising to capture market visibility.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Manual Execution', desc: 'Marketing managers spend hours chasing shares and manually tracking logs.' },
                { title: 'Scattered Distribution', desc: 'Advocates copypaste raw text assets or queue disjointed updates.' },
                { title: 'Social Guesswork', desc: 'Relying on vanity metric tallies with zero direct visibility into pipeline.' },
                { title: 'Individual Posts', desc: 'Isolated profiles share text that fails to capture compounding priority.' },
                { title: 'Broadcasting Noise', desc: 'Cold corporate handles shout to rented lists of cold leads.' }
              ].map((item, idx) => (
                <div key={idx} className="group p-4 bg-white border border-neutral-200/60 rounded-xl transition-all duration-200 hover:border-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">0{idx + 1}</span>
                    <h3 className="text-xs font-bold text-neutral-800">{item.title}</h3>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed mt-1.5 pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: With Wozku (The Advocacy Engine Card) */}
          <div className="bg-[#09090f] text-white border border-white/10 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between space-y-10 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-primary-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase bg-emerald-950/45 border border-emerald-900/30 px-3 py-1 rounded-full">
                The Advocacy Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Owned Networks
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Activating employee and partner influence at scale using structured, brand-safe distribution loops.
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { title: 'Automated Loops', desc: 'Guided campaigns launch across enterprise channels in seconds.' },
                { title: 'Coordinated Advocacy', desc: 'Organized releases ensure multiple profiles publish on-brand content simultaneously.' },
                { title: 'CFO-Level Attribution', desc: 'Trace every organic link, impression, and register back to Salesforce.' },
                { title: 'Network Activation', desc: 'Leverage peer-to-peer sharing loops to scale organic impressions exponentially.' },
                { title: 'Human Proof', desc: 'Leverage genuine community trust to earn higher conversions and lower CPL.' }
              ].map((item, idx) => (
                <div key={idx} className="group p-4 bg-white/5 border border-white/10 rounded-xl transition-all duration-200 hover:border-white/20">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">0{idx + 1}</span>
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed mt-1.5 pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* ── 4. GUIDED UGC LIFECYCLE (Compressed Layout) ──────────────────── */}
      <section className="py-24 bg-neutral-50/50 border-y border-neutral-100 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-primary-600 font-extrabold uppercase">
              Guided UGC Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              One fluid loop. Complete alignment.
            </h2>
            <p className="text-xs text-neutral-500 max-w-2xl font-normal leading-relaxed">
              Understand the entire advocacy lifecycle without the operational jargon. We combine brand guardrails with human customization to build trusted outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection - Left (Significantly Compressed) */}
            <div className="lg:col-span-5 space-y-1.5">
              {ugcSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveUgcStep(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-1 ${
                    activeUgcStep === idx
                      ? 'bg-primary-50/50 border-primary-500/60 shadow-xs'
                      : 'bg-transparent border-transparent hover:bg-neutral-50'
                  }`}
                >
                  <h3 className={`text-xs font-bold transition-colors ${
                    activeUgcStep === idx ? 'text-primary-650' : 'text-neutral-700'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-[10px] leading-relaxed font-normal transition-colors ${
                    activeUgcStep === idx ? 'text-primary-900/70' : 'text-neutral-500'
                  }`}>
                    {step.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Illustration Board - Right (Clean UI Visual) */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 shadow-xs relative min-h-[320px] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Pagination Chevrons on Bottom Corners */}
              <button
                disabled={activeUgcStep === 0}
                onClick={() => setActiveUgcStep(prev => Math.max(0, prev - 1))}
                className={`absolute bottom-5 left-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeUgcStep === 0
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                }`}
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                disabled={activeUgcStep === ugcSteps.length - 1}
                onClick={() => setActiveUgcStep(prev => Math.min(ugcSteps.length - 1, prev + 1))}
                className={`absolute bottom-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeUgcStep === ugcSteps.length - 1
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                }`}
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUgcStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 flex-1 flex flex-col justify-between"
                >
                  {activeUgcStep === 0 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider">MARKETER DASHBOARD</span>
                        <span className="text-[9px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">Config Active</span>
                      </div>
                      <div className="space-y-3 bg-neutral-50/80 p-4 rounded-xl border border-neutral-150/70">
                        <div className="text-[11px] font-bold text-neutral-800">Campaign: "Product Launch 2026"</div>
                        <div className="grid grid-cols-2 gap-2 text-[9px]">
                          <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                            <span className="text-neutral-400 block font-medium">Outbound Target</span>
                            <span className="font-extrabold text-neutral-800">LinkedIn Networks</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                            <span className="text-neutral-400 block font-medium">Telemetry ID</span>
                            <span className="font-extrabold text-neutral-800">Woz-Link Tracking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUgcStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider">AI CONTENT GENERATION</span>
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">Vetted</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 bg-primary-50/40 border border-primary-150 rounded-xl text-[11px] space-y-0.5">
                          <span className="text-[8px] font-mono font-bold text-primary-600 uppercase">Path A: Technical</span>
                          <p className="text-neutral-750 font-sans">"We just scaled our network infrastructure to serve millions. Read the engineering design..."</p>
                        </div>
                        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[11px] space-y-0.5 opacity-70">
                          <span className="text-[8px] font-mono font-bold text-neutral-450 uppercase">Path B: Thought Leadership</span>
                          <p className="text-neutral-650 font-sans">"Scale shouldn\'t break workflows. How we rebuilt our pipeline infrastructure to scale..."</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUgcStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider">ADVOCATE VIEW</span>
                        <span className="text-[9px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">Personalization</span>
                      </div>
                      <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-bold text-neutral-600">JR</span>
                          <div>
                            <span className="text-[9.5px] font-bold block text-neutral-800">James Harlow</span>
                            <span className="text-[7.5px] text-neutral-400 block font-medium">VP Sales, Forma Cloud</span>
                          </div>
                        </div>
                        <div className="p-2.5 bg-white border border-neutral-350/50 rounded-lg text-[11px] relative">
                          <span className="absolute -top-1.5 -right-1 text-[8px] bg-primary-500 text-white font-bold px-1 py-0.5 rounded">Edited</span>
                          <p className="text-neutral-800 font-medium">
                            "We just scaled our network infrastructure. <span className="bg-primary-50 text-primary-700 font-semibold px-1 rounded">Thrilled with how our squad handled it!</span> Read the engineering design..."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUgcStep === 3 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider">LINKEDIN BROADCAST</span>
                        <span className="text-[9px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">Live Stream</span>
                      </div>
                      <div className="p-3.5 border border-neutral-200/80 rounded-xl shadow-xs space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-bold text-neutral-600">JR</span>
                          <div>
                            <span className="text-[9.5px] font-bold block text-neutral-850">James Harlow</span>
                            <span className="text-[7.5px] text-neutral-400 block font-medium">VP Sales, Forma Cloud</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-700 font-sans leading-relaxed">
                          "We just scaled our network infrastructure. Thrilled with how our squad handled it! Read the engineering design..."
                        </p>
                      </div>
                    </div>
                  )}

                  {activeUgcStep === 4 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider">PIPELINE METRICS</span>
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Attributed</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                          <span className="text-[8px] font-mono text-neutral-400 block font-bold">REACH</span>
                          <span className="text-sm font-black text-neutral-900 block mt-0.5">2.1M+</span>
                        </div>
                        <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                          <span className="text-[8px] font-mono text-neutral-400 block font-bold">CLICKS</span>
                          <span className="text-sm font-black text-neutral-900 block mt-0.5">15.4K</span>
                        </div>
                        <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                          <span className="text-[8px] font-mono text-neutral-400 block font-bold">NEW PIPELINE</span>
                          <span className="text-sm font-black text-primary-600 block mt-0.5">$124K</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

               {/* Minimal navigation dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {ugcSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveUgcStep(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeUgcStep === idx ? 'w-4.5 bg-emerald-600' : 'w-1.5 bg-neutral-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. POSITIONING MATRIX ("What Wozku isn't") ────────────────────── */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-primary-600 font-extrabold uppercase">
              Positioning Clear
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              What Wozku isn't.
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
              Because advocacy is a broad term, buyers often confuse us with adjacent technologies. Here is why Wozku is a fundamentally different channel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Category selection - Left */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0">
              {whatWozkuIsnt.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedNotModule(cat.id)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer flex-shrink-0 lg:flex-shrink-1 font-bold text-xs whitespace-nowrap lg:whitespace-normal ${
                    selectedNotModule === cat.id
                      ? 'bg-neutral-900 border-neutral-900 text-white'
                      : 'bg-transparent border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Contrast Details - Right */}
            <div className="lg:col-span-8 bg-neutral-50/70 border border-neutral-200 rounded-2xl p-6 sm:p-8 min-h-[220px] flex flex-col justify-between">
              {whatWozkuIsnt.map((cat) => {
                if (cat.id !== selectedNotModule) return null;
                return (
                  <div key={cat.id} className="space-y-4">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">
                        Often confused with
                      </span>
                      <h3 className="text-sm font-bold text-neutral-800">
                        {cat.confusedWith}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {cat.whyDifferent}
                    </p>

                    <div className="pt-3.5 border-t border-neutral-200 flex items-center gap-2.5">
                      <div className="h-4.5 w-4.5 rounded bg-primary-50 border border-primary-150 flex items-center justify-center text-primary-650 shrink-0">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold text-neutral-850">
                        {cat.outcome}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. EDITORIAL CASE STUDIES (Salesforce Featured) ────────────────── */}
      <section className="py-24 bg-neutral-900 text-white px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-primary-400 font-extrabold uppercase">
                Case Briefings
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Real stories. Quantifiable scale.
              </h2>
              <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-normal">
                How high-growth enterprise brands leverage advocacy to generate measurable pipelines without ad spend.
              </p>
            </div>
            
            {/* Secondary CTA Button linking to Case Studies Page */}
            <div>
              <button
                onClick={() => { navigateTo('/insights/case-studies'); }}
                className="inline-flex items-center gap-1.5 border border-white/20 hover:border-white/35 hover:bg-white/5 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                View all case studies <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Featured Story: Salesforce (col-span-7) */}
            <div className="lg:col-span-7 bg-[#141418] border border-white/10 rounded-2xl p-6 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-primary-400 font-bold bg-primary-950 border border-primary-900 px-3 py-1 rounded-full uppercase tracking-wider">
                    FEATURED OUTCOME
                  </span>
                  <span className="text-[10px] font-mono text-neutral-450 font-bold">11× ROI</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                  Salesforce drives 10.7M+ potential reach through embedded post-conversion advocacy flows.
                </h3>
                <p className="text-xs text-neutral-450 leading-relaxed font-medium">
                  By embedding Wozku directly into post-conversion flows, Salesforce activated attendees to share invitations with their peers. This friction-free interaction drove 23.3K clicks and 46.2K reactions, generating substantial pipeline reach with zero paid ads.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div>
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase">Conversion Reach</span>
                  <span className="text-lg sm:text-xl font-black text-white block mt-0.5">26%</span>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase">Total Reach</span>
                  <span className="text-lg sm:text-xl font-black text-white block mt-0.5">10.7M</span>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase">ROI Multiplier</span>
                  <span className="text-lg sm:text-xl font-black text-primary-455 block mt-0.5">11×</span>
                </div>
              </div>
            </div>

            {/* Supporting Hierarchy: Red Hat & Women in Cloud (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Supporting Story 1: Red Hat */}
              <div className="bg-[#141418] border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-wider">Event Acquisition</span>
                    <span className="text-[9px] font-mono text-emerald-450 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30 font-bold">987 Registrations</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-sans leading-snug">
                    Red Hat earns 987 net-new registrations with $0 paid media.
                  </h4>
                  <p className="text-xs text-neutral-450 leading-relaxed font-medium">
                    Leveraged live attendee invites in real time to generate over 500K+ potential reach during regional activation events.
                  </p>
                </div>
              </div>

              {/* Supporting Story 2: Women in Cloud */}
              <div className="bg-[#141418] border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-wider">Community Scale</span>
                    <span className="text-[9px] font-mono text-primary-450 bg-primary-950/30 px-2 py-0.5 rounded border border-primary-900/30 font-bold">Guinness Records</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-sans leading-snug">
                    Women in Cloud scales reach to 3.9M across 80+ countries.
                  </h4>
                  <p className="text-xs text-neutral-450 leading-relaxed font-medium">
                    Mobilized over 120K community members, earning 9.7K clicks and contributing to two Guinness World Records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PREMIUM CTA BANNER ─────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 lg:px-12 pb-24 pt-16">
        <div className="max-w-5xl mx-auto bg-neutral-950 text-white rounded-[2rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />
          <div className="absolute top-0 right-0 h-64 w-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[8px] uppercase font-mono tracking-widest text-primary-400 font-extrabold bg-primary-950 border border-primary-900/50 px-4 py-1.5 rounded-full">
              Let\'s talk strategy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Ready to transition to owned distribution?
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
              Join leading enterprise brands scaling their organic growth channel. No slides. Just structured pipeline outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Schedule a briefing <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { navigateTo('/pricing'); }}
                className="w-full sm:w-auto border border-white/20 hover:border-white/35 text-neutral-350 hover:text-white text-xs font-bold px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              >
                View pricing models
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
