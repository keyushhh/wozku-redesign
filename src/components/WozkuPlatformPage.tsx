import React, { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  TrendingUp,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  GitBranch,
  Network,
  Sparkles,
} from 'lucide-react';

interface BlueprintNode {
  id: string;
  name: string;
  role: string;
  latency: string;
  status: string;
  desc: string;
  details: string[];
}

const BLUEPRINT_NODES: BlueprintNode[] = [
  {
    id: 'campaign-engine',
    name: 'Campaign Staging Engine',
    role: 'Centralized Orchestration',
    latency: '< 12ms',
    status: 'Ready',
    desc: 'Where marketing managers draft content templates and define campaign objectives.',
    details: [
      'Tokenizes link URLs with dynamic attribution hashes',
      'Integrates directly with Google Workspace & Slack APIs',
      'Houses compliance validation logic (legal sign-off check)'
    ]
  },
  {
    id: 'wave-queue',
    name: 'Dynamic timing & Dispatcher',
    role: 'ML Scheduling Queue',
    latency: 'Real-time',
    status: 'Active',
    desc: 'Computes optimal distribution windows per advocate and platform.',
    details: [
      'Applies per-node delay schedules to prevent coordinate spam flags',
      'Triggers webhooks and dispatch protocols (Slack / Email alerts)',
      'Optimizes dispatch windows based on recipient time-zone activity'
    ]
  },
  {
    id: 'advocate-nodes',
    name: 'Decentralized Advocate Nodes',
    role: 'Distribution Network',
    latency: 'User action dependent',
    status: 'Idle',
    desc: 'The personal communication endpoints where shares are validated and posted.',
    details: [
      'No custom applications required - runs entirely inside Slack, MS Teams, or Email',
      'Supports one-click oauth dispatch to LinkedIn, X, and Facebook',
      'Validates node authentications without storing personal login credentials'
    ]
  },
  {
    id: 'attribution-ledger',
    name: 'Attribution & Rewards Ledger',
    role: 'Analytics & Rewards Router',
    latency: '< 45ms',
    status: 'Synced',
    desc: 'Aggregates click-through signals, verifies conversions, and routes points.',
    details: [
      'Deduplicates repeat clicks from identical user agents',
      'Updates points multipliers based on campaign engagement rules',
      'Secures reward redemption claims with anti-fraud click audits'
    ]
  }
];

const METRICS = [
  { value: '99.99%', label: 'API Uptime', desc: 'Enterprise SLA backed' },
  { value: '< 50ms',  label: 'Node dispatch latency', desc: 'Real-time message routing' },
  { value: 'SOC2 Type II', label: 'Compliance standard', desc: 'Audited and certified' },
  { value: 'Zero-trust', label: 'Identity model', desc: 'SAML SSO & OAuth validated' }
];

