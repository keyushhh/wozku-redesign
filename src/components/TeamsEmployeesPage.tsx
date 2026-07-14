import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  Send,
  ChevronRight,
  BarChart3,
  Lock,
  Users,
  CheckCircle2,
  Bell,
  Eye,
  Gift
} from 'lucide-react';

import linkedinIconSvg from '../assets/linkedin.svg';

// Custom icons or mock visuals
const slackLogo = "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg";
const teamsLogo = "https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg";

export default function TeamsEmployeesPage() {
  const [activeStoryTab, setActiveStoryTab] = useState<'marketer' | 'employee'>('marketer');
  const [shareState, setShareState] = useState<'idle' | 'sharing' | 'shared'>('idle');

  const handleShareClick = () => {
    if (shareState !== 'idle') return;
    setShareState('sharing');
    setTimeout(() => {
      setShareState('shared');
      setTimeout(() => setShareState('idle'), 3000); // Reset back to idle after 3s
    }, 1500);
  };

  const ugcSteps = [
    {
      step: "STEP ONE",
      title: "Create Campaign",
      desc: "Marketing drafts the campaign and outlines compliant parameters.",
      pill: "Marketer Admin!",
      renderVisual: () => (
        <div className="w-full h-32 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850 flex items-center justify-center p-4 relative shadow-3xs overflow-hidden select-none">
          {/* Mock mini document visual */}
          <div className="w-full space-y-2">
            <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-100 dark:border-neutral-850">
              <div className="h-4 w-4 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center text-[7px] text-emerald-600 dark:text-emerald-450 font-bold">W</div>
              <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
            <div className="h-2.5 w-full bg-neutral-100 dark:bg-neutral-900 rounded" />
            <div className="h-2.5 w-3/4 bg-neutral-100 dark:bg-neutral-900 rounded" />
          </div>
        </div>
      )
    },
    {
      step: "STEP TWO",
      title: "Generate AI Variations",
      desc: "Wozku drafts multiple pre-vetted options to prevent duplicate text.",
      pill: "AI Studio!",
      renderVisual: () => (
        <div className="w-full h-32 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850 flex items-center justify-center p-4 relative shadow-3xs overflow-hidden select-none">
          {/* Mock post list with green tick badge */}
          <div className="w-full space-y-3">
            <div className="p-1.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <div className="h-2 w-20 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <div className="h-3 w-3 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[7px]"><Check className="h-2 w-2 stroke-[4]" /></div>
            </div>
            <div className="p-1.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 flex justify-between items-center opacity-60">
              <div className="h-2 w-16 bg-neutral-300 dark:bg-neutral-750 rounded" />
            </div>
          </div>
        </div>
      )
    },
    {
      step: "STEP THREE",
      title: "Personalize & Publish",
      desc: "Advocates edit pre-approved drafts and share to LinkedIn.",
      pill: "One-Click!",
      renderVisual: () => (
        <div className="w-full h-32 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850 flex items-center justify-center p-4 relative shadow-3xs overflow-hidden select-none">
          {/* Stacked sheets visual */}
          <div className="relative w-16 h-20">
            <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-3xs rotate-3" />
            <div className="absolute inset-0 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs -rotate-2 p-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="h-1 w-8 bg-neutral-300 dark:bg-neutral-750 rounded" />
                <div className="h-1 w-10 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
              <div className="h-3 w-10 bg-emerald-600 rounded-sm text-[5px] text-white flex items-center justify-center font-bold">LinkedIn</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "STEP FOUR",
      title: "Measured Attribution",
      desc: "Track every lead and pipeline dollar back to the individual advocate.",
      pill: "Salesforce Sync!",
      renderVisual: () => (
        <div className="w-full h-32 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850 flex items-center justify-center p-4 relative shadow-3xs overflow-hidden select-none">
          {/* Floating tag pills */}
          <div className="flex flex-col gap-1.5 items-center justify-center">
            <span className="text-[7.5px] font-bold bg-[#09090f] dark:bg-white dark:text-neutral-900 text-white px-2.5 py-1 rounded shadow-md">+ $14K Pipeline</span>
            <span className="text-[7.5px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-850 dark:text-emerald-350 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full">124 Clicks</span>
            <span className="text-[7.5px] font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">Attributed!</span>
          </div>
        </div>
      )
    }
  ];

  const marketerStory = [
    {
      title: "Create Campaign Brief",
      desc: "Input your core announcement, URL, and target keywords. Wozku locks compliant boundaries automatically."
    },
    {
      title: "Generate AI Variation Suite",
      desc: "Create multiple brand-safe post variants instantly so your employees' feeds remain organic and diverse."
    },
    {
      title: "Configure 'Hold & Fire'",
      desc: "Queue multiple posts to release simultaneously, driving immediate velocity to hit the LinkedIn algorithm."
    },
    {
      title: "Measure Real Attribution",
      desc: "Trace every converted lead and pipeline revenue dollar directly back to the individual sharing team member."
    }
  ];

  const employeeStory = [
    {
      title: "Receive Notification Alert",
      desc: "Get a native notification via Slack or MS Teams without logging into a separate advocacy dashboard."
    },
    {
      title: "Review & Refine Draft",
      desc: "View the suggested post variants and edit sections to add personal tone and expertise."
    },
    {
      title: "One-Click Publish",
      desc: "Publish instantly and securely to LinkedIn via verified official OAuth channels in one tap."
    },
    {
      title: "Earn Professional Visibility",
      desc: "Grow personal network reach, build consistent thought leadership, and track Wozku Score rankings."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-hidden selection:bg-emerald-500/10 selection:text-emerald-900 animate-fadeIn">

      {/* ── 1. HERO: EMPLOYEE ACTIVATION (Editorial & Connected Mockups) ── */}
      <section className="relative pt-20 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

        <div className="flex-1 space-y-6 text-left max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase font-mono tracking-widest text-neutral-400 font-extrabold border border-neutral-200 px-4.5 py-1.5 rounded-full bg-neutral-50/50">
              Product Overview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] text-neutral-955"
          >
            Turn team alignment <br />
            <span className="text-emerald-600 dark:text-emerald-500">
              into organic reach.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-neutral-500 leading-relaxed font-normal"
          >
            Your employees have trusted professional networks. Wozku gives marketing teams the tools to safely activate those networks at scale through Guided UGC, coordinated launches, and measurable attribution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2"
          >
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              Request a product briefing <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Hero Visual Mockup: Marketer Panel vs Employee Notification */}
        <div className="flex-1 w-full max-w-xl relative z-10 lg:mt-0">
          <div className="bg-neutral-50 border border-neutral-150 rounded-[2rem] p-6 relative overflow-hidden shadow-xs flex flex-col gap-6">
            
            {/* Marketer Preparing Campaign */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-3xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-neutral-450 uppercase">Marketer Workspace</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Campaign Triggered</span>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl space-y-1.5">
                  <span className="text-[8px] font-mono font-bold text-neutral-455 uppercase">Launch Brief</span>
                  <div className="text-xs font-bold text-neutral-850">"Product Launch 2026"</div>
                  <div className="text-[10px] text-neutral-500 truncate">Target Link: wozku.com/blog/launch-2026</div>
                </div>
              </div>
            </div>

            {/* Connection line decoration */}
            <div className="flex justify-center -my-2">
              <div className="h-8 w-px bg-gradient-to-b from-neutral-300 via-emerald-400 to-emerald-500" />
            </div>
                        {/* Employee Receiving Notification */}
            <div className="bg-[#09090f] text-white border border-white/10 rounded-2xl p-4 shadow-md space-y-3 relative">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img src={slackLogo} className="h-4.5 w-4.5 object-contain" alt="Slack" />
                  <span className="text-[9px] font-mono font-bold text-neutral-400">Slack Notification</span>
                </div>
                <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold">SANDBOX PREVIEW</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <p className="text-[10px] text-neutral-355 leading-relaxed font-sans">
                    Hi Alex! Marketing just shared the launch campaign. Tap to preview and personalize your LinkedIn post:
                  </p>
                  <div className="p-2.5 bg-white text-neutral-800 rounded-lg text-[10px] font-medium space-y-1">
                    <div className="text-[8px] font-mono text-emerald-600 font-bold uppercase">Guided UGC Preview</div>
                    <p className="text-neutral-700 leading-snug">
                      "Excited to share how we built the new network infrastructure at Wozku..."
                    </p>
                  </div>
                  <button
                    onClick={handleShareClick}
                    disabled={shareState !== 'idle'}
                    className={`w-full py-2.5 text-white font-bold text-[10.5px] rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      shareState === 'idle'
                        ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                        : shareState === 'sharing'
                        ? 'bg-emerald-700/80 cursor-wait'
                        : 'bg-emerald-800 text-emerald-200 border border-emerald-500/20'
                    }`}
                  >
                    {shareState === 'idle' && (
                      <>Share to LinkedIn <ArrowRight className="w-3 h-3" /></>
                    )}
                    {shareState === 'sharing' && (
                      <>
                        <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sharing to feed...
                      </>
                    )}
                    {shareState === 'shared' && (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Post Shared Successfully!
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. GUIDED UGC LIFECYCLE (Visual Centerpiece - Bento Style Workflow) ── */}
      <section className="py-24 bg-white border-y border-neutral-100 px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto space-y-4 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase font-mono tracking-widest text-neutral-600 bg-neutral-100 border border-neutral-200 px-4 py-1.5 rounded-full font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 animate-pulse" /> How it works
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
              Start in four steps and grow with community-backed advocacy.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl font-normal leading-relaxed">
              Advocacy succeeds when you combine compliance with authenticity. This is how Wozku balances the marketer's guardrails with the advocate's personal voice.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch relative text-left">
            {ugcSteps.map((step, idx) => (
              <div
                key={idx}
                className="group bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6.5 flex flex-col justify-between space-y-6 relative hover:shadow-xs hover:border-emerald-500/20 dark:hover:border-emerald-500/30 transition-all duration-350"
              >
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-6.5 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-850 text-neutral-600 dark:text-neutral-400 border border-neutral-300/40 dark:border-neutral-700/40 items-center justify-center shadow-3xs">
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold text-neutral-450 dark:text-neutral-500 uppercase">
                      {step.step}
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-extrabold text-neutral-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {step.renderVisual()}

                  <p className="text-[11.5px] text-neutral-550 dark:text-neutral-400 leading-relaxed font-normal font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-block bg-white dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200 text-[9.5px] font-bold px-3.5 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60 shadow-3xs">
                    {step.pill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MARKETER VS EMPLOYEE: CONNECTED STORIES ── */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-emerald-600 font-extrabold uppercase">
              Roles & Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Two connected stories.
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
              Advocacy involves two sides of the same coin. Here is how both teams manage and share campaigns effortlessly.
            </p>
            
            {/* Story Tabs Switcher */}
            <div className="inline-flex p-1 bg-neutral-100 rounded-xl border border-neutral-200/50 mt-4">
              <button
                onClick={() => setActiveStoryTab('marketer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStoryTab === 'marketer' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Marketing Team Story
              </button>
              <button
                onClick={() => setActiveStoryTab('employee')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStoryTab === 'employee' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Employee Story
              </button>
            </div>
          </div>

          {/* Active Story Render Container */}
          <div className="bg-neutral-50 border border-neutral-150 rounded-[2rem] p-6 sm:p-10 min-h-[380px] flex flex-col lg:flex-row items-center gap-10">
            <AnimatePresence mode="wait">
              {activeStoryTab === 'marketer' ? (
                <motion.div
                  key="marketer-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  {/* Marketer UI Mockup */}
                  <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                      <span className="text-[9px] font-mono font-bold text-neutral-450 uppercase">Marketer Console</span>
                      <span className="text-[9.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live Campaigns</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl space-y-2">
                        <div className="text-[10px] font-bold text-neutral-800">Launch Campaign Configuration</div>
                        
                        <div className="space-y-1.5 text-[9px] text-neutral-500 font-sans">
                          <div className="flex justify-between">
                            <span>Compliance Check:</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-0.5"><ShieldCheck className="h-3 w-3" /> Enabled</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Outbound Destination:</span>
                            <span className="text-neutral-800 font-semibold flex items-center gap-0.5">
                              <img src={linkedinIconSvg} className="h-3 w-3" alt="" /> LinkedIn Only
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Channels:</span>
                            <span className="text-neutral-800 font-semibold">Slack, MS Teams</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-1 text-center">
                        <span className="text-[8px] font-mono font-bold text-emerald-650 uppercase">HOLD & FIRE QUEUE</span>
                        <div className="text-sm font-bold text-emerald-950">142 Employees Ready</div>
                      </div>
                    </div>
                  </div>

                  {/* Marketer Story Steps */}
                  <div className="space-y-4">
                    {marketerStory.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-neutral-850">{step.title}</h4>
                          <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="employee-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  {/* Employee UI Mockup */}
                  <div className="bg-[#09090f] text-white border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase">Advocate Hub</span>
                      <span className="text-[9px] font-mono text-emerald-450 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30 font-bold">Wozku Score Rank</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center font-bold text-[10px] text-emerald-400">
                            AM
                          </div>
                          <div>
                            <div className="text-[10px] font-bold">Alex Mercer</div>
                            <div className="text-[8px] text-neutral-400">Engineering Lead</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[8px] font-mono text-neutral-400 uppercase">LEVEL 3</div>
                          <span className="text-[11px] font-bold text-emerald-400 font-mono">1,850 XP</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                        <div className="text-[8px] font-mono text-neutral-400 uppercase">RECENT LINKEDIN ENGAGEMENT</div>
                        <div className="flex justify-between text-[10px] text-neutral-355">
                          <span>Post Reach:</span>
                          <span className="font-bold text-white">4.2K Views</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-355">
                          <span>Clicks Driven:</span>
                          <span className="font-bold text-white">124 Clicks</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employee Story Steps */}
                  <div className="space-y-4">
                    {employeeStory.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-neutral-850">{step.title}</h4>
                          <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 4. WHY EMPLOYEES PARTICIPATE (Editorial) ── */}
      <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase">
              Advocate Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Why employees participate.
            </h2>
            <p className="text-xs text-neutral-400 max-w-2xl font-normal leading-relaxed">
              Corporate incentives like gift cards and rewards are great supporting benefits, but lasting advocacy relies on professional growth and value. Wozku is built to benefit the individual first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Professional Branding",
                desc: "Keep personal channels active and relevant with zero writing block. Wozku provides high-quality variations built to spark real conversations.",
                icon: Award
              },
              {
                title: "Thought Leadership",
                desc: "Establish industry presence by sharing corporate milestones, technology launches, and technical briefings relevant to your peers.",
                icon: Sparkles
              },
              {
                title: "Career Visibility & Recognition",
                desc: "Gain visibility inside the corporate organization. Top contributors are celebrated transparently, creating new GTM connection channels.",
                icon: Users
              }
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6.5 space-y-4 hover:border-white/20 transition-all duration-200"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-emerald-400">
                  <value.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white">{value.title}</h3>
                <p className="text-[11.5px] text-neutral-400 leading-relaxed font-normal">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CAPABILITIES (4-6 High-Quality Product Blocks) ── */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[9px] font-mono tracking-widest text-emerald-600 font-extrabold uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Complete GTM control.
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed font-normal">
            No feature dumping. Only highly focused capabilities structured to run enterprise-grade communities securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Block 1 */}
          <div className="bg-white border border-neutral-200 hover:border-emerald-500/20 hover:shadow-xs transition-all duration-200 rounded-3xl p-6.5 space-y-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Guided UGC Guardrails</h3>
              <p className="text-[11.5px] text-neutral-500 leading-relaxed font-normal">
                Lock core compliance sentences and links while leaving open fields for personalized wording, ensuring brand safety.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] font-medium text-neutral-400 font-sans">
              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block mb-1">Outcome</span>
              Compliant employee posts with unique, authentic human delivery.
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white border border-neutral-200 hover:border-emerald-500/20 hover:shadow-xs transition-all duration-200 rounded-3xl p-6.5 space-y-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">AI Variation Studio</h3>
              <p className="text-[11.5px] text-neutral-500 leading-relaxed font-normal">
                Instantly draft up to 5 compliance-vetted variations of your announcement to avoid spamming the LinkedIn feed with duplicate text.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] font-medium text-neutral-400 font-sans">
              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block mb-1">Outcome</span>
              Higher LinkedIn algorithm weight via diverse, non-duplicate content.
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white border border-neutral-200 hover:border-emerald-500/20 hover:shadow-xs transition-all duration-200 rounded-3xl p-6.5 space-y-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Send className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-950">Hold & Fire Launch Queue</h3>
              <p className="text-[11.5px] text-neutral-500 leading-relaxed font-normal">
                Schedule multiple advocates' posts to go live simultaneously, generating a wave of social proof that elevates visibility.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] font-medium text-neutral-400 font-sans">
              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block mb-1">Outcome</span>
              Maximized organic campaign momentum within targeted timeframes.
            </div>
          </div>

          {/* Block 4 */}
          <div className="bg-white border border-neutral-200 hover:border-emerald-500/20 hover:shadow-xs transition-all duration-200 rounded-3xl p-6.5 space-y-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <BarChart3 className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Salesforce Pipeline Attribution</h3>
              <p className="text-[11.5px] text-neutral-500 leading-relaxed font-normal">
                Trace converted registrations and Pipeline opportunities back to individual employee shares using secure custom links.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] font-medium text-neutral-400 font-sans">
              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block mb-1">Outcome</span>
              CMO and CFO-level verification of organic community growth ROI.
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. ENTERPRISE SECURITY & COMPLIANCE (Compact Badge & Chips) ── */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-emerald-600 font-extrabold uppercase">
              Trust & Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Enterprise Trust & Compliance.
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
              Built for secure GTM execution across global companies and regulated compliance industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "SOC-2 Certified", desc: "Enterprise infrastructure" },
              { label: "GDPR Compliant", desc: "Data protection & privacy" },
              { label: "SSO Enabled", desc: "Okta & Azure AD" },
              { label: "Role-Based Access", desc: "Regional admin control" },
              { label: "Audit Logs", desc: "Track every trigger" },
              { label: "LinkedIn Native API", desc: "No profile token storage" },
              { label: "Slack Notifications", desc: "Prompt delivery channel" },
              { label: "MS Teams Alerts", desc: "Prompt delivery channel" }
            ].map((chip, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-2xl p-4.5 space-y-1 shadow-3xs flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-xs font-bold text-neutral-850">{chip.label}</div>
                <div className="text-[9.5px] text-neutral-400 font-medium">{chip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PREMIUM CTA BANNER ── */}
      <section className="px-6 sm:px-8 lg:px-12 pb-24 pt-16">
        <div className="max-w-5xl mx-auto bg-neutral-950 text-white rounded-[2rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />
          <div className="absolute top-0 right-0 h-64 w-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[8px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold bg-emerald-950 border border-emerald-900/50 px-4 py-1.5 rounded-full">
              Let's talk GTM strategy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Ready to mobilize your advocates?
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
              Join leading enterprise brands scaling their organic growth channel. No noise. Just structured pipeline outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Schedule a briefing <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
