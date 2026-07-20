import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, CheckCircle2, Lock, Smartphone, RefreshCw, BarChart2 } from 'lucide-react';

export default function InteractiveProductGrid() {
  const [activeTab, setActiveTab] = useState<'ugc' | 'holdfire' | 'dispatch'>('ugc');

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto px-4 py-8">
      
      {/* Editorial Navigation Tabs */}
      <div className="flex justify-center border-b border-neutral-200 max-w-lg mx-auto pb-px">
        {(['ugc', 'holdfire', 'dispatch'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-3 text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[2px] ${
              activeTab === tab
                ? 'border-primary-600 text-primary-650'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {tab === 'ugc' ? '1. Guided UGC' : tab === 'holdfire' ? '2. Hold & Fire' : '3. Governance'}
          </button>
        ))}
      </div>

      {/* Feature Showcase Grid Panel */}
      <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 sm:p-12 shadow-3xs relative overflow-hidden transition-all duration-300 min-h-[420px] flex items-center">
        <div className="absolute top-0 right-0 h-48 w-48 bg-radial-[at_top_right] from-primary-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="w-full">
          {activeTab === 'ugc' && (
            <motion.div
              key="ugc"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="h-10 w-10 rounded-xl bg-primary-50 border border-primary-150 flex items-center justify-center text-primary-650">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight">
                    Guided UGC Studio
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-sans font-medium">
                    Pre-approve campaign templates. Advocates personalize selected safety-restricted slots and publish to LinkedIn in exactly one click.
                  </p>
                </div>
                {/* Proof Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-150 text-emerald-700 text-xs font-mono font-bold">
                  <span>Red Hat Outcome: 987 Registrations / $0 Ad Spend</span>
                </div>
              </div>

              {/* Visual Showcase (Right Side) */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-md bg-[#0a0a0d] border border-fixed-white/10 rounded-2xl p-6 text-left space-y-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-fixed-muted">Template Builder</span>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary-500/20 rounded w-1/3" />
                    <div className="p-3 bg-[#141418] border border-fixed-white/5 rounded-xl text-[11px] text-fixed-light font-sans leading-relaxed border-l-2 border-primary-500">
                      "Excited to attend the summit! Register organically here: <span className="text-primary-400 font-bold">[Personalized Link]</span>"
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono pt-2 border-t border-fixed-white/5">
                    <span>Target: LinkedIn Feed</span>
                    <span className="flex items-center gap-1 font-bold"><CheckCircle2 className="w-3 h-3" /> Pre-Approved</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'holdfire' && (
            <motion.div
              key="holdfire"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="h-10 w-10 rounded-xl bg-primary-50 border border-primary-150 flex items-center justify-center text-primary-650">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight">
                    Hold & Fire Coordinated Release
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-sans font-medium">
                    Queue up advocate dispatches. When you click release, all posts publish simultaneously to override LinkedIn's feed latency algorithms.
                  </p>
                </div>
                {/* Proof Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-150 text-primary-700 text-xs font-mono font-bold">
                  <span>Women in Cloud Outcome: 3.9M Impressions reached</span>
                </div>
              </div>

              {/* Visual Showcase (Right Side) */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-md bg-[#0a0a0d] border border-fixed-white/10 rounded-2xl p-6 text-left space-y-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-fixed-muted">Dispatch Queue</span>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Alex Rivera (Salesforce)', status: 'Queued' },
                      { name: 'Marcus Chen (Veeam)', status: 'Queued' },
                      { name: 'Sarah Jenkins (Elastic)', status: 'Queued' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-[#141418] border border-fixed-white/5 rounded-xl text-[10.5px]">
                        <span className="text-fixed-white font-medium">{item.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-primary-500/10 border border-primary-500/20 text-primary-400 font-mono text-[9px] font-bold">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dispatch' && (
            <motion.div
              key="dispatch"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="h-10 w-10 rounded-xl bg-primary-50 border border-primary-150 flex items-center justify-center text-primary-650">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight">
                    Enterprise Governance
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-sans font-medium">
                    Sync employee lists via Active Directory (SSO), whitelist compliant circles, and auto-verify safety filters with lexical checks.
                  </p>
                </div>
                {/* Proof Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-150 text-violet-700 text-xs font-mono font-bold">
                  <span>Salesforce Outcome: 11x ROI generated</span>
                </div>
              </div>

              {/* Visual Showcase (Right Side) */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-md bg-[#0a0a0d] border border-fixed-white/10 rounded-2xl p-6 text-left space-y-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-fixed-muted">Security Audit</span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10.5px] text-fixed-light">
                      <div className="h-4 w-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded flex items-center justify-center font-bold">✓</div>
                      <span>SSO SAML Whitelist Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-fixed-light">
                      <div className="h-4 w-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded flex items-center justify-center font-bold">✓</div>
                      <span>GDPR Tracking Compliance Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
