import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Server,
  Terminal,
  ArrowRight,
  Database,
  EyeOff,
  UserCheck,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface SecurityLayer {
  id: string;
  name: string;
  subtitle: string;
  status: string;
  specs: string[];
  description: string;
  cipher: string;
  complianceTags: string[];
}

const SECURITY_LAYERS: SecurityLayer[] = [
  {
    id: 'oauth-vault',
    name: 'Secure Login Connections',
    subtitle: 'Restricted Token Layer',
    status: 'Encrypted',
    cipher: 'AES-256 GCM via AWS KMS',
    description: 'Credentials are handled directly by Slack, MS Teams, and social platform APIs. Wozku does not store passwords and only asks for permission to publish posts — we can never read private feeds or chats.',
    specs: [
      'Automatic token expiration and silent rotation',
      'TLS 1.3 transport security for all external API endpoints',
      'No plaintext storage: keys enveloped with master KMS keys'
    ],
    complianceTags: ['SOC2 CC6.1', 'ISO 27001 A.10', 'GDPR Art. 32']
  },
  {
    id: 'brand-guard',
    name: 'Automated Content Safety Checks',
    subtitle: 'Automated Post Scrutiny',
    status: 'Active',
    cipher: 'Lexical Verification',
    description: 'Every draft passes automated checks before it is sent out, matching your guidelines to make sure posts are appropriate and approved.',
    specs: [
      'Automated quarantine for unapproved content modifications',
      'Immutable legal sign-off hashes logged in campaign history',
      'Custom blocklists per organizational sub-division'
    ],
    complianceTags: ['SOC2 CC7.1', 'FTC Guidelines', 'Legal Sign-off']
  },
  {
    id: 'decentralized-dispatch',
    name: 'Safe Post Scheduling',
    subtitle: 'Anti-Spam Optimization',
    status: 'Online',
    cipher: 'Dispersion Intervals',
    description: 'Sharing schedules are automatically spaced out for each person so your team members do not post at the exact same second, keeping their personal accounts in good standing.',
    specs: [
      'Randomized delivery dispersion offsets (jitter)',
      'Per-channel throttling matching provider rate limits',
      'Immediate transmission cancel button on live dashboards'
    ],
    complianceTags: ['Anti-Spam Act', 'API Rate Limits', 'System Integrity']
  },
  {
    id: 'audit-ledger',
    name: 'Accountability Change Logs',
    subtitle: 'Immutable System Records',
    status: 'Protected',
    cipher: 'Tamper-Proof Log Hash Chain',
    description: 'All post approvals and scheduling changes are recorded in a permanent system log to give your team clear, verifiable compliance reports.',
    specs: [
      'Cryptographically chained change entries',
      'Real-time shipping of security events to SIEM providers',
      'Strict read-only retention policies matching compliance terms'
    ],
    complianceTags: ['SOC2 CC2.1', 'GDPR Art. 30', 'Audit Integrity']
  }
];