export default function WozkuPlatformPage() {
  const [selectedNode, setSelectedNode] = useState<BlueprintNode>(BLUEPRINT_NODES[0]);
  const [activeFlowStep, setActiveFlowStep] = useState(0);

  const triggerNextStep = () => {
    setActiveFlowStep(prev => (prev + 1) % BLUEPRINT_NODES.length);
    setSelectedNode(BLUEPRINT_NODES[(activeFlowStep + 1) % BLUEPRINT_NODES.length]);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* ── 1. HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 6%, transparent), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Cpu className="w-3.5 h-3.5" />
            Wozku Platform Architecture
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Our architectural approach to{' '}
            <span className="text-indigo-600 dark:text-indigo-400">organic trust.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            The Wozku platform replaces high-CPM ad buys with decentralized advocate networks. Learn how our enterprise-grade infrastructure handles staging, compliance, routing, and attribution loops securely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all shadow-xl shadow-indigo-600/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Request Architecture Whitepaper <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#blueprint" className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-sm cursor-pointer">
              Explore platform blueprint
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. BLUEPRINT INTERACTIVE SECTION ────────────────────────── */}
      <section id="blueprint" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Interactive Visualizer</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">Decentralized distribution blueprint</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">Click on any architectural node to view its specifications, latency rates, and operational details.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT: Schematic Diagram */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Live Architecture Flow</span>
                  </div>
                  <button 
                    onClick={triggerNextStep}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    <Zap className="w-3 h-3" /> Step Flow
                  </button>
                </div>

                {/* Nodes Display layout */}
                <div className="space-y-4 py-4 relative">
                  
                  {/* Visual flow lines mapping */}
                  <div className="absolute left-[25px] top-6 bottom-6 w-[2px] bg-slate-100 -z-0 pointer-events-none" />

                  {BLUEPRINT_NODES.map((node, index) => {
                    const isSelected = selectedNode.id === node.id;
                    const isActiveStep = activeFlowStep === index;
                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          setSelectedNode(node);
                          setActiveFlowStep(index);
                        }}
                        className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all relative z-10 cursor-pointer ${
                          isSelected
                            ? 'bg-[color-mix(in_srgb,var(--indigo-500)_22%,#141418)] border-indigo-400/60 shadow-xs'
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-fixed-white shadow-md shadow-indigo-600/10 scale-105'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          {index === 0 && <Layers className="w-5 h-5" />}
                          {index === 1 && <Zap className="w-5 h-5" />}
                          {index === 2 && <Network className="w-5 h-5" />}
                          {index === 3 && <Database className="w-5 h-5" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-extrabold ${isSelected ? 'text-fixed-white' : 'text-slate-800'}`}>{node.name}</span>
                            {isActiveStep && (
                              <span className="bg-emerald-100 text-emerald-800 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">active step</span>
                            )}
                          </div>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-fixed-muted' : 'text-slate-400'}`}>{node.role}</span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-[10px] font-mono block ${isSelected ? 'text-fixed-muted' : 'text-slate-400'}`}>Latency</span>
                          <span className={`text-[10px] font-mono font-bold block ${isSelected ? 'text-indigo-600' : 'text-slate-700'}`}>{node.latency}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 flex items-center gap-2 justify-center">
                <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
                Select any component block above to drill into the infrastructure design.
              </div>
            </div>

            {/* RIGHT: Node details Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-1">Architecture Node Profile</span>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedNode.name}</h3>
                  <span className="text-xs text-slate-400 font-mono block mt-0.5">{selectedNode.role}</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Functional Description</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedNode.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/60">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Internal Latency</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{selectedNode.latency}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Sync Status</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">{selectedNode.status}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block">Key Capabilities & Protocols</span>
                  {selectedNode.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-600 leading-tight font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                  className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-indigo-50/50 hover:border-indigo-200 hover:text-indigo-700 font-bold py-3.5 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Request Technical Blueprint Sheets <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. METRICS SECTION ──────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-100/20 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {METRICS.map(m => (
              <div key={m.label} className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{m.value}</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{m.label}</p>
                <p className="text-[10px] text-slate-500 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ENGINE MODULES SECTION ───────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Operational Security</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 leading-tight">Secured by design. Managed in trust.</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Wozku operates on a zero-trust model. We never store personal social credentials on our servers. All distributions are routed through encrypted client-signed auth loops.
              </p>
              
              <div className="space-y-3">
                {[
                  'Delegated OAuth authentication tokens',
                  'SAML SSO & Multi-Factor enterprise logins',
                  'Restricted legal review filters for post staging',
                  'Automated audit history logs for SOC2 compliance',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Box Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 space-y-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-800">Compliance Staging</h4>
                <p className="text-xs text-slate-500 leading-relaxed">All templates undergo strict internal validation checks before dispatch queue entry.</p>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 space-y-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Server className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-800">Timing Scheduler</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Our queuing engine stages and releases messages slowly to avoid channel spam locks.</p>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 space-y-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Network className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-800">Tokenized Attribution</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Unique click attribution loops trace user events down to individual shares.</p>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 space-y-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Lock className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-800">Anti-Fraud click audits</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Systematic click deduplication filter cleans telemetry graphs automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA SECTION (Dark Theme) ────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#09090f] text-fixed-white border-t border-fixed-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--indigo-500) 14%, transparent), transparent 65%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 mb-6">
            <Sparkles className="w-3 h-3" /> Architecture Blueprint
          </span>
          <h2 className="text-4xl font-display font-extrabold text-fixed-white mb-4">Deploy Wozku Platform inside your stack.</h2>
          <p className="text-sm text-fixed-light max-w-lg mx-auto mb-8 leading-relaxed">
            Ready to integrate automated organic distribution queues into your CRM workflows? Connect with our systems engineer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="architecture@yourcompany.com"
              className="flex-1 w-full sm:w-auto bg-[#141418] border border-fixed-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-fixed-white placeholder:text-fixed-muted focus:outline-none transition-all"
            />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Contact Systems Engineer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['SAML SSO Ready', 'SOC2 Certified', 'HIPAA compliant staging'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] text-fixed-muted font-semibold">
                <CheckCircle2 className="w-3 h-3 text-indigo-400/60" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