export default function SecurityCompliancePage() {
  const [activeLayerId, setActiveLayerId] = useState('oauth-vault');
  const activeLayer = SECURITY_LAYERS.find(l => l.id === activeLayerId) || SECURITY_LAYERS[0];

  // Simulator State
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const runAuditSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationLogs([]);
    setSimProgress(0);

    const steps = [
      { text: '🔍 Initializing security audit parameters...', delay: 400 },
      { text: '🔒 Testing KMS token envelope rotation... [OK]', delay: 900 },
      { text: '🛡️ Checking OAuth token permission scope bounds... [OK]', delay: 1400 },
      { text: '📝 Scanning lexical dictionary term filters... [0 Flags]', delay: 1800 },
      { text: '🔗 Verifying SHA-256 audit ledger hash chain integrity... [OK]', delay: 2300 },
      { text: '⚡ Running load-balanced API dispatch check... [PASS]', delay: 2700 },
      { text: '✅ SOC 2 compliance verification simulator: PASS', delay: 3100 },
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, step.text]);
        setSimProgress(((i + 1) / steps.length) * 100);
        if (i === steps.length - 1) {
          setIsSimulating(false);
        }
      }, step.delay);
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* ── 1. HERO HEADER ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-emerald-600 mb-8 animate-pulse">
            <Shield className="w-3.5 h-3.5" /> SOC 2 Ready &amp; GDPR Compliant
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Enterprise-grade trust.{' '}
            <span className="text-indigo-600 dark:text-indigo-400">By design.</span>
          </h1>

          <div className="max-w-xl mx-auto bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4.5 mb-8 text-center text-xs font-semibold text-indigo-950 leading-relaxed shadow-3xs">
            📢 <strong>Plain English Summary:</strong> We protect your corporate logins and follow strict security rules, so your team can share updates safely without sharing their social media passwords.
          </div>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6">
            Safety shouldn't compromise network security. Wozku is engineered with scoped permission bounds, immutable log trails, and envelope encryption to keep systems secure.
          </p>
        </div>
      </section>

      {/* ── 2. INTERACTIVE COMPLIANCE CENTER ───────────────────────── */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Blueprint Map: Layer Selection */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[500px]">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Architectural Trust Blueprint</h3>
                <p className="text-xs text-slate-450 leading-relaxed mb-6">
                  Select a stack layer to inspect specific security protocols, compliance rules, and cryptographic algorithms.
                </p>

                <div className="space-y-4">
                  {SECURITY_LAYERS.map((layer) => {
                    const isActive = layer.id === activeLayerId;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => setActiveLayerId(layer.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isActive
                            ? 'bg-slate-50 border-indigo-500 shadow-sm'
                            : 'border-slate-100 bg-white hover:border-slate-350 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg border transition-colors ${
                            isActive 
                              ? 'bg-indigo-500 border-indigo-400 text-white' 
                              : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:text-slate-700'
                          }`}>
                            {layer.id === 'oauth-vault' && <Key className="w-5 h-5" />}
                            {layer.id === 'brand-guard' && <FileCheck className="w-5 h-5" />}
                            {layer.id === 'decentralized-dispatch' && <RefreshCw className="w-5 h-5" />}
                            {layer.id === 'audit-ledger' && <Server className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-800">{layer.name}</h4>
                            <span className="text-[10px] text-slate-400 font-mono font-medium">{layer.subtitle}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                            layer.status === 'Encrypted' || layer.status === 'Protected' || layer.status === 'Active' || layer.status === 'Online'
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                              : 'bg-amber-50 border-amber-100 text-amber-600'
                          }`}>
                            {layer.status}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isActive ? 'text-indigo-500 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-400'
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security Audit Simulator */}
              <div className="border-t border-slate-100 mt-8 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Compliance &amp; Cert System Audit</h4>
                    <p className="text-[11px] text-slate-450 mt-0.5">Run simulated automated scans across all security checkpoints.</p>
                  </div>
                  <button
                    onClick={runAuditSimulation}
                    disabled={isSimulating}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-mono text-[10px] uppercase font-bold py-2.5 px-4 rounded-xl transition-all select-none cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    {isSimulating ? 'Running Audit...' : 'Run Audit Sim'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Selected Layer Details OR Simulator Output */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Dynamic Info Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-500 tracking-wider">Protocol Specifications</span>
                    <span className="text-[9px] font-mono text-slate-400 font-medium">Cipher: {activeLayer.cipher}</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-base font-extrabold text-slate-800">{activeLayer.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {activeLayer.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block">System Controls</span>
                    <ul className="space-y-2">
                      {activeLayer.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-widest">Compliance Maps</span>
                  <div className="flex gap-1.5">
                    {activeLayer.complianceTags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Console/Logs Panel */}
              <div className="bg-[#0c0c0e] text-fixed-light border border-fixed-white/10 rounded-2xl p-5 font-mono text-[10px] leading-relaxed min-h-[170px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="text-fixed-light/60 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Auditor Console
                    </span>
                    <span className="text-fixed-muted text-[8px]">Session: Active</span>
                  </div>

                  <div className="space-y-1.5 min-h-[100px]">
                    {simulationLogs.length === 0 ? (
                      <span className="text-fixed-muted italic">Ready to run verification simulation. Click 'Run Audit Sim' to begin testing.</span>
                    ) : (
                      simulationLogs.map((log, i) => (
                        <div key={i} className={log.includes('FAIL') || log.includes('Flags') ? 'text-amber-400' : log.includes('PASS') || log.includes('OK') ? 'text-emerald-400' : 'text-fixed-light'}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {isSimulating && (
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <div className="h-1 bg-[#141418] rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${simProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. COMPLIANCE BADGES GRID ───────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Compliance Frameworks</span>
            <h3 className="text-2xl font-extrabold text-slate-850">Trust seals &amp; framework alignments</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'SOC 2 TYPE II', desc: 'Verified security and availability design models.', icon: Shield },
              { name: 'GDPR READY', desc: 'Automated personal data deletion and consent maps.', icon: Lock },
              { name: 'ISO/IEC 27001', desc: 'Aligned with global information security controls.', icon: FileCheck },
              { name: 'CCPA COMPLIANT', desc: 'Enabling consumers right to opt-out and erase records.', icon: UserCheck }
            ].map(badge => (
              <div key={badge.name} className="border border-slate-100 bg-slate-50/30 hover:bg-slate-50 rounded-xl p-5 text-center transition-colors group">
                <div className="inline-flex p-3 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/60 mb-4 group-hover:scale-105 transition-transform">
                  <badge.icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-mono font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">{badge.name}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DATA PRINCIPLES ──────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg w-fit">
                <EyeOff className="w-4 h-4" />
              </div>
              <h4 className="text-base font-extrabold text-slate-850">Data Minimization</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We only sync content and metrics required to compute attribution scores. We never retrieve or log private peer conversations or personal messages.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg w-fit">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-base font-extrabold text-slate-850">Zero-Pass Authentication</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                System access uses token-based scoped federation protocols (SAML 2.0 / OIDC). Wozku never views or stores personal account credentials or passwords.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg w-fit">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="text-base font-extrabold text-slate-850">Tamper-Proof Audit Log</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every legal checkmark, staging draft, and publication scheduler is hashed into an immutable ledger, ensuring SOC 2 Type II audit readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA COMPLIANCE PACKAGE (Dark Theme) ────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#09090f] text-fixed-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--indigo-500) 12%, transparent), transparent 65%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 mb-6">
            <Lock className="w-3.5 h-3.5" /> Security Assets
          </span>
          <h2 className="text-4xl font-display font-extrabold text-fixed-white mb-4">Request Wozku's compliance pack</h2>
          <p className="text-sm text-fixed-light max-w-lg mx-auto mb-8 leading-relaxed">
            Interested in our DPA agreements, pen-test certifications, or SOC 2 Type II reports? Request immediate document access.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="compliance@company.com"
              className="flex-1 w-full sm:w-auto bg-[#141418] border border-fixed-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-fixed-white placeholder:text-fixed-muted focus:outline-none transition-all"
            />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Request Compliance Pack <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['SOC 2 Type II summary', 'SIEM integration details', 'GDPR DPA Template'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] text-fixed-muted font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/60" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
